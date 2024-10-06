import React, { useEffect, useState,useRef } from 'react'
import './Weather.css'
import search from '../PNG/search.png';
import snow from '../PNG/snow.png';
import cloud from '../PNG/cloud.png';
import drizzle from '../PNG/drizzle.png';
import humidity from '../PNG/humidity.png';
import wind from '../PNG/wind.png';
import rain from '../PNG/rain.png';
import clear from '../PNG/clear.png';
import sunny from '../PNG/sunnyy.jpg';
import cloudy from '../PNG/cloudy.jpg';
import drizzlee from '../PNG/drizzlee.jpg';
import rainny from '../PNG/rainny.webp';
import snoww from '../PNG/snoww.jpg';

const Weather = () => {
    const inputRef=useRef()
    const [weatherData, setWeatherData] = useState(false);
    const allIcons ={
        "01d":clear,
        "01n":clear,
        "02d":cloud,
        "02n":cloud,
        "03d":cloud,
        "03n":cloud,
        "04d":drizzle,
        "04n":drizzle,
        "09d":rain,
        "09n":rain,
        "10d":rain,
        "10n":rain,
        "13d":snow,
        "13n":snow,
    }
    const allBackgrounds = {
        "01d": sunny,  
        "01n": sunny,
        "02d": cloudy,
        "02n": cloudy,
        "03d": cloudy,
        "03n": cloudy,
        "04d": drizzlee,
        "04n": drizzlee,
        "09d": rainny,
        "09n": rainny,
        "10d": rainny,
        "10n": rainny,
        "13d": snoww,
        "13n": snoww,
        default: sunny
    };
    const searchh = async (city) => {
        if(city === ""){
            alert("Enter the City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_ID}`;
            console.log(`URL: ${url}`);
            const response = await fetch(url);
            const data = await response.json();
    
            if(!response.ok){
                alert(data.message);
                return;
            }
    
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear;
            const backgroundImage = allBackgrounds[data.weather[0].icon] || allBackgrounds.default;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
                background: backgroundImage,
            });
    
        } catch(error){
            setWeatherData(false);
            console.error("Error in fetching weather data:", error);
        }
    }
    
    useEffect(()=>{
        searchh("London");
    },[])

    return (
        <div 
            className='weather' 
            style={{ backgroundImage: `url(${weatherData ? weatherData.background : sunny})` }} >
            <div className='search-bar'>
                <input ref={inputRef} type="text" placeholder='Search'/>
                <img src={search} alt="" onClick={() => searchh(inputRef.current.value)}/>
            </div>
            {weatherData ? (
                <>
                    <img src={weatherData.icon} alt="" className='weather-icon'/>
                    <p className='temperature'>{weatherData.temperature}°c</p>
                    <p className='location'>{weatherData.location}</p>
                    <div className="weather-data">
                        <div className="col">
                            <img src={humidity} alt=""/>
                            <div>
                                <p>{weatherData.humidity}</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind} alt=""/>
                            <div>
                                <p>{weatherData.windSpeed}</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    )
}  
export default Weather
