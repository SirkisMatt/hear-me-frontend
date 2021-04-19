import React from 'react'

const Submit = (props) => {
    const { back, submit, toggleAddIncident } = props
    return (
        <div className="input_container">
            <button id="form_submit_btn" className="form_btn" type="button" onClick={submit}>Submit</button>
            
            <div className="form_btn_container">
                <button className="form_btn" type="button" onClick={back}>Back</button> 
                <button className="form_btn" type="button" onClick={toggleAddIncident}>Cancel</button>
            </div>
           
        </div>
    )
}

export default Submit;