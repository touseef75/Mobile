import React from "react";
import { Box, HStack, Center, Text, Button, Pressable } from "native-base";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePickup, useDropOff } from "../utils/states/MapState";
import { Select, CheckIcon } from "native-base";
import { retrieveUserSession } from "../api/Auth.api";
import { fetcher } from "../api/contant";
import { width } from "../utils/DPtoPixels";

export default function CreateTripScreen({ navigation }) {
  const [pickupValue] = usePickup();
  const [dropOffValue] = useDropOff();
  const [service, setService] = React.useState(null);
  const [MyVehicles, setMyVehicles] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const access_token = await retrieveUserSession();
      if (access_token) {
        fetcher("user/vehicle", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
          },
        })
          .then((res) => {
            if (res.status) {
              setMyVehicles(res.data);
            }
          })
          .catch((err) => console.warn(err));
      }
    })();
  }, []);

  return (
    <Box flex={1} bg="coolGray.50" _dark={{ background: "coolGray.800" }}>
      {/* Pick Location */}
      <Center mt={4}>
        <Pressable
          bg="#fff"
          shadow={2}
          p={2}
          w="80%"
          borderRadius={4}
          h={"auto"}
          _dark={{
            background: "coolGray.700",
          }}
          display={"flex"}
          justifyContent="space-between"
          onPress={() => navigation.navigate("map", { typeKey: "pickup" })}
        >
          <HStack
            w="100%"
            borderRadius={4}
            h={"auto"}
            _dark={{
              background: "coolGray.700",
            }}
            display={"flex"}
            justifyContent="space-between"
          >
            <Text fontWeight="600" ml={2}>
              {pickupValue ? pickupValue.name : "Pickup Location"}
            </Text>
            <Ionicons name="pin" size={24} color="black" />
          </HStack>
        </Pressable>
      </Center>
      {/* Drop Location */}
      <Center mt={4}>
        <Pressable
          bg="#fff"
          shadow={2}
          p={2}
          w="80%"
          borderRadius={4}
          h={"auto"}
          _dark={{
            background: "coolGray.700",
          }}
          display={"flex"}
          justifyContent="space-between"
          onPress={() => navigation.navigate("map", { typeKey: "dropoff" })}
        >
          <HStack
            w="100%"
            borderRadius={4}
            h={"auto"}
            _dark={{
              background: "coolGray.700",
            }}
            display={"flex"}
            justifyContent="space-between"
          >
            <Text fontWeight="600" ml={2}>
              {dropOffValue ? dropOffValue.name : "Drop Off Location"}
            </Text>
            <Ionicons name="pin" size={24} color="black" />
          </HStack>
        </Pressable>
      </Center>

      {/* Select Ride vehicle */}
      <Box mt={2} ml={2}>
        <Center>
          <Select
            selectedValue={service}
            width={"70%"}
            accessibilityLabel="Choose vehicle"
            placeholder="Choose vehicle"
            _selectedItem={{
              bg: "coolGray.300",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => setService(itemValue)}
          >
            {MyVehicles.length > 0 ? (
              MyVehicles.map((e) => (
                <Select.Item
                  label={"Type : " + e.type + ` | Car No : ${e.no}`}
                  value={e.id}
                  key={e.id.toString()}
                />
              ))
            ) : (
              <Select.Item
                label="Please add Vehicle Under Profile Setting Tab"
                value={null}
              />
            )}
          </Select>
        </Center>
      </Box>

      <Center mt={3} position="absolute" bottom={10} left={"25%"}>
        <Button
          bg="app.green"
          w={width("50%")}
          onPress={() => {
            if (pickupValue?.name != "" || pickupValue?.name.length > 10) {
              if (dropOffValue?.name != "" || dropOffValue?.name.length > 10) {
                if (service != null) {
                  if (pickupValue?.name !== dropOffValue?.name) {
                    navigation.push("createRide", {
                      vehicleId: service,
                    });
                  } else {
                    Alert.alert(
                      "Alert",
                      "Pickup And DropOff address Cannot Be same."
                    );
                  }
                } else {
                  Alert.alert(
                    "Alert",
                    "Please Select a Vehicle. To Add a new Vehicle Please Visit Profile Section From Bottom Right and then go to Setting there will be Myvehicle"
                  );
                }
              } else {
                Alert.alert("Alert", "Please Select DropOff address");
              }
            } else {
              Alert.alert("Alert", "Please Select Pickup address");
            }
          }}
        >
          Next Step
        </Button>
      </Center>
    </Box>
  );
}
