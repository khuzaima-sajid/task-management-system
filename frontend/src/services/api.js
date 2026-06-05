import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }

  return config;
});

export const authApi = {
  register: (payload) => api.post('/auth/register', payload),
  login: (payload) => api.post('/auth/login', payload),
};

export const taskApi = {
  getTasks: (params) => api.get('/tasks', { params }),
  getTask: (id) => api.get(`/tasks/${id}`),
  createTask: (payload) => api.post('/tasks', payload),
  updateTask: (id, payload) => api.put(`/tasks/${id}`, payload),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

export default api;
