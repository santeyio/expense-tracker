/* eslint-disable no-unused-vars,object-curly-newline */
import React, { useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';

// components
import { Table, CategoryFilters } from '../../components';
import { TextInput } from '../../components/form';

// utils
import { debounced } from '../../../utils/general';
import { toCurrency } from '../../../utils/prettify';

function filterExpenses({
  data,
  filterString,
  startFilter,
  endFilter,
  categoryFilter,
}) {
  let filteredData = data;
  if (filterString) {
    filteredData = filteredData.filter(entry => {
      if (entry.store.toLowerCase().includes(filterString.toLowerCase())) return true;
      if (entry.description.toLowerCase().includes(filterString.toLowerCase())) return true;
      if (entry.cost.toLowerCase().includes(filterString.toLowerCase())) return true;
      return false;
    });
  }
  console.log('categoryFilter: ', categoryFilter);
  if (categoryFilter.length) {
    filteredData = filteredData.filter(entry => categoryFilter.includes(entry.category));
  }
  return filteredData;
}

function Insights() {
  const {
    db: expenses,
    categories,
  } = useSelector(store => store.expenditure);

  const [ startFilter, setStartFilter ] = useState();
  const [ endFilter, setEndFilter ] = useState();
  const [ filterString, setFilterString ] = useState();
  const [ categoryFilter, setCategoryFilter ] = useState([]);

  const categoryFormatter = (data) => categories.find(c => (c.id === data.category)).name;
  const dateFormatter = (date) => DateTime.fromISO(date).toLocaleString();
  const costFormatter = (cost) => toCurrency(cost);

  const schema = {
    cols: [
      {
        header: 'Expense',
        field: 'cost',
        formatter: costFormatter,
      },
      {
        header: 'Store',
        field: 'store',
      },
      {
        header: 'Description',
        field: 'description',
      },
      {
        header: 'Category',
        passAllData: true,
        formatter: categoryFormatter,
      },
      {
        header: 'Date',
        field: 'date',
        formatter: dateFormatter,
      },
    ],
  };

  const data = Object.values(expenses);
  const filteredData = filterExpenses({
    data,
    filterString,
    startFilter,
    endFilter,
    categoryFilter,
  });

  const filteredTotal = filteredData.reduce((accumulator, item) => Number(item.cost) + accumulator, 0);

  function handleFilterChange(e) {
    const { value } = e.target;
    setFilterString(value);
  }

  function handleClearFilter() {
    setFilterString('');
  }

  return (
    <div>
      <div className="row my-3">
        <div className="col">
          Filters
        </div>
      </div>

      <div className="row my-3">
        <div className="col-md-6">
          <TextInput
            value={filterString}
            placeholder="expense / store / description"
            handleChange={(e) => handleFilterChange(e)}
            handleClear={() => handleClearFilter()}
          />
        </div>
      </div>

      <CategoryFilters
        categories={categories}
        selectedList={categoryFilter}
        setSelectedList={setCategoryFilter}
      />

      <div className="row mb-2 mt-2">
        <div className="d-flex col justify-content-center text-muted">
          <b className="me-2">Total:</b>
          {toCurrency(filteredTotal)}
        </div>
      </div>

      <Table
        className="table table-striped"
        schema={schema}
        data={filteredData}
      />
    </div>
  );
}

export default Insights;
