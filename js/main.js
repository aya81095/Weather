async function getWeather(city) {
  var response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=1db71c537acc46c9953225259251311&q=${city}&days=3&aqi=no&alerts=no`
  );
  var data = await response.json();
  console.log(data);
  displayWeather(data);
}

navigator.geolocation.getCurrentPosition(
  function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    console.log(lat, lon);
    getWeather(`${lat},${lon}`);
  },
  function (error) {
    console.log("Error in getting location: " + error.message);
    getWeather("cairo");
  }
);

// 3) search
document.querySelector(".search-btn").addEventListener("click", function () {
  const city = document.querySelector(".search-input").value;
  getWeather(city);
});

// display weather
function displayWeather(data) {
  console.log(data);

  // TODAY CARD
  const today = data.forecast.forecastday[0];
  const dateObj = new Date(today.date);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.getElementById("day-name").textContent = days[dateObj.getDay()];
  document.getElementById("day-date").textContent = `${dateObj.getDate()} ${
    months[dateObj.getMonth()]
  }`;

  document.getElementById("current-location").textContent = data.location.name;
  console.log(data.location.name);

  document.getElementById("main-temp").textContent = data.current.temp_c + "°C";

  document.getElementById("current-weather-status").textContent =
    data.current.condition.text;

  document.getElementById("current-icon").src =
    "https:" + data.current.condition.icon;

  document.getElementById("fa-tint").textContent = data.current.humidity + "%";
  document.getElementById("fa-wind").textContent =
    data.current.wind_kph + " km/h";
  document.getElementById("fa-compass").textContent = data.current.wind_dir;

  // SECOND DAY (Tomorrow)
  const t2 = data.forecast.forecastday[1];
  const d2 = new Date(t2.date);

  document.getElementById("second-day-name").textContent = days[d2.getDay()];

  document.getElementById("second-day-temp").textContent =
    t2.day.maxtemp_c + "°C";

  document.getElementById("second-day-range").textContent =
    t2.day.mintemp_c + "°";

  document.getElementById("second-day-status").textContent =
    t2.day.condition.text;

  document.getElementById("second-day-icon").src =
    "https:" + t2.day.condition.icon;

  // THIRD DAY
  const t3 = data.forecast.forecastday[2];
  const d3 = new Date(t3.date);

  document.getElementById("third-day-name").textContent = days[d3.getDay()];

  document.getElementById("third-day-temp").textContent =
    t3.day.maxtemp_c + "°C";

  document.getElementById("third-day-range").textContent =
    t3.day.mintemp_c + "°";

  document.getElementById("third-day-status").textContent =
    t3.day.condition.text;

  document.getElementById("third-day-icon").src =
    "https:" + t3.day.condition.icon;
}
