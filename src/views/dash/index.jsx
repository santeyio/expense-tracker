import React from 'react';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col border">
          MAIN.
        </div>
        <div className="col border">
          <button
            type="button"
            className="link"
            onClick={() => navigate('/expenditure/add')}
          >
            Add Expenditure
          </button>
        </div>
        <div className="col border">
          <button
            type="button"
            className="link"
            onClick={() => navigate('/lol')}
          >
            lol
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
