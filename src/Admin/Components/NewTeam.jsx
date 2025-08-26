// src/admin/Pages/NewTeam.js

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import { useTeamContext } from '../Context/TeamContext';

function NewTeam() {
  const navigate = useNavigate();
  const { addTeam } = useTeamContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    position: '',
    category: '',
    introduction: '',
    profilePic: null
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePic: file }));
      
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await addTeam(formData);
      navigate('/admin/teams');
    } catch (err) {
      setError(err.message || 'Failed to add team member');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin/teams')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Team Members
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">Add New Team Member</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
            Position *
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category *
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="E.g., Leadership, Development, Marketing"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="introduction">
            Introduction
          </label>
          <textarea
            id="introduction"
            name="introduction"
            value={formData.introduction}
            onChange={handleChange}
            maxLength={200}
            rows={3}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Brief introduction (max 200 characters)"
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.introduction.length}/200 characters
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePic">
            Profile Picture
          </label>
          <div className="flex items-center">
            <label className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">
              <Upload size={16} className="mr-2" />
              Choose File
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span className="ml-3 text-sm text-gray-500">
              {formData.profilePic ? formData.profilePic.name : 'No file chosen'}
            </span>
          </div>
          
          {previewImage && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <img
                src={previewImage}
                alt="Profile preview"
                className="w-32 h-32 object-cover rounded-full border border-gray-200"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => navigate('/admin/teams')}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300"
          >
            {isSubmitting ? 'Saving...' : 'Save Team Member'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTeam;