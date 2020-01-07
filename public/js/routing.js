//
// fetch('http://127.0.0.1:3000/weather?address=Lubbock').then((response)=>{
//   response.json().then((data)=>{
//     if(data.error){
//       console.log(data.error);
//     }else{
//       console.log(data.forecast);
//       console.log(data.location);
//       console.log(data.address);
//     }
//   });
// });

var weatherForm = document.querySelector('form');
var searchElement = document.querySelector('input');
var displayLocation = document.getElementById('forecast-alert1');
var displayForecast = document.getElementById('forecast-alerts2');
weatherForm.addEventListener('submit', (e)=>{
  e.preventDefault();

  displayLocation.textContent = "Loading...";
  displayLocation.setAttribute('style', 'color: gold; font-weight: 700;');
  displayForecast.textContent = '';
  fetch('/weather?address=' + encodeURIComponent(searchElement.value)).then((response)=>{
    response.json().then((data)=>{
      if(data.err){
        displayLocation.setAttribute('style', 'color: red');
        displayLocation.innerHTML = data.err;
      }else{
        displayLocation.removeAttribute('style');
        console.log(data);
        displayLocation.textContent = data.location;
        displayForecast.textContent = "" + data.forecast.summary + ". It is currently " + data.forecast.temperature + " degress out. There is a " + (data.forecast.precipProbability * 100) + "% chance of rain.";
      }
    })
  });
});
