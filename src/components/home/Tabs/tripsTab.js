import * as React from "react";
import { RefreshControl, Dimensions, View } from "react-native";
import { Box, Text, Fab, Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import TabViews from "./TripsTabComponent/TabView";
const TripsTab = ({ extraData }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  return (
    <Box
      flex={1}
      bg="coolGray.50"
      _dark={{
        background: "coolGray.800",
      }}
    >
      <TabViews nav={extraData} />
    </Box>
  );
};

export default TripsTab;
