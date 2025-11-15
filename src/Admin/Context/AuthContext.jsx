// src/Admin/Context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

//const API_URL = import.meta.env.VITE_REACT_APP_URL || 'http://localhost:5000/api';
const API_URL = import.meta.env.VITE_REACT_APP_URL || 'http://localhost:5000/api/v1';


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return setLoading(false);
      try {
        const res = await axios.get(`${API_URL}/auth/me`);
        setCurrentUser(res.data.user);
      } catch (err) {
        console.error('Auth verification failed:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token]);

  const register = async (data) => {
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/auth/register`, data);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      setToken(token);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  const login = async (creds) => {
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, creds);
      const { token, user } = res.data;
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ✅ Add this at the bottom of the same file
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
