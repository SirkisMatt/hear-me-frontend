import React from 'react';
import ReactDOM from 'react-dom';
import MapDashboard from './MapDashboard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapDashboard/>, div);
  ReactDOM.unmountComponentAtNode(div);
});