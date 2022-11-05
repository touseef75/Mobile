import React from "react";
import { Box } from "native-base";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Center } from "native-base";
import { RecyclerListView, DataProvider } from "recyclerlistview";
import { LayoutUtil } from "./LayoutUtils";
import TripCardSkeleton from "../home/TripCardSkeleton";

let dataProvider = new DataProvider((r1, r2) => {
  return r1 !== r2;
});

const layoutProvider = LayoutUtil.getLayoutProvider();

const MyListView = (props) => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (props.data.length > 0) {
      setData(props.data);
    }
  });
  dataProvider = dataProvider.cloneWithRows(data);

  const renderSkeleton = () => {
    setTimeout(() => setIsLoading(false), 4000);
    if (isLoading) {
      return (
        <>
          <TripCardSkeleton />
          <TripCardSkeleton />
          <TripCardSkeleton />
          <TripCardSkeleton />
        </>
      );
    } else {
      return (
        <Center m={3}>
          <Text bold>No Rides Available</Text>
        </Center>
      );
    }
  };

  //Only render RLV once you have the data
  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <RecyclerListView
          scrollViewProps={props.refreshControl}
          style={{ flex: 1 }}
          contentContainerStyle={{ margin: 3 }}
          dataProvider={dataProvider}
          layoutProvider={layoutProvider}
          rowRenderer={props.component}
        />
      ) : (
        <ScrollView {...props.refreshControl}>{renderSkeleton()}</ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
  },
});

export default MyListView;
