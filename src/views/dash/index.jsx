import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ListenForExpenditures } from '../../sockets/expenditure';

import { LogoutButton } from '../components';

function Main() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="d-flex col-md-12 justify-content-end">
          <div>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="d-flex col-md-6 border justify-content-center py-4">
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
        <div className="d-flex col-md-6 border justify-content-center py-4">
          <button
            type="button"
            className="btn btn-outline-info fw-bold"
            onClick={() => navigate('/categories')}
          >
            Categories
          </button>
          <button
            type="button"
            className="btn btn-outline-info fw-bold ms-4"
            onClick={() => navigate('/beneficiaries')}
          >
            Beneficiaries
          </button>
        </div>
      </div>

      <ListenForExpenditures />
    </div>
  );
}

export default Main;
