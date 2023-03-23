/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL;

export function getCategories() {
  const token = localStorage.getItem('SessionToken');

  return axios({
    method: 'get',
    url: `${API_BASE}/budget/category/`,
    headers: { Authorization: `Token ${token}` },
  })
    .then(({ data }) => data);
}
