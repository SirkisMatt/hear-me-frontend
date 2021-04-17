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
    addIncident: () => {},
    setSelectedIncident: () => {},
    setLocation: () => {}
})

export default IncidentContext

export class IncidentProvider extends Component {
    state = {
        incidents: [],
        user: {},
        userIncidents: [],
        selectedIncident: null,
        location: [],
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

    setLocation = location => {
        this.setState({location})
    }

    toggleLoggedIn = loggedIn => {
        this.setState({loggedIn})
    }

    setError = error => {
        console.log(error)
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
