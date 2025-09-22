import { useState } from 'react';
import useApi from '../../Hooks/useApi';
import PropTypes from 'prop-types';

const BRAND_BLUE = "#2726CC";

const VolunteerForm = ({ onSuccess }) => {
  const { sendRequest } = useApi();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    availability: '',
    interest: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        fullName: formData.name,
        email: formData.email,
        availability: formData.availability.toLowerCase(),
        areaOfInterest: formData.interest,
        motivation: formData.message,
      };

      await sendRequest(
        'https://recyclelabanonweb.onrender.com/api/volunteer',
        'POST',
        payload
      );

      onSuccess();
      setFormData({
        name: '',
        email: '',
        availability: '',
        interest: '',
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
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
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
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
            style={{ '--tw-ring-color': BRAND_BLUE }}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Availability</label>
          <select
            name="availability"
            required
            value={formData.availability}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
            style={{ '--tw-ring-color': BRAND_BLUE }}
          >
            <option value="">Select Availability</option>
            <option value="weekdays">Weekdays</option>
            <option value="weekends">Weekends</option>
            <option value="both">Both</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Areas of Interest</label>
          <select
            name="interest"
            required
            value={formData.interest}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
            style={{ '--tw-ring-color': BRAND_BLUE }}
          >
            <option value="">Select Interest</option>
            <option value="Tree Planting Initiative">Tree Planting Initiative</option>
            <option value="Community Education Program">Community Education Program</option>
            <option value="Digital Marketing Support">Digital Marketing Support</option>
          </select>
        </div>
        <div className="col-span-full">
          <label className="block text-gray-700 mb-2">Why do you want to volunteer?</label>
          <textarea
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
            style={{ '--tw-ring-color': BRAND_BLUE }}
            rows={4}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-900 transition-colors"
        style={{ backgroundColor: BRAND_BLUE }}
      >
        Submit Application
      </button>
    </form>
  );
};

VolunteerForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default VolunteerForm;
