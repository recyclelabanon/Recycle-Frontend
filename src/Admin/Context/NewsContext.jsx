// src/admin/context/NewsContext.js
import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';

// Define the API URL - adjust as needed for your environment
const API_URL = import.meta.env.VITE_REACT_APP_URL || 'http://localhost:5000/api';

// Define the context
const NewsContext = createContext();

export const useNewsContext = () => useContext(NewsContext);

// Create a provider component
export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch all news from API
  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/news`);
      const fetched = res.data.data.news || [];
      setNews(fetched);
      const uniqueCats = [...new Set(fetched.map(n => n.category || 'General'))];
      setCategories(uniqueCats);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  }, []); // empty deps so it's stable
  
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);
  
  // Get a news article by ID
  const getNewsById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/news/${id}`);
      return response.data.data;
    } catch (err) {
      setError(err.message || `Failed to fetch news with ID: ${id}`);
      return null;
    }
  };

  // Get a news article by slug
  const getNewsBySlug = useCallback(async (slug) => {
    try {
      const res = await axios.get(`${API_URL}/news/slug/${slug}`);
      console.log('getNewsBySlug response:', res.data);
      // if your backend returns { data: { news: { … } } }
      return res.data.data.news ?? res.data.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);
  
  // Get news by category
  const getNewsByCategory = async (category) => {
    if (!category || category === 'All') {
      return news;
    }
    // In a real implementation, you might want to make an API call with a category filter
    return news.filter(item => item.category === category);
  };
  
  // Add a new news article
  const addNews = async (newsData) => {
    try {
      // Handle file upload if present
      let formData = null;
      
      if (newsData.coverImage instanceof File) {
        formData = new FormData();
        Object.entries(newsData).forEach(([key, value]) => {
          if (key === 'tags' && Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        });
      }
      
      const response = await axios.post(
        `${API_URL}/news`, 
        formData || newsData,
        formData ? {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        } : {}
      );
      
      // Refresh news after adding a new one
      fetchNews();
      return response.data.data;
    } catch (err) {
      setError(err.message || 'Failed to add news');
      throw err;
    }
  };
  
  // Update an existing news article
  const updateNews = async (id, updatedNews) => {
    try {
      // Handle file upload if present
      let formData = null;
      
      if (updatedNews.coverImage instanceof File) {
        formData = new FormData();
        Object.entries(updatedNews).forEach(([key, value]) => {
          if (key === 'tags' && Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        });
      }
      
      const response = await axios.patch(
        `${API_URL}/news/${id}`, 
        formData || updatedNews,
        formData ? {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        } : {}
      );
      
      // Update local state with the updated news
      setNews(prevNews => 
        prevNews.map(item => 
          item._id === id ? response.data.data : item
        )
      );
      
      // Update categories if needed
      const uniqueCategories = [...new Set(news.map(item => item.category))];
      setCategories(uniqueCategories);
      
      return response.data.data;
    } catch (err) {
      setError(err.message || `Failed to update news with ID: ${id}`);
      throw err;
    }
  };
  
  // Delete a news article
  const deleteNews = async (id) => {
    try {
      await axios.delete(`${API_URL}/news/${id}`);
      
      // Update local state by removing the deleted news
      setNews(prevNews => prevNews.filter(item => item._id !== id));
      
      // Update categories if needed
      const remainingNews = news.filter(item => item._id !== id);
      const uniqueCategories = [...new Set(remainingNews.map(item => item.category))];
      setCategories(uniqueCategories);
      
      return true;
    } catch (err) {
      setError(err.message || `Failed to delete news with ID: ${id}`);
      throw err;
    }
  };
  
  // Get news statistics for admin dashboard
  const getNewsStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/news/admin/stats`);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch news statistics');
      return null;
    }
  };
  
  const value = {
    news,
    categories,
    loading,
    error,
    getNewsById,
    getNewsBySlug,
    getNewsByCategory,
    addNews,
    updateNews,
    deleteNews,
    getNewsStats,
    refreshNews: fetchNews
  };
  
  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
};