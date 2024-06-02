import React from 'react';
import { Routes, Route } from 'react-router-dom';

// components
import { ToDashButton, SocketWrapper } from '../../components';
import AddExpenditure from './AddExpenditure';
import List from './list';
import Insights from './insights';

function ExpenditureRouter() {
  return (
    <SocketWrapper>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mt-3">
            <ToDashButton />
          </div>
          <Routes>
            <Route path="add" element={<AddExpenditure />} />
            <Route path="List" element={<List />} />
            <Route path="insights" element={<Insights />} />
          </Routes>
        </div>
      </div>
    </SocketWrapper>
  );
}

export default ExpenditureRouter;
