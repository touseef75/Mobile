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
  Avatar,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export default function AppBar({ navigation, name, avatar }) {
  return (
    <>
      <Box
        bg="#fff"
        _dark={{
          background: "coolGray.700",
        }}
      />
      <HStack
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
          <IconButton
            icon={
              <Icon
                size="lg"
                as={MaterialIcons}
                name="arrow-back"
                color="app.green"
                _dark={{
                  color: "coolGray.50",
                }}
              />
            }
            onPress={() => navigation.goBack()}
          />
          <Avatar
            mr={2}
            size="md"
            bg="green.500"
            source={{
              uri: avatar,
            }}
          >
            {name.substring(0, 2)}
          </Avatar>
          <VStack>
            <Text
              color="app.green"
              fontSize="16"
              fontWeight="bold"
              m="0"
              _dark={{
                color: "coolGray.50",
              }}
            >
              {name}
            </Text>
            <Text color="grey" fontSize="12" m="0" p="0">
              Last seen at 12:45pm
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <IconButton
            icon={
              <Icon
                as={MaterialIcons}
                name="more-vert"
                size="lg"
                color="app.green"
                _dark={{
                  color: "coolGray.50",
                }}
              />
            }
          />
        </HStack>
      </HStack>
    </>
  );
}
