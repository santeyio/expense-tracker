import React from 'react';

import { ToDashButton, SocketWrapper } from '../components';

function Beneficiaries() {
  return (
    <SocketWrapper>

      <div className="row justify-content-center py-4">
        <div className="col-md-6">
          <ToDashButton />
        </div>
      </div>

      {/*
      <div className="row justify-content-center py-4">
        <div className="col-md-6">
          Beneficiaries
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th className="text-end">Edit</th>
              </tr>
            </thead>
            <tbody>
              {beneficiaries.map((category) => (
                (editCategory.id === category.id)
                  ? <EditCategory />
                  : <DisplayCategory category={category} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      */}

    </SocketWrapper>
  );
}

export default Beneficiaries;
