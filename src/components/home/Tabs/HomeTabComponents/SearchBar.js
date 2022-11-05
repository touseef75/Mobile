import * as React from 'react';
import { VStack, Icon, Input, Heading  , Center , Pressable} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
export default function SearchBar({navigation}) {
  return (
    <Pressable onPress={()=>navigation.navigate('search')}>
    <Center w='100%' mt={1}>
    <VStack w="90%" space={5} alignSelf="center">
      <Input
        onFocus={()=>navigation.navigate('search')}
        placeholder="Search People & Places"
        width="100%"
        borderRadius="4"
        py="3"
        px="1"
        fontSize="14"
        InputLeftElement={
          <Icon
            m="2"
            ml="3"
            size="6"
            color="gray.400"
            as={<MaterialIcons name="search" />}
          />
        }
        InputRightElement={
          <Icon
            m="2"
            mr="3"
            size="6"
            color="gray.400"
            as={<MaterialIcons name="mic" />}
          />
        }
      />
    </VStack>
 </Center>
 </Pressable>
  );
}
