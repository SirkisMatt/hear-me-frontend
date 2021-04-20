import React, {useState, useEffect, useLayoutEffect, useContext} from 'react'
import Map from '../../components/Map/Map'
import IncidentContext from '../../contexts/incidentContext'
import UserIncidentList from '../../components/UserIncidentList/UserIncidentList'
import MultiStepForm from '../../components/AddIncident/MultiStepForm'
import EditMultiStepForm from '../../components/EditIncident/EditMultiStepForm'
import './MapDashboard.css'

function MapDashBoard() {

    const value = useContext(IncidentContext)

       
    const [size, setSize] = useState([0, 0])

    const [mapSize, setMapSize] = useState(["100vW", "70vh"])
    const [incidentToggle, toggleAddIncident] = useState(false)
    const [incidentToEditAddress, setAddress] = useState('')
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
         
        }, [size, width])    

    return (
        <div id="map_dashboard" className="map_dashboard">
            <div className="map_container" style={{
            height: height,
            width: width
            }}>
                <Map 
                loggedIn={true} 
                width={mapWidth}
                height={mapHeight}
                chooseLocation={chooseLocation}
                />
                <div id="multi_step_form" className="form_container">
                    {edit 
                    ?
                    <EditMultiStepForm 
                    toggleEdit={() => toggleEdit(!edit)} 
                    toggleChooseLocation={(boolean) => toggleChooseLocation(boolean)} 
                    incidentToEdit={incidentToEdit} 
                    chooseLocation={chooseLocation} 
                    incidentToEditAddress={incidentToEditAddress}
                    />
                    :
                    !incidentToggle 
                    ?
                    <button className="add_incident_button" onClick={() => toggleAddIncident(true)}>Add an Incident</button>
                    :
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
            <div id="incident_list" className="client_incident_container" >
                <h2>Your Incidents</h2>
              <UserIncidentList 
              toggleEdit={(boolean) => toggleEdit(boolean)} 
              setIncidentToEdit={(incidentToEdit) => setIncidentToEdit(incidentToEdit)}
              setAddress={(address) => setAddress(address)}
              />
            </div>
            }
            
        </div>
    )
}

export default MapDashBoard;