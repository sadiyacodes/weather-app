import React, { useState } from 'react';
import './WeatherApp.css';
import axios from 'axios';

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {

  let api_key = "55155086e050280319a1dd92a42ed7e3";

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const [wicon, setWicon] = useState(cloud_icon);

  const [showDataContainer, setShowDataContainer] = useState(false);
  
  const searchLocation = () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`;
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
      setLocation('');
      updateWeatherIcon(response.data.weather[0].icon);
      setShowDataContainer(true);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      // Handle the error here, such as showing an error message to the user
      alert('Unable to fetch weather data. Please enter a valid location.');
  });
  };

  const updateWeatherIcon = (icon) => {
    switch (icon) {
      case "01d":
      case "01n":
        setWicon(clear_icon);
        break;
      case "02d":
      case "02n": setWicon(cloud_icon);
      break;
      case "03d":
      case "03n":
      case "04n":
      case "04d":
        setWicon(drizzle_icon);
        break;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        setWicon(rain_icon);
        break;
      case "13d":
      case "13n":
        setWicon(snow_icon);
        break;
      default:
        setWicon(cloud_icon);
    }
  };

  return (
    <div className='container'>

      <div className="top-bar">
        <input
          placeholder='Enter Location'
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        <div className='search-icon' onClick={searchLocation}>
          <img src={search_icon} alt="search icon" />
        </div>
      </div>

      <div className='weather-info'>
        <div className='weather-image'>
          <img src={wicon} alt="weather icon" />
        </div>
        <div className='weather-temp'>
          {data.main ? <p >{Math.floor(data.main.temp)}°C</p> : null}
        </div>
        <div className='weather-location'>
        {data.name ? <p>{data.name}</p> : null}
      </div>
      </div>

      
      
      <div className='data-container' style={{ display: showDataContainer ? 'flex' : 'none' }}>

        <div className='element'>
          <img src={humidity_icon} alt="humidity icon" className='icon' />
          <div className='text'>
              {data.main ? <p>{data.main.humidity}%</p> : null}
            Humidity
          </div>
        </div>

        <div className='element'>
          <img src={wind_icon} alt="wind icon" className='icon' />
          <div className='text'>
              {data.wind ? <p>{Math.floor(data.wind.speed)} km/h</p> : null}
               Wind Speed
          </div> 
        </div>

      </div>


    </div>
  );
};

export default WeatherApp;
