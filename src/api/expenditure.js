/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { apiFmtExpenditure, fmtExpenditure } from '../utils/format';

const API_BASE = process.env.REACT_APP_API_URL;

export function addExpenditure(expenditure) {
  const token = localStorage.getItem('SessionToken');

  return axios({
    method: 'post',
    url: `${API_BASE}/expenses/expenditure/`,
    headers: { Authorization: `Token ${token}` },
    data: apiFmtExpenditure(expenditure),
  })
    .then(({ data }) => data);
}

export function getExpenditureHistory() {
  const token = localStorage.getItem('SessionToken');

  return axios({
    method: 'get',
    url: `${API_BASE}/expenses/expenditure/`,
    headers: { Authorization: `Token ${token}` },
  })
    .then(({ data }) => data.map(e => fmtExpenditure(e)));
}
