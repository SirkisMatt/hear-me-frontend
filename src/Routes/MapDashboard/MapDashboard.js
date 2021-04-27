import React, {useState, useEffect, useLayoutEffect, useContext} from 'react'
import Map from '../../components/Map/Map'
import IncidentContext from '../../contexts/incidentContext'
import UserIncidentList from '../../components/UserIncidentList/UserIncidentList'
import MultiStepForm from '../../components/AddIncident/MultiStepForm'
import EditMultiStepForm from '../../components/EditIncident/EditMultiStepForm'
import TokenService from '../../services/token-service'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import Axios from 'axios'
import {config} from '../../config'
import './MapDashboard.css'

function MapDashBoard() {

    const value = useContext(IncidentContext)
 
    const {addUser, setUserIncidents} = value
       
    const [size, setSize] = useState([0, 0])

    const [incidentToggle, toggleAddIncident] = useState(false)
    const [incidentToEditAddress, setAddress] = useState('')
    const [edit, toggleEdit] = useState(false)
    const [incidentToEdit, setIncidentToEdit] = useState({})
    const [chooseLocation, toggleChooseLocation] = useState(false)
    const [show, toggleDeleteModal] = useState(false)
    const [idToDelete, setIdToDelete] = useState('')
    const token = JSON.parse(TokenService.getAuthToken()).authToken
    const parsedToken = JSON.parse(atob(token.split('.')[1]))
    const newUser =  {
        id: parsedToken.id,
        userName: parsedToken.sub
    }

  
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
            addUser(newUser)
            // Call only needed on first render to save on performance
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        const handleDeleteIncident = (id) => {
            toggleDeleteModal(true)
            setIdToDelete(id)

        }

        
        
    
        useEffect(() => {
            Axios.get(`${config.API_ENDPOINT}/incident/user`, {
                headers: {
                    'authorization': `bearer ${token}`,
                  }
            })
                .then(res => {
                    if (res.status === 200) {
                        setUserIncidents(res.data)
                    } 
                })
                .catch(error => {
                    if(!error.response.data.error.message) {
                        alert("Sorry, there has been a problem fetching your past incidents")
                    }
                     else if (error.response.data.error.message === "No Incidents") {
                        value.setError(error.response.data.error.message)
                    } else {
                        setUserIncidents([{
                            id: 98765432345678909876543,
                            userName: "Sorry there was a problem fetching your previous incidents",
                            type: "",
                            timeOfIncident: "",
                        }])
                    }
                    
                })
            // Call only needed on first render to save on performance
         // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])    

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
              handleDeleteIncident={(id) => handleDeleteIncident(id)}
              setAddress={(address) => setAddress(address)}
              token={token}
              />
            </div>
            }

            <DeleteModal 
            toggleDeleteModal={(boolean) => toggleDeleteModal(boolean)}
            show={show}
            idToDelete={idToDelete}
            token={token}
            />

             
        </div>
    )
}

export default MapDashBoard;