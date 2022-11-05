import * as React from "react";
import { Alert, View } from "react-native";
import AppBar from "../components/AppBar";
import { Box, Text } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import * as Location from "expo-location";
import getAddress from "../utils/ReverseGeoCoding";
import { useAddress } from "../utils/states/AddressState";

import CreateTripScreen from "./CreateTripScreen";
import ProfileScreen from "./ProfileScreen";
import HomeTab from "../components/home/Tabs/homeTab";
import ChatListTab from "../components/home/Tabs/chatListTab";
import TripsTab from "../components/home/Tabs/tripsTab";

import firebase from "react-native-firebase";
import { retrieveUserSession } from "../api/Auth.api";
import { fetcher } from "../api/contant";
const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
  const [latlng, setLatLng] = React.useState({
    latitude: 24.8990162,
    longitude: 67.0308583,
  });
  const [address, setAddress] = useAddress();
  const checkPermission = async () => {
    const hasPermission = await Location.requestForegroundPermissionsAsync();
    if (hasPermission.status === "granted") {
      const permission = await askPermission();
      return permission;
    }
    return true;
  };

  const askPermission = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    return permission.status === "granted";
  };

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const response = await Location.getCurrentPositionAsync();
      const {
        coords: { latitude, longitude },
      } = response;
      setLatLng({ latitude: latitude, longitude: longitude });
    } catch (err) {}
  };

  React.useEffect(() => {
    checkPermission();
    getLocation();
  }, []);

  React.useEffect(() => {
    checkPermissionFCM();
    messageListener();
  }, []);

  const checkPermissionFCM = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getFcmToken();
    } else {
      requestPermission();
    }
  };

  //----------- need to do save fcm token;
  const getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      const token = await retrieveUserSession();
      if (token) {
        let formdata = new FormData();
        formdata.append("token", fcmToken);
        console.log(fcmToken);
        fetcher("user/token/create", {
          method: "POST",
          body: formdata,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
      // Alert.alert("Your Firebase Token is:", fcmToken);
    } else {
      Alert.alert("Failed", "No token received");
    }
  };
  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  };
  const messageListener = async () => {
    let notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        const { title, body } = notification;
        Alert.alert(title, body);
      });

    let notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        Alert.alert(title, body);
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      Alert.alert(title, body);
    }

    let messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  };
  const fetchAddress = async () => {
    const data = await getAddress(latlng.latitude, latlng.longitude);
    if (data.status) {
      let add = data.results[0].formatted_address;
      let value = add.split(",");
      let count = value.length;
      let country = value[count - 1];
      let state = value[count - 2];
      let city = value[count - 3];
      console.clear();
      setAddress({
        latitude: data.results[0].geometry.location.lat,
        longitude: data.results[0].geometry.location.lng,
        address: data.results[0].formatted_address,
        name: data.results[0].formatted_address,
        city: city,
      });
    } else {
      alert("Failed To Fetch Current Location: " + JSON.stringify(latlng));
    }
  };
  // uncomment this when releasing for production

  React.useEffect(() => {
    fetchAddress();
  }, [latlng]);

  return (
    <Box flex={1} bg="coolGray.400">
      <AppBar navigation={navigation} />
      <TabBtm navigation={navigation} />
    </Box>
  );
}

function TabBtm({ navigation }) {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#38b000",
          inactiveTintColor: "#555",
        }}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarLabel: "Rides",
            tabBarIcon: (tabInfo) => (
              <Icon
                name={tabInfo.focused ? "car-sport-sharp" : "car-sport-outline"}
                size={25}
                color={tabInfo.focused ? "#38b000" : "#555"}
              />
            ),
          }}
        >
          {(props) => <HomeTab {...props} extraData={navigation} />}
        </Tab.Screen>

        <Tab.Screen
          name="Publish"
          options={{
            tabBarIcon: (tabInfo) => (
              <Icon
                name={tabInfo.focused ? "add-circle" : "add-circle-outline"}
                size={25}
                color={tabInfo.focused ? "#38b000" : "#555"}
              />
            ),
          }}
        >
          {(props) => <CreateTripScreen {...props} navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen
          name="My trips"
          options={{
            tabBarIcon: (tabInfo) => (
              <Icon
                name={tabInfo.focused ? "md-location" : "md-location-outline"}
                size={25}
                color={tabInfo.focused ? "#38b000" : "#555"}
              />
            ),
          }}
        >
          {(props) => <TripsTab {...props} extraData={navigation} />}
        </Tab.Screen>
        <Tab.Screen
          name="Chats"
          options={{
            tabBarIcon: (tabInfo) => (
              <Icon
                name={tabInfo.focused ? "chatbox" : "chatbox-outline"}
                size={25}
                color={tabInfo.focused ? "#38b000" : "#555"}
              />
            ),
          }}
        >
          {(props) => <ChatListTab {...props} extraData={navigation} />}
        </Tab.Screen>
        <Tab.Screen
          name="Profile"
          options={{
            tabBarIcon: (tabInfo) => (
              <Icon
                name={
                  tabInfo.focused
                    ? "person-circle-sharp"
                    : "person-circle-outline"
                }
                size={25}
                color={tabInfo.focused ? "#38b000" : "#555"}
              />
            ),
          }}
        >
          {(props) => <ProfileScreen {...props} navigation={navigation} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
