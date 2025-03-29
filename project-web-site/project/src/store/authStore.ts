import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (user: Omit<User, 'id' | 'role'>, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      error: null,

      login: async (email: string, password: string) => {
        try {
          // In a real app, this would make an API call
          if (email === 'admin@example.com' && password === 'admin123') {
            set({
              user: {
                id: '1',
                email,
                name: 'Admin User',
                address: '123 Admin St',
                role: 'admin'
              },
              isAuthenticated: true,
              error: null
            });
          } else if (email === 'user@example.com' && password === 'user123') {
            set({
              user: {
                id: '2',
                email,
                name: 'Regular User',
                address: '456 User Ave',
                role: 'user'
              },
              isAuthenticated: true,
              error: null
            });
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },

      register: async (userData, password) => {
        try {
          // In a real app, this would make an API call
          const newUser: User = {
            ...userData,
            id: Math.random().toString(36).substr(2, 9),
            role: 'user'
          };
          set({
            user: newUser,
            isAuthenticated: true,
            error: null
          });
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null
        });
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);