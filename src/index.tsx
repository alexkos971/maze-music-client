import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router} from 'react-router-dom';
import './styles/__app.scss';

import {Provider} from "react-redux";
import { store } from "./store/rootReducer"; 
// import {createStore, compose} from "redux";
// import { rootReducer } from './store/rootReducer';

import App from './App';
import reportWebVitals from './reportWebVitals';

import i18n from "./i18n";
import { I18nextProvider } from 'react-i18next';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <I18nextProvider { ...{i18n} }>
    <React.StrictMode>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </React.StrictMode>
  </I18nextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
