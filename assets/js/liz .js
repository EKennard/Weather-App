//Wait until HTML has loaded 
document.addEventListener("DOMContentLoaded", () => {
    
//   variables for  - search button, text input box, current weather div, hourly weather div, weekly forecast div, main container div for weather animations

const searchButton = document.getElementById(search)
const inputBox = document.getElementById(input-text)
const currentWeather = document.getElementById()
const hourlyWeather = document.getElementById()
const weeklyForecast = document.getElementById()
const weatherAnimations = document.getElementById()

//open-meteo weather codes:
const weatherInfo = {
    0: { description: "Clear sky", icon: "☀️" },
    1: { description: "Mainly clear with light cloud", icon: "🌤️" },
    2: { description: "Partly cloudy", icon: "⛅" },
    3: { description: "Overcast", icon: "☁️" },
    45: { description: "Fog", icon: "🌫️" },
    51: { description: "Light drizzle", icon: "🌦️" },
    61: { description: "Light rain", icon: "🌧️" },
    71: { description: "Light snow", icon: "🌨️" },
    80: { description: "Rain showers", icon: "🌦️" },
    95: { description: "Thunderstorm", icon: "⛈️" },
    99: { description: "Heavy thunderstorm", icon: "🌩️" }
  };

let rainEffect;
let cloudEffect;

//search button on click function = 
//Get the city name from the text input box
//Get the citys coordinates from geocoding api: get a web address for Open-Meteo Geocoding API
//city name to find its latitude and longitude anf "fetch"
//get the latitude and longitude and the name of the city
//get weather forecast by using URL open-meteo api for current weather, hgourly forecast, daily forecast 

//current weather div function
//look up the description and icon for the current weather_code
//get todays date and the users local time
//change background colours based on day/nigh
//show clouds, sun, or rain animations based on the current weather
//shaow all this in html divs
//day/night if else statement?
//Show weather animation
//if else statements for weather codesto show animations 

//sun animation

//Make rain and cloud animation
//makeRaindrop():
//Create a thin white line (the raindrop)
//Put it at a random horizontal spot across the screen
//Let it fall down and then disappear
//makeCloud():
//Create a round white cloud
//Start it offscreen on the left
//Slowly move it across the top of the screen
//Remove it after it finishes floating offscreen

//show hourly forecast (starting from now)
//Clear any old hourly forecast info
//Find the first hourly time that happens after the current time
//Then for the next 6 hours:
//Show the local time (like “2:00 PM”)
//Show the weather emoji
//Show the temperature

//Show weekly forecast
//lear any old weekly forecast info
//For each of the 7 days ahead:
//Get the weekday (like “Tuesday”)
//Show the icon and description
//Show the high and low temperature for that day


})