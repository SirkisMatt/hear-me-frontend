import React from 'react'

const Step3 = (props) => {
    const { data, handleChange, next, back, toggleAddIncident } = props
    return (
        <form>
            <div className="column">
                <textarea className="description" name="description" rows="10" cols="30" maxLength="200" value={data.description} onChange={handleChange} placeholder='Describe the incident...' ></textarea>
            </div>
            <button className="form_btn" type="button" onClick={toggleAddIncident}>Cancel</button>
            <button className="form_btn" type="button" onClick={back}>Back</button> 
            <button className="form_btn" type="button" onClick={next}>Next</button>
        </form>
    )
}

export default Step3;