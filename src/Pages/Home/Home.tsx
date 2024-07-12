import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass, faWater, faWind } from '@fortawesome/free-solid-svg-icons';
import "./Home.css";
import { useState, useEffect } from 'react';


export default function Home() {
  const [city, setCity] = useState('');
  const [info, setInfo] = useState({
    humidityValue: '',
    windSpeedValue:'',
    temperatureValue: '',
    minTemp:'',
    maxTemp:'',
    mainWeather: ''
  })
  const [elements, setElements] = useState<{
    weatherBox: HTMLElement | null,
    notFound: HTMLElement | null,
    homeContainer: HTMLElement | null,
    weatherDetails: HTMLElement | null
    temperature: HTMLElement | null,
    description: HTMLElement | null,
    weatherBoxImg: HTMLImageElement | null,
    humidity: HTMLElement | null,
    wind: HTMLElement | null
  }>({
    weatherBox: null,
    notFound: null,
    homeContainer: null,
    weatherDetails: null,
    temperature: null,
    description: null,
    weatherBoxImg: null,
    humidity: null,
    wind: null
  });

  const API_KEY = '946482173e3160b08812f3e35b4fb015';

  useEffect(() => {
    const homeContainer = document.querySelector('.home_container') as HTMLElement;
    const weatherBox = document.querySelector('.weather-box') as HTMLElement;
    const weatherDetails = document.querySelector('.weather-details') as HTMLElement;
    const notFound = document.querySelector('.not-found') as HTMLElement;
    const temperature = document.querySelector('.temperature') as HTMLElement;
    const description = document.querySelector('.description') as HTMLElement;
    const weatherBoxImg = document.querySelector('.weather-box-image') as HTMLImageElement;
    const humidity = document.querySelector('.humidity') as HTMLElement;
    const wind = document.querySelector('.wind') as HTMLElement;

    setElements({ weatherBox, notFound, homeContainer, weatherDetails, temperature, description, weatherBoxImg, humidity, wind });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setCity(value);
  };

  const handleSearchClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
      const json = await response.json();
      console.log(json.cod);
      console.log(json);

      if (json.cod === '404') { 
        if (json.cod === '404') {
          if (elements.homeContainer &&
            elements.weatherBox &&
            elements.weatherDetails &&
            elements.notFound &&
            elements.weatherBoxImg) {
            elements.homeContainer.style.height = '605px';
            elements.weatherBox.style.scale = '0';
            elements.weatherBox.style.opacity = '0';
            elements.weatherDetails.style.scale = '0';
            elements.weatherDetails.style.opacity = '0';
            elements.notFound.style.scale = '1';
            elements.notFound.style.opacity = '1';
            elements.notFound.style.display = 'block';
          }
        }
      }

      if (json.cod === 200) {
        if (elements.homeContainer && elements.weatherBox && elements.weatherDetails && elements.notFound) {
          elements.homeContainer.style.height = '605px';

          elements.notFound.style.scale = '0';
          elements.notFound.style.opacity = '0';
          elements.notFound.style.display = 'none';
          
          elements.weatherBox.style.scale = '1';
          elements.weatherBox.style.opacity = '1';
          elements.weatherDetails.style.scale = '1';
          elements.weatherDetails.style.opacity = '1';
          const tempInt = parseInt(json.main.temp)
          setInfo({
            humidityValue: json.main.humidity.toString(),
            windSpeedValue: json.wind.speed.toString(),
            temperatureValue: tempInt.toString(),
            mainWeather: json.weather[0].main,
            minTemp:json.main.temp_min.toString(),
            maxTemp:json.main.temp_max.toString(),
          })
          
      }

      switch (json.weather[0].main) {
        case 'Clear':
          
          if (elements.weatherBoxImg) {
            elements.weatherBoxImg.src = './clear.png';
            } 
          break;

          case 'Mist':
          if (elements.weatherBoxImg) {
            elements.weatherBoxImg.src = './mist.png';
            } 
          break;

          case 'Rain':
          if (elements.weatherBoxImg) {
            elements.weatherBoxImg.src = './rain.png';
            } 
          break;

          case 'Snow':
          if (elements.weatherBoxImg) {
            elements.weatherBoxImg.src = './snow.png';
            } 
          break;

          case 'Clouds':
          if (elements.weatherBoxImg) {
            elements.weatherBoxImg.src = './cloud.png';
            } 
          break;

          case 'Haze':
            if (elements.weatherBoxImg) {
              elements.weatherBoxImg.src = './haze.png';
              } 
            break;

          default:
            if (elements.weatherBoxImg) {
              elements.weatherBoxImg.src = '';
              }
            }
      }
      
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  return (
    <div className='home'>
      <div className="home_container">
        <div className="home-search-box">
          <FontAwesomeIcon className='location' icon={faLocationDot} />
          <input onChange={handleSearchChange} type="text" placeholder='Enter your location' />
          <button onClick={handleSearchClick}>
            <FontAwesomeIcon className='lupa' icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className="not-found">
          <img className='not-found-image' src="./404.png" alt="location not found!" />
          <p>Oops! Invalid Location :/</p>
        </div>

        <div className="weather-box">
          <img className='weather-box-image' src="" alt="" />
          <p className='temprature'>{info.temperatureValue}°</p>
          <span>max {info.maxTemp}</span>
          <br />
          <span>min {info.minTemp}</span>
          <p className='description'>{info.mainWeather}</p>
        </div>

        <div className="weather-details">
          <div className="humidity">
            <FontAwesomeIcon icon={faWater} />
            <div className="text">
              <span>{info.humidityValue}</span>
              <p>Humidity</p>
            </div>
          </div>

          <div className="wind">
            <FontAwesomeIcon icon={faWind} />
            <div className="text">
              <span>{info.windSpeedValue}</span>
              <p>Wind Speed</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}