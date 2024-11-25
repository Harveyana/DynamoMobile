import axios from 'axios';
import * as SecureStore from "expo-secure-store";
// import { useAuthStore } from '@/store/useAuth';
import { logout } from './auth';
import navigationService from './navigationService';





// Set up the axios instance with default settings
const axiosInstance = axios.create({
  baseURL: 'https://qaya-backend-8aa84c165678.herokuapp.com/api/v1', // Replace with your API base URL or use environment variable
  timeout: 10000, // Optional, set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// https://qaya-backend-8aa84c165678.herokuapp.com
// http://192.168.0.3:5000


// Request interceptor to add the token to headers
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('token');
    console.log('this is token', token);
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      
      // Handle unauthorized or forbidden responses
      console.log('Unauthorized or Forbidden', error.response.data);
      logout()
      navigationService.replace('/signIn')

    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
