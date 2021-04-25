import React, {useState, useEffect, useLayoutEffect, useContext} from 'react'
import Map from '../../components/Map/Map'
import IncidentContext from '../../contexts/incidentContext'
import UserIncidentList from '../../components/UserIncidentList/UserIncidentList'
import MultiStepForm from '../../components/AddIncident/MultiStepForm'
import EditMultiStepForm from '../../components/EditIncident/EditMultiStepForm'
import TokenService from '../../services/token-service'
import Axios from 'axios'
import config from '../../config'
import './MapDashboard.css'

function MapDashBoard() {

    const value = useContext(IncidentContext)

       
    const [size, setSize] = useState([0, 0])

    const [incidentToggle, toggleAddIncident] = useState(false)
    const [incidentToEditAddress, setAddress] = useState('')
    const [edit, toggleEdit] = useState(false)
    const [incidentToEdit, setIncidentToEdit] = useState({})
    const [chooseLocation, toggleChooseLocation] = useState(false)
    const token = JSON.parse(TokenService.getAuthToken()).authToken
    const parsedToken = JSON.parse(atob(token.split('.')[1]))

  
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
        }, []);
  
        const [width, height] = size

        
    
        useEffect(() => {

            value.addUser({
                id: parsedToken.id,
                userName: parsedToken.sub
            })

            Axios.get(`${config.API_ENDPOINT}/incident/user`, {
                headers: {
                    'authorization': `bearer ${token}`,
                  }
            })
                .then(res => {
                    if (res.status === 200) {
                        value.setUserIncidents(res.data)
                    } 
                })
                .catch(error => {
                    console.log(error)
                })
         
        }, [value.addUser])    

    return (
        <div id="map_dashboard" className="map_dashboard">
            <div className="map_container" style={{
            height: height,
            width: width
            }}>
                <Map 
                loggedIn={true} 
                width="100vW"
                height="70vh"
                chooseLocation={chooseLocation}
                token={token}
                parsedToken={parsedToken}
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
                    token={token}
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
                    token={token}
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
              token={token}
              />
            </div>
            }
            
        </div>
    )
}

export default MapDashBoard;