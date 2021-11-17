import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './styles/global.scss';
import { App } from './components/App';
import { Provider } from 'react-redux';
import store from './store';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config/firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import { Preloader } from './components/Preloader';

export const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      <Suspense fallback={<Preloader />}>
        <App />
      </Suspense>
    </Router>
  </Provider>,
  document.getElementById('root')
);
