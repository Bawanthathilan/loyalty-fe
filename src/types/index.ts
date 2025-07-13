export interface User {
  id: string;
  name: string;
  email: string;
  account_id: string;
}

export interface Account {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Balance {
  account_id: string;
  points: number;
  tier?: string;
}

export interface Transaction {
  id: string;
  type: 'earn' | 'redeem';
  points: number;
  description: string;
  date: string;
  reference?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  points: number;
  category: string;
  image: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  points_required: number;
  category: string;
  image: string;
  availability: number;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface LoginCredentials {
  phone_number: string;
  password: string;
}