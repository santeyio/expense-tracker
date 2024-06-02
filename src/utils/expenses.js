/* eslint-disable import/prefer-default-export */
import { DateTime } from 'luxon';

export function filterExpenses({
  data,
  filterString,
  categoryFilter = [],
  beneficiaryFilter, // beneficiary id
  dateFilterStart,
  dateFilterEnd,
}) {
  let filteredData = data;
  if (beneficiaryFilter) {
    filteredData = filteredData.filter(entry => (entry.beneficiary === Number(beneficiaryFilter)));
  }
  if (categoryFilter.length) {
    filteredData = filteredData.filter(entry => categoryFilter.includes(entry.category));
  }
  if (filterString) {
    filteredData = filteredData.filter(entry => {
      if (entry.store.toLowerCase().includes(filterString.toLowerCase())) return true;
      if (entry.description.toLowerCase().includes(filterString.toLowerCase())) return true;
      if (entry.cost.toLowerCase().includes(filterString.toLowerCase())) return true;
      return false;
    });
  }
  if (dateFilterStart) {
    filteredData = filteredData.filter(entry => (dateFilterStart <= DateTime.fromISO(entry.date)));
  }
  if (dateFilterEnd) {
    filteredData = filteredData.filter(entry => (dateFilterEnd >= DateTime.fromISO(entry.date)));
  }
  return filteredData;
}
