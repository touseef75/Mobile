//imTextort liraries
import React, { ComTextonent } from "react";
import { Box, Center, ScrollView, Text, Heading } from "native-base";
import { WebView } from "react-native-webview";
// create a comTextonent
const PrivacyPolicyScreen = () => {
  return (
    <Box flex={1} bg={"coolGray.50"}>
      <WebView
        source={{
          uri: "https://www.privacypolicies.com/live/90480ff0-469e-4797-a220-b3d3fc266e41",
        }}
      />
    </Box>
  );
};

//make this comTextonent available to the aTextText
export default PrivacyPolicyScreen;
