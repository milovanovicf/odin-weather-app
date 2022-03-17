const search = document.querySelector("#search");
const submit = document.querySelector("#submit");
const img = document.querySelector(".icon");
const toggle = document.querySelector(".toggle");
const dispalyCity = document.querySelector(".display-city");
const temperature = document.querySelector(".temperature");
const weather = document.querySelector(".weather");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const form = document.querySelector(".form");

const state = {
  city: "",
  unit: "metric",
};

async function getWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/find?q=${state.city}&appid=f0c7d477002d6ff15e949932dd86e947&units=${state.unit}
        `,
    { mode: "cors" }
  );
  return await response.json();
}

toggle.addEventListener("click", function (e) {
  e.preventDefault();
  toggle.classList.toggle("toggle-on");
  const weatherData = getWeather();
  weatherData.then(function (response) {
    const data = response.list[0];
    if (toggle.innerText === "°C") {
      toggle.innerText = "°F";
      temperature.innerText = `${celciusToF(Math.floor(data.main.temp))} °F`;
    } else {
      toggle.innerText = "°C";
      temperature.innerText = `${Math.floor(data.main.temp)} °C`;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  state.city = search.value;
  const weatherData = getWeather();
  weatherData.then(function (response) {
    const data = response.list[0];
    dispalyCity.innerText = `Weather in ${data.name}`;
    temperature.innerText = `${Math.floor(data.main.temp)} °C`;
    weather.innerText = `${data.weather[0].description.toUpperCase()}`;
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    humidity.innerText = `Humidity: ${data.main.humidity} %`;
    wind.innerText = `Wind speed: ${data.wind.speed}km/h`;
  });
});

const celciusToF = (temp) => Math.round(temp * (9 / 5) + 32);
