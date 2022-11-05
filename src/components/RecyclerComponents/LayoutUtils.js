import { LayoutProvider } from 'recyclerlistview';
import { Dimensions } from 'react-native';

export class LayoutUtil {
  static getWindowWidth() {
    // To deal with precision issues on android
    return Math.round(Dimensions.get('window').width * 1000) / 1000 - 6; //Adjustment for margin given to RLV;
  }
  static getLayoutProvider() {
    return new LayoutProvider(
      () => {

        return 'card';
      },
      (type, dim) => {
        switch (type) {
          case 'card':
            dim.width = LayoutUtil.getWindowWidth();
            dim.height = 180;
            break;
            case 'item': // not in use currntly
            dim.width = LayoutUtil.getWindowWidth();
            dim.height = 200;
            break;
          default:
            dim.width = 0;
            dim.heigh = 0;
        }
      }
    );  
  }
}




