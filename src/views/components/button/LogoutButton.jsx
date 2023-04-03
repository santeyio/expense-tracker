import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../api/auth';

function LogoutButton({ redirect = '/login' }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={() => {
        logout();
        navigate(redirect);
        dispatch({ type: 'CLEAR' });
      }}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
