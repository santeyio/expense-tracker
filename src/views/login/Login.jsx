import React, { useState } from 'react';

// api
import { login } from '../../api/auth';

function Login() {
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const [ error, setError ] = useState();

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div>
          <h2 className="text-center mt-4 mb-5">Budget Tracker</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-3 login-box">

          <div className="row">
            <div className="col">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                className="form-control"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <label htmlFor="email" className="form-label">
                Password
              </label>
              <input
                className="form-control"
                id="email"
                type="password"
                placeholder="Password"
                value={email}
              />
            </div>
          </div>

          {error && (
            <div className="row mt-3">
              <div className="col">
                <span className="text-danger">{error}</span>
              </div>
            </div>
          )}

          <div className="row mt-3">
            <div className="col">
              <button
                className="btn btn-primary"
              >
                Login
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
