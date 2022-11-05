import * as React from "react";
import { Box, Text, ScrollView, Spinner } from "native-base";
import ChatCard from "./ChatListComponent/ChatCard";
import firebase from "../../../api/firebase";
import { retrieveUserSession } from "../../../api/Auth.api";
import { fetcher } from "../../../api/contant";

const ChatListTab = ({ extraData }) => {
  const [chatlist, setChatlist] = React.useState([]);
  const [isloading, setLoading] = React.useState(true);
  const [currentUser, setcurrentUser] = React.useState(null);

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
            setcurrentUser(res.id);
            firebase.on("chatlist/" + res.id, (snap) => {
              setLoading(false);
              console.log(snap);
              setChatlist((item) => {
                return [...item, snap.val()];
              });
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

  return (
    <Box
      flex={1}
      bg="coolGray.50"
      _dark={{
        background: "coolGray.800",
      }}
    >
      <ScrollView>
        {isloading && <Spinner />}
        {chatlist.map((item) => (
          <ChatCard
            navigation={extraData}
            data={item}
            currentUser={currentUser}
          />
        ))}
      </ScrollView>
    </Box>
  );
};

export default ChatListTab;
