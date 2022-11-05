import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function MapCurrent(props) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: props.latlng.latitude,
          longitude: props.latlng.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={{
          latitude: props.latlng.latitude,
          longitude: props.latlng.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        key={"AIzaSyB2HyNTBm1sQJYJkwOOUA1LXRHAKh4gmjU"}
      >
        <Marker
          coordinate={{
            latitude: props.latlng.latitude,
            longitude: props.latlng.longitude,
          }}
          pinColor="black"
          draggable={true}
          onDragEnd={(e) => {
            props.setLatLng(e.nativeEvent.coordinate);
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
