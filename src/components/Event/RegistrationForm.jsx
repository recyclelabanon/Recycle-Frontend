import { useState } from 'react';
import { useEvents } from '../../Admin/Context/EventContext';
import { useAuth } from '../../Admin/Context/AuthContext';

const RegistrationForm = ({ event, onClose, onRegistrationComplete }) => {
  const { registerForEvent, cancelRegistration, loading, error, clearError } = useEvents();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    specialRequests: '',
    guestInfo: {
      name: user?.name || '',
      email: user?.email || '',
      phone: ''
    }
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const validateForm = () => {
    const errors = {};
    
    // If guest registration (no user account)
    if (!user?.userId) {
      if (!formData.guestInfo.name.trim()) {
        errors.name = 'Name is required';
      }
      
      if (!formData.guestInfo.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.guestInfo.email)) {
        errors.email = 'Email is invalid';
      }
      
      if (!formData.guestInfo.phone.trim()) {
        errors.phone = 'Phone number is required';
      }
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('guest.')) {
      const guestField = name.split('.')[1];
      setFormData({
        ...formData,
        guestInfo: {
          ...formData.guestInfo,
          [guestField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Register for the event
      const registrationData = {
        specialRequests: formData.specialRequests
      };
      
      // Include guest info if user is not logged in
      if (!user?.userId) {
        registrationData.guestInfo = formData.guestInfo;
      }
      
      const response = await registerForEvent(event._id, registrationData);
      
      setRegistrationSuccess(true);
      
      // Delay to show success message
      setTimeout(() => {
        onRegistrationComplete(response);
      }, 1500);
      
    } catch (err) {
      console.error('Registration failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async (registrationId) => {
    try {
      setIsSubmitting(true);
      await cancelRegistration(event._id, registrationId);
      onRegistrationComplete();
    } catch (err) {
      console.error('Failed to cancel registration:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold text-gray-800">Register for Event</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Event Summary */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">{event.title}</h3>
            <p className="text-sm text-gray-600">
              {new Date(event.startDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                  <button
                    onClick={clearError}
                    className="text-sm font-medium text-red-700 hover:text-red-600 mt-1"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {registrationSuccess ? (
            <div className="text-center py-6">
              <div className="rounded-full bg-green-100 p-3 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Registration Successful!</h3>
              <p className="text-gray-600">You are now registered for this event.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Guest Information (only show if user is not logged in) */}
              {!user?.userId && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Your Information</h3>
                  
                  <div className="mb-4">
                    <label htmlFor="guest.name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="guest.name"
                      name="guest.name"
                      value={formData.guestInfo.name}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Your full name"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="guest.email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="guest.email"
                      name="guest.email"
                      value={formData.guestInfo.email}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="your.email@example.com"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="guest.phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="guest.phone"
                      name="guest.phone"
                      value={formData.guestInfo.phone}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Your phone number"
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Special Requests */}
              <div className="mb-6">
                <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requests (Optional)
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Any special accommodations or requests?"
                ></textarea>
              </div>

              {/* Registration Details */}
              <div className="mb-6 bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-900 mb-3">Registration Details</h3>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Event Price:</span>
                  <span className="font-medium">{event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}</span>
                </div>
                
                {event.price > 0 && (
                  <div className="text-xs text-gray-500 mt-2">
                    <p>Payment will be collected at the venue.</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Complete Registration'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;