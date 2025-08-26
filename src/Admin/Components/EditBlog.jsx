import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlogContext } from '../Context/BlogContext';
import BlogForm from './BlogForm';

const EditBlog = () => {
  const { id } = useParams();
  const { getBlogById, updateBlog } = useBlogContext();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await getBlogById(id);
        setBlog(data);
      } catch (err) {
        console.error('Failed to fetch blog:', err);
        setError('Failed to load blog data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id, getBlogById]);

  const handleSubmit = async (blogData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await updateBlog(id, blogData);
      navigate('/admin/blogs');
    } catch (err) {
      console.error('Failed to update blog:', err);
      setError(err.message || 'Failed to update blog. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/blogs');
  };

  if (loading) {
    return <div className="p-4">Loading blog data...</div>;
  }

  if (error && !blog) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={() => navigate('/admin/blogs')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <BlogForm
          initialData={blog}
          onSubmit={handleSubmit} 
          onCancel={handleCancel} 
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EditBlog;