import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('seafood_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Simple mock authentication
    const users = JSON.parse(localStorage.getItem('seafood_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userInfo: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        phone: foundUser.phone,
        address: foundUser.address
      };
      setUser(userInfo);
      localStorage.setItem('seafood_user', JSON.stringify(userInfo));
      return true;
    }
    return false;
  };

  const register = (email: string, password: string, name: string): boolean => {
    const users = JSON.parse(localStorage.getItem('seafood_users') || '[]');
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      phone: '',
      address: ''
    };

    users.push(newUser);
    localStorage.setItem('seafood_users', JSON.stringify(users));

    const userInfo: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      phone: newUser.phone,
      address: newUser.address
    };

    setUser(userInfo);
    localStorage.setItem('seafood_user', JSON.stringify(userInfo));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('seafood_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};