import React, { useState, useEffect } from 'react';

const MyCustomWidget = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

    const fetchWeatherData = async () => {
      try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=918c16536dc18efb934e170db77bd8ae`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();

  return (
    <div style={{ minWidth: 400, minHeight:100 }}>
      <div>
         <form onSubmit={handleFormSubmit}>
        <label>
          Latitude:
          <input
            type="text"
            value={latitude}
            onChange={handleLatitudeChange}
          />
        </label>
        <br />
        <label>
          Longitude:
          <input
            type="text"
            value={longitude}
            onChange={handleLongitudeChange}
          />
        </label>
        <br />
        <button type="submit">Get Weather</button>
      </form>
      </div>
      {weatherData && weatherData.name ? (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Conditions: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default MyCustomWidget;