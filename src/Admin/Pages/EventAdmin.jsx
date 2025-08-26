import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Edit, Trash, Plus, Filter, Users } from 'lucide-react';
import { useEvents } from '../Context/EventContext';

function EventAdmin() {
  const { events, loading, error, deleteEvent, fetchEvents } = useEvents();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Fetch events with optional status filter
    const filters = statusFilter !== 'all' ? { status: statusFilter } : {};
    fetchEvents(filters);
  }, [fetchEvents, statusFilter]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        setIsDeleting(true);
        await deleteEvent(id);
        // Events list should update automatically via context
      } catch (err) {
        setDeleteError('Failed to delete event');
        console.error(err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Format date to display nicely
  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // If same day event
    if (start.toDateString() === end.toDateString()) {
      return `${start.toLocaleDateString()} ${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Multi-day event
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  };

  // Get event status
  const getEventStatus = (event) => {
    const now = new Date();
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    
    if (now < start) return 'upcoming';
    if (now >= start && now <= end) return 'current';
    return 'past';
  };

  // Get color class based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'current': return 'bg-green-100 text-green-800';
      case 'past': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="p-4">Loading events...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading events: {error}
        <button 
          onClick={() => fetchEvents()}
          className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link
          to="/admin/events/new"
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus className="mr-2" size={16} />
          Add New Event
        </Link>
      </div>

      <div className="mb-4">
        <div className="flex items-center">
          <Filter className="mr-2 text-gray-500" size={18} />
          <span className="mr-2">Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming</option>
            <option value="current">Current</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>

      {deleteError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {deleteError}
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {events.length > 0 ? (
            events.map((event) => {
              const status = getEventStatus(event);
              return (
                <li key={event._id}>
                  <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="text-gray-500 mr-3" />
                      <div>
                        <h3 className="text-lg font-medium">{event.title}</h3>
                        <div className="mt-1 text-sm text-gray-500">
                          <span>{event.location}</span>
                          <span className="mx-2">•</span>
                          <span>{formatDateRange(event.startDate, event.endDate)}</span>
                        </div>
                        <div className="mt-2 flex items-center">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(status)}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                          <span className="ml-2 text-sm text-gray-500">
                            {event.registeredAttendees} / {event.maxSeats} registered
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      {/* Added link to view registrations */}
                      <Link
                        to={`/admin/events/${event._id}/registrations`}
                        className="flex items-center text-indigo-600 hover:text-indigo-800"
                        title="View Registrations"
                      >
                        <Users size={18} />
                        <span className="ml-1 text-sm">Registrations</span>
                      </Link>
                      <Link
                        to={`/admin/events/edit/${event._id}`}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                        title="Edit Event"
                      >
                        <Edit size={18} />
                        <span className="ml-1 text-sm">Edit</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(event._id)}
                        disabled={isDeleting}
                        className="flex items-center text-red-600 hover:text-red-800 disabled:opacity-50"
                        title="Delete Event"
                      >
                        <Trash size={18} />
                        <span className="ml-1 text-sm">Delete</span>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="px-4 py-5 text-center text-gray-500">
              No events found. Click &quot;Add New Event&quot; to create one.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default EventAdmin;