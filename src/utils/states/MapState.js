import React from 'react';
import {
atom,
  useRecoilState,
} from 'recoil';



const pickup = atom({
  key: 'pickup', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

const dropoff = atom({
  key: 'dropOff', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

function usePickup(){
    const [text, setText] = useRecoilState(pickup);
    return [text , setText]
}

function useDropOff(){
    const [text, setText] = useRecoilState(dropoff);
    return [text , setText]
}

export {useDropOff , usePickup}
