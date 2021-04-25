import React, {useState, useEffect, useLayoutEffect, useContext} from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import mapboxgl from "mapbox-gl";
import * as incidentData from '../../data/incidents.json'
import { ReactComponent as IncidentPin} from '../../svg/IncidentPin.svg'
import { ReactComponent as YourIncidentPin} from '../../svg/YourIncidentPin.svg'
import FilterButton from '../FilterButtons/FilterButton'
import SearchBar from '../SearchBar/SearchBar'
import Axios from 'axios'
import './Map.css'
import config from '../../config'
import IncidentContext from '../../contexts/incidentContext'
import TokenService from '../../services/token-service'
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;


    //Set categories for buttons
    const allCategories = ['Yours', 'All', ...incidentData.types]
function Map(props) {
    const value = useContext(IncidentContext)
    const { width, height, chooseLocation,} = props

        //set viewport of map
    const [viewport, setViewport] = useState({
        latitude: 45.4211,
        longitude: -75.6903,
        width: width,
        height: height,
        zoom: 7        
    })

   
    const [search, setSearch] = useState('')
    const [incidents, setIncidents] = useState(value.incidents)
    const [buttons, setButtons] = useState(allCategories)
    
    
    const {selectedIncident, setSelectedIncident, location, setLocation} = value

    useEffect(() => {
        setIncidents(value.incidents)
        value.setUserIncidents(value.userIncidents)
    }, [value.incidents, value.userIncidents])


        //setIncidentData
    useEffect(() => {
        if(TokenService.hasAuthToken()) {
            value.toggleLoggedIn(true)
        } else {
            value.toggleLoggedIn(false)
        }
        

            //Commented out for development phase.. not enough data to display so dummy data in place
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
        if(button === 'Yours') {
            const userIncidents = value.incidents.filter(incident => parseFloat(incident.userId) === parseFloat(value.user.id))
            setIncidents(userIncidents)
            return;
        }
        if(button === 'All') {
            setIncidents(value.incidents)
            return;
        }
        const filteredData = value.incidents.filter(incident => incident.type.toLowerCase() === button.toLowerCase())
        setIncidents(filteredData)
    }

    const getSearch = () => {
        Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
            .then(res => {
                if(res.data.features.length === 0) {
                    alert("Sorry there is no location with that name.")
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
                alert("Sorry there is no location with that name.")
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
                {incidents.map((incident, i) => (
                    <Marker key={i} longitude={parseFloat(incident.coordinates[0])} latitude={parseFloat(incident.coordinates[1])}>
                        <div>
                            <button className="marker_btn" onClick={(e) => {
                                e.preventDefault();
                                setSelectedIncident(incident)
                            }}>
                            
                            {((incident.userId === value.user.id) && value.loggedIn)
                            ?
                            <YourIncidentPin className="incident_pin"/>
                            :
                            <IncidentPin className="incident_pin"/>
                            }      
                            </button>
                        </div>
                    </Marker>
                ))}

                { ((location.length !== 0) && chooseLocation) &&
                    <Marker longitude={location[0]} latitude={location[1]}>
                        <div className="marker_btn">
                            <YourIncidentPin className="incident_pin"/>
                        </div>
                    </Marker>
                }

                {selectedIncident && 
                <Popup 
                longitude={parseFloat(selectedIncident.coordinates[0])} 
                latitude={parseFloat(selectedIncident.coordinates[1])}
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