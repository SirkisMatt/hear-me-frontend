import React, {useState, useEffect, useLayoutEffect, useContext} from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import * as incidentData from '../../data/incidents.json'
import { ReactComponent as Megaphone} from '../../svg/megaphone.svg'
import FilterButton from '../FilterButtons/FilterButton'
import SearchBar from '../SearchBar/SearchBar'
import Axios from 'axios'
import './Map.css'
import IncidentContext from '../../contexts/incidentContext'

    //Set categories for buttons
const allCategories = ['All', ...new Set(incidentData.data.map(item => item.type))]

function Map(props) {

    const value = useContext(IncidentContext)
    const {loggedIn, width, height, chooseLocation} = props
    const [position, setPosition] = useState([45.4211, -75.6903])
    const [lat, lng] = position

        //set viewport of map
    const [viewport, setViewport] = useState({
        latitude: lat,
        longitude: lng,
        width: width,
        height: height,
        zoom: 7        
    })

   
    const [search, setSearch] = useState('')
    const [incidents, setIncidents] = useState(value.incidents)
    const [buttons, setButtons] = useState(allCategories)
    
    
    const {selectedIncident, setSelectedIncident, location, setLocation} = value


        //setIncidentData
    useEffect(() => {
        value.setIncidents(incidentData.data)
        // if(navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(
        //         function(position) {
        //             setViewport({
        //                 latitude: position.coords.latitude,
        //                 longitude: position.coords.longitude,
        //                 width: width,
        //                 height: height,
        //                 zoom: 7  
        //             })
        //         }
        //     )

        // }
    }, [])

    
        //filter incidentData based on button pressed
    const filterIncidents = (button) => {
        setActive(button)
        if(button === 'All') {
            setIncidents(value.incidents)
            return;
        }
        const filteredData = value.incidents.filter(incident => incident.type === button)
        setIncidents(filteredData)
    }

    const getSearch = () => {
        Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
            .then(res => {
                if(res.data.features.length === 0) {
                    console.log("Sorry there is no location with that name.")
                } else {
                    setViewport({
                        latitude: res.data.features[0].center[1],
                        longitude: res.data.features[0].center[0],
                        width: width,
                        height: height,
                        zoom: 10   
                      });
                }
                
            })
            .catch(err => {
                console.log(err)
            })
    }
  
        // Reset viewport for map when window is resized
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
    
    
        // Escape popup window whe escape key is pressed
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

    const [active, setActive] = useState(allCategories[0]);

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
            onClick={(e) => setLocation(e.lngLat) }
            >
                <div className="form-window">
                    <SearchBar getSearch={getSearch} setSearch={setSearch}/>
                    <FilterButton button={buttons} active={active} filterIncidents={filterIncidents} />
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

                { ((location.length !== 0) && chooseLocation) &&
                    <Marker longitude={location[0]} latitude={location[1]}>
                        <div className="marker_btn">
                            <Megaphone className="megaphone"/>
                        </div>
                    </Marker>
                }

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