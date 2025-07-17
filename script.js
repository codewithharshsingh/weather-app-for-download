function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function getWeather() {
  const city = document.getElementById('city').value;
  const loader = document.getElementById('loader');
  const weatherIcon = document.getElementById('weather-icon');

  if (!city) {
    alert('Please enter a city');
    return;
  }

  loader.style.display = "block";
  weatherIcon.style.display = "none";

  // Call secure Netlify function
  fetch(`/.netlify/functions/getWeather?city=${encodeURIComponent(city)}`)
    .then(response => {
      if (!response.ok) throw new Error("City not found.");
      return response.json();
    })
    .then(data => {
      const weather = data.current;
      const forecast = data.forecast;

      document.getElementById('temp-div').innerHTML = `<p>${Math.round(weather.main.temp)}°C</p>`;
      document.getElementById('weather-info').innerHTML = `<strong>${weather.name}</strong><br>${weather.weather[0].description}`;
      weatherIcon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
      weatherIcon.style.display = "block";
      loader.style.display = "none";

      const hourlyDiv = document.getElementById('hourly-forecast');
      hourlyDiv.innerHTML = "";

      forecast.list.slice(0, 5).forEach(item => {
        const hour = new Date(item.dt_txt).getHours().toString().padStart(2, "0");
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
    .catch(error => {
      alert('Error fetching weather.');
      console.error(error);
      loader.style.display = "none";
    });
}
