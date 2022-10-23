function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  return `${day} ${hour}:${minutes}`;
}

function showTemperature(res) {
  let cityElement = document.querySelector(".cityName");
  let tempElement = document.querySelector("#temperature");
  let statusElement = document.querySelector(".status");
  let humidityElement = document.querySelector(".humidity");
  let windElement = document.querySelector(".wind");
  let dateElement = document.querySelector(".date");
  let imageElement = document.querySelector("#status-img");
  celciusTemp = res.data.main.temp;
  tempElement.innerHTML = Math.round(celciusTemp);
  cityElement.innerHTML = res.data.name;
  statusElement.innerHTML = res.data.weather[0].description;
  humidityElement.innerHTML = res.data.main.humidity;
  windElement.innerHTML = Math.round(res.data.wind.speed);
  dateElement.innerHTML = formatDate(res.data.dt);
  imageElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
  );
  imageElement.setAttribute("alt", res.data.weather[0].description);
}

//////////////////////////

function searchFor(city) {
  let apiKey = "e450bc345a80a08ada69fd5c714d871d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(e) {
  e.preventDefault();
  let inputCityElement = document.querySelector("#city-input");
  searchFor(inputCityElement.value);
}

let celciusLink = document.querySelector("#celcius");
let fahrenheitLink = document.querySelector("#fahrenheit");

function convertToFahrenheit(e) {
  e.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let fahrenheitTempElement = (celciusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTempElement);
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
}

function convertToCelcius(e) {
  e.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celciusTemp);
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celciusTemp = null;

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

fahrenheitLink.addEventListener("click", convertToFahrenheit);
celciusLink.addEventListener("click", convertToCelcius);

searchFor("Tehran");
