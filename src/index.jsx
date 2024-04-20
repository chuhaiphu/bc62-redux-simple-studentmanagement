import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import mainStore from './store'
// ? import Component Provider để kết nối store với components của react
// * Component Provider chứa props là store
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={mainStore}>
    <App />
  </Provider>
);

