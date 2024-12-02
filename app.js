document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "aaab2c18ffcc42b4ad960108240212";
    const cityInput = document.getElementById("cityInput");
    const getWeatherBtn = document.getElementById("getWeather");
    const weatherContainer = document.getElementById("weatherContainer");

    const cityNameEl = document.getElementById("cityName");
    const weatherDescriptionEl = document.getElementById("weatherDescription");
    const weatherIconEl = document.getElementById("weatherIcon");
    const temperatureEl = document.getElementById("temperature");
    const humidityEl = document.getElementById("humidity");

    async function fetchWeather(city) {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Shahar topilmadi!");
            const data = await response.json();

            displayWeather(data);
        } catch (error) {
            alert(error.message);
        }
    }

    function displayWeather(data) {
        const { name } = data.location;
        const { temp_c, humidity, condition } = data.current;

        cityNameEl.textContent = name;
        weatherDescriptionEl.textContent = condition.text;
        weatherIconEl.src = `https:${condition.icon}`;
        temperatureEl.textContent = `Harorat: ${temp_c}°C`;
        humidityEl.textContent = `Namlik: ${humidity}%`;

        weatherContainer.classList.remove("hidden");
    }

    getWeatherBtn.addEventListener("click", () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            alert("Iltimos, shahar nomini kiriting!");
        }
    });
});
