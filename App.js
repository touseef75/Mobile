import React from 'react';
import { View, StatusBar, KeyboardAvoidingView, Platform, Text } from 'react-native';
import Route from './route';
import { RecoilRoot } from 'recoil';
import ThemeProvider from './src/utils/theme';
// import { enableLatestRenderer } from 'react-native-maps';



const App = () => {
  // enableLatestRenderer();
  return (

    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }} >
      <View style={{ flex: 1 }} >
        <StatusBar backgroundColor="#000" />
        <RecoilRoot>
          <ThemeProvider>
            <Route />
          </ThemeProvider>
        </RecoilRoot>
      </View>
    </KeyboardAvoidingView>

  );
};

export default App;
