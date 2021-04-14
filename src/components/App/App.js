import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Header from '../Header/Header'
import LandingPage from '../../Routes/LandingPage/LandingPage'
import LoginPage from '../../Routes/LoginPage/LoginPage'
import RegistrationPage from '../../Routes/RegistrationPage/RegistrationPage'
import MapPage from '../../Routes/MapPage/MapPage'
import MapDashboard from '../../Routes/MapDashboard/MapDashboard'


function App() {

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
