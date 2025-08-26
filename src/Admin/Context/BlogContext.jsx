// src/admin/context/BlogContext.js
import { createContext, useState, useEffect, useContext, useCallback  } from 'react';
import axios from 'axios';

// Define the API URL - adjust as needed for your environment
const API_URL = import.meta.env.VITE_REACT_APP_URL || 'http://localhost:5000/api';


// Define the context
const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

// Create a provider component
export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch all blogs from API
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/blogs`);
      const fetched = res.data.data.blogs || [];
      setBlogs(fetched);
      const uniqueCats = [...new Set(fetched.map(b => b.category || 'General'))];
      setCategories(uniqueCats);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);
  
  // Get a blog by ID
  const getBlogById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/blogs/${id}`);
      return response.data.data;
    } catch (err) {
      setError(err.message || `Failed to fetch blog with ID: ${id}`);
      return null;
    }
  };

  // Get a blog by slug
  const getBlogBySlug = useCallback(async (slug) => {
    try {
      const res = await axios.get(`${API_URL}/blogs/slug/${slug}`);
      console.log('getBlogBySlug response:', res.data);
      // if your backend returns { data: { blog: { … } } }
      return res.data.data.blog ?? res.data.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);
  
  // Get blogs by category
  const getBlogsByCategory = async (category) => {
    if (!category || category === 'All') {
      return blogs;
    }
    // In a real implementation, you might want to make an API call with a category filter
    // For now, we'll filter the existing blogs
    return blogs.filter(blog => blog.category === category);
  };
  
  // Add a new blog
  const addBlog = async (blogData) => {
    try {
      // Handle file upload if present
      let formData = null;
      
      if (blogData.coverImage instanceof File) {
        formData = new FormData();
        Object.entries(blogData).forEach(([key, value]) => {
          if (key === 'tags' && Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        });
      }
      
      const response = await axios.post(
        `${API_URL}/blogs`, 
        formData || blogData,
        formData ? {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        } : {}
      );
      
      // Refresh blogs after adding a new one
      fetchBlogs();
      return response.data.data;
    } catch (err) {
      setError(err.message || 'Failed to add blog');
      throw err;
    }
  };
  
  // Update an existing blog
  const updateBlog = async (id, updatedBlog) => {
    try {
      // Handle file upload if present
      let formData = null;
      
      if (updatedBlog.coverImage instanceof File) {
        formData = new FormData();
        Object.entries(updatedBlog).forEach(([key, value]) => {
          if (key === 'tags' && Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        });
      }
      
      const response = await axios.patch(
        `${API_URL}/blogs/${id}`, 
        formData || updatedBlog,
        formData ? {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        } : {}
      );
      
      // Update local state with the updated blog
      setBlogs(prevBlogs => 
        prevBlogs.map(blog => 
          blog._id === id ? response.data.data : blog
        )
      );
      
      // Update categories if needed
      const uniqueCategories = [...new Set(blogs.map(blog => blog.category))];
      setCategories(uniqueCategories);
      
      return response.data.data;
    } catch (err) {
      setError(err.message || `Failed to update blog with ID: ${id}`);
      throw err;
    }
  };
  
  // Delete a blog
  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${API_URL}/blogs/${id}`);
      
      // Update local state by removing the deleted blog
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
      
      // Update categories if needed
      const remainingBlogs = blogs.filter(blog => blog._id !== id);
      const uniqueCategories = [...new Set(remainingBlogs.map(blog => blog.category))];
      setCategories(uniqueCategories);
      
      return true;
    } catch (err) {
      setError(err.message || `Failed to delete blog with ID: ${id}`);
      throw err;
    }
  };
  
  // Get blog statistics for admin dashboard
  const getBlogStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/blogs/admin/stats`);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch blog statistics');
      return null;
    }
  };
  
  const value = {
    blogs,
    categories,
    loading,
    error,
    getBlogById,
    getBlogBySlug,
    getBlogsByCategory,
    addBlog,
    updateBlog,
    deleteBlog,
    getBlogStats,
    refreshBlogs: fetchBlogs
  };
  
  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};