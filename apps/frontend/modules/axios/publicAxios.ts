//axios instance with public base url instead of localhost
import axios from 'axios';
const publicAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
  withCredentials: true
});
publicAxiosInstance.interceptors.request.use(function (config) {
  return config;
});

export default publicAxiosInstance;
