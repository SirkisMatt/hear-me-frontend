import React from 'react'

const Submit = (props) => {
    const { back, submit, toggleAddIncident } = props
    return (
        <div>
            <button className="form_btn" type="button" onClick={toggleAddIncident}>Cancel</button>
            <button className="form_btn" type="button" onClick={back}>Back</button> 
            <button className="form_btn" type="button" onClick={submit}>Submit</button>
        </div>
    )
}

export default Submit;