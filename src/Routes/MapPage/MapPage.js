import React from 'react'
import Map from '../../components/Map/Map'
import './MapPage.css'

function MapPage() {
    return (
        <div>
           <Map 
           loggedIn={false}
           width="100vw"
           height="100vh"
           />
        </div>
    )
}

export default MapPage;