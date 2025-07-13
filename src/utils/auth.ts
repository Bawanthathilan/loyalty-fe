import { User } from '../types';

export const getStoredUser = (): User | null => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

export const setStoredUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearStoredUser = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('auth_token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};