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
          <a
            role="button"
            className="link"
            onClick={() => navigate('/wat')}
          >
            wat
          </a>
        </div>
        <div className="col border">
          <a
            role="button"
            className="link"
            onClick={() => navigate('/lol')}
          >
            lol
          </a>
        </div>
      </div>
    </div>
  );
}

export default Main;
