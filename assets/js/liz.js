const apiKey = 'e7d1f1b7c7046afd50a140282e07d35c';
// Get references to the input and button in your HTML
const searchButton = document.getElementById('search');
const inputText = document.getElementById('bg-toggle');
const container = document.getElementById("weather-animations");

// When the user clicks the search button, get the city and fetch weather
searchButton.addEventListener('click', () => {
    clearAnimations();
    const city = inputText.value;
    if (city) {
        fetchWeatherData(city);
        fetchForecastData(city);
    }
});

// This function fetches current weather data for the city from OpenWeatherMap
async function fetchWeatherData(city) {
    // Build the API URL with the city and your API key

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            alert('City not found!');
            return;
        }
        const data = await response.json();
        displayWeatherData(data);
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// This function fetches 5 day / 3 hour forecast data for the city
async function fetchForecastData(city) {
    // Build the API URL for 5 day / 3 hour forecast
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) {
            alert('Forecast not found!');
            return;
        }
        const data = await response.json();
        displayForecastData(data);
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// async function test() {
//     let data = await fetchWeatherData("Berlin");
//     console.log(data);
//     let dt = data.dt
//     console.log(dt)
//     let timezone = data.timezone * 1000;
//     let dateTime = new Date(dt * 1000 + timezone);
//     console.log(dateTime);
//     console.log(timezone)
//     let formatDate = dateTime.toLocaleDateString()
//     console.log(formatDate);
//     console.log(dateTime.toLocaleTimeString())
// }
// test()

// This function displays the current weather info on the page

function displayWeatherData(data) {

    // date and time with time zone
    let dt = data.dt;
    let timezone = data.timezone * 1000;
    let dateTime = new Date(dt * 1000 + timezone);
    let formatDate = dateTime.toLocaleTimeString(undefined, { timeZoneName: "short" });
    let localTime = dateTime.toLocaleTimeString(undefined, { timeZoneName: "short" });
    let localDate = dateTime.toLocaleDateString(undefined, { weekday: "long", year: "numeric",nmonth: "long", day: "numeric"});
    console.log(localTime);
    console.log(localDate);

    let weatherInfo = document.getElementById('weather-info');
    if (!weatherInfo) {
        weatherInfo = document.createElement('div');
        weatherInfo.id = 'weather-info';
        document.body.appendChild(weatherInfo);
    
    //day/night
    let now = Math.floor(Date.now() / 1000);
    let sunrise = data.sys.sunrise;
    let sunset = data.sys.sunset;
    let isDaytime = (now > sunrise && now < sunset);
    if (isDaytime) {
        document.documentElement.style.setProperty("--bg-color", "var(--light-bg-color)");
        document.documentElement.style.setProperty("--font-color", "var(--dark-font-color)");
    } else {
        document.documentElement.style.setProperty("--bg-color", "var(--dark-bg-color)");
        document.documentElement.style.setProperty("--font-color", "var(--light-font-color)");
    }}

    const container = document.getElementById("weather-animations");
    condition = data.weather[0].main.toLowerCase();
    animateWeather();
    
    weatherInfo.innerHTML = `
        <h2>Weather for ${data.name}, ${data.sys.country}</h2>
        <p><strong>Date:</strong> ${localDate}</p>
        <p><strong>Time:</strong> ${localTime}</p>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].main} (${data.weather[0].description})</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
}

// This function displays the 3-hour and 5-day forecast
function displayForecastData(data) {
    let forecastInfo = document.getElementById('forecast-info');
    if (!forecastInfo) {
        forecastInfo = document.createElement('div');
        forecastInfo.id = 'forecast-info';
        document.body.appendChild(forecastInfo);
    }

    // Show next 5 forecasts (3-hour intervals)
    let forecastHTML = `<h2>3 Hour Forecast</h2>`;
    for (let i = 0; i < 5; i++) {
        const forecast = data.list[i];
        forecastHTML += `
            <div>
                <strong>${forecast.dt_txt}</strong>:
                ${forecast.main.temp}°C,
                ${forecast.weather[0].main} (${forecast.weather[0].description})
            </div>
        `;
    }

    // Show daily forecast (picks one forecast per day)
    forecastHTML += `<h2>5 Day Forecast</h2>`;
    let daysShown = {};
    let daysCount = 0;
    for (let i = 0; i < data.list.length && daysCount < 5; i++) {
        const date = data.list[i].dt_txt.split(' ')[0];
        if (!daysShown[date]) {
            daysShown[date] = true;
            daysCount++;
            forecastHTML += `
                <div>
                    <strong>${date}</strong>:
                    ${data.list[i].main.temp}°C,
                    ${data.list[i].weather[0].main} (${data.list[i].weather[0].description})
                </div>
            `;
        }
    }

    forecastInfo.innerHTML = forecastHTML;
}

let rainInterval;
let cloudInterval;
let condition = "";

function animateWeather() {
    clearAnimations();
    if (condition.includes("rain")) {
        rainInterval = setInterval(raindrops, 200);
    }
    if (condition.includes("cloud")) {
        cloudInterval = setInterval(clouds, 5000);
    }
}

function clearAnimations() {
    clearInterval(rainInterval);
    clearInterval(cloudInterval);
    const raindrops = container.querySelectorAll('.raindrop');
    const clouds = container.querySelectorAll('.cloud');
    raindrops.forEach(drop => drop.remove());
    clouds.forEach(cloud => cloud.remove());
}

function raindrops() {
    let drop = document.createElement("div");
    drop.classList.add("raindrop");
    let randomLeft = Math.random() * window.innerWidth;
    drop.style.left = randomLeft + "px";
    let fallSpeed = 0.5 + Math.random() * 0.5;
    drop.style.animationDuration = fallSpeed + "s";
    container.appendChild(drop);
    setTimeout(function () {
        container.removeChild(drop);
    }, 1000);
};

function clouds() {
    let cloud = document.createElement("div");
    cloud.classList.add("cloud");
    cloud.style.left = "-200px";
    let randomTop = Math.random() * window.innerHeight;
    cloud.style.top = randomTop + "px";
    let speed = 20 + Math.random() * 20;
    cloud.style.animationDuration = speed + "s";
    container.appendChild(cloud);
    setTimeout(function () {
        container.removeChild(cloud);
    }, 50000);
}

animateWeather();

