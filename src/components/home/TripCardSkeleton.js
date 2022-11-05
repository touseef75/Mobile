import React from "react";
import { Skeleton, VStack, Center, NativeBaseProvider ,  Box, HStack, Text, Avatar , Pressable  } from "native-base";
import { AntDesign } from '@expo/vector-icons';
const TripCardSkeleton = () => {
  return    <Center w="100%" h="180" >
      <Box w="90%" bg="coolGray.50" h="160" borderRadius={5} shadow={2}
      _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} 
      >
        <HStack>
          <VStack ml={2} mt={3} w="70%" h="auto">
            <Skeleton w='60' h='4' />
            <Skeleton w='90%' h='4' mt={1} rounded='full' />
          </VStack>
          <VStack w="30%" mt={3} h="auto">
           <Skeleton w='60' h='4' />
             <Skeleton w='60' h='4' mt={1} rounded='full' />
          </VStack>
        </HStack>
        <HStack>
          <VStack ml={2} mt={1} w="70%" h="auto">
              <Skeleton w='50%' h='4' />
           <Skeleton w='70%' h='4' mt={1} rounded='full' />
          </VStack>
          <VStack w="30%" h="auto">
             <Skeleton w='60' h='4' mt={1} />
             <Skeleton w='60' h='4' mt={1} rounded='full' />
          </VStack>
        </HStack>
        <HStack>
          <HStack ml={2} mt={1} w="70%" h="auto">
            <Center>
             <Skeleton borderWidth={1} borderColor="coolGray.200" endColor="warmGray.50" size="50px" rounded="full" />
              
            </Center>
            <VStack ml={2}>
              <Skeleton w='80%' h='4' mt={1} />
              <HStack mt={1}>
              <AntDesign name="star" size={20} color="gray" />
              <AntDesign name="star" size={20} color="gray" />
              <AntDesign name="star" size={20} color="gray" />
              <AntDesign name="staro" size={20} color="gray" />
              <AntDesign name="staro" size={20} color="gray" />
              </HStack>
            </VStack>
          </HStack>
          <Center w="30%" h="auto">
              <Skeleton w='60%' h='4' mt={1} />
          </Center>
        </HStack>
      </Box>
    </Center>;
};

export default TripCardSkeleton

    