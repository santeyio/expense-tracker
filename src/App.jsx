import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Dash from './views/dash';
import LoginPage from './views/login/Login';
import CheckIfLoggedIn from './views/login/CheckIfLoggedIn';
import ExpenditureRouter from './views/expenditures';
import Categories from './views/categories';
import Beneficiaries from './views/beneficiaries';
import { ProtectedRoute } from './views/components';

import './index.scss';

function App() {
  const PR = ProtectedRoute;
  return (
    <Routes>
      <Route path="/" element={<CheckIfLoggedIn />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dash" element={<PR><Dash /></PR>} />
      <Route path="/categories" element={<PR><Categories /></PR>} />
      <Route path="/beneficiaries" element={<PR><Beneficiaries /></PR>} />
      <Route path="/expenditure/*" element={<PR><ExpenditureRouter /></PR>} />
    </Routes>
  );
}

export default connect(
  () => ({ }),
  {},
)(App);
