import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNewsContext } from '../Context/NewsContext';
import NewsForm from './NewsForm';

const EditNews = () => {
  const { id } = useParams();
  const { getNewsById, updateNews } = useNewsContext();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await getNewsById(id);
        setNews(data);
      } catch (err) {
        console.error('Failed to fetch news:', err);
        setError('Failed to load news data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNews();
    }
  }, [id, getNewsById]);

  const handleSubmit = async (newsData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await updateNews(id, newsData);
      navigate('/admin/news');
    } catch (err) {
      console.error('Failed to update news:', err);
      setError(err.message || 'Failed to update news. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/news');
  };

  if (loading) {
    return <div className="p-4">Loading news data...</div>;
  }

  if (error && !news) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={() => navigate('/admin/news')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to News
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Edit News Article</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <NewsForm
          initialData={news}
          onSubmit={handleSubmit} 
          onCancel={handleCancel} 
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EditNews;