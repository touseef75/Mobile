
const data ={
   videoDuration : function (duration){
                      var _$hour = parseInt((duration) / 3600);
                    if (_$hour<10) { _$hour = "0" + _$hour;}
                    var _$minute = parseInt((duration % 3600) / 60);
                    if (_$minute<10) {_$minute = "0" + _$minute;}
                    var _$second = Math.ceil(duration % 60);
                    if (_$second<10) {_$second = "0" + _$second;}
                    var _$filetime = _$hour + ":" + _$minute + ":" + _$second;
                    return _$filetime;
                },
   convertTime:  function (time){  
                 const d = new Date(time);
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",                        "November", "December"];
                 const output = d.getDate() + '/'+months[d.getMonth()] +'/'+ d.getFullYear()
                  return output;
                   },
   getTimeinMilli: function(){
                   var d = new Date();
                   return  d.getTime();
                         },
   random : function(val) {return Math.floor((Math.random() * val)+1)}   ,       
   durationVideo :  function(milli) {
                           var ms = milli;
                          var d = new Date(1000*Math.round(ms/1000)); // round to nearest second
                                 function padi(i) { return ('0'+i).slice(-2); }
                        var str = d.getUTCHours() + ':' + padi(d.getUTCMinutes()) + ':' + padi(d.getUTCSeconds());
                             return str
                                },   
 getMonthString : month => {
  let string;
  switch (month) {
    case 1:
      string = 'Jan';
      break;
    case 2:
      string = 'Feb';
      break;
    case 3:
      string = 'Mar';
      break;
    case 4:
      string = 'Apr';
      break;
    case 5:
      string = 'May';
      break;
    case 6:
      string = 'Jun';
      break;
    case 7:
      string = 'Jul';
      break;
    case 8:
      string = 'Aug';
      break;
    case 9:
      string = 'Sep';
      break;
    case 10:
      string = 'Oct';
      break;
    case 11:
      string = 'Nov';
      break;
    case 12:
      string = 'Dec';
      break;
    default:
      break;
  }
  return string;
      },
    secondsToHms : (d) =>{
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
}
                                

}
export default data;