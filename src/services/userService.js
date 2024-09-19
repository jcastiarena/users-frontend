import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export const getUsers = () => {
  return axios.get(API_URL);
};

export const deleteUser = (userId) => {
  return axios.delete(`${API_URL}/${userId}`);
};

export const editUser = (userId, userData) => {
  return axios.patch(`${API_URL}/${userId}`, userData);
};

export const createUser = (userData) => {
  return axios.post(API_URL, userData);
};
