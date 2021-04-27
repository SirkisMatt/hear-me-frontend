import React from 'react'

const Step3 = (props) => {
    const { data, handleChange, next, back } = props
    return (
        <form>
            <div className="input_container">
                <textarea className="description" name="description" rows="10" cols="30" maxLength="200" value={data.description} onChange={handleChange} placeholder='Describe the incident...' ></textarea>
            </div>

            <div className="form_btn_container">
                <button className="form_btn" type="button" onClick={back}>Back</button> 
                <button className="form_btn" type="button" onClick={next}>Next</button>
            </div>
        </form>
    )
}

export default Step3;