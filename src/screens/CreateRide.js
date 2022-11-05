import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Center,
  Text,
  Button,
  Input,
  Flex,
  Radio,
  Pressable,
  TextArea,
  IconButton,
} from "native-base";
import { Icon } from "native-base";
import { Alert, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import data from "../utils/timeConverter";
import { usePickup, useDropOff } from "../utils/states/MapState";
import RideModal from "../components/createTrip/SelectRideModal";
import { retrieveUserSession } from "../api/Auth.api";
import { fetcher } from "../api/contant";
import { width } from "../utils/DPtoPixels";

export default function CreateRidescreen({ navigation, route }) {
  const { vehicleId } = route.params;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [isRideModalOpen, setRideModalOpen] = React.useState(false);
  const [noOfSeats, setNoOfSeats] = React.useState(1);
  const [fare, setFare] = React.useState("");
  const [selectedRide, setSelectedRide] = React.useState("not selected");
  const [description, setdescription] = React.useState("");
  const [pickupValue] = usePickup();
  const [dropOffValue] = useDropOff();
  const [selectedDates, setSelectedDates] = useState({
    date: date,
    time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
    timestamp: date.toISOString(),
  });

  React.useEffect(() => {
    console.clear();
    console.log(pickupValue);
  }, []);

  const handleOnPress = () => {
    console.clear();
    if (description.length < 351) {
      if (vehicleId) {
        if (fare.length != 0) {
          (async () => {
            const token = await retrieveUserSession();
            if (token) {
              let formdata = new FormData();
              formdata.append("drop_address", dropOffValue.address);
              formdata.append(
                "drop_city",
                dropOffValue.city.replace("City", "").trim()
              );
              formdata.append("drop_latitude", dropOffValue.latitude);
              formdata.append("drop_longitude", dropOffValue.longitude);
              formdata.append("pick_address", pickupValue.address);
              formdata.append(
                "pick_city",
                pickupValue.city.replace("City", "").trim()
              );
              formdata.append("pick_longitude", pickupValue.longitude);
              formdata.append("pick_latitude", pickupValue.latitude);
              formdata.append("departure_date", selectedDates.timestamp);
              formdata.append("departure_time", selectedDates.time);
              formdata.append("status", "pending");
              formdata.append("noOfSeats", noOfSeats);
              formdata.append("fare", parseFloat(fare));
              formdata.append("vehicle_id", vehicleId);
              formdata.append("description", description);
              fetcher("user/ride/save", {
                method: "POST",
                body: formdata,
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: "application/json",
                },
              })
                .then((res) => {
                  if (res.status) {
                    Alert.alert("Alert", "Trip created SuccessFully");
                    navigation.goBack();
                  }
                })
                .catch((err) => console.warn(err));
            }
          })();
        } else {
          Alert.alert("Error", "Please Enter Fare Amount");
        }
      }
    } else {
      Alert.alert("Error", "description too long");
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    if (mode === "date") {
      setSelectedDates({
        ...selectedDates,
        date: currentDate,
        timestamp: currentDate.toISOString(),
      });
    } else {
      setSelectedDates({
        ...selectedDates,
        time:
          currentDate.getHours() +
          ":" +
          currentDate.getMinutes() +
          ":" +
          currentDate.getSeconds(),
      });
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  React.useEffect(() => {
    setRideModalOpen(false);
  }, [selectedRide]);

  return (
    <Box flex={1} bg="coolGray.50" _dark={{ background: "coolGray.800" }}>
      <AppBar navigation={navigation} />
      {/* Additional Info */}
      <Text ml={4} color="app.green">
        Ride details{" "}
        <Text color="danger.600" bold>
          {" "}
          *Optional
        </Text>
      </Text>
      <Center w="100%" mt={2}>
        <TextArea
          h={20}
          placeholder="write Something About the ride."
          w="85%"
          maxW="300"
          value={description}
          onChangeText={setdescription}
        />
        <Flex
          w="80%"
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
        >
          <Text color="gray.400">Max Words 350</Text>
        </Flex>
      </Center>

      <HStack mt={3} ml={2}>
        <VStack
          w="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text color="app.green" bold>
            No Of Seats Available
          </Text>
          <HStack mt={1} textAlign="center">
            <IconButton
              size={6}
              variant="solid"
              _icon={{
                as: Ionicons,
                name: "add",
              }}
              onPress={() => {
                if (noOfSeats < 6) {
                  setNoOfSeats(noOfSeats + 1);
                }
              }}
            />
            <Text bold ml={2} mr={2} textAlign="center">
              {noOfSeats}
            </Text>
            <IconButton
              size={6}
              variant="solid"
              _icon={{
                as: Ionicons,
                name: "remove",
              }}
              color="#fff"
              onPress={() => {
                if (noOfSeats > 1) {
                  setNoOfSeats(noOfSeats - 1);
                }
              }}
            />
          </HStack>
        </VStack>
        <VStack
          w="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          mb={5}
        >
          <Text color="app.green" bold>
            Fare
          </Text>

          <Input
            mx="3"
            w="50%"
            maxWidth="300px"
            mt={1}
            isRequired
            keyboardType="numeric"
            onChangeText={setFare}
            value={fare}
          />
        </VStack>
      </HStack>

      <VStack h="15%">
        <HStack
          ml={2}
          display={"flex"}
          justifyContent="space-between"
          w="94%"
          p={2}
        >
          <Text bold color="app.green">
            select Date :
          </Text>
          <Text textAlign="center" onPress={showDatepicker}>
            {data.convertTime(selectedDates.date)}
            <FontAwesome
              name="calendar"
              size={24}
              color="black"
              onPress={showDatepicker}
            />
          </Text>
        </HStack>
        <HStack
          mt={2}
          ml={2}
          display={"flex"}
          justifyContent="space-between"
          w="94%"
          p={2}
        >
          <Text bold color="app.green">
            select Time :
          </Text>
          <Text onPress={showTimepicker}>
            {selectedDates.time}
            <Ionicons name="time-outline" size={24} color="black" />
          </Text>
        </HStack>
      </VStack>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Center mt={3} position="absolute" bottom={10} left={"25%"}>
        <Button bg="app.green" w={width("50%")} onPress={handleOnPress}>
          Create Trip
        </Button>
      </Center>
    </Box>
  );
}

const AppBar = ({ navigation }) => {
  return (
    <>
      <Box
        bg="#fff"
        _dark={{
          background: "coolGray.700",
        }}
        shadow={2}
      />
      <HStack
        shadow={2}
        bg="#fff"
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
                as={MaterialIcons}
                name="arrow-back"
                size="lg"
                color="app.green"
                _dark={{
                  color: "coolGray.50",
                }}
              />
            }
            onPress={() => {
              navigation.goBack();
              //   navigation.goBack();
            }}
          />
          <VStack ml={2}>
            <Text
              color="app.green"
              fontSize="16"
              fontWeight="bold"
              m="0"
              _dark={{
                color: "coolGray.50",
              }}
            >
              Create Trip
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </>
  );
};
