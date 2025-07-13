import axios from 'axios';
import { User, Account, Balance, Transaction, LoginCredentials } from '../types';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await api.post('/login', credentials);
    return response.data;
  },
};

export const accountAPI = {
  search: async (query: string): Promise<Account[]> => {
    const response = await api.post('/search', { query });
    return response.data;
  },
};

export const loyaltyAPI = {
  earnPoints: async (points: number) => {
    const response = await api.post(`/loyalty/accumulate`, {
      "accumulate_points":{
        points,
      },
      
    });
    return response.data;
  },

  redeemPoints: async (rewardId: string) => {
    const response = await api.post(`/loyalty/rewards/${rewardId}/redeem`);
    return response.data;


  },

  getBalance: async (): Promise<Balance> => {
    const response = await api.get(`/loyalty/balance`);
    return response.data;
  },

  getHistory: async (): Promise<Transaction[]> => {
    const response = await api.get(`/loyalty/history`);
    return response.data;
  },
};

export default api;