import { useState } from 'react';
import PropTypes from 'prop-types';
import useApi from '../../Hooks/useApi';

const BRAND_BLUE = "#2726CC";

const PartnerForm = ({ onSuccess }) => {
  const { sendRequest } = useApi();
  const [formData, setFormData] = useState({
    organization: '',
    contactPerson: '',
    email: '',
    phone: '',
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
        organizationName: formData.organization,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        partnershipInterest: formData.message,
      };

      await sendRequest(
        'https://recyclelabanonweb.onrender.com/api/partner',
        'POST',
        payload
      );

      onSuccess();
      setFormData({
        organization: '',
        contactPerson: '',
        email: '',
        phone: '',
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
          <label className="block text-gray-700 mb-2">Organization Name</label>
          <input
            type="text"
            name="organization"
            required
            value={formData.organization}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
            style={{ '--tw-ring-color': BRAND_BLUE }}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Contact Person</label>
          <input
            type="text"
            name="contactPerson"
            required
            value={formData.contactPerson}
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
          <label className="block text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
            style={{ '--tw-ring-color': BRAND_BLUE }}
          />
        </div>
        <div className="col-span-full">
          <label className="block text-gray-700 mb-2">Partnership Interest</label>
          <textarea
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
            style={{ '--tw-ring-color': BRAND_BLUE }}
            rows={4}
            placeholder="Tell us about your organization..."
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-900 transition-colors"
        style={{ backgroundColor: BRAND_BLUE }}
      >
        Submit Partnership Request
      </button>
    </form>
  );
};

PartnerForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default PartnerForm;
