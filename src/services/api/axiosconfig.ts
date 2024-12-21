import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'https://usha-arts-fmhwhcc4hka4h3ce.eastasia-01.azurewebsites.net';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, 
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    if (!response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    // Handle different status codes
    switch (response.status) {
      case 404:
        toast.warning(response.data?.message || 'Resource not found');
        break;
      case 401:
        toast.error('Unauthorized. Please login again.');
        // Optional: Redirect to login or clear auth state
        localStorage.removeItem('token');
        break;
      case 400:
        toast.error(response.data?.message || 'Bad request');
        break;
      case 500:
        toast.error('Server error. Please try again later.');
        break;
      default:
        toast.error('Something went wrong. Please try again.');
    }

    return Promise.reject(error);
  }
);

export default api;