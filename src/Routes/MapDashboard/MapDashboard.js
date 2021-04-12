import React, {useState, useEffect, useLayoutEffect} from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import * as incidentData from '../../data/incidents.json'
import { ReactComponent as Megaphone} from '../../svg/megaphone.svg'
import FilterButton from '../../components/FilterButtons/FilterButton'
import SearchBar from '../../components/SearchBar/SearchBar'
import Axios from 'axios'
import './MapDashboard.css'

    //Set categories for buttons
const allCategories = ['All', ...new Set(incidentData.data.map(item => item.type))]

function MapDashBoard() {
        //set viewport of map
    const [viewport, setViewport] = useState({
        latitude: 45.4211,
        longitude: -75.6903,
        width: "100vw",
        height: "70vh",
        zoom: 10        
    })

    const [selectedIncident, setSelectedIncident] = useState(null);
    const [search, setSearch] = useState('')
    const [incidents, setIncidents] = useState(incidentData.data)
    const [buttons, setButtons] = useState(allCategories)

        //filter incidentData based on button pressed
    const filterIncidents = (button) => {
        setActive(button)
        if(button === 'All') {
            setIncidents(incidentData.data)
            return;
        }
        const filteredData = incidentData.data.filter(incident => incident.type === button)
        setIncidents(filteredData)
    }

    const [size, setSize] = useState([0, 0])
    const [error, toggleError] = useState(false)
  
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
        }, []);
  
  
  
        const [width, height] = size

    const getSearch = () => {
        Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
            .then(res => {
                if(res.data.features.length === 0) {
                    console.log("Sorry there is no location with that name.")
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
            <div  style={{
                height: height,
                width: width
                }}>
                <ReactMapGL 
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mattsirkis/ckncf6qz30ys917knendrnubf"
            onViewportChange={(viewport) => {
                setViewport(viewport)
            }}
            onClick={(e) => console.log(e.lngLat)}
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
            
            <div className="community_container" style={{
                height: height,
                width: width
                }}>
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