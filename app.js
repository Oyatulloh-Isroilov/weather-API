const container = document.querySelector(".container");
const searchButton = document.getElementById("search");
const weatherPlace = document.querySelector(".weatherPlace");
const weatherDetails = document.querySelector(".weatherDetails");
const error404 = document.querySelector(".not-city");
const searchInput = document.querySelector("#searchInp");

const KEY = "29ecc04300a8757eb19260b9f46f5504";

function refresh() {
  window.refresh;
}

searchButton.addEventListener("click", () => {
  alert("Siteni refresh qiling");
  refresh();
  const city = searchInput.value;
  if (!city) {
    return;
  }

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${KEY}`
  )
    .then((data) => data.json())
    .then((jsonData) => {
      localStorage.setItem("cityName", JSON.stringify(jsonData));
    })
    .catch((error) => {
      console.log(error);
    });
});

const cityData = JSON.parse(localStorage.getItem("cityName")) || [];
fetchWeatherData(cityData[0].lat, cityData[0].lon);

function fetchWeatherData(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.cod === "404") {
        container.style.height = "450px";
        weatherPlace.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }
      error404.style.display = "none";
      error404.classList.remove("fadeIn");
      const img = document.querySelector(".weatherPlace img");
      const temp = document.querySelector(".weatherPlace .temp");
      const description = document.querySelector(".weatherPlace .description");
      const humidity = document.querySelector(".weatherDetails .humidity span");

      switch (json.weather[0].main) {
        case "Clear":
          Image.src = "./images/clear.png";
          break;

        case "Rain":
          Image.src = "./images/rain.png";
          break;

        case "Snow":
          Image.src = "./images/snow.png";
          break;

        case "Clouds":
          Image.src = "./images/clouds.jpg";
          break;

        case "Haze":
          Image.src = "./images/haze.jpeg";
          break;

        default:
          Image.src = "";
      }

      temp.innerHTML = `${Math.round(
        parseInt(json.main.temp) - 273.15
      )}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;

      weatherPlace.style.display = "";
      weatherDetails.style.display = "";
      weatherPlace.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    })
    .catch((error) => {
      console.log("Failed to retrieve data", error);
    });
}
