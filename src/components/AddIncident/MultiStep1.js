import React from 'react'

const Step1 = (props) => {
    const { handleTypeChange, toggleAddIncident, next, noTypeInput } = props
    return (
        <form>
             <div className="input_container">
                <label id="type_label" htmlFor="incident_type">What type of incident is this?</label>
                    <div className="incident_dropdown">
                        <div className="select">
                            <select className="drop_down" name="incidentOptions" id="goal-options" onChange={handleTypeChange}>
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
                    {noTypeInput && <p className="no_item_error">Please select an incident type</p>}
                <div className="form_btn_container">
                    <button className="form_btn" type="button" onClick={toggleAddIncident}>Cancel</button>
                    <button className="form_btn" type="button" onClick={next}>Next</button>
                </div>
            </div>
        </form>
    )
}

export default Step1;