/* eslint-disable no-unused-vars */
import React from 'react';

function FilterButton({
  filter,
  selectedList,
  setSelectedList,
  idKey,
  nameKey,
}) {
  const active = selectedList.includes(filter[idKey]);

  function handleClick() {
    if (active) { // remove from list
      setSelectedList(selectedList.filter(f => f !== filter[idKey]));
    } else { // add to list
      setSelectedList([ ...selectedList, filter[idKey] ]);
    }
  }

  return (
    <button
      type="button"
      className={`btn ${active ? 'btn-success' : 'btn-outline-primary'} me-2 mt-2`}
      onClick={handleClick}
    >
      {filter[nameKey]}
    </button>
  );
}

function FilterButtons({
  filterList,
  setSelectedList,
  selectedList,
  idKey = 'id',
  nameKey = 'name',
}) {
  return (
    <div className="row">
      <div className="col">
        {filterList.map(filter => (
          <FilterButton
            key={filter[idKey]}
            selectedList={selectedList}
            filter={filter}
            idKey={idKey}
            nameKey={nameKey}
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

export default FilterButtons;
