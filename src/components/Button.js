import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
export default function Button({ children, onPress , borderRadius , bg }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7CDB8A',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 1,
      height: 5,
    },
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});
