import api from './axiosconfig';
import { toast } from 'react-toastify';

interface SignupData {
  firstName: string;
  lastName:string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?:string;

}

interface SigninCredentials {
  email: string;
  password: string;
}

enum UserRole{
  ADMIN='ADMIN',
  BUYER ='BUYER'
}

interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    firstname: string;
    lastname: string;
    role: UserRole;
    email: string;
    phoneNumber?: string;
    address?:string;
  };
}

export const authService = {
  async signup(userData: SignupData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/signup', userData);
      const { access_token, user } = response.data;

      // Store user data in localStorage
      localStorage.setItem('userId', user.id);
      localStorage.setItem('token', access_token);
      localStorage.setItem('userRole', user.role);

      toast.success('Account created successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async signin(credentials: SigninCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/signin', credentials);

      const { access_token, user } = response.data;
      
      localStorage.setItem('userId', user.id);
      localStorage.setItem('token', access_token);
      localStorage.setItem('userRole', user.role);
      toast.success('Logged in successfully!');
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export type { SignupData, SigninCredentials, AuthResponse };