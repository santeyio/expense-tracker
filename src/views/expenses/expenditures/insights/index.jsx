/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';

// utils
import { filterExpenses } from '../../../../utils/expenses';
import { toCurrency } from '../../../../utils/prettify';

// components
import { Table, FilterButtons, DateInput } from '../../../components';

function calculateCategoryTotalsByBeneficiary({
  data,
  categories = [], // array of category objects
  beneficiaries = [], // array of beneficiary objects
}) {
  const rows = [];

  categories.forEach(category => {
    const categoryRow = { category: category.name };

    beneficiaries.forEach(bene => {
      const filteredData = filterExpenses({
        data,
        categoryFilter: [ category.id ],
        beneficiaryFilter: bene.id,
      });
      const sum = filteredData.reduce((accumulator, item) => (Number(item.cost) + accumulator), 0);
      categoryRow[`bene${bene.id}`] = sum;
    });
    rows.push(categoryRow);
  });

  return rows;
}

function Insights() {
  const [ selectedBenes, setSelectedBenes ] = useState([]);
  const [ startFilter, setStartFilter ] = useState();
  const [ endFilter, setEndFilter ] = useState();
  const {
    beneficiaries,
    categories,
    db: expenses,
  } = useSelector(store => store.expenses);

  const beneSubset = beneficiaries.filter(b => selectedBenes.includes(b.id));
  const beneCols = beneSubset.map(b => ({
    header: b.name,
    field: `bene${b.id}`,
    formatter: (v) => toCurrency(v),
  }));

  const schema = {
    cols: [
      {
        header: 'Category',
        field: 'category',
      },
      ...beneCols,
    ],
  };

  const data = Object.values(expenses);
  const filteredData = filterExpenses({
    data,
    dateFilterStart: startFilter,
    dateFilterEnd: endFilter,
  });
  const summedData = calculateCategoryTotalsByBeneficiary({
    data: filteredData,
    categories,
    beneficiaries,
  });

  return (
    <>
      <div className="row mt-4">
        <h5>Date Range</h5>
        <div className="col">
          <DateInput
            clearAction={() => setStartFilter(undefined)}
            label="Start Date"
            value={startFilter ? startFilter.toISODate() : undefined}
            name="start-filter"
            handleChange={(e) => setStartFilter(DateTime.fromISO(e.target.value))}
          />
          <DateInput
            clearAction={() => setEndFilter(undefined)}
            label="End Date"
            value={endFilter ? endFilter.toISODate() : undefined}
            name="end-filter"
            handleChange={(e) => setEndFilter(DateTime.fromISO(e.target.value))}
          />
        </div>
      </div>

      <div className="row mt-4">
        <h5>Beneficiaries</h5>
        <FilterButtons
          filterList={beneficiaries}
          selectedList={selectedBenes}
          setSelectedList={setSelectedBenes}
        />
      </div>

      <div className="row mt-5">
        <h5>Category Totals By Beneficiary</h5>
        <div className="col">
          <Table
            className="table table-striped"
            schema={schema}
            data={summedData}
          />
        </div>
      </div>
    </>
  );
}

export default Insights;
