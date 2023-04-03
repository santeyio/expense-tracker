import React from 'react';
/* eslint-disable */
import { useSelector, useDispatch } from 'react-redux';
import { PencilSquare } from 'react-bootstrap-icons';

import { ToDashButton } from '../components';

function Categories() {
  const dispatch = useDispatch();
  const {
    categories,
  } = useSelector(store => store.expenditure);

  return (
    <>
      <div className="row justify-content-center py-4">
        <div className="col-md-6">
          <ToDashButton />
        </div>
      </div>

      <div className="row justify-content-center py-4">
        <div className="col-md-6">
          Categories
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr>
                  <td>{category.name}</td>
                  <td><PencilSquare /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Categories;
