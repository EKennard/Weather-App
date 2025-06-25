const apiKey = 'e7d1f1b7c7046afd50a140282e07d35c';

// Get references to elements in HTML
const searchButton = document.getElementById('search');
const inputText = document.getElementById('input-text');
const container = document.getElementById("weather-animations");

// When user clicks the search button
searchButton.addEventListener('click', () => {
    clearAnimations();
    const city = inputText.value.trim();
    if (city) {
        fetchWeatherData(city);
        fetchForecastData(city);
    }
});

// Fetch current weather
async function fetchWeatherData(city) {
    const unit = isCelsius ? 'metric' : 'imperial';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${unit}`;
        try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            alert('City not found!');
            return;
        }
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Weather fetch error:', error);
    }
}

// Fetch 5-day / 3-hour forecast
async function fetchForecastData(city) {
    const unit = isCelsius ? 'metric' : 'imperial';
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${unit}`;
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

// Display current weather
function displayWeatherData(data) {
    const dt = data.dt;
    const localTime = new Date((dt + data.timezone) * 1000).toLocaleTimeString(undefined, { timeZoneName: "short" });
    const localDate = new Date((dt + data.timezone) * 1000).toLocaleDateString(undefined, {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
    });

    const now = Math.floor(Date.now() / 1000);
    const nowLocal = now + data.timezone;
    const isDaytime = nowLocal > data.sys.sunrise && nowLocal < data.sys.sunset;

    document.body.style.transition = "background-color 0.6s ease";
    document.body.style.backgroundColor = isDaytime ? "#48cae4" : "#03045e";
    document.documentElement.style.setProperty("--font-color", isDaytime ? "#23221f" : "#ade8f4");

    const weatherInfo = document.getElementById('weather-info');
    const locationEl = document.getElementById('location');
    const iconEl = document.getElementById('weather-icon');
    const tempEl = document.getElementById('temperature');
    const feelsLikeEl = document.getElementById('feels-like');
    const weatherEl = document.getElementById('weather');
    const humidityEl = document.getElementById('humidity');
    const windEl = document.getElementById('wind-speed');

    weatherInfo.style.display = 'block';
    locationEl.textContent = `Weather for ${data.name}, ${data.sys.country}`;
    iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    iconEl.alt = data.weather[0].description;
    iconEl.style.display = 'block';

    const unitSymbol = isCelsius ? '°C' : '°F';
    tempEl.textContent = `Temperature: ${data.main.temp}${unitSymbol}`;
    feelsLikeEl.textContent = `Feels Like: ${data.main.feels_like}${unitSymbol}`;
    weatherEl.textContent = `Weather: ${data.weather[0].main} (${data.weather[0].description})`;
    humidityEl.textContent = `Humidity: ${data.main.humidity}%`;
    windEl.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    animateWeather(data.weather[0].main.toLowerCase());
}

// Display forecast
function displayForecastData(data) {
    const forecastInfo = document.getElementById('forecast-info');
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
                        <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                             alt="${forecast.weather[0].description}" class="mb-2" style="width: 60px;">
                             <p>${forecast.main.temp}${isCelsius ? '°C' : '°F'}</p>
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

// Animation control
let rainInterval;
let cloudInterval;

function animateWeather(condition) {
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
    const drops = container.querySelectorAll('.raindrop');
    const clouds = container.querySelectorAll('.cloud');
    drops.forEach(drop => drop.remove());
    clouds.forEach(cloud => cloud.remove());
}

function raindrops() {
    let drop = document.createElement("div");
    drop.classList.add("raindrop");
    drop.style.left = Math.random() * window.innerWidth + "px";
    drop.style.animationDuration = (0.5 + Math.random() * 0.5) + "s";
    container.appendChild(drop);
    setTimeout(() => container.removeChild(drop), 1000);
}

function clouds() {
    let cloud = document.createElement("div");
    cloud.classList.add("cloud");
    cloud.style.left = "-200px", "10000";
    cloud.style.top = Math.random() * window.innerHeight + "px";
    cloud.style.animationDuration = (20 + Math.random() * 20) + "s";
    container.appendChild(cloud);
    setTimeout(() => container.removeChild(cloud), 50000);
}
let isCelsius = true; 

const toggleButton = document.getElementById('unit-toggle');
toggleButton.addEventListener('click', () => {
    isCelsius = !isCelsius;
    toggleButton.textContent = isCelsius ? 'Switch to °F' : 'Switch to °C';

    const city = inputText.value.trim();
    if (city) {
        fetchWeatherData(city);
        fetchForecastData(city);
    }
});