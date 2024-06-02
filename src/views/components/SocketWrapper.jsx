import React from 'react';

import {
  ListenForExpenditures,
  ListenForCategories,
} from '../../sockets/expenses';

function SocketWrapper({ children }) {
  return (
    <div className="container-fluid">

      {children}

      <ListenForExpenditures />
      <ListenForCategories />
    </div>
  );
}

export default SocketWrapper;
