//Current date and time
function currentDate(timestamp) {
  let date = new Date(timestamp);
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();
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
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", submitCity);

//weather API
function search(city) {
  let apiKey = "572e5efa40a6e4f550d450618c4881bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}
function showWeather(response) {
  document.querySelector(".currentCity").innerHTML = response.data.name;
  document.querySelector(".currentTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".currentState").innerHTML = response.data.weather[0].main;
}
//Current location
function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "572e5efa40a6e4f550d450618c4881bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  console.log(apiUrl);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
