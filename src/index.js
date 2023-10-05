import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';

// every component in the component tree inside the <Provider/> component has access to the store being passed down as a predefined attribute, meaning that it must be named store. It is not a customizable react state
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
);
