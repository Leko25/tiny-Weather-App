var express = require('express');
var path = require('path');
var {geocode, forecast} = require('./utils');
var app = express();

app.use(express.static(path.join(__dirname, "./public")));
app.set('view engine', 'ejs');

app.get("/", (req, res)=>{
  res.render("index", {
    title: "Weather",
    name: "Leko25"
  });
});

app.get("/about", (req, res)=>{
  res.render("about", {
    title: "About Me",
    name: "Leko25"
  });
});

app.get('/weather', (req, res)=>{
  if(!req.query.address){
    res.send({
      err: "address must be provided"
    });
  }else{
    geocode(req.query.address, (err, geoData)=>{
      if(err){
        res.send({ err });
      }else{
        forecast(geoData.latitude, geoData.longitude, (err, forecastData)=>{
          if(err){
            res.send({ err });
          }else{
            res.send({
              forecast: forecastData.body.currently,
              location: geoData.location,
              address: req.query.address
            });
          }
        });
      }
    });
  }
});

app.get("*", (req, res)=>{
  res.render("404", {
    title: "",
    name: ""
  });
});

app.listen(3000, ()=>{
  console.log("Now listening at port 3000");
});
