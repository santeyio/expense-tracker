/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { apiFmtExpenditure } from '../utils/format';

const API_BASE = process.env.REACT_APP_API_URL;

export function addExpenditure(expenditure) {
  const token = localStorage.getItem('SessionToken');

  return axios({
    method: 'post',
    url: `${API_BASE}/budget/expenditure/`,
    headers: { Authorization: `Token ${token}` },
    data: apiFmtExpenditure(expenditure),
  })
    .then(({ data }) => data);
}
