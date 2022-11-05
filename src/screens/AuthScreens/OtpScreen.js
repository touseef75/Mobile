import React, { useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Text, Box, useColorModeValue, useToast } from "native-base";
import firebase from "../../api/firebase";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Button from "../../components/Button";
import { register } from "../../api/Auth.api";

const OtpScreen = ({ route, navigation }) => {
  const { phoneNumber, verificationId, user } = route.params;
  const [isloading, setLoading] = useState(false);
  const toast = useToast();

  async function verfiyOtp(code) {
    try {
      setLoading(true);
      const credential = firebase
        .fb()
        .auth.PhoneAuthProvider.credential(verificationId, code);
      await firebase.fb().auth().signInWithCredential(credential);
      console.log({ text: "Phone authentication successful 👍" });

      user.phoneNo = phoneNumber;
      user.isVerify = true;
      register(user, (res) => {
        if (res?.isRegisterd) {
          navigation.replace("home");
        } else {
          // navigation.navigate("home");
          setLoading(false);
          toast.show({
            description: `Error: Failed to Register ${JSON.stringify(
              res?.data
            )}`,
            placement: "top",
          });
        }
      });
    } catch (err) {
      setLoading(false);
      toast.show({
        description: `Error: ${err.message}`,
        placement: "top",
      });
      console.log({ text: `Error: ${err.message}`, color: "red" });
    }
  }

  return (
    <Box style={styles.wrapper} bg={useColorModeValue("#fff", "coolGray.800")}>
      <Text style={styles.prompt}>
        Enter the code to Verfiy Your phone Number
      </Text>
      <Text color="coolGray.400">
        {`We have Sent you a code on Your phoneNo (${phoneNumber}) `}
      </Text>
      <OTPInputView
        style={{ width: "80%", height: 200 }}
        pinCount={6}
        autoFocusOnLoad={false}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={verfiyOtp}
      />
      {isloading ? (
        <ActivityIndicator />
      ) : (
        <Button isloading={isloading}>Verfiy</Button>
      )}
      <Button onPress={() => navigation.replace("splashScreen")}>
        go Back
      </Button>
    </Box>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "black",
    fontSize: 20,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  prompt: {
    fontSize: 22,
    paddingHorizontal: 30,
    textAlign: "center",
  },

  error: {
    color: "red",
  },
});

export default OtpScreen;
