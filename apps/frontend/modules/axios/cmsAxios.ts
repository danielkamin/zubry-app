import axios from 'axios';
import { CMS_URL } from '../../common/utils/constants';
const cmsAxiosInstance = axios.create({
  baseURL: CMS_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
  withCredentials: true
});
cmsAxiosInstance.interceptors.request.use(function (config) {
  return config;
});

export default cmsAxiosInstance;
