import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkIfLoggedIn, logout } from '../../api/auth';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    checkIfLoggedIn()
      .then(() => null)
      .catch(() => {
        logout();
        navigate('/login');
      });
  }, []);

  return children;
}

export default ProtectedRoute;
