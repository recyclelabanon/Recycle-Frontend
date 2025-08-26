import { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Assuming you have an AuthContext

// Note the v1 in the path
const API_URL = import.meta.env.VITE_REACT_APP_URL || 'http://localhost:5000/api/v1';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [eventMedia, setEventMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalEvents: 0
  });

  const { token, user } = useAuth();

  // Create a SINGLE consistent axios instance
  const api = useCallback(() => {
    return axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });
  }, [token]); 
  // Fetch all events with optional filters
  const fetchEvents = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const { search, status, page = 1, limit = 10, sort = '-startDate' } = filters;
      
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (status) queryParams.append('status', status);
      if (page) queryParams.append('page', page);
      if (limit) queryParams.append('limit', limit);
      if (sort) queryParams.append('sort', sort);
      
      const response = await api().get(`/events?${queryParams.toString()}`);
      
      setEvents(response.data.events);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalEvents: response.data.count
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to fetch events');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]); // Added api as dependency

  // Fetch a single event by ID
  const fetchEventById = useCallback(async (eventId) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api().get(`/events/${eventId}`);
      setCurrentEvent(response.data.event);
      
      // Also update the event media if available in the response
      if (response.data.media) {
        setEventMedia(response.data.media);
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.msg || `Failed to fetch event with ID: ${eventId}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]);

  // Create a new event
  const createEvent = useCallback(async (eventData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api().post('/events', eventData);
      
      // Update events list with the new event
      setEvents(prevEvents => [...prevEvents, response.data.event]);
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create event');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]);

  // Update an existing event
  const updateEvent = useCallback(async (eventId, eventData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api().patch(`/events/${eventId}`, eventData);
      
      // Update events list and current event
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event._id === eventId ? response.data.event : event
        )
      );
      
      if (currentEvent && currentEvent._id === eventId) {
        setCurrentEvent(response.data.event);
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.msg || `Failed to update event with ID: ${eventId}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api, currentEvent]);

  // Delete an event
  const deleteEvent = useCallback(async (eventId) => {
    try {
      setLoading(true);
      setError(null);
      
      await api().delete(`/events/${eventId}`);
      
      // Remove event from state
      setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
      
      if (currentEvent && currentEvent._id === eventId) {
        setCurrentEvent(null);
      }
      
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.msg || `Failed to delete event with ID: ${eventId}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api, currentEvent]);

  // Register for an event
  const registerForEvent = useCallback(async (eventId, registrationData = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api().post(`/events/${eventId}/registrations`, registrationData);
      
      // Update the current event's registration count if we're viewing it
      if (currentEvent && currentEvent._id === eventId) {
        setCurrentEvent(prevEvent => ({
          ...prevEvent,
          registeredAttendees: prevEvent.registeredAttendees + 1,
          remainingSeats: prevEvent.remainingSeats - 1
        }));
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to register for event');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api, currentEvent]);

  // Cancel a registration
  const cancelRegistration = useCallback(async (eventId, registrationId) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api().delete(`/events/${eventId}/registrations/${registrationId}`);
      
      // Update the registrations list
      setRegistrations(prevRegistrations => 
        prevRegistrations.map(reg => 
          reg._id === registrationId ? { ...reg, status: 'cancelled' } : reg
        )
      );
      
      // Update the current event's registration count if we're viewing it
      if (currentEvent && currentEvent._id === eventId) {
        setCurrentEvent(prevEvent => ({
          ...prevEvent,
          registeredAttendees: Math.max(0, prevEvent.registeredAttendees - 1),
          remainingSeats: prevEvent.remainingSeats + 1
        }));
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to cancel registration');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api, currentEvent]);

  // Fetch registrations for an event (admin only)
  // In your EventContext.js, modify the fetchEventRegistrations function:
const fetchEventRegistrations = useCallback(async (eventId, filters = {}) => {
  try {
    setLoading(true);
    setError(null);
    
    if (!token) {
      throw new Error("Authentication required");
    }
    
    console.log('Current user role:', user?.role); // Add this to debug
    console.log('Current user ID:', user?.userId); // Add this to debug
    console.log('Event ID:', eventId);
    
    const { status, page = 1, limit = 25 } = filters;
    
    const queryParams = new URLSearchParams();
    if (status) queryParams.append('status', status);
    if (page) queryParams.append('page', page);
    if (limit) queryParams.append('limit', limit);
    
    const response = await api().get(`/events/${eventId}/registrations?${queryParams.toString()}`);
    
    setRegistrations(response.data.registrations);
    
    return response.data;
  } catch (err) {
    console.error('Error fetching registrations:', err);
    // Add more detailed error logging
    if (err.response) {
      console.error('Response data:', err.response.data);
      console.error('Response status:', err.response.status);
    }
    setError(err.response?.data?.message || err.response?.data?.msg || 'Failed to fetch registrations');
    throw err;
  } finally {
    setLoading(false);
  }
}, [api, token, user]);

  // Upload media for an event
  const uploadEventMedia = useCallback(async (eventId, formData) => {
    try {
      setLoading(true);
      setError(null);
      
      // FormData requires different content-type header
      const mediaResponse = await api().post(`/events/${eventId}/media`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      
      // Update media list with the new upload
      setEventMedia(prevMedia => [...prevMedia, mediaResponse.data.media]);
      
      return mediaResponse.data;
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to upload media');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api, token]);

  // Fetch media for an event
  const fetchEventMedia = useCallback(async (eventId, type) => {
    try {
      setLoading(true);
      setError(null);
      
      const queryParams = new URLSearchParams();
      if (type) queryParams.append('type', type);
      
      const response = await api().get(`/events/${eventId}/media?${queryParams.toString()}`);
      
      setEventMedia(response.data.media);
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to fetch event media');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]);

  // Delete media
  const deleteMedia = useCallback(async (mediaId) => {
    try {
      setLoading(true);
      setError(null);
      
      await api().delete(`/media/${mediaId}`);
      
      // Remove media from state
      setEventMedia(prevMedia => prevMedia.filter(media => media._id !== mediaId));
      
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.msg || `Failed to delete media with ID: ${mediaId}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]);

  // Check if user is registered for an event
  const checkRegistration = useCallback(async (eventId) => {
    if (!user) return { isRegistered: false };
    
    try {
      // Try to check the user's own registration status
      const response = await api().get(`/users/me/registrations?eventId=${eventId}`);
      
      // Look for active registrations for this event
      const activeRegistration = response.data.registrations?.find(
        reg => reg.event === eventId && reg.status !== 'cancelled'
      );
      
      return { 
        isRegistered: !!activeRegistration,
        registration: activeRegistration || null
      };
    } catch {
      // Fall back to checking all event registrations if the above endpoint fails
      try {
        const response = await api().get(`/events/${eventId}/registrations`);
        
        const userRegistration = response.data.registrations.find(
          reg => reg.user?._id === user.userId && reg.status !== 'cancelled'
        );
        
        return { 
          isRegistered: !!userRegistration,
          registration: userRegistration || null
        };
      } catch {
        console.error("Couldn't check registration status");
        return { isRegistered: false };
      }
    }
  }, [api, user]);

  // Get event status helper
  const getEventStatus = useCallback((event) => {
    if (!event) return null;
    
    const now = new Date();
    if (now < new Date(event.startDate)) {
      return 'upcoming';
    } else if (now >= new Date(event.startDate) && now <= new Date(event.endDate)) {
      return 'current';
    } else {
      return 'past';
    }
  }, []);

  // Clear current event and related data
  const clearCurrentEvent = useCallback(() => {
    setCurrentEvent(null);
    setEventMedia([]);
    setRegistrations([]);
  }, []);

  // Clear error state
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    events,
    currentEvent,
    registrations,
    eventMedia,
    loading,
    error,
    pagination,
    fetchEvents,
    fetchEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    cancelRegistration,
    fetchEventRegistrations,
    uploadEventMedia,
    fetchEventMedia,
    deleteMedia,
    checkRegistration,
    getEventStatus,
    clearCurrentEvent,
    clearError
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

// Custom hook to use the EventContext
export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};