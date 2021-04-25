import React, { useState, useContext, useEffect } from 'react'
import Step1 from "./EditMultiStep1";
import Step2 from "./EditMultiStep2";
import Step3 from "./EditMultiStep3";
import Step4 from "./EditMultiStep4";
import Submit from "./EditMultiStepSubmit";
import {config} from '../../config'
import Axios from 'axios'
import IncidentContext from '../../contexts/incidentContext'

const EditMultiStepForm = (props) => {
    const value = useContext(IncidentContext)
    const { toggleChooseLocation, chooseLocation, toggleEdit, incidentToEdit, incidentToEditAddress, token } = props
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        type: incidentToEdit.type,
        coordinates: incidentToEdit.coordinates,
        address: incidentToEditAddress,
        description: incidentToEdit.description,
        timeOfIncident: incidentToEdit.timeOfIncident
    })

    useEffect(() => {
        setFormData({
            ...formData,
            coordinates: value.location,
        })
         //do not want to reset form data
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value.location])

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

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.patch(`${config.API_ENDPOINT}/incident/${incidentToEdit.id}`, 
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
                    value.editIncident(res.data)
                }
            })
            .catch(error => {
                alert(error.response.data.error)
            })    
        toggleEdit()
    }

    switch (currentStep) {
        case 1:
            return (
                <Step1 
                data={formData}
                toggleEdit={toggleEdit}
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
                nextLocation={nextLocation}
                backLocation={backLocation}
                />
            )
        case 3: 
            return (
                <Step3 
                data={formData}
                handleChange={handleChange}
                next={next}
                back={back}
                />
            )
        case 4:
            return (
                <Step4 
                data={formData}
                handleTimeChange={(time) => handleTimeChange(time)}
                next={next}
                back={back}
                />
            ) 
        default:
            return <Submit data={formData} back={back} submit={handleSubmit} toggleEdit={toggleEdit} />
    }

}

export default EditMultiStepForm;