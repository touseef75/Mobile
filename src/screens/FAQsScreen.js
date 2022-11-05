import React from 'react';
import { Box, Text, Center , Divider  , Heading} from 'native-base';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';

export default function FaqsScreen() {
  return (
    <Box flex={1} bg={'#fff'} _dark={{
      background : 'coolGray.800'
    }}>
    <Center w='100%' bg='app.green'p={5} roundedBottomRight={40} roundedBottomLeft={40}>
    <Heading color='#fff' >FAQs</Heading>
    </Center>
      <Center mt={4}>
        <Accordian 
        question='Is My Data Secure With Ride&Share'
        answer='Yes,We here At Ride&Share Respect Our Users Privacy'
        />
        <Accordian 
        question='I want to report a trip'
        answer='Go Trip click three dots on top right . There you will find report options '
        />
        <Accordian 
        question='I want to delete my Account'
        answer='You cannot , Once an Acoount is been created cannot be deleted '
        />
        <Accordian 
        question='I forgot my password'
        answer='Go to Login Page , CLick on forgot Password'
        />
      </Center>
    </Box>
  );
}

const Accordian = ({ question, answer }) => {
  return (
    <Box w="90%" bg="app.green" borderRadius={6} mt={3} p={3}>
      <Collapse>
        <CollapseHeader>
          <Box>
            <Text
              color='#fff'
              bold
              fontSize={20}
              _dark={{
                color: '#fff',
              }}>
              {question}
            </Text>
          </Box>
        </CollapseHeader>
        <CollapseBody>
        <Divider bg='coolGray.50' />
          <Text
          color='coolGray.50'
            _dark={{
              color: 'coolGray.50',
            }}>
             {answer}
          </Text>
        </CollapseBody>
      </Collapse>
    </Box>
  );
};
