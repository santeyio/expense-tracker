import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import store from './store.js'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
// serviceWorker.unregister();
