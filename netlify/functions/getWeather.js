const fetch = require("node-fetch");

exports.handler = async function (event) {
  const city = event.queryStringParameters.city;
  const apiKey = "e0291e4b2d2433ea115a0043fb292109"; // Keep this secret

  if (!city) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "City parameter missing" }),
    };
  }

  try {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl),
    ]);

    const current = await currentRes.json();
    const forecast = await forecastRes.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ current, forecast }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch weather data." }),
    };
  }
};
