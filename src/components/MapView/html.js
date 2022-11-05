const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />
    <script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.css" />
<script src="https://cdn-geoweb.s3.amazonaws.com/esri-leaflet/0.0.1-beta.5/esri-leaflet.js"></script>
<script src="https://cdn-geoweb.s3.amazonaws.com/esri-leaflet-geocoder/0.0.1-beta.5/esri-leaflet-geocoder.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn-geoweb.s3.amazonaws.com/esri-leaflet-geocoder/0.0.1-beta.5/esri-leaflet-geocoder.css">

    
 <style>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    #map { height: 100vh; }
 </style>
</head>
<body>
    <div id="map"></div>




<script>


   class MapView{
    map = null;
    popup = null;
    marker = null;
    defaultCircleConfig = {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.1,
    radius: 500
     } 
    constructor(MapOrigin = [46.386338941059,  -123.538660985981]){
      this.map = L.map('map').setView(MapOrigin, 16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 20, attribution: '© OpenStreetMap',}).addTo(this.map);
      this.popup = L.popup();
    }
    createTwoPoints(pointA , pointB){
      try{
        L.Routing.control({
       waypoints: [
       L.latLng(pointA[0], pointA[1]),
       L.latLng(pointB[0], pointB[1])
     ]
      }).addTo(this.map);
      }catch{
       throw new Error('Illegal Arguments ~ Pass Array')
      }

    }
    createMarker(position = []){
       this.marker = L.marker(position).addTo(this.map);
    }
    createRadius(area , config = this.defaultCircleConfig){
      var circle = L.circle(area , config ).addTo(this.map);
    }

    onClickListener(callback= null , allowPinToMove = false , disablePop = false){
      if(allowPinToMove){
        this.map.on('click', (e)=>{
          if(!disablePop){
        this.popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map here "+e.latlng)
        .openOn(this.map);
          }
        const newPin = []
                  newPin.push(e.latlng.lat)
                  newPin.push(e.latlng.lng)
           this.marker.setLatLng(newPin).update();
        callback(e)
      });
      }else{
      this.map.on('click', (e)=>{
        if(!disablePop){
        this.popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map here "+e.latlng)
        .openOn(this.map);
        }
        callback(e)
      });
    }
    }
    
    addSearchBar(){
      var searchControl = new L.esri.Controls.Geosearch().addTo(this.map);

var results = new L.LayerGroup().addTo(this.map);

searchControl.on('results', function(data){
  results.clearLayers();
  for (var i = data.results.length - 1; i >= 0; i--) {
      // this.marker.setLatLng(newPin).update();
    results.addLayer(L.marker(data.results[i].latlng));
  }
});
    }

    getcurrentLocation(){
      if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
    (position) => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    console.log(pos)
    const newPin = []
                  newPin.push(pos.lat)
                  newPin.push(pos.lng)
    this.marker.setLatLng(newPin).update();
       this.invoke(JSON.stringify(newPin))
   },
   () => {
     alert('Failed To Get Location ')
   }
   );
   } else {
    // Browser doesn't support Geolocation
    alert('doesnt support Geolocation')
     }
    }
   }



  //  let mymap = new MapView([24.8990162, 67.0308583]);
  //   mymap.createMarker([45, 34])
  //   mymap.getcurrentLocation();
  //   mymap.onClickListener(null, true , true);
  //   mymap.createRadius([24.8990162, 67.0308583])
  //   mymap.addSearchBar()
  //  mymap.createTwoPoints([24.8990162, 67.0308583] , [24.91044082078436, 67.0280646532774 ])




</script>


</body>
</html>`

export default html