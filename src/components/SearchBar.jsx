import React, {useState} from 'react';
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm, location);
    };
 
return (

<div className="search-bar-container">

    <div className="search-bar">
        <div className="search-input-container">
            <input type="text" className="search-input" placeholder="Empleo, palabra clave, empresa" value={searchTerm} onChange={handleSearchTermChange} />
            <input type="text" className="location-input" placeholder="Ubicación" value={location} onChange={handleLocationChange} />
            <button className="search-btn" onClick={handleSearch}>Buscar</button>
        </div>
        {/* <div className="filters-container">
            <div className="filters">
                <button className="filter-button" id="published"> Fecha </button>
                <button className="filter-button" id="field">Categoria</button>
                <button className="filter-button" id="employment">Disponibilidad</button>
                <button className="filter-button" id="language">Modalidad</button>
                <button className="filter-button filter-button-blue" id="allFilters">Mas Filtros</button>
            </div>
        </div> */}
    </div>
</div>

)
}