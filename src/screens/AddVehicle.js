import React from "react";
import {
  Box,
  Center,
  Image,
  Input,
  Text,
  Button,
  FormControl,
  VStack,
  Radio,
  Pressable,
  Icon,
} from "native-base";
import { Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { retrieveUserSession } from "../api/Auth.api";
import { fetcher } from "../api/contant";

export default function AddVehicle({ navigation }) {
  const [groupValue, setGroupValue] = React.useState("car");
  const [color, setcolor] = React.useState("");
  const [model, setModel] = React.useState("");
  const [no, setNo] = React.useState("");

  const handleOnPress = () => {
    console.log("hello");
    if (model.length == 0 || model.length < 4) {
      Alert.alert("Alert", "Please enter valid Model ");
      return;
    }

    if (no.length == 0 || no.length < 7) {
      Alert.alert("Alert", "Please enter valid Vehicle Number ");
      return;
    }

    if (color.length == 0 || color.length < 3) {
      Alert.alert("Alert", "Please enter valid Color ");
      return;
    }
    (async () => {
      const token = await retrieveUserSession();
      if (token) {
        let formdata = new FormData();
        formdata.append("type", groupValue);
        formdata.append("no", no);
        formdata.append("color", color);
        formdata.append("image", "https://wallpaperaccess.com/full/317501.jpg");
        formdata.append("model", model);
        fetcher("user/vehicle/save", {
          method: "POST",
          body: formdata,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
          .then((res) => {
            console.log(res);
            if (res.status) {
              Alert.alert("Alert", "Vehicle Details Saved Scuccesfully");
            } else {
              Alert.alert("Alert", "Something Went Wrong . Please try again");
            }
          })
          .catch((err) => console.warn(err));
      }
    })();
  };

  return (
    <Center
      flex={1}
      bg={"coolGray.50"}
      _dark={{
        background: "coolGray.800",
      }}
    >
      <Pressable>
        <Image
          source={{
            uri: "https://wallpaperaccess.com/full/317501.jpg",
          }}
          alt="Alternate Text"
          size="xl"
          rounded="md"
        />
        <Text color="coolGray.300">Select Vehicle Image *</Text>
      </Pressable>

      <Box m={5} mx={3}>
        <VStack w="90%">
          <FormControl.Label
            _text={{
              bold: true,
            }}
            ml={3}
          >
            Vehicle Model
          </FormControl.Label>
          <Input
            mx="3"
            placeholder="vehicle model (eg : 2002)"
            w="100%"
            value={model}
            onChangeText={setModel}
          />
        </VStack>
        <VStack w="90%">
          <FormControl.Label
            _text={{
              bold: true,
            }}
            ml={3}
          >
            Vehicle Number
          </FormControl.Label>
          <Input
            mx="3"
            placeholder="Vehicle number (eg : AJZ-123)"
            w="100%"
            value={no}
            onChangeText={setNo}
          />
        </VStack>
        <VStack w="90%">
          <FormControl.Label
            _text={{
              bold: true,
            }}
            ml={3}
          >
            Vehicle Color
          </FormControl.Label>
          <Input
            mx="3"
            placeholder="Vehicel Color (eg : red)"
            w="100%"
            value={color}
            onChangeText={setcolor}
          />
        </VStack>
        <VStack w="90%">
          <FormControl>
            <FormControl.Label
              _text={{
                fontSize: "lg",
                bold: true,
              }}
            >
              Select Vehicle Type
            </FormControl.Label>
            <Radio.Group
              name="exampleGroup"
              accessibilityLabel="select prize"
              defaultValue={groupValue}
              onChange={(value) => {
                setGroupValue(value || "");
              }}
            >
              <Radio
                value="car"
                my="1"
                icon={<Icon as={<MaterialCommunityIcons name="car" />} />}
              >
                Car
              </Radio>
              <Radio
                value="bike"
                icon={<Icon as={<MaterialCommunityIcons name="bike" />} />}
                my="1"
              >
                Bike
              </Radio>
              <Radio
                value="bus"
                icon={<Icon as={<MaterialCommunityIcons name="bus" />} />}
                my="1"
              >
                Bus
              </Radio>
            </Radio.Group>
          </FormControl>
        </VStack>
      </Box>
      <Button w="200" bg={"app.green"} onPress={handleOnPress}>
        Add Vehicle
      </Button>
    </Center>
  );
}
