import React from "react";
import { Box, Text, Center, Button } from "native-base";
import MapCurrent from "../components/mapscreen/mapcurrent";
import SearchBar from "../components/mapscreen/searchbox";
import * as Location from "expo-location";
import getAddress from "../utils/ReverseGeoCoding";
import { usePickup, useDropOff } from "../utils/states/MapState";

export default function MapScreen(props) {
  const [latlng, setLatLng] = React.useState({
    latitude: 24.8990162,
    longitude: 67.0308583,
  });
  const [completeAddress, setcompleteAddress] = React.useState(undefined);

  const [pickupValue, setPickupValue] = usePickup();
  const [dropOffValue, setDropOffValue] = useDropOff();

  const { typeKey } = props.route.params;

  const checkPermission = async () => {
    const hasPermission = await Location.requestForegroundPermissionsAsync();
    if (hasPermission.status === "granted") {
      const permission = await askPermission();
      return permission;
    }
    return true;
  };

  const askPermission = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    return permission.status === "granted";
  };

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const response = await Location.getCurrentPositionAsync();
      const {
        coords: { latitude, longitude },
      } = response;
      setLatLng({ latitude: latitude, longitude: longitude });
    } catch (err) {}
  };
  React.useEffect(() => {
    checkPermission();
    getLocation();
  }, []);
  const fetchData = async () => {
    const data = await getAddress(latlng.latitude, latlng.longitude);
    if (data.status) {
      let add = data.results[0].formatted_address;
      let value = add.split(",");
      let count = value.length;
      let country = value[count - 1];
      let state = value[count - 2];
      let city = value[count - 3];
      console.clear();
      setcompleteAddress({
        latitude: data.results[0].geometry.location.lat,
        longitude: data.results[0].geometry.location.lng,
        address: data.results[0].formatted_address,
        name: data.results[0].formatted_address,
        city: city,
      });
    }
  };
  React.useEffect(() => {
    fetchData();
    if (typeKey == "pickup") {
      setPickupValue(completeAddress);
    } else {
      setDropOffValue(completeAddress);
    }
  }, [latlng]);

  return (
    <Box flex={1}>
      <Center
        w="100%"
        zIndex={2}
        position="absolute"
        top="0"
        opacity={0.7}
        p={1}
      >
        <Text
          w="80%"
          bg="#fff"
          p={2}
          _dark={{
            color: "coolGray.700",
          }}
        >
          {completeAddress && completeAddress.name}
        </Text>
      </Center>
      <Box w="100%" zIndex={2} position="absolute" top="10">
        <SearchBar
          onSearch={(e) => {
            setcompleteAddress(e);
            setLatLng({ latitude: e.latitude, longitude: e.longitude });
          }}
        />
      </Box>
      <Box position="relative">
        <MapCurrent latlng={latlng} setLatLng={setLatLng} />
      </Box>
      <Center w="100%" zIndex={2} position="absolute" bottom="10">
        <Button
          bg="app.green"
          w="80%"
          onPress={() => {
            props.navigation.goBack();
            if (typeKey == "pickup") {
              setPickupValue(completeAddress);
            } else {
              setDropOffValue(completeAddress);
            }
          }}
        >
          Selected
        </Button>
      </Center>
    </Box>
  );
}
