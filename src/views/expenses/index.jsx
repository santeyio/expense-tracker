import React from 'react';
import { Routes, Route } from 'react-router-dom';

// components
import ExpenditureRouter from './expenditures';
import Categories from './categories';
import Beneficiaries from './beneficiaries';
import { ProtectedRoute as PR } from '../components';

function ExpenseRouter() {
  return (
    <Routes>
      <Route path="/categories" element={<PR><Categories /></PR>} />
      <Route path="/beneficiaries" element={<PR><Beneficiaries /></PR>} />
      <Route path="/expenditure/*" element={<PR><ExpenditureRouter /></PR>} />
    </Routes>
  );
}

export default ExpenseRouter;
