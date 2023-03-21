import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL;

export function checkIfLoggedIn() {
  const token = localStorage.getItem('SessionToken');

  return axios({
    method: 'get',
    url: `${API_BASE}/auth/check/`,
    headers: { Authorization: `Token ${token}` },
  });
}

export function login(username, password) {
  const token = localStorage.getItem('SessionToken');

  return axios({
    method: 'post',
    url: `${API_BASE}/auth/login/`,
    headers: { Authorization: `Token ${token}` },
    data: { username, password },
  })
    .then(({ data }) => {
      return data.token;
    });
}
