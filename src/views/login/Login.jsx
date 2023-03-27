import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
/* eslint-disable */

// api + utils
import { login } from '../../api/auth';
import { getSelf } from '../../api/user';
import { parseError } from '../../utils/error';
import { getExpenditureHistory } from '../../api/expenditure';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ username, setUsername ] = useState();
  const [ password, setPassword ] = useState();
  const [ error, setError ] = useState();

  async function attemptLogin() {
    try {
      // load token
      const token = await login(username, password);
      localStorage.setItem('SessionToken', token);

      // load user
      const user = await getSelf()
      dispatch({ type: 'SET_USER_FIELDS', fields: user });

      // load expenditures
      const expenditures = await getExpenditureHistory();
      console.log('expenditures: ', expenditures);
      dispatch({ type: 'ADD_EXPENDITURES', expenditures });

      navigate('/dash');
    } catch (err) {
      console.log(err);
      setError(String(err));
    }
  }

  function handlePasswordChange(e) {
    const { value } = e.target;
    if (e.key === 'Enter') {
      attemptLogin();
    } else {
      setPassword(value);
    }
  }

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
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                className="form-control"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                className="form-control"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
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

          <div className="row mt-4">
            <div className="col">
              <button
                role="button"
                className="btn btn-primary"
                onClick={attemptLogin}
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
