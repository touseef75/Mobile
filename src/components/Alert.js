import * as React from 'react';

import {
  Alert,
  VStack,
  HStack,
  Text,
  CloseIcon,
  IconButton,
  Box,
  Slide
} from 'native-base';

export default function MyAlert({ status }) {
  return (
    <Slide in={2000} placement="bottom">
    <Box  alignSelf={'center'} m={5} mr={5}>
      <Alert w="90%" status={status.status} m={2}>
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} justifyContent="space-between">
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt="1" />
              <Text fontSize="md" color="coolGray.800">
                {status.title}
              </Text>
            </HStack>
            <IconButton
              variant="unstyled"
              _focus={{
                borderWidth: 0,
              }}
            />
          </HStack>
        </VStack>
      </Alert>
    </Box>
    </Slide>
  );
}
