import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkIfLoggedIn } from '../api/auth';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    checkIfLoggedIn()
      .then(() => null)
      .catch(() => navigate('/login'));
  }, []);

  return children;
}

export default ProtectedRoute;
