import React from "react";
import {
  Box,
  Input,
  HStack,
  Center,
  Text,
  Button,
  Heading,
  IconButton,
  useColorModeValue,
  VStack,
  Divider,
  useToast,
  Spinner,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { width } from "../utils/DPtoPixels";
import { Alert } from "react-native";
import { retrieveUserSession } from "../api/Auth.api";
import { fetcher } from "../api/contant";

export default function RideBookingScreen({ route }) {
  const toast = useToast();
  const { ride } = route.params;
  const [noOfSeats, setNoOfSeats] = React.useState(1);
  const [fare] = React.useState(ride?.fare);
  const [customFare, setCustomFare] = React.useState(0);
  const [isLoading, setLoading] = React.useState(false);
  const [totalSeatsLeft] = React.useState(ride?.noOfSeats - ride?.booked);

  const onHandleSubmit = () => {
    setLoading(true);
    if (customFare) {
      (async () => {
        const token = await retrieveUserSession();
        if (token) {
          let formdata = new FormData();
          formdata.append("ride_id", ride.id);
          formdata.append("status", "pending");
          formdata.append("seats_count", noOfSeats);
          formdata.append("offered_fare", customFare);
          fetcher("user/ride-request", {
            method: "POST",
            body: formdata,
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          })
            .then((res) => {
              setLoading(false);
              console.log(res);
              if (res.status) {
                Alert.alert("Alert", "Ride Request Sent successfully");
              } else {
                Alert.alert("Alert", res.data);
              }
            })
            .catch((err) => console.warn(err));
        }
      })();
    } else {
      (async () => {
        const token = await retrieveUserSession();
        if (token) {
          let formdata = new FormData();
          formdata.append("ride_id", ride.id);
          formdata.append("status", "pending");
          formdata.append("seats_count", noOfSeats);
          fetcher("user/ride-request", {
            method: "POST",
            body: formdata,
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          })
            .then((res) => {
              setLoading(false);
              console.log(res);
              if (res.status) {
                Alert.alert("Alert", "Ride Request Sent successfully");
              } else {
                Alert.alert("Alert", res.data);
              }
            })
            .catch((err) => console.warn(err));
        }
      })();
    }
  };

  return (
    <VStack flex={1} bg={"#fff"} _dark={{ background: "coolGray.800" }}>
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
      <Divider />
      <Center mt={4}>
        <Heading color={"app.green"}>Select Total Passenger</Heading>
        <HStack mt={4} textAlign="center">
          <IconButton
            size={8}
            variant="solid"
            _icon={{
              as: Ionicons,
              name: "remove",
              color: useColorModeValue("#fff", "coolGray.50"),
            }}
            color="#fff"
            onPress={() => {
              if (noOfSeats > 1) {
                setNoOfSeats(noOfSeats - 1);
              }
            }}
          />
          <Heading bold ml={2} mr={2} textAlign="center">
            {noOfSeats}
          </Heading>
          <IconButton
            size={8}
            variant="solid"
            _icon={{
              as: Ionicons,
              name: "add",
              color: useColorModeValue("#fff", "coolGray.50"),
            }}
            onPress={() => {
              if (noOfSeats < totalSeatsLeft) {
                setNoOfSeats(noOfSeats + 1);
              } else {
                toast.show({
                  description: "cannot Add more",
                });
              }
            }}
          />
        </HStack>
        <Box mt={3} mb={3} shadow={"6"}>
          <Text>Total Fare : No Of Seats x Fare </Text>
          <Text>
            Total Fare : {noOfSeats} x {fare} = {noOfSeats * fare}{" "}
          </Text>
        </Box>
        <Divider mb={2} mt={3} />
        <Heading color={"app.green"}>Offer Your own Fare</Heading>
        <Input
          w={80}
          isRequired
          keyboardType="numeric"
          value={customFare}
          onChangeText={(amount) => {
            if (parseInt(amount) > fare) {
              Alert.alert(
                "Alert",
                "Amount Cannot Be greater than the Original fare"
              );
            } else {
              setCustomFare(amount);
            }
          }}
        />
        <Text color={"coolGray.400"}>
          *Leave Blank if not offering a custom fare amount.
        </Text>
      </Center>
      <Box
        position={"absolute"}
        bottom={10}
        w={"100%"}
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
      >
        <Button
          borderRadius={4}
          w={width("60%")}
          bg={"app.green"}
          onPress={onHandleSubmit}
          isLoading={isLoading}
        >
          Send Request
        </Button>
      </Box>
    </VStack>
  );
}
