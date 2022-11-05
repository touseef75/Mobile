import * as React from "react";
import {
  Box,
  Text,
  ScrollView,
  HStack,
  VStack,
  Center,
  Avatar,
  Button,
} from "native-base";
import AppBar from "../components/ridedetail/AppBar";
import { AntDesign } from "@expo/vector-icons";

import MapView, { types } from "../components/MapView/index";
import { fetcher } from "../api/contant";
import { retrieveUserSession } from "../api/Auth.api";

export default function RideDetailScreen({ navigation, route }) {
  const { id } = route.params;
  const [ride, setRide] = React.useState({});
  React.useEffect(() => {
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
  }, []);
  return (
    <Box
      flex={1}
      bg="#fff"
      _dark={{
        background: "coolGray.800",
      }}
    >
      <AppBar navigation={navigation} />
      <Box mt={2} h="35%">
        <HStack>
          <HStack w="70%" h="auto">
            <Center ml={2}>
              <Avatar
                bg="green.500"
                source={{
                  uri: ride?.avatar
                    ? ride?.avatar
                    : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                }}
              >
                AJ
              </Avatar>
            </Center>
            <VStack ml={2}>
              <Text bold color="app.green">
                {ride?.username}
              </Text>
              <HStack>
                <AntDesign name="star" size={16} color="#F4EC1E" />
                <AntDesign name="star" size={16} color="#F4EC1E" />
                <AntDesign name="star" size={16} color="#F4EC1E" />
                <AntDesign name="staro" size={16} color="#F4EC1E" />
                <AntDesign name="staro" size={16} color="#F4EC1E" />
              </HStack>
            </VStack>
          </HStack>
          <VStack w="30%" h="auto">
            <Text>
              <Text bold color="app.green">
                Fare :{" "}
              </Text>
              {ride?.fare} Rs
            </Text>
            <Text>
              <Text bold color="app.green">
                Seats :{" "}
              </Text>
              {ride?.noOfSeats}
            </Text>
          </VStack>
        </HStack>
        <Box ml={2} mr={2} h={70}>
          <ScrollView>
            <Text>{ride?.description}</Text>
          </ScrollView>
        </Box>
        <VStack ml={2} mt={2}>
          <Text bold color="app.green">
            Pickup:
          </Text>
          <Text>{ride?.pickup_address?.address}</Text>
        </VStack>
        <VStack ml={2} mt={2}>
          <Text bold color="app.green">
            DropOff:
          </Text>
          <Text>{ride?.dropoff_address?.address}</Text>
        </VStack>
      </Box>
      <Box w="100%" h="56%" position="relative">
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
      <Center zIndex={2} position="absolute" bottom="10" w="100%">
        <Button
          bg="#38b000"
          borderRadius="8"
          w="200"
          p="3"
          onPress={() =>
            navigation.navigate("ridebook", {
              ride,
            })
          }
        >
          Request Ride
        </Button>
      </Center>
    </Box>
  );
}
