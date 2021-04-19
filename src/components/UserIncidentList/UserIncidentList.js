import React, {useEffect, useContext, useState} from 'react'
import IncidentContext from '../../contexts/incidentContext'
import Axios from 'axios'
import config from '../../config'
import './UserIncidentList.css'

function UserIncidentList({toggleEdit, setIncidentToEdit}) {

    const value = useContext(IncidentContext)

    const handleDeleteIncident = (id) => {
        Axios.delete(`${config.API_ENDPOINT}/incidents/${id}`)
            .then(res => {
                value.deleteIncident(id)
            })
            .catch(err => {
                console.log(err)
            })   
    }

    const handleSetEditIncident = (incident) => {
        setIncidentToEdit(incident)
        toggleEdit()
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
                            <button className="user_incident_btn" onClick={() => handleSetEditIncident(incident)}>Edit</button>
                            <button className="user_incident_btn" onClick={() => handleDeleteIncident(incident.id)}>Delete</button>
                        </div>
                    </div>
                </div> 
            )}
        </div>
    )
}

export default UserIncidentList;