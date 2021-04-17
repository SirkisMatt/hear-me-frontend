import React, {useEffect, useContext, useState} from 'react'
import IncidentContext from '../../contexts/incidentContext'
import './UserIncidentList.css'

function UserIncidentList() {

    const value = useContext(IncidentContext)

    return (
        <div>
            {value.userIncidents.map(incident => 
                <div id={incident.type.toLowerCase()} className="user_incident" key={incident.id}>
                    <h2>{incident.userName}</h2>
                    <p>{incident.type}</p>
                    <p>{incident.timeOfIncident}</p>
                    <p>{incident.description}</p>
                    <button className="user_incident_btn">Edit</button>
                    <button className="user_incident_btn">Delete</button>
                </div> 
            )}
        </div>
    )
}

export default UserIncidentList;