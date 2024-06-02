import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Dash from './views/dash';
import LoginPage from './views/login/Login';
import CheckIfLoggedIn from './views/login/CheckIfLoggedIn';
import { ProtectedRoute as PR } from './views/components';
import ExpenseRouter from './views/expenses';

import './index.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CheckIfLoggedIn />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dash" element={<PR><Dash /></PR>} />
      <Route path="/expenses/*" element={<PR><ExpenseRouter /></PR>} />
    </Routes>
  );
}

export default connect(
  () => ({ }),
  {},
)(App);
