import * as React from "react";
import {
  Box,
  Center,
  HStack,
  VStack,
  Text,
  Avatar,
  Pressable,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
export default function TripCard({ navigation, data }) {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("rideDetail", {
          id: data?.id,
        })
      }
    >
      <Center w="100%" h="180">
        <Box
          w="90%"
          bg="coolGray.50"
          h="160"
          borderRadius={5}
          shadow={2}
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
        >
          <HStack>
            <VStack ml={2} mt={3} w="70%" h="auto">
              <Text bold color="app.green">
                Pickup:
              </Text>
              <Text>{data?.pickup_address.address.substring(0, 25)}...</Text>
            </VStack>
            <VStack w="30%" mt={3} h="auto">
              <Text bold color="app.green">
                At:
              </Text>
              <Text>{data?.departure_time}</Text>
            </VStack>
          </HStack>
          <HStack>
            <VStack ml={2} mt={1} w="70%" h="auto">
              <Text bold color="app.green">
                DropOff:
              </Text>
              <Text>{data?.dropoff_address.address.substring(0, 24)}...</Text>
            </VStack>
            <VStack w="30%" h="auto">
              <Text bold color="app.green">
                Seats:
              </Text>
              <Text>{data?.noOfSeats}</Text>
            </VStack>
          </HStack>
          <HStack>
            <HStack ml={2} mt={1} w="70%" h="auto">
              <Center>
                <Avatar
                  bg="green.500"
                  source={{
                    uri: data?.avatar
                      ? data?.avatar
                      : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  }}
                >
                  {data.username.substring(0, 2)}
                </Avatar>
              </Center>
              <VStack ml={2}>
                <Text bold color="app.green">
                  {data?.username}
                </Text>
                <HStack mt={1}>
                  <AntDesign name="star" size={20} color="#F4EC1E" />
                  <AntDesign name="star" size={20} color="#F4EC1E" />
                  <AntDesign name="star" size={20} color="#F4EC1E" />
                  <AntDesign name="staro" size={20} color="#F4EC1E" />
                  <AntDesign name="staro" size={20} color="#F4EC1E" />
                </HStack>
              </VStack>
            </HStack>
            <Center w="30%" h="auto">
              <Text color="app.green" bold>
                {data?.fare} Rs
              </Text>
            </Center>
          </HStack>
        </Box>
      </Center>
    </Pressable>
  );
}
