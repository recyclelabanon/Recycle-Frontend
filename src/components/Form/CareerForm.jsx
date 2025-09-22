import { useState } from 'react';
import useApi from '../../Hooks/useApi';
import PropTypes from 'prop-types';

const BRAND_BLUE = "#2726CC";

const CareerForm = ({ onSuccess }) => {
  const { sendRequest } = useApi();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    resume: null,
    message: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();
      formPayload.append('fullName', formData.name);
      formPayload.append('email', formData.email);
      formPayload.append('position', formData.position);
      formPayload.append('resume', formData.resume);
      formPayload.append('coverLetter', formData.message);

      await sendRequest('https://recyclelabanonweb.onrender.com/api/career', 'POST', formPayload);

      onSuccess();
      setFormData({
        name: '',
        email: '',
        position: '',
        resume: null,
        message: '',
      });
    } catch (error) {
      alert(`Error: ${error.message || 'Something went wrong'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[BRAND_BLUE] focus:border-transparent"
            style={{ '--tw-ring-color': BRAND_BLUE }}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[BRAND_BLUE] focus:border-transparent"
            style={{ '--tw-ring-color': BRAND_BLUE }}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Position</label>
          <select
            name="position"
            required
            value={formData.position}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[BRAND_BLUE] focus:border-transparent"
            style={{ '--tw-ring-color': BRAND_BLUE }}
          >
            <option value="">Select Position</option>
            <option value="Environmental Project Manager">Environmental Project Manager</option>
            <option value="Community Outreach Coordinator">Community Outreach Coordinator</option>
            <option value="Sustainability Consultant">Sustainability Consultant</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Resume</label>
          <input
            type="file"
            name="resume"
            required
            onChange={handleChange}
            accept=".pdf,.doc,.docx"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[BRAND_BLUE] focus:border-transparent"
            style={{ '--tw-ring-color': BRAND_BLUE }}
          />
        </div>
        <div className="col-span-full">
          <label className="block text-gray-700 mb-2">Cover Letter</label>
          <textarea
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[BRAND_BLUE] focus:border-transparent"
            style={{ '--tw-ring-color': BRAND_BLUE }}
            rows={4}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition-colors"
        style={{ backgroundColor: BRAND_BLUE }}
      >
        Submit Application
      </button>
    </form>
  );
};

CareerForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default CareerForm;
