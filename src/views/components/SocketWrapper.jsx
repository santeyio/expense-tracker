import React from 'react';

import { ListenForExpenditures } from '../../sockets/expenditure';

function SocketWrapper({ children }) {
  return (
    <div className="container-fluid">

      {children}

      <ListenForExpenditures />
    </div>
  );
}

export default SocketWrapper;
