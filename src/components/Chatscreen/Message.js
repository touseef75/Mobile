import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";

export default function Message({ item, user }) {
  const [currentUser] = useState({
    name: "John Doe",
  });

  return (
    <TouchableWithoutFeedback>
      <View style={{ marginTop: 6 }}>
        <View
          style={{
            maxWidth: Dimensions.get("screen").width * 0.8,
            backgroundColor: "#3a6ee8",
            alignSelf: item.senderId === user ? "flex-end" : "flex-start",
            marginHorizontal: 10,
            padding: 10,
            borderRadius: 8,
            borderBottomLeftRadius: item.senderId === user ? 8 : 0,
            borderBottomRightRadius: item.senderId === user ? 0 : 8,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
            }}
          >
            {item.message}
          </Text>
          <Text
            style={{
              color: "#dfe4ea",
              fontSize: 14,
              alignSelf: "flex-end",
            }}
          >
            {item.time}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
