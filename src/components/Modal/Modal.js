import './Modal.css'
const Modal = ( {data} ) => {
    const {setModal , day} = data;
    const updateMod = () => {
        setModal(false)
    }
    console.log(data)
    return (
        <div className='modal-container' onClick={updateMod}>

            <div className='modal'>
                <h2>{day.datetime}</h2>
                <h3> Conditions: {day.conditions}</h3>
                <h3> Max Temp: {32+day.tempmax*(9/5)}F</h3>
                <h3> Min Temp: {32+day.tempmin*(9/5)}F</h3>
                <h3>Humidity: {day.humidity}</h3>
                <h3>Windspeed: {day.windspeed}</h3>
                <h3>Sunrise: {day.sunrise} </h3>
                <h3>Sunset: {day.sunset} </h3>
                <button onClick={updateMod} style = {{transform: 'scale(0.8)'}}>Close</button>
            </div>    
        </div>
    )
};

export default Modal;