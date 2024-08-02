let userInput = document.getElementById("userInput");
let weatherIcon = document.getElementById("weatherImg");
let weatherTemp = document.getElementById("temp");
let weatherText = document.getElementById("weather-condition");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("wind-speed");
async function getWeather(userInput) {
  weatherTemp.innerHTML = 0 + "<sup>°C</sup>";
  humidity.innerHTML = 0 + "%";
  windSpeed.innerHTML = 0 + "km/h";
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=1945e1ddc0a14cdb81c91454240807&q=${userInput}&aqi=no`
    );
    let data = await response.json();
    console.log(data);
    if (data.error && data.error.code == 1006) {
      weatherText.innerHTML = "Oops! Location not found!";
      weatherIcon.src = "images/notFound.png";
      return;
    }
    if (data.current) {
      weatherIcon.src = data.current.condition.icon;
      weatherTemp.innerHTML = `${data.current.temp_c}<sup>°C</sup>`;
      weatherText.innerHTML = data.current.condition.text;
      humidity.innerHTML = `${data.current.humidity}%`;
      windSpeed.innerHTML = `${data.current.wind_mph}km/h`;
    } else {
      weatherText.innerHTML = "Unable to retrieve weather data";
    }
    switch (data.current.condition.text) {
      case "Clear":
        weatherIcon.src = "Images/clear.png";
        break;
      case "Cloud":
        weatherIcon.src = "Images/cloud.png";
        break;
      case "Mist":
        weatherIcon.src = "Images/mist.png";
        break;
      case "Rain":
        weatherIcon.src = "Images/rain.png";
        break;
      case "Snow":
        weatherIcon.src = "Images/snow.png";
        break;
      default:
        weatherIcon.src = data.current.condition.icon;
        break;
    }
  } catch (error) {
    console.log("ERR", error);
  }
}

document.getElementById("button").addEventListener("click", function () {
  getWeather(userInput.value);
  if (userInput.value == "") {
    alert("Please enter a city name");
  }
});

userInput.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    getWeather(userInput.value);
    if (userInput.value == "") {
      alert("Please enter a city name");
    }
  }
});
