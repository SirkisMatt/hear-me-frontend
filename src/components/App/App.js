import React, {useContext, useEffect} from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Header from '../Header/Header'
import LandingPage from '../../Routes/LandingPage/LandingPage'
import LoginPage from '../../Routes/LoginPage/LoginPage'
import RegistrationPage from '../../Routes/RegistrationPage/RegistrationPage'
import MapPage from '../../Routes/MapPage/MapPage'
import MapDashboard from '../../Routes/MapDashboard/MapDashboard'
import NotFoundPage from '../../Routes/NotFoundPage/NotFoundPage'
import config from '../../config'
import * as incidentData from '../../data/incidents.json'
import IncidentContext from '../../contexts/incidentContext'


function App() {

  const value = useContext(IncidentContext)

  useEffect(() => {
    // Axios.get(`${config.API_ENDPOINT}/incidents`)
    //     .then(res => {
    //         if (res.status === 200) {
    //             value.setIncidents(res.data)
    //           } else {
    //             throw new Error()
    //           }
    //     }).catch(err => {
    //         value.setError(err)
    //     })
        value.setIncidents(incidentData.incidents)
}, [])

  const renderMainRoutes = () => {
    return (
      <>
        <Switch>
          <Route 
          exact
          path={'/'}
          component={LandingPage}
          />
          <Route 
          path={'/login'}
          component={LoginPage}
          />
          <Route 
          path={'/register'}
          component={RegistrationPage}
          />
          <Route 
          path={'/map'}
          component={MapPage}
          />
           <Route 
          path={'/map-dashboard'}
          component={MapDashboard}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </>
    )
  
  }

  return (
    <div className="App">
      <header className="App-header"> 
        <Header />
      </header>
      <main>
        {renderMainRoutes()}
      </main>
    </div>
  );
}

export default App;
