//import liraries
import React, { Component } from "react";
import StarRating from "react-native-star-rating";
import { Box, Center, Text, Heading, Button, useToast } from "native-base";
import { retrieveUserSession } from "../api/Auth.api";
import { fetcher } from "../api/contant";
// create a component
const RideReportAndRatingScreen = ({ navigation, route }) => {
  const { ride } = route.params;
  const [rating, setRating] = React.useState(4.5);
  const toast = useToast();

  const _handlePress = async () => {
    const token = await retrieveUserSession();
    if (token) {
      let formdata = new FormData();
      formdata.append("ride_id", ride?.id);
      formdata.append("rating", rating);
      fetcher("user/ride/rating/save", {
        method: "POST",
        body: formdata,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
        .then((res) => {
          if (res?.status) {
            toast.show({
              description: res?.data,
              placement: "top",
            });
          }
        })
        .catch((err) => {
          toast.show({
            description: err,
            placement: "top",
          });
        });
    }
  };
  return (
    <Box
      flex={1}
      justifyContent="center"
      _dark={{
        background: "coolGray.800",
      }}
      bg="#fff"
    >
      <Center m={3}>
        <Heading color={"app.green"}>😊 Rate Your Ride</Heading>
      </Center>
      <Center m={3}>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={rating}
          fullStarColor={"#38b000"}
          emptyStarColor={"#38b000"}
          selectedStar={(rating) => setRating(rating)}
        />
      </Center>
      <Center
        position={"absolute"}
        bottom={10}
        display="flex"
        justifyContent={"center"}
        alignItems="center"
        width={"100%"}
      >
        <Button bg={"app.green"} w={"1/2"} onPress={_handlePress}>
          Rate
        </Button>
      </Center>
    </Box>
  );
};

//make this component available to the app
export default RideReportAndRatingScreen;
