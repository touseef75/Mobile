import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet  , ActivityIndicator , Text} from 'react-native';
import Constants from 'expo-constants';
import html from './html'
import maptype from './maptype'
export default function MapView(props) {
  const [isLoaded , setLoaded] = React.useState(false)
  const {  userOrigin , userDestination = null , type , onResponse , raw =null  } = props
 var jsCode= maptype(type , { current : userOrigin,destination : userDestination , raw })
  return (<>
    {!isLoaded ? <><Text>Map is Loading..</Text><ActivityIndicator size='large' /></> : null}
    <WebView
       onLoad={()=>setLoaded(true)}
      style={styles.container}
      originWhitelist={['*']}
      source={{ html: html }}
       injectedJavaScript={jsCode}
       javaScriptEnabledAndroid={true}
       androidHardwareAccelerationDisabled 
      cacheEnabled={true}
        onMessage={(event) => {
          onResponse(( JSON.parse(event.nativeEvent.data) || []))
        }}
    />
  </>
  );
}

var code= `

    let mymap = new MapView([24.8990162, 67.0308583]);
     mymap.createMarker([24.8990162, 67.0308583])
  //   mymap.onClickListener(null , true , true);
  //   mymap.createRadius([24.8990162, 67.0308583])
  //  mymap.createTwoPoints([24.8990162, 67.0308583] , [24.91044082078436, 67.0280646532774 ])
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
