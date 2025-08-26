import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBlogContext } from '../Admin/Context/BlogContext';

const Blog = () => {
  const { blogs, loading, error, refreshBlogs, categories } = useBlogContext();
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    refreshBlogs();
  }, [refreshBlogs]);

  const filtered = filter === 'All'
    ? blogs
    : blogs.filter(b => (b.category || 'General') === filter);

  if (loading) return <div className="p-8">Loading blogs…</div>;
  if (error) return (
    <div className="p-8 text-red-500">
      Error loading blogs: {error}
      <button onClick={refreshBlogs} className="ml-4 px-3 py-1 bg-blue-500 text-white rounded">
        Retry
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Blog</h1>

      {/* Category Filter */}
      <div className="mb-8">
        <button
          onClick={() => setFilter('All')}
          className={`px-4 py-2 mr-2 rounded-full ${
            filter === 'All' ? 'bg-yellow-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >All</button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 mr-2 rounded-full ${
              filter === cat ? 'bg-yellow-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >{cat}</button>
        ))}
      </div>

      {/* Blog Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(blog => (
            <motion.div
              key={blog._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={blog.coverImage || '/default-blog.jpg'}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-xs font-semibold px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                    {blog.category || 'General'}
                  </span>
                  <span className="text-xs text-gray-500 ml-3">
                    {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-4">{blog.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">By {blog.author}</span>
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="text-yellow-600 font-medium hover:text-yellow-700"
                  >Read more →</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No blogs found for {filter}.</p>
      )}
    </div>
  );
};

export default Blog;
