import React, { useEffect, useState } from 'react';
import { checkIfLoggedIn } from '../api/auth';

export function useAuth() {
  const [ loggedIn, setLoggedIn ] = useState(undefined);

  useEffect(() => {
    checkIfLoggedIn()
      .then(() => setLoggedIn(true))
      .catch(() => setLoggedIn(false));
  }, []);

  return loggedIn;
}
