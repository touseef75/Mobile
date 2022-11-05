import { atom, useRecoilState } from "recoil";

const pickup = atom({
  key: "address", // unique ID (with respect to other atoms/selectors)
  default: {
    latitude: 0,
    longitude: 0,
    address: "no Address Found",
    name: "no Address Found",
  }, // default value (aka initial value)
});

function useAddress() {
  const [text, setText] = useRecoilState(pickup);
  return [text, setText];
}

export { useAddress };
