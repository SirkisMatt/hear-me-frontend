import React, {Component} from 'react'

const IncidentContext = React.createContext({
    incidents: [],
    user: {},
    userIncidents: [],
    selectedIncident: null,
    location: [],
    loggedIn: false,
    error: null,
    setError: () => {},
    clearError: () => {},
    setIncidents: () => {},
    setUserIncidents: () => {},
    deleteIncident: () => {},
    editIncident: () => {},
    addIncident: () => {},
    setSelectedIncident: () => {},
    setLocation: () => {},
    addUser: () => {},
    toggleLoggedIn: () => {}
})

export default IncidentContext

export class IncidentProvider extends Component {
    state = {
        incidents: [],
        user: {},
        userIncidents: [],
        selectedIncident: null,
        location: [],
        loggedIn: false,
        error: null
    }

    setIncidents = incidents => {
        this.setState({incidents})
    }

    setSelectedIncident = selectedIncident => {
        this.setState({selectedIncident})
    }

    addUser = user => {
        this.setState({user})
    }

    setUserIncidents = userIncidents => {
        this.setState({userIncidents}) 
    }

    addIncident = incident => {
        const mergeUserIncidents = [...this.state.userIncidents, incident]
        const mergeAllIncidents = [...this.state.incidents, incident]
        this.setState({
            incidents: mergeAllIncidents,
            userIncidents: mergeUserIncidents
        })
    }

    deleteIncident = incidentId => {
        const filterUserIncidents = this.state.userIncidents.filter(incident => incident.id !== incidentId)
        const filterIncidents = this.state.incidents.filter(incident => incident.id !== incidentId)
        this.setState({
            incidents: filterIncidents,
            userIncidents: filterUserIncidents
        })
    }

    editIncident = incidentToEdit => {
           //get index of index to edit
    let indexUser = this.state.userIncidents.findIndex((incident => incident.id === incidentToEdit.id))
    let index = this.state.incidents.findIndex((incident => incident.id === incidentToEdit.id))

    let userIncidents = this.state.userIncidents
    let incidents = this.state.incidents
    userIncidents[indexUser] = incidentToEdit
    incidents[index] = incidentToEdit

    this.setState({
        incidents: incidents,
        userIncidents: userIncidents
    })

    }

    setLocation = location => {
        this.setState({location})
    }

    toggleLoggedIn = loggedIn => {
        this.setState({loggedIn})
    }

    setError = error => {
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    render() {
        const value = {
            incidents: this.state.incidents,
            user: this.state.user,
            userIncidents: this.state.userIncidents,
            selectedIncident: this.state.selectedIncident,
            location: this.state.location,
            loggedIn: this.state.loggedIn,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setIncidents: this.setIncidents,
            setUserIncidents: this.setUserIncidents,
            addIncident: this.addIncident,
            deleteIncident: this.deleteIncident,
            editIncident: this.editIncident,
            addUser: this.addUser,
            toggleLoggedIn: this.toggleLoggedIn,
            setSelectedIncident: this.setSelectedIncident,
            setLocation: this.setLocation
        }
        return (
            <IncidentContext.Provider value={value} >
                {this.props.children}
            </IncidentContext.Provider>
        )
    }

}

