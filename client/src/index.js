import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import store from './store/store';
import { Provider } from 'react-redux';

const Container = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>
    <Container />
  </React.StrictMode>,
  document.getElementById('root')
);
