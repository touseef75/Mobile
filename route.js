import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import RegisterScreen from "./src/screens/AuthScreens/RegisterScreen";
import OtpScreen from "./src/screens/AuthScreens/OtpScreen";
import SplashScreen from "./src/screens/SplashScreen";
import SignInScreen from "./src/screens/AuthScreens/SigInScreen";
import RideDetailScreen from "./src/screens/RideDetailScreen";
import CreateTripScreen from "./src/screens/CreateTripScreen";
import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import FaqsScreen from "./src/screens/FAQsScreen";
import ChatScreen from "./src/screens/ChatScreen";
import ReportScreen from "./src/screens/ReportScreen";
import SearchScreen from "./src/screens/SearchRidesScreen";
import MyVehicle from "./src/screens/MyVehicles";
import AddVehicle from "./src/screens/AddVehicle";
import RideSummaryScreen from "./src/screens/RideSummaryScreen";
import RideBookingScreen from "./src/screens/RideBookingScreen";
import NotificationScreen from "./src/screens/NotificationScreen";
import CreateRidescreen from "./src/screens/CreateRide";
import PrivacyPolicyScreen from "./src/screens/PrivacyPolicyScreen";
import RideReportAndRatingScreen from "./src/screens/RideReportAndRatingScreen";

const Route = () => {
  const Stack = createNativeStackNavigator();

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="splashScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="splashScreen" component={SplashScreen} />
          <Stack.Screen name="register" component={RegisterScreen} />
          <Stack.Screen name="login" component={SignInScreen} />
          <Stack.Screen name="Otp" component={OtpScreen} />

          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="rideDetail" component={RideDetailScreen} />
          <Stack.Screen name="createTrip" component={CreateTripScreen} />
          <Stack.Screen name="map" component={MapScreen} />
          <Stack.Screen name="profile" component={ProfileScreen} />
          <Stack.Screen name="faq" component={FaqsScreen} />
          <Stack.Screen name="chat" component={ChatScreen} />
          <Stack.Screen name="report" component={ReportScreen} />
          <Stack.Screen name="search" component={SearchScreen} />
          <Stack.Screen
            name="vehicle"
            component={MyVehicle}
            options={{
              headerShown: true,
              headerTitle: "My Vehicles",
            }}
          />
          <Stack.Screen name="addvehicle" component={AddVehicle} />
          <Stack.Screen name="ridesummary" component={RideSummaryScreen} />
          <Stack.Screen name="ridebook" component={RideBookingScreen} />
          <Stack.Screen name="notifications" component={NotificationScreen} />
          <Stack.Screen name="createRide" component={CreateRidescreen} />
          <Stack.Screen name="privacy" component={PrivacyPolicyScreen} />
          <Stack.Screen
            name="reportandrating"
            component={RideReportAndRatingScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Route;
