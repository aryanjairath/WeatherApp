import axios from 'axios'
import SearchBar from './components/Search/SearchBar';
import Header from './components/Header/Header'
import WeatherDisplay from './components/Display/WeatherDisplay';
import { useState } from 'react';
const App = () => {

  const[cit, setCit] = useState('')
  const[weatherData, setWeatherData] = useState([])
  const fetchWeather = async (city) => {
    try{
      const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=LXFZWTASLFAVQ2QD5BZGP2UPC&contentType=json`)
      setWeatherData(response.data.currentConditions)
      setCit(city)
      console.log(response.data.currentConditions)
    }
    catch (err){
      setCit('City/Zip Code does not exist')
    }
  };
  
  return (
    <div> 
      < Header city = {cit}/>
      <SearchBar onSearch = {fetchWeather}/>
      <WeatherDisplay data = {weatherData} />
    </div>
  )
}
export default App;