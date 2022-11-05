const maptype= (type , origin)=>{
  try{
  switch(type){
   case 'currentlocation' : 
     return `let mymap = new MapView([${origin.current[0]}, ${origin.current[1]}]);
     mymap.createMarker([${origin.current[0]}, ${origin.current[1]}])
     `
     break;
     case 'LocationPick' : 
     return `let mymap = new MapView([${origin.current[0]}, ${origin.current[1]}]);
     mymap.createMarker([${origin.current[0]}, ${origin.current[1]}])
      //   mymap.addSearchBar();
     mymap.onClickListener((e)=>{
          const newPin = []
                  newPin.push(e.latlng.lat)
                  newPin.push(e.latlng.lng)
     
        window.ReactNativeWebView.postMessage(JSON.stringify(newPin))
     } , true , true);
     `
     break;
     case 'PinWithradius' :
            return `let mymap = new MapView([${origin.current[0]}, ${origin.current[1]}]);
     mymap.createMarker([${origin.current[0]}, ${origin.current[1]}])
     mymap.createRadius([${origin.current[0]}, ${origin.current[1]}])
     `
     break;
     case 'AtoB':
           return `let mymap = new MapView([${origin.current[0]}, ${origin.current[1]}]);
mymap.createTwoPoints([${origin.current[0]}, ${origin.current[1]}] , [${origin.destination[0]}, ${origin.destination[1]}])
     `
     break;
     case 'inject':
     return origin.raw;
     default : 
      return `let mymap = new MapView([${origin.current[0]}, ${origin.current[1]}]);
     mymap.createMarker([${origin.current[0]}, ${origin.current[1]}])
     `
  }
  }catch(e){
    alert('MapLoadError : '+e+'\nMake Sure To Provide userOrigin prop with an array of latitude & Longitude Ex: userOrigin={[24.8990162,67.0308583]} ')
    console.warn('MapLoadError : '+e)
  }
}



const types = {
  currentlocation : 'currentlocation',
  LocationPick : 'LocationPick',
  PinWithradius : 'PinWithradius',
  RouteAtoB : 'AtoB',
  inject : 'inject',
}
export {types}
export default maptype;