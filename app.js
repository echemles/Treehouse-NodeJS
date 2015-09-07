var cityWeather = require("./weather");
var cities = process.argv.slice(2);
cities.forEach(cityWeather.get);