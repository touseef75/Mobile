import React from "react";
import {
  VStack,
  Button,
  FormControl,
  Input,
  NativeBaseProvider,
  Center,
} from "native-base";
import { Alert } from "react-native";
import { retrieveUserSession } from "../api/Auth.api";
import { fetcher } from "../api/contant";

export default function ReportScreen({ navigation }) {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    if (formData.name === undefined) {
      setErrors({ ...errors, email: "Name is required" });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, email: "Email is too short" });
      return false;
    } else if (formData.reason.length < 10) {
      setErrors({ ...errors, reason: "Please enter brief reason" });
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    validate() ? Submit() : console.log("Validation Failed");
  };

  const Submit = async () => {
    const token = await retrieveUserSession();
    if (token) {
      let formdata = new FormData();
      formdata.append("email", formData.name);
      formdata.append("reason", formData.reason);
      fetcher("user/report", {
        method: "POST",
        body: formdata,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
        .then((res) => {
          if (res.status) {
            console.log(res);
            Alert.alert("Alert", "Your report is Submitted.");
            (formData.name = ""), (formData.reason = "");
            navigation.goBack();
          }
        })
        .catch((err) => console.warn(err));
    }
  };

  return (
    <Center
      flex={1}
      _dark={{
        background: "coolGray.800",
      }}
    >
      <VStack width="90%" mx="3" maxW="300px">
        <FormControl isRequired isInvalid={"name" in errors}>
          <FormControl.Label
            _text={{
              bold: true,
            }}
          >
            Email
          </FormControl.Label>
          <Input
            placeholder="example@account.com"
            value={formData?.name}
            onChangeText={(value) => setData({ ...formData, name: value })}
          />
          <FormControl.Label
            _text={{
              bold: true,
            }}
          >
            Reason :
          </FormControl.Label>
          <Input
            placeholder="Enter Report Reason"
            value={formData?.reason}
            onChangeText={(value) => setData({ ...formData, reason: value })}
          />
          {"reason" in errors ? (
            <FormControl.ErrorMessage>{errors.reason}</FormControl.ErrorMessage>
          ) : (
            <FormControl.HelperText>Email too short.</FormControl.HelperText>
          )}
        </FormControl>
        <Button onPress={onSubmit} mt="5" colorScheme="cyan">
          Submit
        </Button>
      </VStack>
    </Center>
  );
}
