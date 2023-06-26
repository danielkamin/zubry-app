import axios from 'axios';
import { CMS_URL } from '../../common/utils/constants';

const cmsAxiosInstance = axios.create({
  baseURL: CMS_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
  withCredentials: true
});

const publicAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
  withCredentials: true
});

export { cmsAxiosInstance, publicAxiosInstance };
