import React from "react";
import {
  Box,
  ScrollView,
  Text,
  HStack,
  VStack,
  Divider,
  Button,
} from "native-base";
import { Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import UserCard from "../components/RideSummary/UserCard";
import MapView, { types } from "../components/MapView/index";
import { fetcher } from "../api/contant";
import { retrieveUserSession } from "../api/Auth.api";

export default function RideSummaryScreen({ route, navigation }) {
  const [ride, setRide] = React.useState({});
  const { id } = route.params;
  React.useEffect(() => {
    load();
  }, []);

  const load = () => {
    (async () => {
      const token = await retrieveUserSession();
      if (token) {
        fetcher(`ride/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
          .then((res) => {
            if (res?.status) {
              setRide(res.data);
            }
          })
          .catch((err) => console.warn(err));
      }
    })();
  };

  async function UpdateRide(status) {
    const token = await retrieveUserSession();
    if (token) {
      let formdata = new FormData();
      formdata.append("ride_id", id);
      formdata.append("status", status);
      fetcher("user/ride/update", {
        method: "POST",
        body: formdata,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
        .then((res) => {
          if (res.status) {
            Alert.alert("Alert", res.data);
            load();
          } else {
            Alert.alert("Alert", res.data);
          }
        })
        .catch((err) => console.warn(err));
    }
  }

  return (
    <Box flex={1} bg={"#fff"} _dark={{ background: "coolGray.800" }}>
      <Box w="100%" h="40%" position="relative">
        {
          <MapView
            type={types.RouteAtoB}
            userOrigin={[
              ride?.pickup_address?.latitude,
              ride?.pickup_address?.longitude,
            ]}
            userDestination={[
              ride?.dropoff_address?.latitude,
              ride?.dropoff_address?.longitude,
            ]}
          />
        }
      </Box>
      <ScrollView>
        <Box
          bg="#fff"
          _dark={{
            background: "coolGray.600",
          }}
          shadow={2}
          p={2}
          m={2}
          borderRadius={6}
        >
          <HStack>
            <FontAwesome name="map-marker" size={24} color="black" />
            <Text ml={2} flex={1}>
              {ride?.pickup_address?.address}
            </Text>
            <Text
              color="coolGray.400"
              _dark={{
                color: "coolGray.400",
              }}
            >
              {ride?.departure_time}
            </Text>
          </HStack>
          <VStack bg={"#000"} w={1} h={6} borderRadius={6} ml={1}></VStack>
          <HStack>
            <FontAwesome name="map-marker" size={24} color="black" />
            <Text ml={2} flex={1}>
              {ride?.dropoff_address?.address}
            </Text>
            <Text
              color="coolGray.400"
              _dark={{
                color: "coolGray.400",
              }}
            ></Text>
          </HStack>
          <Divider
            m={1}
            _dark={{
              background: "coolGray.400",
            }}
          />
          <HStack space={2} display={"flex"} justifyContent={"space-between"}>
            <Text>Date : {ride?.departure_date?.substring(0, 10)}</Text>
            <Text>Fare : {ride?.fare} PKR</Text>
          </HStack>
          <HStack space={2} display={"flex"} justifyContent={"space-between"}>
            <Text>Seats : {ride?.noOfSeats}</Text>
            <Text>Booked : {ride?.booked}</Text>
          </HStack>
          <HStack space={2} display={"flex"} justifyContent={"flex-end"}>
            <Button
              bg="#CCCCCC"
              _pressed={{
                background: "#666666",
              }}
              onPress={() => {
                ride.status === "ended"
                  ? Alert.alert("Error", "Ride Has Ended")
                  : UpdateRide("canceled");
              }}
            >
              Cancel Ride
            </Button>
            <Button
              bg="#666666"
              _pressed={{
                background: "#CCCCCC",
              }}
              onPress={() => {
                ride.status === "pending"
                  ? UpdateRide("started")
                  : ride.status === "started"
                  ? UpdateRide("ended")
                  : Alert.alert("Error", "Ride Has Ended");
              }}
            >
              {ride.status === "pending"
                ? "Start Ride"
                : ride.status === "started"
                ? "End Ride"
                : "Ride finished"}
            </Button>
          </HStack>
        </Box>
        {ride?.request?.map((e) => {
          return (
            <UserCard type="request" notification={e} navigation={navigation} />
          );
        })}
      </ScrollView>
    </Box>
  );
}
