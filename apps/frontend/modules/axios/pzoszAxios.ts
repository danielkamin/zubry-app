import axios from 'axios';
import { PZKOSZ_URL } from 'common/utils/constants';
export const requestParams = new URLSearchParams();

requestParams.append('key', process.env.PZKOSZ_API_KEY);

export const pzkoszAxiosInstance = axios.create({
  baseURL: PZKOSZ_URL
});
