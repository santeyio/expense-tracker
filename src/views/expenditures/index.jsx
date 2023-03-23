import React, { useEffect } from 'react';
/* eslint-disable */
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

// api
import { getCategories } from '../../api/category';
import { getBeneficiaries } from '../../api/beneficiary';

// components
import AddExpenditure from './AddExpenditure';

function ExpenditureRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    getCategories()
      .then(data => dispatch({ type: 'SET_EXPENDITURE_KEY', payload: { categories: data } }));
    getBeneficiaries()
      .then(data => dispatch({ type: 'SET_EXPENDITURE_KEY', payload: { beneficiaries: data } }));
  }, []);

  return (
    <Routes>
      <Route path="add" element={<AddExpenditure />} />
    </Routes>
  );
}

export default ExpenditureRouter;
