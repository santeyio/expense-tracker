import React, { useState } from 'react';
/* eslint-disable */
import { useSelector, useDispatch } from 'react-redux';

// api
import { updateCategory } from '../../../api/category';

// components
import { ToDashButton, SocketWrapper, EditableListTable } from '../../components';

function Categories() {
  const dispatch = useDispatch();
  const [ saving, setSaving ] = useState(false);
  const { categories } = useSelector(store => store.expenses);

  function handleSave(editedCategory, clearCallback = () => {}) {
    setSaving(true);
    updateCategory(editedCategory)
      .then((data) => {
        const editedIndex = categories.findIndex(e => (e.id === editedCategory.id));
        const updatedCategories = [ ...categories ]
        updatedCategories.splice(editedIndex, 1, editedCategory);
        dispatch({ type: 'SET_EXPENSES_KEY', payload: { categories: updatedCategories } });
        clearCallback();
      }).finally(() => setSaving(false));
  }

  return (
    <SocketWrapper>
      <div className="row justify-content-center py-4">
        <div className="col-md-6">
          <ToDashButton />
        </div>
      </div>

      <div className="row justify-content-center py-4">
        <div className="col-md-6">
          Categories
          <EditableListTable
            textKey="name"
            pkKey="id"
            data={categories}
            handleSave={handleSave}
            saving={saving}
            setSaving={setSaving}
          />
        </div>
      </div>
    </SocketWrapper>
  );
}

export default Categories;
