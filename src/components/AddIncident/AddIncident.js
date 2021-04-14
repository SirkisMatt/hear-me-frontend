import React, {useState, useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './AddIncident.css'
import IncidentContext from '../../contexts/incidentContext'

function AddIncident({toggleAddIncident}) {
    const value = useContext(IncidentContext)

    console.log(value.location)
    return (
        <form className="add_incident_form">
            <div className="form_content div_height">
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
                            <option value="Sexual Assault">
                                Sexual Assault
                            </option>
                            <option value="Physical Assault">
                                Physical Assault
                            </option>
                            <option value="Verbal Assault">
                                Verbal Assault
                            </option>
                        </select>
                    </div>
                </div>
                        <button className="location_btn" type='button'>Choose location on Map</button>

                        <textarea className="description" name="description" rows="10" cols="30" maxLength="100" placeholder='Describe the incident...' ></textarea>
                    <div>
                        <label>When did this happen?</label>
                        <input type="date" id="complete_by" name="complete_by"/>
                    </div>
                    <button className="form_btn" type='button'>Add Incident</button>
                    <button className="form_btn" type="button" onClick={toggleAddIncident}>
                        Cancel
                    </button>
            </div>
        </form>
    )
}

export default AddIncident;