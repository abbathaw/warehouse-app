import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
});
export default axiosInstance;
