import React, { useState, useContext } from 'react'
import Step1 from "./MultiStep1";
import Step2 from "./MultiStep2";
import Step3 from "./MultiStep3";
import Step4 from "./MultiStep4";
import Submit from "./MultiStepSubmit";
import config from '../../config'
import Axios from 'axios'
import IncidentContext from '../../contexts/incidentContext'

const MultiStepForm = (props) => {
    const value = useContext(IncidentContext)
    const { toggleChooseLocation, chooseLocation, toggleAddIncident } = props
    const [currentStep, setCurrentStep] = useState(1)
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

    const next = () => {
        setCurrentStep(currentStep + 1)
    }
    const nextLocation = () => {
        setCurrentStep(currentStep + 1)
        toggleChooseLocation(false)
    }

    const back = () => {
        setCurrentStep(currentStep - 1)
    }
    const backLocation = () => {
        setCurrentStep(currentStep - 1)
        toggleChooseLocation(false)
    }

    const handleSubmit = () => {
        Axios.post(`${config.API_ENDPOINT}/incidents`, {
            userId: value.user.id,
            userName: value.user.userName,
            timeOfIncident: formData.timeOfIncident,
            type: formData.type,
            description: formData.description,
            coordinates: value.location,
        })
            .then(res => {
                value.addIncident(res.data)
                toggleAddIncident()
            })
            .catch(err => {
                console.log(err)
            })
    }

    switch (currentStep) {
        case 1:
            return (
                <Step1 
                data={formData}
                toggleAddIncident={toggleAddIncident}
                handleTypeChange={handleTypeChange}
                next={next}
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
                next={next}
                back={back}
                />
            )
        case 4:
            return (
                <Step4 
                data={formData}
                handleTimeChange={(time) => handleTimeChange(time)}
                toggleAddIncident={toggleAddIncident}
                next={next}
                back={back}
                />
            ) 
        default:
            return <Submit data={formData} back={back} submit={handleSubmit} toggleAddIncident={toggleAddIncident} />
    }

}

export default MultiStepForm;