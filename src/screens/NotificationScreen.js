import * as React from "react";
import {
  Box,
  ScrollView,
  HStack,
  Icon,
  IconButton,
  Text,
  Menu,
  Pressable,
} from "native-base";
import NotificationCard from "../components/Notification/notificationCard";
import { retrieveUserSession } from "../api/Auth.api";
import { fetcher } from "../api/contant";
import { MaterialIcons } from "@expo/vector-icons";

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const token = await retrieveUserSession();
      if (token) {
        fetcher("user/notification", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
          .then((res) => {
            if (res.status) {
              const revArray = res.data.reverse();
              setNotifications(revArray);
            }
          })
          .catch((err) => console.warn(err));
      }
    })();
  }, []);
  return (
    <Box
      flex={1}
      bg="coolGray.50"
      _dark={{
        background: "coolGray.800",
      }}
    >
      <HStack
        bg="#fff"
        shadow={2}
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
                size="sm"
                as={MaterialIcons}
                name="arrow-back-ios"
                color="black"
                _dark={{
                  color: "#fff",
                }}
                onPress={() => navigation.popToTop()}
              />
            }
          />
          <Text
            fontSize="20"
            fontWeight="bold"
            color="app.green"
            _dark={{
              color: "#fff",
            }}
          >
            notification
          </Text>
        </HStack>
      </HStack>
      <ScrollView>
        {notifications.map((item) => (
          <NotificationCard type="null" item={item} />
        ))}
      </ScrollView>
    </Box>
  );
};

export default NotificationScreen;
