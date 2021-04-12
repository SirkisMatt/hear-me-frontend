import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './SearchBar.css'

function SearchBar({setSearch, getSearch}) {
    return (
        <div className="window" id="search" >
            <input type="text" placeholder="Search Location" name="search" id="city" onChange={(e) => setSearch(e.target.value)} />
            <button  value="submit" type="submit" className="search" onClick={() => getSearch()}><FontAwesomeIcon icon={faSearch}/></button>
        </div>
    )
}

export default SearchBar;