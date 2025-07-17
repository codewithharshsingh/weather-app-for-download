function getWeather() {
  const city = document.getElementById("city").value;
  const loader = document.getElementById("loader");
  const weatherIcon = document.getElementById("weather-icon");

  if (!city) {
    alert("Please enter a city");
    return;
  }

  loader.style.display = "block";
  weatherIcon.style.display = "none";

  fetch(`/.netlify/functions/getWeather?city=${city}`)
    .then((res) => {
      if (!res.ok) throw new Error("City not found.");
      return res.json();
    })
    .then((data) => {
      document.getElementById("temp-div").innerHTML = `<p>${Math.round(
        data.current.main.temp
      )}°C</p>`;
      document.getElementById(
        "weather-info"
      ).innerHTML = `<strong>${data.current.name}</strong><br>${data.current.weather[0].description}`;
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`;
      weatherIcon.style.display = "block";
      loader.style.display = "none";

      const hourlyDiv = document.getElementById("hourly-forecast");
      hourlyDiv.innerHTML = "";

      data.forecast.list.slice(0, 5).forEach((item) => {
        const hour = new Date(item.dt_txt)
          .getHours()
          .toString()
          .padStart(2, "0");
        const temp = Math.round(item.main.temp);
        const icon = item.weather[0].icon;

        const itemHTML = `
          <div class="hourly-item">
            <p>${hour}:00</p>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">
            <p>${temp}°C</p>
          </div>
        `;
        hourlyDiv.innerHTML += itemHTML;
      });
    })
    .catch((err) => {
      alert("Error fetching weather.");
      console.error(err);
      loader.style.display = "none";
    });
}
