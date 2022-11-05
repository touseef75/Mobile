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

import { Icon, Box, useColorModeValue, Spinner } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import AppBar from "../components/Chatscreen/Appbar";
import Message from "../components/Chatscreen/Message";
import { retrieveUserSession } from "../api/Auth.api";
import { fetcher } from "../api/contant";
import firebase from "../api/firebase";
import fcmSend from "../api/fcm";

export default function ChatScreen({ navigation, route }) {
  const { name, avatar, userId } = route.params;

  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: null,
  });
  const [isLoading, setLoading] = React.useState(true);
  const [messages, setMessages] = useState([]);
  const [tokens, setTokens] = React.useState([]);
  const [inputMessage, setInputMessage] = useState("");

  function getTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  function sendMessage() {
    if (inputMessage === "") {
      return setInputMessage("");
    }
    let t = getTime(new Date());
    const key = firebase.getKey();
    firebase.db("pchat/" + userId + "/" + currentUser.id + "/" + key).set({
      senderId: currentUser.id,
      senderName: currentUser.name,
      recieverName: name,
      recieverId: userId,
      message: inputMessage,
      time: t,
      key,
    });
    firebase.db("pchat/" + currentUser.id + "/" + userId + "/" + key).set({
      senderId: currentUser.id,
      senderName: currentUser.name,
      recieverName: name,
      recieverId: userId,
      message: inputMessage,
      time: t,
      key,
    });
    firebase.db("chatlist/" + userId + "/" + currentUser.id).set({
      senderId: currentUser.id,
      senderName: currentUser.name,
      recieverName: name,
      recieverId: userId,
      message: inputMessage,
      time: t,
    });
    firebase.db("chatlist/" + currentUser.id + "/" + userId).set({
      senderId: currentUser.id,
      senderName: currentUser.name,
      recieverName: name,
      recieverId: userId,
      message: inputMessage,
      time: t,
    });
    tokens.forEach((item) =>
      fcmSend(currentUser.name, inputMessage, item.token)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    );

    setInputMessage("");
  }

  React.useEffect(() => {
    (async () => {
      const token = await retrieveUserSession();
      if (token) {
        fetcher("user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
          .then((res) => {
            setCurrentUser({
              id: res.id,
              name: res.username,
            });
          })
          .catch((err) => {
            Alert.alert(
              "Error",
              "Failed To Get Current User details...\nTry App reload"
            );
            console.log(err);
          });
      }
    })();
  }, []);

  React.useEffect(() => {
    if (currentUser.id && messages.length <= 0) {
      console.log("runned");
      setLoading(false);
      firebase.on("pchat/" + currentUser.id + "/" + userId + "/", (snap) => {
        setLoading(false);
        setMessages((item) => {
          return [...item, snap.val()];
        });
      });
      (async () => {
        const token = await retrieveUserSession();
        if (token) {
          let formdata = new FormData();
          formdata.append("user_id", userId);
          fetcher("user/token", {
            method: "POST",
            body: formdata,
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          })
            .then((res) => setTokens(res.data))
            .catch((err) => console.warn(err));
        }
      })();
    }
  }, [currentUser]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Box
        bg="#f2f2ff"
        flex={1}
        _dark={{
          backgroundColor: "coolGray.800",
        }}
      >
        <AppBar navigation={navigation} name={name} avatar={avatar} />
        {isLoading && <Spinner />}
        <FlatList
          style={{
            backgroundColor: useColorModeValue("#f2f2ff", "coolGray.800"),
          }}
          keyExtractor={(item, index) => index.toString()}
          inverted={true}
          data={JSON.parse(JSON.stringify(messages)).reverse()}
          renderItem={({ item }) => (
            <Message item={item} key={item.key} user={currentUser.id} />
          )}
        />

        <View style={{ paddingVertical: 10 }}>
          <View style={styles.messageInputView}>
            <TextInput
              defaultValue={inputMessage}
              style={styles.messageInput}
              placeholder="Message"
              onChangeText={(text) => setInputMessage(text)}
              onSubmitEditing={() => {
                sendMessage();
              }}
            />
            <TouchableOpacity
              style={styles.messageSendView}
              onPress={() => {
                if (inputMessage.length > 0) {
                  sendMessage();
                }
              }}
            >
              <Icon
                as={MaterialIcons}
                name="send"
                size="lg"
                color={inputMessage.length > 0 ? "#000" : "coolGray.300"}
                _dark={{
                  color:
                    inputMessage.length > 0 ? "coolGray.600" : "coolGray.300",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Box>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  messageInputView: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 14,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  messageInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  messageSendView: {
    paddingHorizontal: 10,
    justifyContent: "center",
  },
});
