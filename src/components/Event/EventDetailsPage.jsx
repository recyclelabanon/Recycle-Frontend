import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Admin/Context/AuthContext';
import { useEvents } from '../../Admin/Context/EventContext';
import { formatDate, formatTimeRange } from '../../Utils/dateUtils';
import RegistrationForm from './RegistrationForm';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { 
    currentEvent, 
    loading, 
    error, 
    fetchEventById, 
    checkRegistration,
    getEventStatus,
    clearCurrentEvent,
    clearError
  } = useEvents();
  
  const [registrationStatus, setRegistrationStatus] = useState({
    isRegistered: false,
    registration: null,
    loading: true
  });
  
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  // Fetch event details
  useEffect(() => {
    fetchEventById(id);
    
    // Check if user is registered
    const checkUserRegistration = async () => {
      try {
        const status = await checkRegistration(id);
        setRegistrationStatus({
          isRegistered: status.isRegistered,
          registration: status.registration,
          loading: false
        });
      } catch {
        setRegistrationStatus({
          isRegistered: false,
          registration: null,
          loading: false
        });
      }
    };
    
    checkUserRegistration();
    
    // Cleanup on unmount
    return () => {
      clearCurrentEvent();
    };
  }, [id, fetchEventById, checkRegistration, clearCurrentEvent]);

  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      navigate(`/login?redirect=/events/${id}`);
      return;
    }
    
    setShowRegistrationForm(true);
  };

  const handleCancelRegistration = () => {
    // This will be implemented in the RegistrationForm component
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 bg-red-50 rounded-lg">
        <h2 className="text-xl font-bold text-red-700">Error</h2>
        <p className="text-red-600">{error}</p>
        <button 
          onClick={clearError}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!currentEvent) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold text-gray-700">Event Not Found</h2>
        <p className="text-gray-600 mt-2">The event you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <button 
          onClick={() => navigate('/events')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Events
        </button>
      </div>
    );
  }

  const eventStatus = getEventStatus(currentEvent);
  const isEventPast = eventStatus === 'past';
  const isSoldOut = currentEvent.remainingSeats <= 0;
  const canRegister = !isEventPast && !isSoldOut && !registrationStatus.isRegistered;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => navigate('/events')}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Events
          </button>
          
          {/* Status Badge */}
          {eventStatus === 'upcoming' && (
            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
              Upcoming
            </span>
          )}
          {eventStatus === 'current' && (
            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-green-800">
              Happening Now
            </span>
          )}
          {eventStatus === 'past' && (
            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 text-gray-600">
              Past Event
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{currentEvent.title}</h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event Details */}
        <div className="lg:col-span-2">
          {/* Featured Image */}
          <div className="bg-gray-200 rounded-lg overflow-hidden mb-6 h-64 md:h-96">
            {currentEvent.featuredImage ? (
              <img 
                src={currentEvent.featuredImage} 
                alt={currentEvent.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>

          {/* Event Info */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
            <div className="prose max-w-none">
              <p className="whitespace-pre-line">{currentEvent.description}</p>
            </div>
          </div>

          {/* Location */}
          {currentEvent.location && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-4">Location</h2>
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-gray-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <div>
                  <p className="text-gray-800">{currentEvent.location}</p>
                  {currentEvent.locationDetails && (
                    <p className="text-gray-600 text-sm mt-1">{currentEvent.locationDetails}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Additional Details (if available) */}
          {currentEvent.additionalInfo && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{currentEvent.additionalInfo}</p>
              </div>
            </div>
          )}
        </div>

        {/* Registration Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
            <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
            
            {/* Date & Time */}
            <div className="mb-4">
              <h3 className="text-gray-700 font-medium mb-2">Date & Time</h3>
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-gray-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <div>
                  <p className="text-gray-800">{formatDate(currentEvent.startDate)}</p>
                  <p className="text-gray-600 text-sm">
                    {formatTimeRange(currentEvent.startDate, currentEvent.endDate)}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Price */}
            <div className="mb-4">
              <h3 className="text-gray-700 font-medium mb-2">Price</h3>
              <p className="text-2xl font-bold text-gray-900">
                {currentEvent.price > 0 ? `$${currentEvent.price.toFixed(2)}` : 'Free'}
              </p>
            </div>
            
            {/* Availability */}
            <div className="mb-6">
              <h3 className="text-gray-700 font-medium mb-2">Availability</h3>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                <p className="text-gray-800">
                  {isSoldOut 
                    ? 'Sold Out' 
                    : `${currentEvent.remainingSeats} seats remaining`
                  }
                </p>
              </div>
            </div>
            
            {/* Registration Status */}
            {registrationStatus.loading ? (
              <div className="flex justify-center my-4">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {registrationStatus.isRegistered ? (
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
                    <div className="flex">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <div>
                        <p className="font-medium text-blue-800">You&apos;re registered!</p>
                        <p className="text-sm text-blue-700 mt-1">
                          Ticket #: {registrationStatus.registration?.ticketNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
            )}
            
            {/* Registration Button */}
            {canRegister ? (
              <button
                onClick={handleRegisterClick}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition duration-200"
              >
                Register Now
              </button>
            ) : (
              <>
                {registrationStatus.isRegistered ? (
                  <button
                    onClick={handleCancelRegistration}
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-md font-medium hover:bg-red-700 transition duration-200"
                  >
                    Cancel Registration
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-md font-medium cursor-not-allowed"
                  >
                    {isEventPast ? 'Event Ended' : 'Registration Closed'}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <RegistrationForm 
          event={currentEvent}
          onClose={() => setShowRegistrationForm(false)}
          onRegistrationComplete={() => {
            setShowRegistrationForm(false);
            // Refresh registration status
            checkRegistration(id).then(status => {
              setRegistrationStatus({
                isRegistered: status.isRegistered,
                registration: status.registration,
                loading: false
              });
            });
          }}
        />
      )}
    </div>
  );
};

export default EventDetailsPage;