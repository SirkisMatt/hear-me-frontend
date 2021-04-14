import React, {useState} from 'react'
import Map from '../../components/Map/Map'
import './MapPage.css'

function MapPage() {

    // const [mapSize, setMapSize] = useState(["100vW", "70vh"])
    // const [mapWidth, mapHeight] = mapSize
    
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