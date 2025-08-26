import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNewsContext } from '../Context/NewsContext';
import NewsForm from './NewsForm';

const NewNews = () => {
  const { addNews } = useNewsContext();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (newsData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await addNews(newsData);
      navigate('/admin/news');
    } catch (err) {
      console.error('Failed to create news:', err);
      setError(err.message || 'Failed to create news. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/news');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Create New News Article</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <NewsForm 
          onSubmit={handleSubmit} 
          onCancel={handleCancel} 
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default NewNews;