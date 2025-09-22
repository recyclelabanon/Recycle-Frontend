// components/ResidencyForm.jsx
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import PropTypes from 'prop-types';

const BRAND_BLUE = "#2726CC";

const ResidencyForm = ({ program, onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSuccess();
    setIsSubmitting(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4" style={{ color: BRAND_BLUE }}>
        Apply for Residency at {program}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            {...register('name', { required: true })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent"
            style={{ '--tw-ring-color': BRAND_BLUE }}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent"
            style={{ '--tw-ring-color': BRAND_BLUE }}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Portfolio/Website
          </label>
          <input
            {...register('portfolio')}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent"
            style={{ '--tw-ring-color': BRAND_BLUE }}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Proposal
          </label>
          <textarea
            {...register('proposal', { required: true })}
            rows={5}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent"
            style={{ '--tw-ring-color': BRAND_BLUE }}
          />
          {errors.proposal && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Dates
          </label>
          <input
            type="text"
            {...register('dates')}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent"
            style={{ '--tw-ring-color': BRAND_BLUE }}
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full text-white py-2 px-4 rounded-md hover:bg-blue-900 disabled:bg-gray-400"
          style={{ backgroundColor: BRAND_BLUE }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

ResidencyForm.propTypes = {
  program: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default ResidencyForm;
