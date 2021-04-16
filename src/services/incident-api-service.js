// import React, {Component} from 'react'
// import Axios from 'axios'
// import config from '../config'
// import IncidentContext from '../contexts/incidentContext'

// class IncidentApiService extends Component  {

//     static contextType = IncidentContext
//     static getIncidents() {
//          Axios.get(`${config.API_ENDPOINT}/incidents`)
//             .then(res => {
//                 if (res.status === 200) {
//                     this.context.setIncidents(res.data)
//                   } else {
//                     throw Error
//                   }
//             }).catch(err => {
//                 console.log(err)
//             })
//     }
// }

// export default IncidentApiService