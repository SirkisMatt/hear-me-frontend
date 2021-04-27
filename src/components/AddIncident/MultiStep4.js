import React from 'react'
import DatepickerComponent from '../Utils/DatepickerComponent'

const Step4 = (props) => {
    const {handleTimeChange, next, back, noTime } = props

    return (
        <form>
            <div className="input_container">
                <label id="time_title">When did this happen?</label>
                 <div className="time_input_container">
                    <DatepickerComponent handleTimeChange={(time) => handleTimeChange(time)}/>
                </div>
            </div>
            {noTime && <p className="no_item_error">Please select the time the incident occurred</p>}
            <div className="form_btn_container">
                <button className="form_btn" type="button" onClick={back}>Back</button> 
                <button className="form_btn" type="button" onClick={next}>Next</button> 
            </div>
        </form>
    )
}

export default Step4;