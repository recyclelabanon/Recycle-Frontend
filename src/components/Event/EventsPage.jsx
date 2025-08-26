import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import { useEvents } from '../../Admin/Context/EventContext';

const EventsPage = () => {
  const { 
    events, 
    loading, 
    error, 
    pagination, 
    fetchEvents,
    clearError 
  } = useEvents();
  
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    page: 1,
    limit: 10,
    sort: '-startDate'
  });

  useEffect(() => {
    fetchEvents(filters);
  }, [filters.page, filters.status, filters.sort, fetchEvents]);

  // Debounced search
  useEffect(() => {
    const searchTimer = setTimeout(() => {
      if (filters.search || filters.search === '') {
        fetchEvents({...filters, page: 1});
      }
    }, 500);
    
    return () => clearTimeout(searchTimer);
  }, [filters.search, fetchEvents]);

  const handleSearchChange = (e) => {
    setFilters({...filters, search: e.target.value, page: 1});
  };

  const handleStatusChange = (e) => {
    setFilters({...filters, status: e.target.value, page: 1});
  };

  const handleSortChange = (e) => {
    setFilters({...filters, sort: e.target.value, page: 1});
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setFilters({...filters, page: newPage});
    }
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Events</h1>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              value={filters.search}
              onChange={handleSearchChange}
              placeholder="Search events..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={filters.status}
              onChange={handleStatusChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Events</option>
              <option value="upcoming">Upcoming</option>
              <option value="current">Currently Running</option>
              <option value="past">Past Events</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              id="sort"
              value={filters.sort}
              onChange={handleSortChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="-startDate">Date (Newest First)</option>
              <option value="startDate">Date (Oldest First)</option>
              <option value="title">Title (A-Z)</option>
              <option value="-title">Title (Z-A)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {events.length === 0 ? (
            <div className="text-center p-12 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-600">No events found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(event => (
                <Link to={`/events/${event._id}`} key={event._id}>
                  <EventCard event={event} />
                </Link>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() => handlePageChange(filters.page - 1)}
                  disabled={filters.page === 1}
                  className={`px-3 py-1 rounded-l-md border ${
                    filters.page === 1 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                
                <div className="flex">
                  {[...Array(pagination.totalPages).keys()].map(page => (
                    <button
                      key={page + 1}
                      onClick={() => handlePageChange(page + 1)}
                      className={`px-3 py-1 border-t border-b ${
                        filters.page === page + 1
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => handlePageChange(filters.page + 1)}
                  disabled={filters.page === pagination.totalPages}
                  className={`px-3 py-1 rounded-r-md border ${
                    filters.page === pagination.totalPages
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventsPage;