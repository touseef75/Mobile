import React from 'react'
import {Box , useDisclose , Text , Radio} from 'native-base'
import BottomSheet from '../../utils/BottomSheet'


export default function RideModal({open , selectedValue }){
    const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  React.useEffect(()=>{
    if(open){
      onOpen()
    }
  },[open])
    const [value, setValue] = React.useState("bike");
  return <Box>
   <BottomSheet isOpen={isOpen} onOpen={onOpen} onClose={onClose} >
   <Text m={4} bold color='app.green'>Ride Type</Text>
    <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={value} onChange={nextValue => {
    setValue(nextValue);
    selectedValue(nextValue)
  }}>
      <Radio value="bike" my={1} mt={2}>
        Bike
      </Radio>
      <Radio value="car" my={1} mt={2}>
        Car
      </Radio>
      <Radio value="bus" my={1} mt={2}>
        Bus
      </Radio>
    </Radio.Group>
   </BottomSheet>

  </Box>
}