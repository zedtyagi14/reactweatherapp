import './App.css';
import React, { useState, useEffect, useRef } from 'react';

function App() {

  const inputRef = useRef(null);
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("muzaffarnagar");


  useEffect(() => {
    const fetchApi = async () => {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=17a260c987d60f0ce9d951db739980ca&units=metric`;
      try {
        const response = await fetch(url);
        const resjson = await response.json();
        setCity(resjson);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchApi();
  }, [search])

  const handleClick = () => {
    setSearch(inputRef.current.value);
  }

  return (
    <div className="container">
      <div className="weather">
        <div className="weather-condition">
          {/* <p className='condition'>{city.weather[0].main}</p> */}
        </div>
        <div className="search">
          <input 
          type="search" 
          ref={inputRef} 
          className="search-input" 
          placeholder="Enter City Name"
          />
          <button className="search-icon" onClick={handleClick}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        {!city ? (
          <p className='nodata'>No Data Found</p>
        ) : (
          <div className="weather-data">
            <p>
              <i className="fas fa-street-view"></i>
              <span> {city.name},{city.sys.country}</span>
            </p>
            <p className="temp">
              Temperature : {city.main.temp}°C
            </p>
            <p className="humidity">Humidity : {city.main.humidity}%</p>
            <p className='wind'>Wind Speed : {(city.wind.speed * 3600) / 1000} km/hr</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
