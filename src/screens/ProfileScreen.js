import React from "react";
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Text,
  Avatar,
  Divider,
  VStack,
  Input,
  Button,
  Center,
  useColorMode,
  Switch,
  ScrollView,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Alert, Dimensions } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { fetcher } from "../api/contant";
import { retrieveUserSession, logOut } from "../api/Auth.api";
const initialLayout = { width: Dimensions.get("window").width };

const Account = ({ route }) => {
  const { logOut, nav } = route;
  const [user, setUser] = React.useState({});
  const [token, setToken] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      const access_token = await retrieveUserSession();
      if (access_token) {
        setToken(access_token);
        fetcher("user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
          },
        })
          .then((res) => {
            console.log(res);
            setUser(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })();
  }, []);
  return (
    <Box flex={1}>
      <HStack w="100%" p={3}>
        <IconButton
          icon={
            <Icon
              size="lg"
              as={MaterialIcons}
              name="account-circle"
              color="black"
              _dark={{
                color: "#fff",
              }}
              onPress={() => navigation.goBack()}
            />
          }
        />

        <Input
          w="100%"
          variant="underlined"
          placeholder="enter your name"
          value={user.username}
          onChangeText={(value) => {
            setUser((e) => {
              return {
                ...e,
                username: value,
              };
            });
          }}
        />
      </HStack>
      <HStack w="100%" p={3}>
        <IconButton
          icon={
            <Icon
              size="lg"
              as={MaterialIcons}
              name="phone"
              color="black"
              _dark={{
                color: "#fff",
              }}
              onPress={() => navigation.goBack()}
            />
          }
        />
        <Input
          w="100%"
          variant="underlined"
          placeholder="enter your phone"
          value={user.phoneNo}
          isDisabled
        />
      </HStack>
      <HStack w="100%" p={3}>
        <IconButton
          icon={
            <Icon
              size="lg"
              as={MaterialIcons}
              name="email"
              color="black"
              _dark={{
                color: "#fff",
              }}
              onPress={() => navigation.goBack()}
            />
          }
        />
        <Input
          w="100%"
          variant="underlined"
          placeholder="enter your email"
          value={user.email === "null" || user.email == null ? "" : user.email}
          onChangeText={(value) => {
            setUser((e) => {
              return {
                ...e,
                email: value,
              };
            });
          }}
        />
      </HStack>
      <HStack
        justifyContent="space-evenly"
        w="100%"
        mt={2}
        position="absolute"
        bottom={10}
      >
        <Button
          bg="danger.700"
          w="35%"
          onPress={() => {
            logOut((res) => {
              console.log(res);
              if (res?.message) {
                Alert.alert("Logged Out", res.message);
                if (res.message !== "Unauthenticated.") {
                  nav.replace("splashScreen");
                }
              }
            });
          }}
        >
          Logout
        </Button>
        <Button
          bg="app.green"
          w="35%"
          onPress={() => {
            let formdata = new FormData();
            formdata.append("username", user.username);
            formdata.append("email", user.email);
            fetcher("user/update", {
              method: "POST",
              body: formdata,
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            })
              .then((res) => {
                console.log(res);
                if (res.updated) {
                  Alert.alert("Update Status", "Updated successfully");
                }
              })
              .catch((err) => console.log(err));
          }}
        >
          Save
        </Button>
      </HStack>
    </Box>
  );
};
const Setting = ({ route }) => {
  const { nav } = route;
  const { colorMode, toggleColorMode } = useColorMode();
  const [isChecked, setChecked] = React.useState(
    colorMode === "dark" ? true : false
  );
  const ToggleSwitch = () => {
    setChecked(!isChecked);
    toggleColorMode();
  };
  return (
    <ScrollView flex={1}>
      <TouchableRipple
        rippleColor="rgba(0, 0, 0, .32)"
        style={{ width: "100%" }}
        onPress={() => nav.navigate("vehicle")}
      >
        <Box w="95%" h={60} px={4} mt={1} justifyContent="center">
          <Text
            fontSize="16"
            color="gray.500"
            _dark={{
              color: "gray.300",
            }}
          >
            My Vehicle
          </Text>
          <Divider mt={4} />
        </Box>
      </TouchableRipple>

      <TouchableRipple
        rippleColor="rgba(0, 0, 0, .32)"
        style={{ width: "100%" }}
        onPress={() => nav.navigate("faq")}
      >
        <Box w="95%" h={60} px={4} mt={1} justifyContent="center">
          <Text
            fontSize="16"
            color="gray.500"
            _dark={{
              color: "gray.300",
            }}
          >
            FAQs
          </Text>
          <Divider mt={4} />
        </Box>
      </TouchableRipple>
      <TouchableRipple
        rippleColor="rgba(0, 0, 0, .32)"
        style={{ width: "100%" }}
        onPress={() => nav.navigate("report")}
      >
        <Box w="95%" h={60} px={4} mt={1} justifyContent="center">
          <Text
            fontSize="16"
            color="gray.500"
            _dark={{
              color: "gray.300",
            }}
          >
            Report/Complain
          </Text>
          <Divider mt={4} />
        </Box>
      </TouchableRipple>
      <TouchableRipple
        rippleColor="rgba(0, 0, 0, .32)"
        style={{ width: "100%" }}
        onPress={() => nav.push("privacy")}
      >
        <Box w="95%" h={60} px={4} mt={1} justifyContent="center">
          <Text
            fontSize="16"
            color="gray.500"
            _dark={{
              color: "gray.300",
            }}
          >
            Privacy Policy
          </Text>
          <Divider mt={4} />
        </Box>
      </TouchableRipple>

      <Box
        w="95%"
        mt={1}
        px={4}
        h={60}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <>
          <Text
            fontSize="16"
            color="gray.500"
            _dark={{
              color: "gray.300",
            }}
          >
            Theme : {colorMode}
          </Text>
        </>
        <>
          <Switch
            defaultIsChecked={isChecked}
            isChecked={isChecked}
            colorScheme="emerald"
            onToggle={ToggleSwitch}
          />
        </>
      </Box>
    </ScrollView>
  );
};
const renderScene = SceneMap({
  first: Account,
  second: Setting,
});
const renderTabBar = (props) => (
  <TabBar
    {...props}
    activeColor={"#000"}
    inactiveColor={"grey"}
    style={{ backgroundColor: "#fff" }}
  />
);

export default function ProfileScreen({ navigation }) {
  const [index, setIndex] = React.useState(0);
  const [user, setUser] = React.useState({});
  const [token, setToken] = React.useState(null);
  const [routes] = React.useState([
    { key: "first", title: "Account", nav: navigation, logOut },
    { key: "second", title: "Settings", nav: navigation },
  ]);

  React.useEffect(() => {
    (async () => {
      const access_token = await retrieveUserSession();
      if (access_token) {
        setToken(access_token);
        fetcher("user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
          },
        })
          .then((res) => {
            console.log(res);
            setUser(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })();
  }, []);

  return (
    <Box
      flex={1}
      bg="#fff"
      _dark={{
        background: "coolGray.800",
      }}
    >
      {/* Main Content */}
      <VStack h="100%" w="100%" mt={1}>
        <Center bg="app.green" h={"30%"}>
          <Avatar
            bg="purple.600"
            alignSelf="center"
            size="2xl"
            source={{
              uri: user?.avatar
                ? user?.avatar
                : "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=456&q=80",
            }}
          >
            {user?.username?.substring(0, 2)}
          </Avatar>
          <Text color="white" fontSize={"md"} mt={1}>
            {user?.username}
          </Text>
          <Text color="white" fontSize={"sm"} mt={1}>
            {user?.phoneNo}
          </Text>
        </Center>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={renderTabBar}
          style={{
            flex: 1,
            height: "100%",
          }}
        />
      </VStack>
    </Box>
  );
}
