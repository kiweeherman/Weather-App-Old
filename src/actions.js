// Between here and the next note, the code works to display weekday and time in 12 hr. format with Am/Pm
let currentDay = document.getElementById("date-and-time");

let now = new Date();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function amPm() {
  if (now.getHours < 12) {
    return "AM";
  } else {
    return "PM";
  }
}
let hours = now.getHours() % 12;
if (hours === 0) {
  hours = 12;
}
let mins = now.getMinutes();
if (mins < 10) {
  mins = `0${now.getMinutes()}`;
}
let currentTime = `${hours}:${mins}`;
let currentWeekDay = weekdays[now.getDay()];
console.log(now.getHours());
currentDay.innerHTML = `${currentWeekDay}, ${currentTime} ${amPm()}`;

// From here, the code will work to display the User's city when searched and submitted
let searchButton = document.getElementById("submit-city");
searchButton.addEventListener("click", searchCity);

let userCity = document.getElementById("user-city");

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

// Now let's get into the Weather API

function searchCity(event) {
  event.preventDefault();
  let apiKey = "af198b69f06145dba9541337231206";
  let city = document.getElementById("search-city").value;
  let apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
  let userCity = document.getElementById("user-city");
  if (city === "") {
    userCity.innerHTML = "Tokyo";
  } else {
    userCity.innerHTML = toTitleCase(city);
  }
  return axios.get(apiUrl).then(produceTemp).catch(handleError);
}

function produceTemp(response) {
  let changeTemp = document.querySelector("#current-temperature");
  changeTemp.innerHTML = `${response.data.current.temp_f}° F`;
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

// And lastly, the coding that finds the temperature in the user's current city
let locator = document.getElementById("current-location");

locator.addEventListener("click", showTemp);
function showTemp() {
  navigator.geolocation.getCurrentPosition(showMeTheTemp);
}
function showMeTheTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "af198b69f06145dba9541337231206";
  let apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;
  axios.get(apiUrl).then(displayInformation);
}

function displayInformation(responses) {
  let changeTempTwo = document.querySelector("#current-temperature");
  changeTempTwo.innerHTML = `${responses.data.current.temp_f}° F`;
  let display = document.getElementById("user-city");
  display.innerHTML = `${responses.data.location.name}`;
}
