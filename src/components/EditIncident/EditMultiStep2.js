import React, { useEffect, useContext } from 'react'
import IncidentContext from '../../contexts/incidentContext'
import Axios from 'axios'

const Step2 = (props) => {
    const { data, nextLocation, backLocation, toggleChooseLocation, chooseLocation, setAddress } = props
    const value = useContext(IncidentContext)

    const req = value.location[0] + ',' + value.location[1]
    

    useEffect(() => {
        if(chooseLocation) {
            
            Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${req}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
            .then(res => {
                setAddress(res.data.features[0].place_name)
            })
            .catch(err => {
                setAddress("Sorry there was a problem fetching that address")
            })
        }
    }, [value.location])

    return (
        <form>
             <div className="input_container">
                        {!chooseLocation
                            ?
                            <div className="address_container">
                            <button className="location_btn" type='button' onClick={() => toggleChooseLocation(true)}>Change Location</button>
                            <p>
                            {data.address}
                            </p>
                            </div>
                            :
                            <div className="address_container">
                                <p>
                                    {data.address}
                                </p>
                                <button 
                                onClick={() => toggleChooseLocation(false)}
                                id="erase_btn"
                                >
                                    Erase
                                </button>
                            </div>
                        }
                        <div className="form_btn_container">
                            <button className="form_btn" type="button" onClick={backLocation}>Back</button> 
                            <button className="form_btn" type="button" disabled={value.location.length === 0} onClick={nextLocation}>Next</button>
                        </div>
                    </div>
        </form>
    )
}

export default Step2;