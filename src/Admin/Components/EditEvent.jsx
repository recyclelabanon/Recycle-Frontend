import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import { useEvents } from '../Context/EventContext';
import EventForm from '../Components/EventForm';

function EditEvent() {
  const { fetchEventById, updateEvent } = useEvents();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setIsLoading(true);
        const data = await fetchEventById(id);
        setEvent(data.event);
      } catch (err) {
        setError(err.response?.data?.msg || `Failed to load event with ID: ${id}`);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvent();
  }, [fetchEventById, id]);

  const handleSubmit = async (eventData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await updateEvent(id, eventData);
      navigate('/admin/events');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to update event. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 flex justify-center items-center h-64">
        <Loader className="animate-spin text-blue-500" size={36} />
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <div className="mt-4">
          <Link
            to="/admin/events"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold mb-6">Edit Event</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {event && <EventForm event={event} onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
      </div>
    </div>
  );
}

export default EditEvent;