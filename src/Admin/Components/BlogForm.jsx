import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '', // Changed from excerpt to match schema
    category: '',
    coverImage: '', // Changed from imageUrl to match schema
    author: '',
    videoUrl: '',
    tags: ''
  });

  useEffect(() => {
    if (initialData) {
      // Convert tags array to a comma-separated string if present
      setFormData({
        ...initialData,
        tags: initialData.tags ? initialData.tags.join(', ') : ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, coverImage: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process tags: convert from string to an array
    const processedData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    onSubmit(processedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
          Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          required
          rows="2"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows="10"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      
      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
          Cover Image
        </label>
        <input
          type="file"
          id="coverImage"
          name="coverImage"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {typeof formData.coverImage === 'string' && formData.coverImage && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-1">Current Image:</p>
            <img 
              src={formData.coverImage} 
              alt="Preview" 
              className="h-40 object-cover rounded-md"
            />
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">
          YouTube Video URL (embed format)
        </label>
        <input
          type="text"
          id="videoUrl"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
          placeholder="https://www.youtube.com/embed/VIDEO_ID"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="React, JavaScript, Web Development"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

BlogForm.propTypes = {
  initialData: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    summary: PropTypes.string,
    category: PropTypes.string,
    coverImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    author: PropTypes.string,
    videoUrl: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default BlogForm;