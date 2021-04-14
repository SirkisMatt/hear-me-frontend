import React, {Component} from 'react'

const IncidentContext = React.createContext({
    incidents: [],
    selectedIncident: null,
    location: [],
    error: null,
    setError: () => {},
    clearError: () => {},
    setIncidents: () => {},
    setSelectedIncident: () => {},
    setLocation: () => {}
})

export default IncidentContext

export class IncidentProvider extends Component {
    state = {
        incidents: [],
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

    setLocation = location => {
        this.setState({location})
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
            selectedIncident: this.state.selectedIncident,
            location: this.state.location,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setIncidents: this.setIncidents,
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
