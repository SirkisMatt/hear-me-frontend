import React, {useContext} from 'react'
import IncidentContext from '../../contexts/incidentContext'
import Axios from 'axios'
import config from '../../config'
import './UserIncidentList.css'

function UserIncidentList({toggleEdit, setIncidentToEdit, setAddress}) {

    const value = useContext(IncidentContext)

    const handleDeleteIncident = (id) => {
        Axios.delete(`${config.API_ENDPOINT}/incidents/${id}`)
            .then(res => {
                value.deleteIncident(id)
            })
            .catch(err => {
                alert("Sorry there was a problem processing your request")
            })   
    }

    const handleSetEditIncident = (incident) => {
        Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.place/${incident.coordinates}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
            .then(res => {
                setAddress(res.data.features[0].place_name)
            })
            .catch(err => {
                setAddress("Sorry there was a problem fetching that address")
            })
        setIncidentToEdit(incident)
        toggleEdit(true)
    }

    return (
        <div className="user_incident_list">
            {value.userIncidents.map(incident => 
                <div id={incident.type.toLowerCase()} className="user_incident_container" key={incident.id}>
                    <div className="user_incident">
                        <h3>{incident.userName}</h3>
                        <p className="background_width">{incident.type}</p>
                        <p>{incident.timeOfIncident}</p>
                        <p>{incident.description}</p>
                        <div className="incident_list_btn_container">
                            <a href="#map_dashboard"><button className="user_incident_btn" onClick={() => handleSetEditIncident(incident)}>Edit</button></a>
                            <button className="user_incident_btn" onClick={() => handleDeleteIncident(incident.id)}>Delete</button>
                        </div>
                    </div>
                </div> 
            )}
        </div>
    )
}

export default UserIncidentList;