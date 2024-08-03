import axios from 'axios';
import BACKEND_URL from '@/config';

const server = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000, 
});

export default server;