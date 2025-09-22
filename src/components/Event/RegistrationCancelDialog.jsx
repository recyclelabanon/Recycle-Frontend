import { useState } from 'react';
import { useEvents } from '../../Admin/Context/EventContext';

const RegistrationCancelDialog = ({ event, registration, onClose, onCancelled }) => {
  const { cancelRegistration, loading, error } = useEvents();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);

  const handleCancel = async () => {
    try {
      setIsSubmitting(true);
      await cancelRegistration(event._id, registration._id);
      setCancelSuccess(true);
      
      // Delay to show success message
      setTimeout(() => {
        onCancelled();
      }, 1500);
    } catch (err) {
      console.error('Failed to cancel registration:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold text-gray-800">Cancel Registration</h2>
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
          {cancelSuccess ? (
            <div className="text-center py-6">
              <div className="rounded-full bg-blue-100 p-3 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Registration Cancelled</h3>
              <p className="text-gray-600">Your registration has been successfully cancelled.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-center mb-4 text-red-500">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                </div>
                
                <h3 className="text-lg font-medium text-center text-gray-900 mb-2">
                  Are you sure you want to cancel your registration?
                </h3>
                
                <p className="text-center text-gray-600 mb-4">
                  This action cannot be undone. You may need to re-register if you change your mind.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">{event.title}</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(event.startDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Ticket #: {registration.ticketNumber}
                  </p>
                </div>
                
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  disabled={isSubmitting}
                >
                  Keep Registration
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
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
                    'Cancel Registration'
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationCancelDialog;