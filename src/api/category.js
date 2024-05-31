import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL;

export function getCategories() {
  const token = localStorage.getItem('SessionToken');

  return axios({
    method: 'get',
    url: `${API_BASE}/expenses/category/`,
    headers: { Authorization: `Token ${token}` },
  })
    .then(({ data }) => data);
}

export function updateCategory(category) {
  const token = localStorage.getItem('SessionToken');

  // TEMP
  function fmtCategoryToAPI(cat) {
    return {
      ...cat,
      last_updated_by: undefined,
      created_by: undefined,
    };
  }
  // ---- ENDTEMP
  return axios({
    method: 'put',
    url: `${API_BASE}/expenses/category/${category.id}/`,
    headers: { Authorization: `Token ${token}` },
    data: fmtCategoryToAPI(category),
  })
    .then(({ data }) => data);
}
