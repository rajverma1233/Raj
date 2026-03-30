'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  email: string | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check local storage on mount
    const storedAuth = localStorage.getItem('pulzo_auth');
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        if (parsed.isLoggedIn) {
          setTimeout(() => {
            setIsLoggedIn(true);
            setEmail(parsed.email);
          }, 0);
        }
      } catch (error) {
        console.error('Failed to parse auth data:', error);
        localStorage.removeItem('pulzo_auth');
      }
    }
  }, []);

  const login = (userEmail: string) => {
    setIsLoggedIn(true);
    setEmail(userEmail);
    localStorage.setItem('pulzo_auth', JSON.stringify({ isLoggedIn: true, email: userEmail }));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setEmail(null);
    localStorage.removeItem('pulzo_auth');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, email, login, logout }}>
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
