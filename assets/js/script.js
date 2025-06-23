// Your OpenWeatherMap API key
const apiKey = 'e7d1f1b7c7046afd50a140282e07d35c';

// Get references to elements in HTML
const searchButton = document.getElementById('search');
const inputText = document.getElementById('input-text');

// Elements to show current weather
const weatherInfo = document.getElementById('weather-info');
const locationEl = document.getElementById('location');
const iconEl = document.getElementById('weather-icon');
const tempEl = document.getElementById('temperature');
const feelsLikeEl = document.getElementById('feels-like');
const weatherEl = document.getElementById('weather');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind-speed');

// Element for forecast data
const forecastInfo = document.getElementById('forecast-info');

// Trigger on click
searchButton.addEventListener('click', () => {
    const city = inputText.value.trim();
    if (city) {
        fetchWeatherData(city);
        fetchForecastData(city);
    }
});

// Trigger on Enter key
inputText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = inputText.value.trim();
        if (city) {
            fetchWeatherData(city);
            fetchForecastData(city);
        }
    }
});

// Fetch current weather
async function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            alert('City not found!');
            return;
        }
        const data = await response.json();
        displayWeatherData(data);
        setTheme(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Fetch 5-day forecast
async function fetchForecastData(city) {
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
        console.error('Forecast fetch error:', error);
    }
}

// Show current weather
function displayWeatherData(data) {
    weatherInfo.style.display = 'block';

    locationEl.textContent = `Weather for ${data.name}, ${data.sys.country}`;
    iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    iconEl.alt = data.weather[0].description;
    iconEl.style.display = 'block';

    tempEl.textContent = `Temperature: ${data.main.temp}°C`;
    feelsLikeEl.textContent = `Feels Like: ${data.main.feels_like}°C`;
    weatherEl.textContent = `Weather: ${data.weather[0].main} (${data.weather[0].description})`;
    humidityEl.textContent = `Humidity: ${data.main.humidity}%`;
    windEl.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

// Show 5-day forecast in a carousel
function displayForecastData(data) {
    forecastInfo.style.display = 'block';

    let shownDays = {};
    let daysCount = 0;
    let carouselItems = '';

    for (let i = 0; i < data.list.length && daysCount < 5; i++) {
        const forecast = data.list[i];
        const date = forecast.dt_txt.split(' ')[0];
        if (!shownDays[date]) {
            shownDays[date] = true;
            daysCount++;

            const isActive = daysCount === 1 ? 'active' : '';
            carouselItems += `
                <div class="carousel-item ${isActive}">
                    <div class="d-flex flex-column align-items-center forecast-card p-3">
                        <h3>${date}</h3>
                        <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="${forecast.weather[0].description}" class="mb-2" style="width: 60px;">
                        <p>${forecast.main.temp}°C</p>
                        <p>${forecast.weather[0].main} (${forecast.weather[0].description})</p>
                    </div>
                </div>
            `;
        }
    }

    forecastInfo.innerHTML = `
        <h2 class="text-center mb-4">5-Day Forecast</h2>
        <div id="forecastCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                ${carouselItems}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#forecastCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#forecastCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    `;
}

// Theme adjustment for day/night
function setTheme(data) {
    const now = Math.floor(Date.now() / 1000);
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    const isDay = now > sunrise && now < sunset;

    if (isDay) {
        document.documentElement.style.setProperty("--bg-color", "#48cae4");
        document.documentElement.style.setProperty("--font-color", "#23221f");
    } else {
        document.documentElement.style.setProperty("--bg-color", "#03045e");
        document.documentElement.style.setProperty("--font-color", "#ade8f4");
    }
}