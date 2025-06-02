const apiKey = 'c72d0b4e96b4afffda1591227a8b9300'; // Replace with your OpenWeather API Key

async function fetchCities(query) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const cities = await response.json();
        
        const datalist = document.getElementById("cityList");
        datalist.innerHTML = ""; // Clear previous options

        cities.forEach(city => {
            const option = document.createElement("option");
            option.value = city.name;
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching cities:", error);
    }
}

document.getElementById("cityInput").addEventListener("input", (event) => {
    fetchCities(event.target.value);
});

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod === 200) {
            document.getElementById("weatherResult").innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
        } else {
            document.getElementById("weatherResult").innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
