import React, {useState, useEffect, useLayoutEffect, useContext} from 'react'
import Map from '../../components/Map/Map'
import IncidentContext from '../../contexts/incidentContext'
import AddIncident from '../../components/AddIncident/AddIncident'
import './MapDashboard.css'

function MapDashBoard() {

    const value = useContext(IncidentContext)

    const {selectedIncident} = value
    // const [selectedIncident, setSelectedIncident] = useState(null);
       
    const [size, setSize] = useState([0, 0])
    // const [location, setLocation] = useState([0,0])

    const [mapSize, setMapSize] = useState(["100vW", "70vh"])
    const [incidentToggle, toggleAddIncident] = useState(false)
    const [chooseLocation, toggleChooseLocation] = useState(false)
  
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
        }, []);
  
        const [width, height] = size
        const [mapWidth, mapHeight] = mapSize
    
        useEffect(() => {
            if(width <= 768) {
                setMapSize(["100vw", "70vh"])
            }
         
        }, [size])    

    return (
        <div className="map_dashboard">
            <div className="map_container" style={{
            height: height,
            width: width
            }}>
                <Map 
                loggedIn={true} 
                width={mapWidth}
                height={mapHeight}
                chooseLocation={chooseLocation}
                // setLocation={(location) => setLocation(location)}
                // location={location}
                />
            <div className="form_container">
                {/* <h2>Add an Incident</h2> */}
                {!incidentToggle 
                ?
                <button className="add_incident_button" onClick={() => toggleAddIncident(true)}>Add an Incident</button>
                :
                <AddIncident 
                chooseLocation={chooseLocation} 
                toggleChooseLocation={() => toggleChooseLocation(!chooseLocation)} 
                toggleAddIncident={() => toggleAddIncident(!incidentToggle)}
                />
                }
            </div>
            </div>
            
            <div className="client_incident_container" >
               
                    {selectedIncident && 
                    <div>
                        <h2>{selectedIncident.userName}</h2>
                        <p>{selectedIncident.type}</p>
                        <p>{selectedIncident.timeOfIncident}</p>
                        <p>{selectedIncident.description}</p>
                    </div>
                    }
            </div>
        </div>
    )
}

export default MapDashBoard;