import React from 'react';

function LoadingPage() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="d-flex col-md-12 justify-content-center align-items-center"
          style={{ height: '100%', position: 'absolute' }}
        >
          <div
            className="spinner-border"
            role="status"
            style={{ width: '75px', height: '75px' }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
