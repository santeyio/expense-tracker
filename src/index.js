import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import { store, persistor } from './store.js';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Router>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Router>
);
// serviceWorker.unregister();
