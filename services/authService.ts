
import { User, AuthState } from '../types';

const STORAGE_KEY = 'lumina_auth_session';

export const authService = {
  login: (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple mock validation
        if (email && password.length >= 6) {
          const user: User = {
            id: 'u_' + Math.random().toString(36).substr(2, 9),
            email,
            name: email.split('@')[0],
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid email or password (min 6 chars)'));
        }
      }, 800);
    });
  },

  signup: (name: string, email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password.length >= 6) {
          const user: User = {
            id: 'u_' + Math.random().toString(36).substr(2, 9),
            email,
            name,
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Please fill all fields correctly. Password must be at least 6 chars.'));
        }
      }, 1000);
    });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }
};
