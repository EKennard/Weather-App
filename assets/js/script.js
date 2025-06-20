const apiKey = 'e7d1f1b7c7046afd50a140282e07d35c';
// Get references to the input and button in your HTML
const searchButton = document.getElementById('search');
const inputText = document.getElementById('input-text');

// When the user clicks the search button, get the city and fetch weather
searchButton.addEventListener('click', () => {
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
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// This function displays the current weather info on the page
function displayWeatherData(data) {
    let weatherInfo = document.getElementById('weather-info');
    if (!weatherInfo) {
        weatherInfo = document.createElement('div');
        weatherInfo.id = 'weather-info';
        document.body.appendChild(weatherInfo);
    }
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

let rainEffect;
let cloudEffect;

// date and time with time zone
const localTime = new Date().toLocaleTimeString(undefined, { timeZoneName: "short" });
const localDate = new Date().toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });

//day/night
let now = Math.floor(Date.now() / 1000);
let sunrise = data.sys.sunrise;
let sunset = data.sys.sunset;
let isDaytime = (now > sunrise && now < sunset);
if (isDaytime) {
    document.documentElement.style.setProperty("--bg-color", "const(--light-bg-color)");
    document.documentElement.style.setProperty("--font-color", "const(--dark-font-color)");
} else {
    document.documentElement.style.setProperty("--bg-color", "const(--dark-bg-color)");
    document.documentElement.style.setProperty("--font-color", "const(--light-font-color)");
}
