import * as React from "react";

import {
  Box,
  Pressable,
  HStack,
  VStack,
  Avatar,
  Text,
  Spacer,
} from "native-base";
import { TouchableRipple } from "react-native-paper";

export default function ChatCard({ navigation, data, currentUser }) {
  return (
    <Pressable
      rippleColor="rgba(0, 0, 0, .32)"
      style={{ width: "100%" }}
      onPress={() => {
        navigation.navigate("chat", {
          userId:
            currentUser === data.recieverId ? data.senderId : data.recieverId,
          name:
            currentUser === data.recieverId
              ? data.senderName
              : data.recieverName,
          avatar: null,
        });
      }}
    >
      <Box
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "white",
        }}
      >
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <Avatar
              size="48px"
              source={{
                uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              }}
            />
            <VStack>
              <Text
                color="app.green"
                _dark={{
                  color: "warmGray.50",
                }}
                bold
              >
                {currentUser === data.recieverId
                  ? data.senderName
                  : data.recieverName}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                {currentUser === data.recieverId
                  ? data.message
                  : "You :" + data.message}
              </Text>
            </VStack>
            <Spacer />
            <Text
              fontSize="xs"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              alignSelf="flex-start"
            >
              {data.time}
            </Text>
          </HStack>
        </Box>
      </Box>
    </Pressable>
  );
}
