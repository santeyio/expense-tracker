/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// utils
import { filterExpenses } from '../../../../utils/expenses';
import { toCurrency } from '../../../../utils/prettify';

// components
import { Table } from '../../../components';

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
        beneficiaryFilter: bene,
      });
      const sum = filteredData.reduce((accumulator, item) => (Number(item.cost) + accumulator), 0);
      categoryRow[`bene${bene.id}`] = sum;
    });
    rows.push(categoryRow);
  });

  return rows;
}

function Insights() {
  const [ startFilter, setStartFilter ] = useState();
  const [ endFilter, setEndFilter ] = useState();
  const {
    beneficiaries,
    categories,
    db: expenses,
  } = useSelector(store => store.expenses);

  const beneCols = beneficiaries.map(b => ({
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
    dateStartFilter: startFilter,
    dateEndFilter: endFilter,
  });
  const summedData = calculateCategoryTotalsByBeneficiary({
    data: filteredData,
    categories,
    beneficiaries,
  });

  return (
    <div>
      <Table
        className="table table-striped"
        schema={schema}
        data={summedData}
      />
    </div>
  );
}

export default Insights;
