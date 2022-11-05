import * as React from "react";
import { ActivityIndicator } from "react-native";
import {
  Text,
  Box,
  Image,
  useColorMode,
  useColorModeValue,
  Hidden,
} from "native-base";
import { width, height } from "../utils/DPtoPixels";
import { retrieveUserSession } from "../api/Auth.api";

const SplashScreen = ({ navigation }) => {
  React.useEffect(() => {
    (async () => {
      const access_token = await retrieveUserSession();

      if (!access_token) {
        setTimeout(() => {
          navigation.replace("register");
        }, 2000);
      } else {
        setTimeout(() => {
          navigation.replace("home");
        }, 2000);
      }
    })();
  }, []);
  return (
    <Box
      flex={1}
      bg={useColorModeValue("#fff", "coolGray.800")}
      alignItems="center"
      justifyContent="center"
    >
      <Hidden colorMode="dark">
        <Image
          source={require("../../assets/man-waiting-car.gif")}
          width={width("90")}
          height={height("40")}
          alt="Image couldnot load"
        />
      </Hidden>
      <Hidden colorMode="light">
        <Image
          source={require("../../assets/man-waiting-car-dark.gif")}
          width={width("90")}
          height={height("40")}
          alt="Image couldnot load"
        />
      </Hidden>
      <Text bold mb={5} color={useColorModeValue("app.green", "#fff")}>
        Share Your Ride
      </Text>
      <ActivityIndicator size={"small"} color="red" />
    </Box>
  );
};

export default SplashScreen;
