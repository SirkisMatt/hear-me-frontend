import React from 'react'

function FilterButton({button, filter}) {
    return (
        <div>
            {
                button.map((cat, i) => {
                    return <button></button>
                })
            }
        </div>
    )
}