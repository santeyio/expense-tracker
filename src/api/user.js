/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL;

export function getSelf() {
  const token = localStorage.getItem('SessionToken');

  return axios({
    method: 'get',
    url: `${API_BASE}/self/`,
    headers: { Authorization: `Token ${token}` },
  });
}
