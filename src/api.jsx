import axios from 'axios';

const apiUrl = 'http://localhost:3005/api';

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const addUser = async (user) => {
  const response = await axiosInstance.post('/users', user);
  return response.data;
};

export const getUsers = async (search = '', group = '') => {
  const params = {};
  if (search) params.search = search;
  if (group) params.group = group;

  const response = await axiosInstance.get('/users', { params });
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await axiosInstance.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
};
