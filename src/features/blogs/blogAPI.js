const API_URL = 'http://localhost:3000/api/blogs';

const getToken = () => localStorage.getItem('token');

export const fetchBlogsAPI = async () => {
  const res = await fetch(`${API_URL}/all`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};

export const createBlogAPI = async (data) => {
  const res = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateBlogAPI = async ({ id, data }) => {
  const res = await fetch(`${API_URL}/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteBlogAPI = async (id) => {
  await fetch(`${API_URL}/delete-by-id/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return id;
};
