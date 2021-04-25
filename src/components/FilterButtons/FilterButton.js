import React, {useContext, useEffect, useState} from 'react'
import IncidentContext from '../../contexts/incidentContext'
import './FilterButton.css'

function FilterButton({button, filterIncidents, active}) {
    const value = useContext(IncidentContext)
    const [filteredButtons, filterButtons] = useState(button)

    useEffect(() => {
        if(!value.loggedIn) {
            filterButtons(button.filter(cat => cat !== 'Yours'))
        }
         //call only needed once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="filter-container">
            {
                filteredButtons.map((cat, i) => {
                return  <button 
                        key={i} 
                        type="button" 
                        className={cat}  
                        style={{
                            opacity: (active === cat) ? "1" : ".8",
                            border: (active === cat) && "1px solid #000000"
                        }} 
                        onClick={() => filterIncidents(cat)}
                        >
                            {cat}
                        </button>
                })
            }
        </div>
    )
}

export default FilterButton;
