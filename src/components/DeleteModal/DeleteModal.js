import React, {useContext} from 'react';
import './DeleteModal.css'
import Axios from 'axios'
import {config} from '../../config'
import IncidentContext from '../../contexts/incidentContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


function DeleteModal(props) {

    const value = useContext(IncidentContext)

    const {idToDelete, toggleDeleteModal, token, show} = props

    const deleteIncident = () => {
        Axios.delete(`${config.API_ENDPOINT}/incident/${idToDelete}`, {
            headers: {
                'authorization': `bearer ${token}`,
              }
        })
            .then(res => {
                if(res.status === 204) {
                    value.deleteIncident(idToDelete)
                }
            })
            .catch(err => {
                alert("Sorry there was a problem processing your request")
            }) 
        toggleDeleteModal(false)
    }


    return(
        <div className={`modal_deleted_incident`} style={{ display: show ? 'block' : 'none'}}>
        <div className="overlay_deleted_incident" ></div>
            <div className="modal_content_deleted_incident">

                <div>
                    <h2>Are you sure you want to delete this incident?</h2>
                        <div className="delete_modal_btn_container">
                            <button
                            className="delete_modal_btn"  
                            onClick={() => deleteIncident()}
                            >
                                Delete
                            </button>
                            <button
                            className="delete_modal_btn"  
                            onClick={() => toggleDeleteModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                        <button title="Close" className="close_modal" onClick={() => toggleDeleteModal(false)}>
                            <FontAwesomeIcon className="close_icon" icon={faTimes}/>
                        </button>
                </div>
            </div>
    </div>
    )
}

export default DeleteModal;