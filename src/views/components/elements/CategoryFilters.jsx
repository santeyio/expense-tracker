/* eslint-disable no-unused-vars */
import React from 'react';

function CategoryButton({ category, selectedList, setSelectedList }) {
  const active = selectedList.includes(category.id);

  function handleClick() {
    if (active) { // remove from list
      setSelectedList(selectedList.filter(c => c !== category.id));
    } else { // add to list
      setSelectedList([ ...selectedList, category.id ]);
    }
  }

  return (
    <button
      type="button"
      className={`btn ${active ? 'btn-success' : 'btn-outline-primary'} me-2 mt-2`}
      onClick={handleClick}
    >
      {category.name}
    </button>
  );
}

function CategoryFilters({ categories, setSelectedList, selectedList }) {
  return (
    <div className="row">
      <div className="col">
        {categories.map(category => (
          <CategoryButton
            selectedList={selectedList}
            category={category}
            setSelectedList={setSelectedList}
          />
        ))}
        <button
          type="button"
          className="btn btn-outline-danger me-2 mt-2"
          onClick={() => setSelectedList([])}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default CategoryFilters;
