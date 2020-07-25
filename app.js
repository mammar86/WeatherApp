const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){

res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){

  const city = req.body.cityName;

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=46911f906cadc2dcfe25045b2f3726ef&units=metric";

  https.get(url, function(response){

    console.log(response);

      response.on("data", function(data){
      const weatherData = JSON.parse(data);

      const weatherDes = weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const iconLink = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";

      res.write("<p>The weather in " + city + " is currently " + weatherDes + "</p>");
      res.write("<h1>The temperature in " + city + " is currently " + temp + " celcius</h1>");
      res.write("<img src="+ iconLink +" >")

      res.send();



    })
  })




})







app.listen(3000, function(){

console.log("Server is running on port 3000");

})
