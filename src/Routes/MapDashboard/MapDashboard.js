import React, {useState, useEffect, useLayoutEffect, useContext} from 'react'
import Map from '../../components/Map/Map'
import IncidentContext from '../../contexts/incidentContext'
import AddIncident from '../../components/AddIncident/AddIncident'
import UserIncidentList from '../../components/UserIncidentList/UserIncidentList'
import EditIncident from '../../components/EditIncident/EditIncident'
import MultiStepForm from '../../components/AddIncident/MultiStepForm'
import './MapDashboard.css'

function MapDashBoard() {

    const value = useContext(IncidentContext)

    const {selectedIncident} = value
    // const [selectedIncident, setSelectedIncident] = useState(null);
       
    const [size, setSize] = useState([0, 0])
    // const [location, setLocation] = useState([0,0])

    const [mapSize, setMapSize] = useState(["100vW", "70vh"])
    const [incidentToggle, toggleAddIncident] = useState(false)
    const [edit, toggleEdit] = useState(false)
    const [incidentToEdit, setIncidentToEdit] = useState({})
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
                {edit 
                ?
                <EditIncident toggleEdit={() => toggleEdit(!edit)} toggleChooseLocation={(boolean) => toggleChooseLocation(boolean)} incidentToEdit={incidentToEdit} chooseLocation={chooseLocation} />
                :
                !incidentToggle 
                    ?
                    <button className="add_incident_button" onClick={() => toggleAddIncident(true)}>Add an Incident</button>
                    :
                    // <AddIncident 
                    // chooseLocation={chooseLocation} 
                    // toggleChooseLocation={(boolean) => toggleChooseLocation(boolean)} 
                    // toggleAddIncident={() => toggleAddIncident(!incidentToggle)}
                    // />
                    <MultiStepForm  
                    chooseLocation={chooseLocation} 
                    toggleChooseLocation={(boolean) => toggleChooseLocation(boolean)} 
                    toggleAddIncident={() => toggleAddIncident(!incidentToggle)}
                    />
                    
                }
                
            </div>
            </div>
            {(value.userIncidents.length > 0) 
            && 
            <div className="client_incident_container" >
                <h2>Your Incidents</h2>
              <UserIncidentList toggleEdit={() => toggleEdit(!edit)} setIncidentToEdit={(incidentToEdit) => setIncidentToEdit(incidentToEdit)}/>
            </div>
            }
            
        </div>
    )
}

export default MapDashBoard;