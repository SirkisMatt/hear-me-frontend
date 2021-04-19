import React, {useState, useContext, useEffect} from 'react'
import Axios from 'axios'
import './EditIncident.css'
import config from '../../config'
import IncidentContext from '../../contexts/incidentContext'

function EditIncident(props) {
    const value = useContext(IncidentContext)

    const {incidentToEdit, toggleEdit, toggleChooseLocation, chooseLocation} = props
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState(incidentToEdit.description)
    const [timeOfIncident, setTimeOfIncident] = useState(incidentToEdit.timeOfIncident)
    const [coords, setCoords] = useState(incidentToEdit.coordinates)
    const [type, setType] = useState(incidentToEdit.type)
    const [editTime, toggleEditTime] = useState(false)
    const req = value.location[0] + ',' + value.location[1]


    useEffect(() => {
        if(coords) {
            if (!chooseLocation){toggleChooseLocation()}
            Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coords}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
            .then(res => {
                setAddress(res.data.features[0].place_name)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [])

    useEffect(() => {
        if(chooseLocation) {
            setCoords(value.location)
            Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${req}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
            .then(res => {
                setAddress(res.data.features[0].place_name)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [value.location])

    const handleEditIncident = (e) => {
        e.preventDefault()
        if(editTime) {
            let time = e.target['date'].value + e.target['time'].value
            Axios.patch(`${config.API_ENDPOINT}/incidents/${incidentToEdit.id}`, {
                userId: incidentToEdit.userId,
                userName: incidentToEdit.userName,
                timeOfIncident: time,
                type: type,
                description: description,
                coordinates: coords
            })
            .then(res => {
                value.editIncident(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        } else {
            Axios.patch(`${config.API_ENDPOINT}/incidents/${incidentToEdit.id}`, {
                userId: incidentToEdit.userId,
                userName: incidentToEdit.userName,
                timeOfIncident: timeOfIncident,
                type: type,
                description: description,
                coordinates: coords
            })
            .then(res => {
                value.editIncident(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
        toggleEdit()

    }


    function handleTypeChange(e) {
        e.preventDefault(e)
        setType(e.target.value)
    }
    function handleDescriptionChange(e) {
        e.preventDefault(e)
        setDescription(e.target.value)
    }
    function handleTimeChange(e) {
        e.preventDefault(e)
        setTimeOfIncident()
    }

    return (
        <form className="edit_incident_form" onSubmit={(e) => handleEditIncident(e)}>
            <div className="form_content div_height">
                <div className="incident_dropdown_container">
                <label htmlFor="goal-type">What type of incident is this?</label>
                <div className="incident_dropdown">
                    <div className="select">
                        <select className="drop_down" name="incidentOptions" onChange={handleTypeChange} defaultValue={type}id="goal-options">
                            <option value="">
                                Choose Type
                            </option>
                            <option value="gender">
                                Gender
                            </option>
                            <option value="Race">
                                Race
                            </option>
                            <option value="Sexual">
                                Sexual
                            </option>
                            <option value="Physical">
                                Physical
                            </option>
                            <option value="Verbal">
                                Verbal
                            </option>
                        </select>
                    </div>
                </div>
                </div>
                    <div>
                        {!chooseLocation
                            ?
                            <button className="location_btn" type='button' onClick={() => toggleChooseLocation(true)}>Choose location on Map</button>
                            :
                            <div className="address_container">
                                <p>
                                    {address}
                                </p>
                                <div>
                                    <button 
                                    onClick={() => toggleChooseLocation(false)}
                                    >
                                        Erase
                                    </button>
                                </div>    
                            </div>
                        }
                    </div>
                        
                        

                        <textarea className="description" name="description" rows="10" cols="30" maxLength="100" onChange={handleDescriptionChange} defaultValue={incidentToEdit.description} placeholder='Describe the incident...' ></textarea>
                    {!editTime
                    ?
                    <div>
                        {incidentToEdit.timeOfIncident}
                        <button type="button" className="form_btn" onClick={() => toggleEditTime(!editTime)}>Edit Time</button>
                    </div>
                    :
                    <div>
                        <label>When did this happen?</label>
                            <input type="date" className="complete_by" name="date" />
                            <input type="time" className="complete_by" name="time" />
                    </div>
                    }
                    <div className="form_btn_container">
                        <button className="form_btn" type='submit'>Edit Incident</button>
                        <button className="form_btn" type="button" onClick={toggleEdit}>
                            Cancel
                        </button>
                    </div>
                    
            </div>
        </form>
    )
}

export default EditIncident