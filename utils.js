var request = require('request');

var geocode = (address, callback)=>{
  var geoURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibGVrbzI1IiwiYSI6ImNrNHY1Zjd5ODN3dDgza25zeTlmMjZnNnoifQ.yXbx9taDmxIdidAXLIOUvQ";
  request({url: geoURL, json: true}, (err, res)=>{
    if(err){
      callback("Unable to connect to location services", undefined);
    }else if(res.body.features.length == 0){
      callback("Unable to find location. Try another search", undefined);
    }else{
      callback(undefined, {
        latitude: res.body.features[0].center[1],
        longitude: res.body.features[0].center[0],
        location: res.body.features[0].place_name
      })
    }
  });
};

var forecast = (latitude, longitude, callback)=>{
  var forecastURL = "https://api.darksky.net/forecast/bf8b449b178161f39ea18280a0479b07/" + latitude + "," + longitude;
  request({url: forecastURL, json: true}, (err, res)=>{
    if(err){
      callback("Unable to connect to weather services", undefined);
    }else if(res.body.error){
      callback(res.body.error, undefined);
    }else{
      callback(undefined, res);
    }
  });
};

module.exports = {
  geocode: geocode,
  forecast: forecast
};
