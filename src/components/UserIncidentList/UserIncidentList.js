import React, {useContext} from 'react'
import IncidentContext from '../../contexts/incidentContext'
import Axios from 'axios'
import './UserIncidentList.css'

function UserIncidentList({toggleEdit, setIncidentToEdit, setAddress, handleDeleteIncident}) {

    const value = useContext(IncidentContext)



    const handleSetEditIncident = (incident) => {
        Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${incident.coordinates}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
            .then(res => {
                setAddress(res.data.features[0].place_name)
            })
            .catch(err => {
                setAddress("Sorry there was a problem fetching that address") 
            })
        setIncidentToEdit(incident)
        window.scroll(0,100)
        toggleEdit(true)
    }


    return (
        <div className="user_incident_list">
            {value.userIncidents.map(incident => 
                <div id={incident.type.toLowerCase()} className="user_incident_container" key={incident.id}>
                    <div className="user_incident">
                        <h3>{incident.userName}</h3>
                        <p className="background_width">{incident.type}</p>
                        <p>{new Date(incident.timeOfIncident).toUTCString()}</p>
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