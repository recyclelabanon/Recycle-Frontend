// src/Admin/Context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_URL || 'http://localhost:5000/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configure axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);
  // Set up axios interceptors for error handling

  // Check if user is authenticated on mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // You'll need to create this endpoint on your backend
        const response = await axios.get(`${API_URL}/auth/me`);
        setCurrentUser(response.data.user);
      } catch (err) {
        console.error('Auth verification failed:', err);
        logout(); // Token is invalid, log user out
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const register = async (userData) => {
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      const { token, user } = response.data;
      
      // Save token and set user
      localStorage.setItem('token', token);
      setToken(token);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  const login = async (credentials) => {
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      const { token, user } = response.data;
      
      // Save token and set user
      localStorage.setItem('token', token);
      setToken(token);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
    // Clear authorization header
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    currentUser,
    token,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};