import React from "react";
import {
  VStack,
  HStack,
  Button,
  IconButton,
  Icon,
  Text,
  NativeBaseProvider,
  Center,
  Box,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useAddress } from "../utils/states/AddressState";

export default function AppBar({ navigation }) {
  const [address, setAddress] = useAddress();
  return (
    <>
      <Box
        bg="#fff"
        _dark={{
          background: "coolGray.700",
        }}
        shadow={2}
      />
      <HStack
        shadow={2}
        bg="#fff"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        _dark={{
          background: "coolGray.700",
        }}
      >
        <HStack alignItems="center">
          <VStack ml={2}>
            <Text
              color="app.green"
              fontSize="16"
              fontWeight="bold"
              m="0"
              _dark={{
                color: "coolGray.50",
              }}
            >
              Ride&Share
            </Text>
            <Text color="grey" fontSize="12" m="0" p="0">
              {address?.name.length > 35
                ? address?.name.substring(0, 35) + ".."
                : address?.name}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <IconButton
            icon={
              <Icon
                as={MaterialIcons}
                name="notifications"
                size="lg"
                color="app.green"
                _dark={{
                  color: "coolGray.50",
                }}
              />
            }
            onPress={() => navigation.push("notifications")}
          />
          <IconButton
            icon={
              <Icon
                as={MaterialIcons}
                name="search"
                size="lg"
                color="app.green"
                _dark={{
                  color: "coolGray.50",
                }}
              />
            }
            onPress={() => navigation.push("search")}
          />
        </HStack>
      </HStack>
    </>
  );
}
