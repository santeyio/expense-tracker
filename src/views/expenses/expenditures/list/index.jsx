/* eslint-disable no-unused-vars,object-curly-newline */
import React, { useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';

// components
import {
  Table,
  FilterButtons,
  TextInput,
  DateInput,
} from '../../../components';

// utils
import { debounced } from '../../../../utils/general';
import { toCurrency } from '../../../../utils/prettify';
import { filterExpenses } from '../../../../utils/expenses';

function List() {
  const {
    db: expenses,
    categories,
    beneficiaries,
  } = useSelector(store => store.expenses);

  const [ startFilter, setStartFilter ] = useState();
  const [ endFilter, setEndFilter ] = useState();
  const [ filterString, setFilterString ] = useState();
  const [ categoryFilter, setCategoryFilter ] = useState([]);

  const categoryFormatter = (data) => categories.find(c => (c.id === data.category)).name;
  const dateFormatter = (date) => DateTime.fromISO(date).toLocaleString();
  const costFormatter = (cost) => toCurrency(cost);
  // const beneficiaryFormatter = (data) => beneficiaries.find(b => (b.id === data.beneficiary)).name;

  const schema = {
    cols: [
      {
        header: 'Expense',
        field: 'cost',
        formatter: costFormatter,
      },
      {
        header: 'Description',
        field: 'description',
      },
      {
        header: 'Store',
        field: 'store',
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
    dateFilterStart: startFilter,
    dateFilterEnd: endFilter,
    categoryFilter,
  });

  const filteredTotal = filteredData.reduce((accumulator, item) => (Number(item.cost) + accumulator), 0);

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
            label="Search"
            placeholder="expense / store / description"
            handleChange={(e) => handleFilterChange(e)}
            handleClear={() => handleClearFilter()}
          />
        </div>

        <div className="col-md-3">
          <DateInput
            clearAction={() => setStartFilter(undefined)}
            label="Start Date"
            value={startFilter ? startFilter.toISODate() : undefined}
            name="start-filter"
            handleChange={(e) => setStartFilter(DateTime.fromISO(e.target.value))}
          />
        </div>

        <div className="col-md-3">
          <DateInput
            clearAction={() => setEndFilter(undefined)}
            label="End Date"
            value={endFilter ? endFilter.toISODate() : undefined}
            name="end-filter"
            handleChange={(e) => setEndFilter(DateTime.fromISO(e.target.value))}
          />
        </div>
      </div>

      <FilterButtons
        filterList={categories}
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

export default List;
