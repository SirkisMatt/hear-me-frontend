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
import PrivateRoute from '../Utils/PrivateRoute'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import config from '../../config'
import Axios from 'axios'
import IncidentContext from '../../contexts/incidentContext'


function App() {

  const value = useContext(IncidentContext)

  useEffect(() => {
    Axios.get(`${config.API_ENDPOINT}/incident`)
        .then(res => {
            if (res.status === 200) {
                value.setIncidents(res.data)
              } else {
                throw new Error()
              }
        }).catch(err => {
            value.setError(err)
        })
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
          <PublicOnlyRoute 
          path={'/login'}
          component={LoginPage}
          />
          <PublicOnlyRoute 
          path={'/register'}
          component={RegistrationPage}
          />
          <Route 
          path={'/map'}
          component={MapPage}
          />
          <PrivateRoute 
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
