import * as React from 'react';
import { Box, HStack, Icon, IconButton, Text , Menu , Pressable } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export default function AppBar({navigation}) {
  return (
    <HStack
      bg="#fff"
      shadow={2}
      px="1"
      py="3"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      _dark={{
          background: 'coolGray.700',
        }}
     
     >
      <HStack alignItems="center">
        <IconButton
          icon={
            <Icon
              size="sm"
              as={MaterialIcons}
              name="arrow-back-ios"
              color="black"
              _dark={{
          color : '#fff'
        }}
        onPress={()=>navigation.goBack()}
            />
          }
        />
        <Text fontSize="20" fontWeight="bold" color='app.green' _dark={{
          color : '#fff'
        }}>
          Ride Detail
        </Text>
      </HStack>
      <HStack mr={3}  p={2}>
       
        <Menu w="190" trigger={triggerProps => {
      return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
          <Icon as={MaterialIcons} name="more-vert" size="sm" color="black" _dark={{
          color : '#fff'
        }} />
            </Pressable>;
    }}>
        <Menu.Item onPress={()=>console.log('share')} >Share</Menu.Item>
        <Menu.Item>Report</Menu.Item>
      </Menu>
      </HStack>
    </HStack>
  );
}
