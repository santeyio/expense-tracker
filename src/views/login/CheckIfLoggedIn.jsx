import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkIfLoggedIn } from '../../api/auth';

import { LoadingPage } from '../components';

function CheckIfLoggedIn() {
  const navigate = useNavigate();

  async function check() {
    checkIfLoggedIn()
      .then(() => {
        navigate('/dash');
      }).catch(() => {
        navigate('/login');
      });
  }

  useEffect(() => {
    check();
  }, []);

  return <LoadingPage />;
}

export default CheckIfLoggedIn;
