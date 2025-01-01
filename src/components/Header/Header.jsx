import './Header.css'
import { Link } from 'react-router-dom';
const Header = ({ city }) => {
    console.log(city)
    return (
        <div className='header'>
            <h1>Wonderful Weather Today! </h1>
            <h2>You are getting weather information for: {city} </h2>
            <button><Link to={`forecast/${city}`}>Weather Forecast</Link> </button>

        </div>
    );
}

export default Header;