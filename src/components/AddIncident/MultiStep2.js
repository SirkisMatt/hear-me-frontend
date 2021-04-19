import React, {useState, useEffect, useContext} from 'react'
import config from '../../config'
import IncidentContext from '../../contexts/incidentContext'
import Axios from 'axios'

const Step2 = (props) => {
    const { data, nextLocation, backLocation, toggleChooseLocation, chooseLocation, toggleAddIncident, setAddress } = props
    const value = useContext(IncidentContext)

    const req = value.location[0] + ',' + value.location[1]
    

    useEffect(() => {
        if(chooseLocation) {
            
            Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${req}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
            .then(res => {
                setAddress(res.data.features[0].place_name)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [value.location])

    return (
        <form>
             <div className="column">
                        {!chooseLocation
                            ?
                            <button className="location_btn" type='button' onClick={() => toggleChooseLocation(true)}>Choose location on Map</button>
                            :
                            <div className="address_container">
                                <p>
                                    {data.address}
                                </p>
                                <div>
                                    <button 
                                    onClick={() => toggleChooseLocation(false)}
                                    >
                                        Erase
                                    </button>
                                </div>    
                            </div>
                        }
                        <button className="form_btn" type="button" onClick={toggleAddIncident}>Cancel</button>
                        <button className="form_btn" type="button" onClick={backLocation}>Back</button> 
                        <button className="form_btn" type="button" onClick={nextLocation}>Next</button>
                    </div>
        </form>
    )
}

export default Step2;