let weatherForm = document.querySelector(".weatherForm");
let cityInput = document.querySelector(".cityInput");
let card = document.querySelector(".card");
let apikey = "2f825fb6c09e7ffd72799a6eaf5b246d";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const Weatherdata = await GetWeatherdata(city);
      displayWeatherInfo(Weatherdata);
    } catch (error) {
      console.error(error);
      errorDisplay(error);
    }
  } else {
    errorDisplay("Please Enter A City");
  }
});

async function GetWeatherdata(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return await response.json();
}
function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.style.display = "flex";
  // const tempF = (((temp - 273.15) * 9) / 5 + 32).toFixed(1); // للتحويل إلى فهرنهايت
  const tempC = (temp - 273.15).toFixed(1); // للتحويل إلى مئوية

  let content = `
   <h1 class="cityDisplay">${city}</h1>
   <p class="tempDisplay">${tempC}°C</p>
   <p class="humidityDisplay">Humidity: ${humidity}%</p>
   <p class="descDisplay">${description}</p>
   <p class="weatherEmoji">${getWeatherEmoji(id)}</p>
   `;

  card.innerHTML = content;
}
function getWeatherEmoji(weatherId) {
  if (weatherId >= 200 && weatherId < 300) {
    return "⛈️"; // عاصفة رعدية
  } else if (weatherId >= 300 && weatherId < 500) {
    return "🌧️"; // رذاذ
  } else if (weatherId >= 500 && weatherId < 600) {
    return "🌦️"; // مطر
  } else if (weatherId >= 600 && weatherId < 700) {
    return "❄️"; // ثلج
  } else if (weatherId >= 700 && weatherId < 800) {
    return "🌫️"; // ضباب
  } else if (weatherId === 800) {
    return "☀️"; // سماء صافية
  } else if (weatherId > 800) {
    return "☁️"; // غيوم
  } else {
    return "❓"; // حالة غير معروفة
  }
}

function errorDisplay(error) {
  let message = `<p class="errorDisplay">${error}</p>`;
  card.innerHTML = message;
}
