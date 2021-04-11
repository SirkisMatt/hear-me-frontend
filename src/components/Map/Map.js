import React, {useState, useEffect, useLayoutEffect} from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import * as incidentData from '../../data/incidents.json'
import { ReactComponent as Megaphone} from '../../svg/megaphone.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import './Map.css'

function Map() {
    const [viewport, setViewport] = useState({
        latitude: 45.4211,
        longitude: -75.6903,
        width: "100vw",
        height: "100vh",
        zoom: 10        
    })

    const [selectedIncident, setSelectedIncident] = useState(null);
    // const [gender, setGender] = useState(true)
    // const [race, setRace] = useState(true)
    // const [sexualAssault, setSA] = useState(true)
    // const [physicalAssault, setPA] = useState(true)
    // const [verbalAssault, setVA] = useState(true)
    const [search, setSearch] = useState('')
    const [incidents, setIncidents] = useState(incidentData.data)
    const [buttons, setButtons] = useState([])

    const filterIncidents = (button) => {
        const filteredData = incidentData.data.filter(incident => incident.type === button)
        setIncidents(filteredData)
    }


    const getSearch = (e) => {
        e.preventDefault();
        Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
            .then(res => {
                if(res.data.features.length === 0) {
                    console.log("Sorry there is now location with that name.")
                } else {
                    setViewport({
                        latitude: res.data.features[0].center[1],
                        longitude: res.data.features[0].center[0],
                        width: "100vw",
                        height: "100vh",
                        zoom: 10   
                      });
                }
                
                
            })
            .catch(err => {
                console.log(err)
            })
    }
  
    useLayoutEffect(() => {
        function updateSize() {
            setViewport({
                ...viewport
              });
        }
        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);
    
    
 
    useEffect(() => {
        const listener = (e) => {
            if(e.key === "Escape") {
                setSelectedIncident(null)
            }
        }

        window.addEventListener("keydown", listener)

        return () => {
            window.removeEventListener("keydown", listener)
        }
    }, [])


    return (
        <div className="map">
            <ReactMapGL 
            width="100vw"
            height="100vh"
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mattsirkis/ckncf6qz30ys917knendrnubf"
            onViewportChange={(viewport) => {
                setViewport(viewport)
            }}
            onClick={(e) => console.log(e.lngLat)}
            >
                  <div className="form-window">
                        <form className="window" id="search" onSubmit={(e) => getSearch(e)}>
                            <input type="text" placeholder="Search Location" name="search" id="city" onChange={(e) => setSearch(e.target.value)} />
                            <button  value="submit" type="submit" className="search"><FontAwesomeIcon icon={faSearch}/></button>
                        </form>
                        <div className="filter-container">
                            <button id="gender_btn" value="gender" onClick={() => filterIncidents('gender')}>Gender</button>
                            <button id="race_btn" onClick={() => filterIncidents('race')}>Race</button>
                            <button id="sexual_abuse_btn" onClick={() => filterIncidents('sexual assault')}>Sexual Assault</button>
                            <button id="physical_abuse_btn" onClick={() => filterIncidents('physical assault')}>Physical Assault</button>
                            <button id="verbal_abuse_btn" onClick={() => filterIncidents('verbal assault')}>Verbal Assault</button>
                        </div>
                    </div>
                {incidents.map(incident => (
                    <Marker key={incident.userId} longitude={incident.coordinates[0]} latitude={incident.coordinates[1]}>
                        <div>
                            <button className="marker_btn" onClick={(e) => {
                                e.preventDefault();
                                setSelectedIncident(incident)
                            }}>
                               <Megaphone className="megaphone"/>
                            </button>
                        </div>
                    </Marker>
                ))}

                {selectedIncident && 
                <Popup 
                longitude={selectedIncident.coordinates[0]} 
                latitude={selectedIncident.coordinates[1]}
                onClose={() => {
                    setSelectedIncident(null)
                }}
                >
                    <div>
                        <h2>{selectedIncident.userName}</h2>
                        <p>{selectedIncident.type}</p>
                        <p>{selectedIncident.timeOfIncident}</p>
                        <p>{selectedIncident.description}</p>
                    </div>
                </Popup>
                }
            </ReactMapGL>
        </div>
    )
}

export default Map;