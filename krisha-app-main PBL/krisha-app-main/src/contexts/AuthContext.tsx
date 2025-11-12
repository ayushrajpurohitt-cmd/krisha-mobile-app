'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/lib/auth';
import { isBypassModeEnabled, verifyBypassToken, BYPASS_USER } from '@/lib/auth-bypass';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token in localStorage
    const token = localStorage.getItem('krisha_token');
    if (token) {
      // Check if it's a bypass token
      const bypassUser = verifyBypassToken(token);
      if (bypassUser) {
        setUser(bypassUser);
      } else {
        // In a real app, you'd verify the token with the server
        const userData = localStorage.getItem('krisha_user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Check for bypass mode
      if (isBypassModeEnabled() && email === 'demo@krisha.com' && password === 'demo123') {
        const response = await fetch('/api/auth/bypass', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const { user, token } = await response.json();
          setUser(user);
          localStorage.setItem('krisha_token', token);
          localStorage.setItem('krisha_user', JSON.stringify(user));
          return true;
        }
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { user, token } = await response.json();
        setUser(user);
        localStorage.setItem('krisha_token', token);
        localStorage.setItem('krisha_user', JSON.stringify(user));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      if (response.ok) {
        const { user, token } = await response.json();
        setUser(user);
        localStorage.setItem('krisha_token', token);
        localStorage.setItem('krisha_user', JSON.stringify(user));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('krisha_token');
    localStorage.removeItem('krisha_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
