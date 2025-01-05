import { FaThermometerEmpty } from 'react-icons/fa';
import './WeatherDisplay.css';
import { useState, useEffect } from 'react';
import { WiHumidity } from 'react-icons/wi';
import { GiHumanTarget } from 'react-icons/gi';
import { LuThermometerSnowflake } from 'react-icons/lu';

const WeatherDisplay = ({data}) => {
    
    const [degree, setDegree] = useState('Celsius')
    const [feelslike, setFeelsLike] = useState('Celsius')
    const [temp, setTemp] = useState(data?.temp || '');
    useEffect(() => {
        if (data?.temp !== undefined) {
            setTemp(data.temp);
            setFeelsLike(data.feelslike)
        }
    }, [data?.temp]); // Dependency on data.temp

    const handleDegree = () => {
        if (degree === 'Celsius') {
            setDegree('Fahrenheit');
            setFeelsLike((feelslike * 9/5) + 32);
            setTemp((temp * 9/5) + 32); // Convert to Fahrenheit
        } else {
            setDegree('Celsius');
            setTemp(data.temp); // Reset to Celsius
            setFeelsLike(data.feelslike)
        }
    };

    const back = (conditions) => {
        if(conditions){
            if(conditions.includes('cloudy'))
                document.body.style.background = 'linear-gradient(to right, #d3d3d3, #808080)'; 
            if(conditions.includes('Clear'))
                document.body.style.background = 'linear-gradient(to RIGHT, #fff9c4, #ffecb3, #ffe082)';
        }

    }
    return (
        <div>
            <div className = 'data'>
                <h3>Conditions: {data.conditions}</h3> {back(data.conditions)}
                <h3>{<FaThermometerEmpty/>}Temperature: {temp}</h3>
                <h3>{<LuThermometerSnowflake/>} Feels Like: {feelslike}</h3>
                <h3>{<WiHumidity />}Humidity: {data.humidity}%</h3>
                <button onClick = {handleDegree}>Convert to {degree === 'Celsius' ? 'Farenheit' : 'Celsius'} </button>

            </div>
        </div>
    )
}
export default WeatherDisplay;