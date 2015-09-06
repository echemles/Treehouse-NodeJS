var http = require("http");

//Print out weather
function printWeather(city, temperature) {
  var weatherReport = city + " is currently at " + Math.round((temperature-273)*(9/5)+32) + "°F";
  console.log(weatherReport);
}

//Print out error messages
function printError(error){
    console.error(error);
}

function get(zipcode){
  //Connect to the API URL (http://api.openweathermap.org/data/2.5/weather?zip=....)
  var request = http.get("http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us", function(response){
    var body = "";
    //Read the data
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function(){
      var weather = JSON.parse(body);
      if(weather.cod !== '404') {
        try {
          //Parse the data
          //Print the data
          printWeather(weather.name, weather.main.temp);
        } catch(error) {
          //Parse Error
          printError(error);
        }
      } else {
        //Status Code Error
        printError(weather.message);
      }
    });
  });
  //Connection Error
  request.on("error", printError);
}

module.exports.get = get;