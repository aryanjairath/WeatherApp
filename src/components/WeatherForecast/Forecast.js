import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Forecast.css';
import { FaFireFlameSimple } from 'react-icons/fa6';
import { SiSnowflake } from 'react-icons/si';
import { BiCloud, BiMoon } from 'react-icons/bi';
import { IoRainy, IoSunny } from 'react-icons/io5';
import Modal from '../Modal/Modal';
const Forecast = () => {
    const { loc } = useParams();
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [selectedDay, setSelectedDay] = useState(null)
    useEffect( () => {
        async function fetchData (){
            const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?unitGroup=metric&key=LXFZWTASLFAVQ2QD5BZGP2UPC&contentType=json`)
            const dayArray = response.data.days; 
        console.log(dayArray); // 15-day forecast array
        setData(dayArray);     // Store in state

        }
        fetchData();
    }, [loc]);
    
    const onPressModal = (day) => {
        setShowModal((prev) => !prev)
        setSelectedDay(day)
    }

    const getLogo = (condition) => {
        if(condition === "Clear"){
            return <IoSunny />
        }
        if(condition === "Partially cloudy"){
            return <BiCloud />
        }
        if(condition === "Clear"){
            return <IoSunny />
        }
        if(condition.includes("Snow")){
            return <SiSnowflake />
        }
        if(condition.includes("Rain")){
            return <IoRainy />
        }
    }
    return (
        <div >
            <h1>Weather Forecast for: {loc}</h1>
            <div className='daycontainer'>
            {data.map((day, index) => (
                <div key={index}>
                    <div className='day' onClick={() => onPressModal(day)}>
                        <strong style ={{fontSize:'1.4rem', justifyContent:'center',alignItems:'center', display: 'flex'}}>Date: {day.datetime}</strong>
                        <p> {getLogo(day.conditions)} Conditions: {day.conditions} </p>
                        <p> Max Temp: {32+day.tempmax*(9/5)}F</p>
                        <p> Min Temp: {32+day.tempmin*(9/5)}F</p>
                    </div>
               </div> 
            ))};
            {showModal && <Modal data = {{setModal: setShowModal, day: selectedDay}} />}
            </div>
        </div>
  );


}
export default Forecast;