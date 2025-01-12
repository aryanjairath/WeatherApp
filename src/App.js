import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchBar from './components/Search/SearchBar';
import Header from './components/Header/Header'
import WeatherDisplay from './components/Display/WeatherDisplay';
import { useState } from 'react';
import Forecast from './components/WeatherForecast/Forecast';
const App = () => {

  const[cit, setCit] = useState('')
  const[weatherData, setWeatherData] = useState([])
  const fetchWeather = async (city) => {
    try{
      const response =  await axios.get(`http://localhost:5000/api/weather/${city}`)
      setWeatherData(response.data)
      setCit(city)
    }
    catch (err){
      setCit('City/Zip Code does not exist')
    }
  };
  
  return (
    <div> 
      <BrowserRouter>
        <Routes>
        <Route path = '/' element={
          <>
          <Header city={cit} />
          <SearchBar onSearch={fetchWeather} />
          <WeatherDisplay data={weatherData} />
          </>
        }/>
       
        <Route path = '/forecast/:loc' element = {<Forecast />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;