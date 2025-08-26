import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../Context/EventContext';
import { formatDate } from '../../Utils/dateUtils';
import { useAuth } from '../Context/AuthContext';

const EventRegistrations = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    currentEvent, 
    loading, 
    error, 
    fetchEventById, 
    clearCurrentEvent,
    clearError,
    fetchEventRegistrations
  } = useEvents();
  
  const [registrations, setRegistrations] = useState([]);
  const [registrationsLoading, setRegistrationsLoading] = useState(true);
  const [registrationsError, setRegistrationsError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

    const { token } = useAuth();
  

  // Fetch event details
  useEffect(() => {
    fetchEventById(id);
    
    // Cleanup on unmount
    return () => {
      clearCurrentEvent();
    };
  }, [id, fetchEventById, clearCurrentEvent]);

  // Fetch event registrations using context method
  useEffect(() => {
    const getRegistrations = async () => {
      if (!token) {
        setRegistrationsError("You need to be logged in to view registrations");
        setRegistrationsLoading(false);
        return;
      }
      
      setRegistrationsLoading(true);
      try {
        const data = await fetchEventRegistrations(id);
        setRegistrations(data.registrations || []);
        setRegistrationsError(null);
      } catch (err) {
        setRegistrationsError(err.message || 'Failed to fetch registrations');
      } finally {
        setRegistrationsLoading(false);
      }
    };

    if (id) {
      getRegistrations();
    }
  }, [id, fetchEventRegistrations, token]);

  const handleExportCSV = () => {
    const filteredRegistrations = getFilteredRegistrations();
    if (filteredRegistrations.length === 0) return;
    
    const headers = [
      'Registration ID',
      'Name',
      'Email',
      'Phone',
      'Status',
      'Registration Date',
      'Notes'
    ];
    
    const csvContent = [
      headers.join(','),
      ...filteredRegistrations.map(reg => [
        reg._id,
        `"${reg.name}"`,
        `"${reg.email}"`,
        `"${reg.phone || ''}"`,
        reg.status,
        formatDate(reg.registeredAt),
        `"${reg.notes || ''}"`
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${currentEvent?.title || 'event'}-registrations.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFilteredRegistrations = () => {
    return registrations.filter(reg => {
      const matchesSearch = 
        reg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (reg.phone && reg.phone.includes(searchTerm));
      
      const matchesFilter = 
        filterStatus === 'all' || 
        reg.status?.toLowerCase() === filterStatus;
      
      return matchesSearch && matchesFilter;
    });
  };

  const filteredRegistrations = getFilteredRegistrations();

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
          onClick={() => navigate('/admin/events')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Registrations for {currentEvent.title}
          </h1>
          <p className="text-gray-600">
            {formatDate(currentEvent.startDate)} | {registrations.length} total registrations
          </p>
        </div>
        <button 
          onClick={() => navigate(`/admin/events/edit/${id}`)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          Edit Event
        </button>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute left-3 top-2.5">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button
              onClick={handleExportCSV}
              disabled={filteredRegistrations.length === 0}
              className={`px-4 py-2 rounded-md ${
                filteredRegistrations.length === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Registrations Table */}
      {registrationsLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : registrationsError ? (
        <div className="bg-red-50 p-4 rounded-lg text-red-700 text-center">
          <p>{registrationsError}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 text-sm underline"
          >
            Try refreshing the page
          </button>
        </div>
      ) : registrations.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-700">No Registrations Yet</h3>
          <p className="text-gray-600 mt-2">
            There are no registrations for this event. Check back later or promote your event to get more sign-ups.
          </p>
        </div>
      ) : filteredRegistrations.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-700">No Matching Registrations</h3>
          <p className="text-gray-600 mt-2">
            No registrations match your current filters. Try adjusting your search or filter criteria.
          </p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registered
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRegistrations.map((registration) => (
                  <tr key={registration._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{registration.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{registration.email}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{registration.phone || '-'}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${registration.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          registration.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          registration.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'}`}>
                        {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(registration.registeredAt)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          // View registration details
                          // This could open a modal with full details
                          alert(`View details for ${registration.name}`);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventRegistrations;