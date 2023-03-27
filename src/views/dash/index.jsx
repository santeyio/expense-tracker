import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ListenForExpenditures } from '../../sockets/expenditure';

function Main() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="d-flex col-md-6 border justify-content-center py-5">
          <button
            type="button"
            className="btn btn-outline-primary fw-bold"
            onClick={() => navigate('/expenditure/add')}
          >
            Add Expenditure
          </button>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="d-flex col-md-6 border justify-content-center py-5">
          wat
        </div>
      </div>

      <ListenForExpenditures />
    </div>
  );
}

export default Main;
