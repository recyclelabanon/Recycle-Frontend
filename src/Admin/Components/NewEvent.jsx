import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useEvents } from '../Context/EventContext';
import EventForm from '../Components/EventForm';

function NewEvent() {
  const { createEvent } = useEvents();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (eventData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await createEvent(eventData);
      navigate('/admin/events');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create event. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <Link
          to="/admin/events"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Events
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Event</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <EventForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}

export default NewEvent;