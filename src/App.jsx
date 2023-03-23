import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Dash from './views/dash';
import LoginRouter from './views/login';
import ExpenditureRouter from './views/expenditures';
import { ProtectedRoute } from './components';

import './index.scss';

function App() {
  const PR = ProtectedRoute;
  return (
    <Routes>
      <Route path="*" element={<LoginRouter />} />
      <Route path="/dash" element={<PR><Dash /></PR>} />
      <Route path="/expenditure/*" element={<PR><ExpenditureRouter /></PR>} />
    </Routes>
  );
}

export default connect(
  () => ({ }),
  {},
)(App);
