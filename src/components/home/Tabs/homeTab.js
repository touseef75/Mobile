import * as React from "react";
import { RefreshControl } from "react-native";
import { Box, Text, Fab, Icon } from "native-base";
import TripCard from "./HomeTabComponents/TripCard";
import MyListView from "../../RecyclerComponents/MyListView";
import * as Location from "expo-location";
import getAddress from "../../../utils/ReverseGeoCoding";
import { fetcher } from "../../../api/contant";
import { retrieveUserSession } from "../../../api/Auth.api";
const HomeTab = ({ extraData }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [rides, setRides] = React.useState([]);

  React.useEffect(() => {
    load();
    return;
  }, []);

  async function load() {
    const token = await retrieveUserSession();
    if (token) {
      fetcher("rides", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
        .then((res) => {
          if (res.status) {
            setRides([]);
            if (res.data.total > 0) {
              res.data.data.map((ride) => {
                setRides((r) => {
                  return [...r, ride];
                });
              });
            }
          }
        })
        .catch((err) => console.warn(err));
    }
  }

  return (
    <Box
      flex={1}
      bg="coolGray.50"
      _dark={{
        background: "coolGray.800",
      }}
    >
      <MyListView
        data={rides}
        component={(type, value) => (
          <TripCard navigation={extraData} data={value} />
        )}
        refreshControl={{
          refreshControl: (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                load();
                setTimeout(() => setRefreshing(false), 2000);
              }}
            />
          ),
        }}
      />
    </Box>
  );
};

export default HomeTab;
