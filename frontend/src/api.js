import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7055/api',  // OBS! ändra port om din backend använder annat
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;