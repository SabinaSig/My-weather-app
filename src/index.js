//Current date and time
function currentDate(timestamp) {
  let date = new Date(timestamp);
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentDay = days[date.getDay()];
  return ` ${currentDay}, ${currentHour}:${currentMinutes} `;
}
let now = new Date();
let h2 = document.querySelector("h2");
h2.innerHTML = currentDate(now);

function submitCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-input");
  console.log(searchCity.value);
  let searchedCity = document.querySelector(".currentCity");
  searchedCity.innerHTML = `${searchCity.value}`;
  search(searchCity.value);
  let h3 = document.querySelector("h3");
  h3.innerHTML = `Forecast for next hours in ${searchCity.value}`;
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", submitCity);

//Change degrees
function convertCelsius(event) {
  event.preventDefault();
  let tempretureElement = document.querySelector("#currentTemperature");
  let tempreture = tempretureElement.innerHTML;
  tempretureElement.innerHTML = Math.round(((tempreture - 32) * 5) / 9);
  let showDegree = document.querySelector("#degree");
  showDegree.innerHTML = "°C";
}

function convertFahrenheit(event) {
  event.preventDefault();
  let tempretureElement = document.querySelector("#currentTemperature");
  let tempreture = tempretureElement.innerHTML;
  tempretureElement.innerHTML = Math.round((tempreture * 9) / 5 + 32);
  let showDegree = document.querySelector("#degree");
  showDegree.innerHTML = "°F";
}

let celsuius = document.querySelector("#celsius");
celsuius.addEventListener("click", convertCelsius);

let fahrenheit = document.querySelector("#farenheit");
fahrenheit.addEventListener("click", convertFahrenheit);

//weather API
function search(city) {
  let apiKey = "572e5efa40a6e4f550d450618c4881bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let iconElement = document.querySelector("#icon");

function showWeather(response) {
  document.querySelector(".currentCity").innerHTML = response.data.name;
  document.querySelector("#currentTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".currentState").innerHTML =
    response.data.weather[0].main;
  document.querySelector(" #pressure ").innerHTML = response.data.main.pressure;
  document.querySelector(" #humidity ").innerHTML = response.data.main.humidity;
  document.querySelector(" #wind ").innerHTML = response.data.wind.speed;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
//Current location
function searchLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "572e5efa40a6e4f550d450618c4881bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  console.log(apiUrl);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Forecast

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentHour} : ${currentMinutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `

    <div class="col-2" id = "hourForecast"> 
    <br> 
      <p id = "nextHours">
       ${formatHours(forecast.dt * 1000)}
      </p>
      <img id = "forecastIcon"
      src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" /> 
      <div class="weather-forecast-temperature">
        <strong> 
          ${Math.round(forecast.main.temp_max)}°C
        </strong> 
        <br> 
        <br>
        <br> 
      </div>`;
  }
}
