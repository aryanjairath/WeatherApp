import { useState } from "react";
import './SearchBar.css'
const SearchBar  = ( {onSearch} ) => {
    const [city, setCity] = useState('')
    
    const onSubmit = (event) =>{
        setCity(event.target.value)
    }

    const checkEnter = (event) =>{
        if (event.key === 'Enter') {
            onSearch(city)
        }
    }
    return (
        <div className="container">
            <input className="searchbar"
            placeholder="Enter Zip Code / State / City"
            value = {city}
            onChange = {onSubmit}
            onKeyDown={checkEnter}
            />
        </div>
    )
}
export default SearchBar;