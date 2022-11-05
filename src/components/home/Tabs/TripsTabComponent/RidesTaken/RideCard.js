import React from "react";
import { Box, Text, HStack, VStack, Divider, Pressable } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

export default function RideCard({ ride, navigation }) {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("reportandrating", {
          ride,
        })
      }
    >
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
            {ride?.ride?.departure_time}
          </Text>
        </HStack>
        <VStack
          bg={"#000"}
          w={1}
          h={6}
          borderRadius={6}
          ml={1}
          mt={2}
          mb={1}
        ></VStack>
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
        <Text>Date : {ride?.ride.departure_date?.substring(0, 10)}</Text>
      </Box>
    </Pressable>
  );
}
