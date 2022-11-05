import React from 'react';
import {extendTheme } from "native-base";
import { NativeBaseProvider, ColorMode , themeTools } from 'native-base';
import  { StorageManager } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

  
  export default ({ children }) => {
    const colorModeManager = {
      get: async () => {
        try {
          let val = await AsyncStorage.getItem('@my-app-color-mode');
          return val === 'dark' ? 'dark' : 'light';
        } catch (e) {
          console.log(e);
          return 'light';
        }
      },
      set: async (value) => {
        try {
          await AsyncStorage.setItem('@my-app-color-mode', value);
        } catch (e) {
          console.log(e);
        }
      },
    };
    const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#E3F2F9',
        100: '#C5E4F3',
        200: '#A2D4EC',
        300: '#7AC1E4',
        400: '#47A9DA',
        500: '#0088CC',
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#003F5E',
      },
      app : {
             green : '#38b000'
      },
      // Redefinig only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
  });
    return (
      <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
         {children}
      </NativeBaseProvider>
    );
  };




