let now = new Date();
function showDayTime() {
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  let cardTime = document.querySelector("#current-time");
  cardTime.innerHTML = ` ${hours}:${minutes} `;
  let cardDay = document.querySelector("#day-today");
  cardDay.innerHTML = `${day}, ${date} ${month} `;
}
showDayTime(now);

function changeCity(event) {
  event.preventDefault();
  let cityChange = document.querySelector("#search-city");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${cityChange.value}`;
  let apiKey = "76c8b94d63a7e1828617006132974e2d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityChange.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

let submit = document.querySelector("#search-city-form");
submit.addEventListener("submit", changeCity);

function showWeather(response) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${temperature}°C`;
  let precipitation = Math.round(response.data.clouds.all);
  let currentPrecipitation = document.querySelector("#precipitation");
  currentPrecipitation.innerHTML = `Precipitation: ${precipitation}%`;
  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Windspeed: ${wind} km/h`;
  let humidity = Math.round(response.data.main.humidity);
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=76c8b94d63a7e1828617006132974e2d&units=metric`;

  axios.get(locationUrl).then(showWeather);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", currentLocation);
/*function changeCelsius(event) {
  event.preventDefault();
  let celsiusTemperature = document.querySelector("#current-temperature");
  celsiusTemperature.innerHTML = `25°C`;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeCelsius);

function changeFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = document.querySelector("#current-temperature");
  fahrenheitTemperature.innerHTML = `77°F`;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeFahrenheit); */
