import React from 'react';
import { Routes, Route } from 'react-router-dom';

// components
import AddExpenditure from './AddExpenditure';

function ExpenditureRouter() {
  return (
    <Routes>
      <Route path="add" element={<AddExpenditure />} />
    </Routes>
  );
}

export default ExpenditureRouter;
