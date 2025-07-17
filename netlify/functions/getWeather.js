const fetch = require('node-fetch');

exports.handler = async function(event) {
  const city = event.queryStringParameters.city;
  const apiKey = "e0291e4b2d2433ea115a0043fb292109";

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const [current, forecast] = await Promise.all([
      fetch(currentWeatherUrl).then(res => res.json()),
      fetch(forecastUrl).then(res => res.json())
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({ current, forecast })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch weather" })
    };
  }
};
