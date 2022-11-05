import * as React from "react";
import { Box, Text, ScrollView } from "native-base";
import RideCard from "./RideCard";
import { retrieveUserSession } from "../../../../../api/Auth.api";
import { fetcher } from "../../../../../api/contant";
import { RefreshControl } from "react-native";
const RidesOffered = (props) => {
  const [myOfferedRides, setOfferdRides] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const token = await retrieveUserSession();
      if (token) {
        fetcher("user/rideOffered", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
          .then((res) => {
            if (res.status) {
              setOfferdRides(res.data.data);
            }
          })
          .catch((err) => console.warn(err));
      }
    })();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    (async () => {
      const token = await retrieveUserSession();
      if (token) {
        fetcher("user/rideOffered", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
          .then((res) => {
            setRefreshing(false);
            if (res.status) {
              setOfferdRides(res.data.data);
            }
          })
          .catch((err) => {
            console.warn(err);
            setRefreshing(false);
          });
      }
    })();
  }, []);
  return (
    <Box
      flex={1}
      bg={"#fff"}
      _dark={{
        background: "coolGray.800",
      }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {myOfferedRides.map((ride, index) => (
          <RideCard
            navigation={props.route.nav}
            ride={ride}
            key={index.toString()}
          />
        ))}
      </ScrollView>
    </Box>
  );
};

export default RidesOffered;
