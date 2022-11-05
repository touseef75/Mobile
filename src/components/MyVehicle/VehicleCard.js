import React from "react";
import { Box, HStack, VStack, Image, Text } from "native-base";

export default function VehicleCard({ vehicle }) {
  return (
    <Box
      bg={"#fff"}
      shadow={2}
      p={2}
      mx={2}
      my={2}
      w="95%"
      _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700",
      }}
    >
      <HStack>
        <Image
          size={"md"}
          resizeMode="cover"
          source={{
            uri: vehicle.image
              ? vehicle.image
              : "https://images.unsplash.com/photo-1489824904134-891ab64532f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80",
          }}
          alt={"Image Not Found"}
        />
        <VStack ml={3}>
          <Text>
            <Text
              bold
              color={"coolGray.900"}
              _dark={{
                color: "coolGray.300",
              }}
            >
              {" "}
              Type
            </Text>{" "}
            : {vehicle.type}
          </Text>
          <Text>
            <Text
              bold
              color={"coolGray.900"}
              _dark={{
                color: "coolGray.300",
              }}
            >
              {" "}
              Model
            </Text>{" "}
            : {vehicle.model}
          </Text>
          <Text>
            <Text
              bold
              color={"coolGray.900"}
              _dark={{
                color: "coolGray.300",
              }}
            >
              {" "}
              No
            </Text>{" "}
            : {vehicle.no}
          </Text>
          <Text>
            <Text
              bold
              color={"coolGray.900"}
              _dark={{
                color: "coolGray.300",
              }}
            >
              {" "}
              Color
            </Text>{" "}
            : {vehicle.color}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}
