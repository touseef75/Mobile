import React from "react";
import { VStack, Icon, Input, Heading, Center, Box } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import TripCard from "../components/home/Tabs/HomeTabComponents/TripCard";
import { RefreshControl } from "react-native";
import MyListView from "../components/RecyclerComponents/MyListView";
import { retrieveUserSession } from "../api/Auth.api";
import { fetcher } from "../api/contant";
// import {trips} from '../api/data'

export default function SearchScreen({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [searchResult, setsearchresult] = React.useState([]);
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const ac_token = await retrieveUserSession();
      if (ac_token) setToken(ac_token);
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
      <SearchBar
        onChange={(query) => {
          if (query.length > 4) {
            let formdata = new FormData();
            formdata.append("sQuery", query);
            fetcher("ride/search", {
              method: "POST",
              body: formdata,
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            })
              .then((res) => setsearchresult(res.data.data))
              .catch((err) => console.warn(err));
          }
        }}
      />

      <MyListView
        data={searchResult}
        component={(type, value) => (
          <TripCard navigation={navigation} data={value} />
        )}
        refreshControl={{
          refreshControl: (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                setTimeout(() => setRefreshing(false), 3000);
              }}
            />
          ),
        }}
      />
    </Box>
  );
}

function SearchBar({ onChange }) {
  return (
    <Center w="100%" mt={1}>
      <VStack w="90%" space={5} alignSelf="center">
        <Input
          placeholder="Search Ride by location"
          width="100%"
          borderRadius="4"
          py="3"
          px="1"
          fontSize="14"
          onChangeText={(val) => onChange(val)}
          InputRightElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
        />
      </VStack>
    </Center>
  );
}
