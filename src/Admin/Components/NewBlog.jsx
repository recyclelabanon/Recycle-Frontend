import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogContext } from '../Context/BlogContext';
import BlogForm from './BlogForm';

const NewBlog = () => {
  const { addBlog } = useBlogContext();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (blogData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await addBlog(blogData);
      navigate('/admin/blogs');
    } catch (err) {
      console.error('Failed to create blog:', err);
      setError(err.message || 'Failed to create blog. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/blogs');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Blog Post</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <BlogForm 
          onSubmit={handleSubmit} 
          onCancel={handleCancel} 
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default NewBlog;