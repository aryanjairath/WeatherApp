import './Header.css'

const Header = ({ city }) => {
    console.log(city)
    return (
        <div className='header'>
            <h1>Wonderful Weather Today! </h1>
            <h2>You are getting weather information for: {city} </h2>
        </div>
    );
}

export default Header;