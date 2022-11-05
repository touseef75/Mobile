import * as React from "react";
import {
  Box,
  HStack,
  Center,
  Text,
  Avatar,
  Button,
  Divider,
  VStack,
} from "native-base";

export default function NotificationCard({ type, item }) {
  return (
    <Box mt={2}>
      {type === "rideRequest" ? (
        <Box w="100%" h="140">
          <HStack>
            <Center w="20%">
              <Avatar
                bg="green.500"
                source={{
                  uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                }}
              >
                HJ
              </Avatar>
            </Center>
            <Center>
              <Text bold color="app.green" m={2}>
                Sara Khan
              </Text>
            </Center>
          </HStack>
          <Text ml={2}> {item.message} </Text>
          <HStack mt={4} w="100%">
            <Box w="30%">
              <Button borderRadius={50}>Detail</Button>
            </Box>
            <HStack w="70%" justifyContent="flex-end" space={3}>
              <Button
                borderRadius={50}
                w="40%"
                bg="danger.500"
                _pressed={{
                  background: "danger.900",
                }}
              >
                Decline
              </Button>
              <Button
                borderRadius={50}
                w="40%"
                bg="app.green"
                _pressed={{
                  background: "emerald.900",
                }}
              >
                Accept
              </Button>
            </HStack>
          </HStack>
          <Divider mt={2} />
        </Box>
      ) : (
        <Box w="100%" h="auto" p="1">
          <HStack>
            <VStack w="100%" display="flex" justifyContent="center">
              <Text>{item.message}</Text>
            </VStack>
          </HStack>
          <Divider mt={1} />
        </Box>
      )}
    </Box>
  );
}
