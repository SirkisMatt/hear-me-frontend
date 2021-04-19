import React from 'react'

const Step4 = (props) => {
    const { data, handleTimeChange, next, back, toggleAddIncident } = props
    const handleAddTime = (e) => {
        e.preventDefault()
        let time = e.target['date'].value + e.target['time'].value
        handleTimeChange(time)
    }

    return (
        <form onSubmit={(e) => handleAddTime(e)}>
            <div className="column">
                <label>When did this happen?</label>
                {(data.timeOfIncident.length > 0) && data.timeOfIncident}
                    <input type="date" className="complete_by" name="date"/>
                    <input type="time" className="complete_by" name="time"/>
                    {(data.timeOfIncident.length === 0) ? <button type="submit">Add time</button> : <button type="submit">Change time</button> }
            </div>
            <button className="form_btn" type="button" onClick={toggleAddIncident}>Cancel</button>
            <button className="form_btn" type="button" onClick={back}>Back</button> 
            <button className="form_btn" type="button" onClick={next}>Next</button>
        </form>
    )
}

export default Step4;