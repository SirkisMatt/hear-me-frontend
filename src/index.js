import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './components/App/App.js'
import { IncidentProvider } from './contexts/incidentContext'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <IncidentProvider >
      <App /> 
    </IncidentProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

reportWebVitals();
