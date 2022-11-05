import * as React from "react";
import { View, StyleSheet, Dimensions, StatusBar, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import RidesOffered from "./RidesOfferred/RidesOffered";
import RidesTaken from "./RidesTaken/RidesTaken";

const initialLayout = { width: Dimensions.get("window").width };

const renderScene = SceneMap({
  first: RidesTaken,
  second: RidesOffered,
});
const renderTabBar = (props) => (
  <TabBar
    {...props}
    activeColor={"#000"}
    inactiveColor={"grey"}
    style={{ backgroundColor: "#fff" }}
  />
);

export default function TabViews({ nav }) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Rides Taken", nav: nav },
    { key: "second", title: "Rides Offered", nav: nav },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      style={{
        flex: 1,
        height: "100%",
      }}
    />
  );
}
