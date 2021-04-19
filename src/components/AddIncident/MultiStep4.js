import React from 'react'
import DatepickerComponent from '../Utils/DatepickerComponent'

const Step4 = (props) => {
    const { data, handleTimeChange, next, back } = props
    const handleAddTime = (e) => {
        e.preventDefault()
        if((e.target['date'].value.length > 0) && (e.target['time'].value.length > 0)) {
            let time = e.target['date'].value + e.target['time'].value
            handleTimeChange(time)
            console.log(e.target['date'].value.toDateString())
        }
        
    }

// const clearTime = () => {

// }

    return (
        <form onSubmit={(e) => handleAddTime(e)}>
            <div className="input_container">
                <label id="time_title">When did this happen?</label>
                {(data.timeOfIncident.length > 0)
                 ? 
                 <div id="time_container" >
                    <p id="time">{data.timeOfIncident}</p>
                    <button className="form_btn" onClick={() => handleTimeChange("")}>Change time</button> 
                 </div>
                 :
                <div className="time_input_container">
                    <DatepickerComponent />
                </div>
                 }
                
            </div>
            <div className="form_btn_container">
                <button className="form_btn" type="button" onClick={back}>Back</button> 
                {(data.timeOfIncident.length > 0) ? <button className="form_btn" type="button" onClick={next}>Next</button> : <button className="form_btn" type="submit">Add time</button>  }
                
            </div>
        </form>
    )
}

export default Step4;