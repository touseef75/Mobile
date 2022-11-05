import * as React from "react";
import { Box, Text } from "native-base";
import RideCard from "./RideCard";
import { fetcher } from "../../../../../api/contant";
import { retrieveUserSession } from "../../../../../api/Auth.api";
const RidesTaken = ({ route }) => {
  const [rideHistory, setRideHistory] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const token = await retrieveUserSession();
      if (token) {
        fetcher("user/ride/history", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
          .then((res) => {
            console.log(res);
            if (res.status) {
              setRideHistory(res.data);
            }
          })
          .catch((err) => console.warn(err));
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
      {rideHistory.map((e) => (
        <RideCard ride={e} navigation={route.nav} />
      ))}
    </Box>
  );
};

export default RidesTaken;
