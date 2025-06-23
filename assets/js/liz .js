// //Wait until HTML has loaded 
// document.addEventListener("DOMContentLoaded", () => {

//     //   variables for  - search button, text input box, current weather div, hourly weather div, weekly forecast div, main container div for weather animations

//     const searchButton = document.getElementById(search)
//     const inputBox = document.getElementById(input - text)
//     const currentWeather = document.getElementById()
//     const hourlyWeather = document.getElementById()
//     const weeklyForecast = document.getElementById()
//     const weatherAnimations = document.getElementById("rain-container")

//     //open-meteo weather codes:
//     const weatherInfo = {
//         0: { description: "Clear sky", icon: "☀️" },
//         1: { description: "Mainly clear with light cloud", icon: "🌤️" },
//         2: { description: "Partly cloudy", icon: "⛅" },
//         3: { description: "Overcast", icon: "☁️" },
//         45: { description: "Fog", icon: "🌫️" },
//         51: { description: "Light drizzle", icon: "🌦️" },
//         61: { description: "Light rain", icon: "🌧️" },
//         71: { description: "Light snow", icon: "🌨️" },
//         80: { description: "Rain showers", icon: "🌦️" },
//         95: { description: "Thunderstorm", icon: "⛈️" },
//         99: { description: "Heavy thunderstorm", icon: "🌩️" }
//     };
// })

const container = document.getElementById("weather-animations");
let condition = data.weather[0].main.toLowerCase();

function animateWeather() {
    if (condition.includes("rain")) { raindrops };
    if (condition.includes("clouds")) { clouds };
    if (condition.includes("rain")) && (condition.includes(clouds)) { raindrops && clouds };
};

//rain animation 
function raindrops() {
    let drop = document.createElement("div");
    drop.classList.add("raindrop");
    let randomLeft = Math.random() * window.innerWidth;
    drop.style.left = randomLeft + "px";
    //determins the speed of the rain drops - can change this later for different rain types 
    let fallSpeed = 0.5 + Math.random() * 0.5;
    drop.style.animationDuration = fallSpeed + "s";
    container.appendChild(drop); setTimeout(function () {
        container.removeChild(drop);
    }, 1000);
}
//create raindrops every 200 miliseconds - change this for different types of rain in future(is drizzel, showers, heavy rain etc)? 
setInterval(raindrops, 200);

//clouds function 
clouds() {
    let cloud = document.createElement("div");
    cloud.classList.add("cloud");
    let randomTop = Math.random() * window.innerHeight;
    cloud.style.top = randomTop + "px";
    let speed = 20 + Math.random() * 20;
    cloud.style.animationDuration = speed + "s";
    container.appendChild(cloud);
    setTimeout(function () {
        container.removeChild(cloud);
    }, 5000);
} setInterval(clouds, 5000);

let rainTest = document.getElementById("");
let cloudsTest = document.getElementById("")

