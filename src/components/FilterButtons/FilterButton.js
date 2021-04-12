import React from 'react'
import './FilterButton.css'

function FilterButton({button, filterIncidents, active}) {
    return (
        <div className="filter-container">
            {
                button.map((cat, i) => {
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
