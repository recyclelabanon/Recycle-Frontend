// src/admin/Pages/News.js

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Edit, Trash, Plus } from 'lucide-react';
import { useNewsContext } from '../Context/NewsContext';

function NewsAdmin() {
  const { news, loading, error, deleteNews, refreshNews } = useNewsContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    // Ensure we have the latest data
    refreshNews();
  }, [refreshNews]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      try {
        setIsDeleting(true);
        await deleteNews(id);
        // News list should update automatically via context
      } catch (err) {
        setDeleteError('Failed to delete news article');
        console.error(err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (loading) {
    return <div className="p-4">Loading news articles...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading news: {error}
        <button 
          onClick={refreshNews}
          className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">News Articles</h1>
        <Link
          to="/admin/news/new"
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus className="mr-2" size={16} />
          Add New Article
        </Link>
      </div>

      {deleteError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {deleteError}
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {news.length > 0 ? (
            news.map((item) => (
              <li key={item._id}>
                <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="text-gray-500 mr-3" />
                    <div>
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <div className="mt-1 text-sm text-gray-500">
                        <span>{item.category}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(item.publishedAt || item.createdAt).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>{item.author}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/news/edit/${item._id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={isDeleting}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-5 text-center text-gray-500">
              No news articles yet. Click &quot;Add New Article&quot; to create one.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NewsAdmin;