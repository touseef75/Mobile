import {Dimensions, PixelRatio} from 'react-native';

const width = percent => {
  const screenWidth = Dimensions.get('window').width;
  const elemWidth = parseFloat(percent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const height = percent => {
  const screenHeight = Dimensions.get('window').height;
  const elemWidth = parseFloat(percent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemWidth) / 100);
};

export {width, height};