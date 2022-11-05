import React, { useState, useRef } from "react";
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import PhoneInput from "react-native-phone-number-input";
import firebase from "../../api/firebase";
import * as data from "firebase";
import {
  Heading,
  Box,
  Text,
  useColorModeValue,
  Input,
  HStack,
  Spinner,
  useColorMode,
} from "native-base";
import { width, height } from "../../utils/DPtoPixels";
import Ionicons from "@expo/vector-icons/Ionicons";
import MyAlert from "../../components/Alert";
import Button from "../../components/Button";
import { login } from "../../api/Auth.api";

const SignInScreen = ({ navigation }) => {
  const [isLoading, setLoading] = React.useState(false);
  const [value, setValue] = useState("");
  const [show, setShow] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [user, setUser] = React.useState({
    password: "",
  });
  const phoneInput = useRef(null);
  const [message, showMessage] = React.useState(undefined);
  const firebaseConfig = firebase.fb().apps.length
    ? firebase.fb().app().options
    : undefined;

  async function registerUser() {
    const isPhoneNoValid = phoneInput.current?.isValidNumber(value);
    if (!isPhoneNoValid) {
      showMessage(msgtype("phoneinvalid"));
    } else if (formattedValue.length <= 0 || user.password.length <= 0) {
      showMessage(msgtype("emptyfield"));
    } else if (user.password.length < 6) {
      showMessage(msgtype("passwordinvalid"));
    } else {
      showMessage(undefined);
      setLoading(true);
      login(
        {
          phoneNo: formattedValue,
          password: user.password,
        },
        (res) => {
          setLoading(false);
          if (res?.isRegisterd) {
            navigation.replace("home");
            showMessage(undefined);
          } else {
            setLoading(false);
            console.log(res.data);
            showMessage(
              res.data === "Unauthorized"
                ? "failed to login.\nMake Sure your phoneNo and Password are correct."
                : res?.data
            );
          }
        }
      );
    }
  }

  return (
    <>
      <Box flex={1} bg={useColorModeValue("#fff", "coolGray.800")}>
        {message && (
          <MyAlert
            status={{
              status: "error",
              title: message,
            }}
          />
        )}
        <SafeAreaView style={styles.wrapper}>
          <Box
            height={height("35")}
            width={width("100")}
            ml={10}
            justifyContent="center"
          >
            <Heading textAlign="left" size="2xl">
              Welcome!
            </Heading>
            <Text color={useColorModeValue("coolGray.400", "coolGray.50")}>
              Sigin to continue
            </Text>
          </Box>

          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="PK"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            countryPickerProps={{ withAlphaFilter: true }}
            countryPickerButtonStyle={styles.inputflag}
            containerStyle={{
              borderRadius: 6,
            }}
          />
          <Input
            mx="3"
            size="md"
            value={user.password}
            onChangeText={(e) =>
              setUser({
                ...user,
                password: e,
              })
            }
            type={show ? "text" : "password"}
            InputRightElement={
              <Ionicons
                name={show ? "eye" : "eye-off-outline"}
                size={22}
                color={useColorModeValue("black", "white")}
                onPress={() => setShow(!show)}
              />
            }
            placeholder="Enter Your Passsword"
            w="80%"
            mt={5}
          />
          {isLoading ? (
            <Spinner />
          ) : (
            <Button onPress={registerUser}>Sign In</Button>
          )}

          <HStack mt={5}>
            <Text>don't Have An Account</Text>
            <Text
              ml={5}
              bold
              color="app.green"
              onPress={() => navigation.navigate("register")}
            >
              SignUp
            </Text>
          </HStack>
        </SafeAreaView>
      </Box>
    </>
  );
};

const msgtype = (type) => {
  switch (type) {
    case "phoneinvalid":
      return "Your Phone Number Is Invalid , Please Enter Correct Phone Number";
      break;
    case "emptyfield":
      return "Please Fill Out all the Fields";
    case "usernameinvalid":
      return "Username Should Be of Atleast 6characters";
    case "passwordinvalid":
      return "Password Should Be of Atleast 6characters";
    default:
      return "Unknown Error";
  }
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
  },

  inputflag: {
    backgroundColor: "#fff",
    shadowColor: "rgba(0,0,0,0.4)",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  button: {
    marginTop: 20,
    height: 50,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7CDB8A",
    shadowColor: "rgba(0,0,0,0.4)",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 14,
  },

  status: {
    padding: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    color: "gray",
  },
});

export default SignInScreen;
