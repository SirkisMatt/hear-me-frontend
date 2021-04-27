import React, { useState, useContext } from 'react'
import Step1 from "./MultiStep1";
import Step2 from "./MultiStep2";
import Step3 from "./MultiStep3";
import Step4 from "./MultiStep4";
import Submit from "./MultiStepSubmit";
import {config} from '../../config'
import Axios from 'axios'
import IncidentContext from '../../contexts/incidentContext'

const MultiStepForm = (props) => {
    const value = useContext(IncidentContext)
    const { toggleChooseLocation, chooseLocation, toggleAddIncident, token } = props
    const [currentStep, setCurrentStep] = useState(1)
    const [noTypeInput, toggleTypeInputError] = useState(false)
    const [noLocation, toggleNoLocationError] = useState(false)
    const [noTime, toggleTimeInputError] = useState(false)
    const [formData, setFormData] = useState({
        type: "",
        coordinates: value.location,
        address: "",
        description: "",
        timeOfIncident: ""
    })

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        })
    }

    function handleTypeChange(event) {
        setFormData({
            ...formData,
            type: event.target.value,
        })
    }

    const handleTimeChange = (time) => {
        setFormData({
            ...formData,
            timeOfIncident: time
        })
    }

    const setAddress = (address) => {
        setFormData({
            ...formData,
            address: address
        })
    }

    const nextType = () => {
        if(formData.type.length === 0) {
            toggleTypeInputError(true)
        } else {
            setCurrentStep(currentStep + 1)
            toggleTypeInputError(false)
        }        
    }

    const nextLocation = () => {
        if(formData.address.length === 0) {
            toggleNoLocationError(true)
        } else {
            setCurrentStep(currentStep + 1)
            toggleChooseLocation(false)
            toggleNoLocationError(false)
        }
    }

    const nextDescription = () => {
        setCurrentStep(currentStep + 1)
    }

    const nextTime = () => {
        if(formData.timeOfIncident.length === 0) {
            toggleTimeInputError(true)
        } else {
            setCurrentStep(currentStep + 1)
            toggleTimeInputError(false)
        }        
    }

    const back = () => {
        setCurrentStep(currentStep - 1)
    }
    const backLocation = () => {
        setCurrentStep(currentStep - 1)
        toggleChooseLocation(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post(`${config.API_ENDPOINT}/incident`, 
                {
                    timeOfIncident: formData.timeOfIncident,
                    type: formData.type,
                    description: formData.description,
                    coordinates: value.location,
                },
                {
                    headers: {
                        'authorization': `bearer ${token}`,
                    }
                }
            )
            .then(res => {
                if(res.status === 201) {
                    value.addIncident(res.data)
                }
            })
            .catch(error => {
                if(!error.response.data.error) {
                    alert('Sorry there was a problem processing your request')
                }
                else if(error.response.data.error === 400 &&error.response.data.error) {
                    alert(error.response.data.error)
                } else {
                    alert('Sorry there was a problem processing your request')
                }
            })
            toggleAddIncident()
            window.scroll(0,670)
    }

    switch (currentStep) {
        case 1:
            return (
                <Step1 
                data={formData}
                toggleAddIncident={toggleAddIncident}
                handleTypeChange={handleTypeChange}
                next={nextType}
                noTypeInput={noTypeInput}
                />
            )
        case 2:
            return (
                <Step2 
                data={formData}
                setAddress={(address) => setAddress(address)}
                toggleChooseLocation={toggleChooseLocation}
                chooseLocation={chooseLocation}
                toggleAddIncident={toggleAddIncident}
                noLocation={noLocation}
                nextLocation={nextLocation}
                backLocation={backLocation}
                />
            )
        case 3: 
            return (
                <Step3 
                data={formData}
                handleChange={handleChange}
                toggleAddIncident={toggleAddIncident}
                next={nextDescription}
                back={back}
                />
            )
        case 4:
            return (
                <Step4 
                data={formData}
                handleTimeChange={(time) => handleTimeChange(time)}
                toggleAddIncident={toggleAddIncident}
                noTime={noTime}
                next={nextTime}
                back={back}
                />
            ) 
        default:
            return <Submit data={formData} back={back} submit={handleSubmit} toggleAddIncident={toggleAddIncident} />
    }

}

export default MultiStepForm;


