import api from './axiosconfig';
import { toast } from 'react-toastify';

interface SignupData {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}

interface SigninCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
  };
}

export const authService = {
  async signup(userData: SignupData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/signup', userData);
      toast.success('Account created successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async signin(credentials: SigninCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/signin', credentials);
      toast.success('Logged in successfully!');
      console.log(response.data)
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export type { SignupData, SigninCredentials, AuthResponse };