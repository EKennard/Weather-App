//Wait until HTML has loaded 
document.addEventListener("DOMContentLoaded", () => {

    //   variables for  - search button, text input box, current weather div, hourly weather div, weekly forecast div, main container div for weather animations

    const searchButton = document.getElementById(search)
    const inputBox = document.getElementById(input - text)
    const currentWeather = document.getElementById()
    const hourlyWeather = document.getElementById()
    const weeklyForecast = document.getElementById()
    const weatherAnimations = document.getElementById("rain-container")

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
})