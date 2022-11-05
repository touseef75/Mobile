import React from "react";
import {
  Box,
  Text,
  Avatar,
  HStack,
  VStack,
  Center,
  Button,
  Divider,
} from "native-base";
import { retrieveUserSession } from "../../api/Auth.api";
import { fetcher } from "../../api/contant";
import { Alert } from "react-native";

export default function UserCard({ type, notification, navigation }) {
  const [isVisible, setVisible] = React.useState(
    notification?.status === "pending"
      ? false
      : notification?.status === "accepted"
      ? true
      : notification?.status === "canceled"
      ? true
      : false
  );
  async function RequestStatus(status) {
    const token = await retrieveUserSession();
    if (token) {
      let formdata = new FormData();
      formdata.append("ride_id", notification.ride_id);
      formdata.append("id", notification.id); // request id
      formdata.append("status", status);
      fetcher("user/ride-request/accept", {
        method: "POST",
        body: formdata,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }).then((res) => {
        console.log(res);
        if (res.status) {
          Alert.alert("Message", res.data);
          setVisible(true);
        } else {
          setVisible(true);
          Alert.alert("Message", res.data);
        }
      });
    }
  }

  return (
    <Box
      bg="#fff"
      _dark={{
        background: "coolGray.600",
      }}
      p={2}
      m={1}
    >
      <HStack>
        <Center w="20%">
          <Avatar
            bg="green.500"
            source={{
              uri: notification?.avatar
                ? notification?.avatar
                : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          >
            {notification?.name.substring(0, 2)}
          </Avatar>
        </Center>
        <VStack w="100%" display="flex" justifyContent="center">
          <Text bold color="app.green" mt={1}>
            {notification?.name}
          </Text>
          {notification?.offered_fare ? (
            <Text>
              Offered {notification?.offered_fare} Amount . Sent a Request To
              Join {"   "} (Status : {notification?.status})
            </Text>
          ) : (
            <Text>
              Sent a Request To Join (Status : {notification?.status})
            </Text>
          )}
        </VStack>
      </HStack>
      <HStack mt={4} w="100%">
        <Box w="30%">
          <Button
            borderRadius={4}
            bg="teal.700"
            size={"md"}
            _pressed={{
              background: "teal.900",
            }}
            onPress={() => {
              navigation.push("chat", {
                userId: notification.user_id,
                avatar: notification?.avatar
                  ? notification?.avatar
                  : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                name: notification?.name,
              });
            }}
          >
            Message
          </Button>
        </Box>
        <HStack w="70%" justifyContent="flex-end" space={3}>
          <Button
            borderRadius={4}
            bg="danger.500"
            isDisabled={isVisible}
            size={"md"}
            _pressed={{
              background: "danger.900",
            }}
            onPress={() => RequestStatus("canceled")}
          >
            Decline
          </Button>
          <Button
            borderRadius={4}
            bg="app.green"
            isDisabled={isVisible}
            size={"md"}
            _pressed={{
              background: "emerald.900",
            }}
            onPress={() => RequestStatus("accepted")}
          >
            Accept
          </Button>
        </HStack>
      </HStack>
      <Divider mt={2} />
    </Box>
  );
}
