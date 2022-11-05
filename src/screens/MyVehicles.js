import React from "react";
import { Box, ScrollView, Icon, Fab } from "native-base";
import VehicleCard from "../components/MyVehicle/VehicleCard";
import { AntDesign } from "@expo/vector-icons";
import { retrieveUserSession } from "../api/Auth.api";
import { fetcher } from "../api/contant";
import { RefreshControl } from "react-native";
export default function MyVehicle({ navigation }) {
  const [MyVehicles, setMyVehicles] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
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
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
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
            setRefreshing(false);
            if (res.status) {
              setMyVehicles(res.data);
            }
          })
          .catch((err) => {
            setRefreshing(false);
            console.warn(err);
          });
      }
    })();
  }, []);
  return (
    <Box
      flex={1}
      bg={"coolGray.50"}
      _dark={{
        background: "coolGray.800",
      }}
    >
      <ScrollView
        bg={"coolGray.50"}
        _dark={{
          background: "coolGray.800",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {MyVehicles.map((vehicle, index) => (
          <VehicleCard vehicle={vehicle} key={index.toString()} />
        ))}
      </ScrollView>
      <Fab
        renderInPortal={false}
        shadow={2}
        size="lg"
        bg="app.green"
        _pressed={{
          background: "emerald.400",
        }}
        onPress={() => navigation.navigate("addvehicle")}
        icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
      />
    </Box>
  );
}
