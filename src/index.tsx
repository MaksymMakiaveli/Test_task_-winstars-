import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.scss';
import { App } from './components/App';
import { Provider } from 'react-redux';
import store from './store';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config/firebase';

export const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
