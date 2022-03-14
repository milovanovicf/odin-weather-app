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

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=f0c7d477002d6ff15e949932dd86e947&units=metric
        `,
      { mode: "cors" }
    );
    return await response.json();
  } catch (e) {
    alert(e);
  }
}

toggle.addEventListener("click", function (e) {
  e.preventDefault();
  toggle.classList.toggle("toggle-on");
  toggle.innerText === "°C"
    ? (toggle.innerText = "°F")
    : (toggle.innerText = "°C");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const weatherData = getWeather(search.value);
  search.value = "";
  weatherData.then(function (response) {
    const data = response.list[0];
    console.log(data);
    dispalyCity.innerText = `Weather in ${data.name}`;
    temperature.innerText = `${data.main.temp} °C`;
    weather.innerText = `${data.weather[0].description.toUpperCase()}`;
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    humidity.innerText = `Humidity: ${data.main.humidity} %`;
    wind.innerText = `Wind speed: ${data.wind.speed}km/h`;
  });
});

// const tempConverter()
