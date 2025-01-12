import './Header.css'
import { Link } from 'react-router-dom';
const Header = ({ city }) => {
    console.log(city)
    const handleForecast = () => {
        if (!city)
            return '/';
        return `forecast/${city}`
    }

    const handleNews = () => {
        if (!city)
            return '/';
        return `news/${city}`
    }
    return (
        <div className='header'>
            <h1>Wonderful Weather Today! </h1>
            <h2>You are getting weather information for: {city} </h2>
            <button style={{marginBottom:'1rem'}}><Link to={handleForecast()}>Weather Forecast</Link> </button>
            <button style={{marginBottom:'1rem'}}><Link to={handleNews()}>News</Link> </button>

        </div>
    );
}

export default Header;