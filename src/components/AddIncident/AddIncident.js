import React, {useState, useContext, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import './AddIncident.css'
import config from '../../config'
import IncidentContext from '../../contexts/incidentContext'

function AddIncident({toggleAddIncident, toggleChooseLocation, chooseLocation}) {
    const value = useContext(IncidentContext)

    const req = value.location[0] + ',' + value.location[1]
    const [address, setAddress] = useState('')

    useEffect(() => {
        if(chooseLocation) {
            
            Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${req}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
            .then(res => {
                setAddress(res.data.features[0].place_name)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [value.location])

    // handleAddIncident = () => {
    //     Axios.post(`${config.API_ENDPOINT}/incidents`)
    // }

    
    
    console.log(req)

    return (
        <form className="add_incident_form">
            <div className="form_content div_height">
                <div className="incident_dropdown_container">
                <label htmlFor="goal-type">What type of incident is this?</label>
                <div className="incident_dropdown">
                    <div className="select">
                        <select className="drop_down" name="GoalOptions" id="goal-options">
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
                        {!chooseLocation
                        ?
                        <button className="location_btn" type='button' onClick={toggleChooseLocation}>Choose location on Map</button>
                        :
                        <div className="address_container">
                             <p>
                                {address}
                            </p>
                            <div>
                                <button 
                                onClick={toggleChooseLocation}
                                >
                                    Erase
                                </button>
                            </div>    
                        </div>
                        }
                        

                        <textarea className="description" name="description" rows="10" cols="30" maxLength="100" placeholder='Describe the incident...' ></textarea>
                    <div>
                        <label>When did this happen?</label>
                        <input type="date" id="complete_by" name="complete_by"/>
                        <input type="time" id="complete_by" name="complete_by"/>
                    </div>
                    <div className="form_btn_container">
                        <button className="form_btn" type='button'>Add Incident</button>
                        <button className="form_btn" type="button" onClick={toggleAddIncident}>
                            Cancel
                        </button>
                    </div>
                    
            </div>
        </form>
    )
}

export default AddIncident;