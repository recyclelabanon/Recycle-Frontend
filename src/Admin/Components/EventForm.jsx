import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Info, Clock, Image, FileVideo } from 'lucide-react';

function EventForm({ event, onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    startTime: '09:00',
    endDate: '',
    endTime: '17:00',
    maxSeats: 50,
    imageUrl: '',
    videoUrl: '',
    additionalInfo: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // If editing an existing event, populate the form
    if (event) {
      const startDateTime = new Date(event.startDate);
      const endDateTime = new Date(event.endDate);
      
      setFormData({
        title: event.title || '',
        description: event.description || '',
        location: event.location || '',
        startDate: startDateTime.toISOString().split('T')[0],
        startTime: startDateTime.toTimeString().slice(0, 5),
        endDate: endDateTime.toISOString().split('T')[0],
        endTime: endDateTime.toTimeString().slice(0, 5),
        maxSeats: event.maxSeats || 50,
        imageUrl: event.imageUrl || '',
        videoUrl: event.videoUrl || '',
        additionalInfo: event.additionalInfo || '',
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user makes changes
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
    
    if (endDateTime <= startDateTime) {
      newErrors.endDate = 'End date/time must be after start date/time';
    }
    
    if (formData.maxSeats < 1) newErrors.maxSeats = 'Must have at least 1 seat';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Combine date and time into proper Date objects
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
    
    const eventData = {
      ...formData,
      startDate: startDateTime,
      endDate: endDateTime,
    };
    
    // Remove the separate time fields before submitting
    delete eventData.startTime;
    delete eventData.endTime;
    
    onSubmit(eventData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="flex items-center">
          <Calendar className="mr-2 text-gray-500" size={18} />
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Event Title
          </label>
        </div>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          } px-3 py-2 focus:border-blue-500 focus:outline-none`}
          placeholder="Enter event title"
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>

      <div>
        <div className="flex items-center">
          <Info className="mr-2 text-gray-500" size={18} />
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
        </div>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className={`mt-1 block w-full rounded-md border ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          } px-3 py-2 focus:border-blue-500 focus:outline-none`}
          placeholder="Enter event description"
        />
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
      </div>

      <div>
        <div className="flex items-center">
          <MapPin className="mr-2 text-gray-500" size={18} />
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
        </div>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${
            errors.location ? 'border-red-500' : 'border-gray-300'
          } px-3 py-2 focus:border-blue-500 focus:outline-none`}
          placeholder="Enter event location"
        />
        {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center">
            <Clock className="mr-2 text-gray-500" size={18} />
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
          </div>
          <div className="flex mt-1 space-x-2">
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={`block w-full rounded-md border ${
                errors.startDate ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2 focus:border-blue-500 focus:outline-none`}
            />
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="block w-36 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
        </div>

        <div>
          <div className="flex items-center">
            <Clock className="mr-2 text-gray-500" size={18} />
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
          </div>
          <div className="flex mt-1 space-x-2">
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className={`block w-full rounded-md border ${
                errors.endDate ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2 focus:border-blue-500 focus:outline-none`}
            />
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="block w-36 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          {errors.endDate && <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>}
        </div>
      </div>

      <div>
        <div className="flex items-center">
          <Users className="mr-2 text-gray-500" size={18} />
          <label htmlFor="maxSeats" className="block text-sm font-medium text-gray-700">
            Maximum Seats
          </label>
        </div>
        <input
          type="number"
          id="maxSeats"
          name="maxSeats"
          value={formData.maxSeats}
          onChange={handleChange}
          min="1"
          className={`mt-1 block w-full md:w-1/4 rounded-md border ${
            errors.maxSeats ? 'border-red-500' : 'border-gray-300'
          } px-3 py-2 focus:border-blue-500 focus:outline-none`}
        />
        {errors.maxSeats && <p className="mt-1 text-sm text-red-500">{errors.maxSeats}</p>}
      </div>

      <div>
        <div className="flex items-center">
          <Image className="mr-2 text-gray-500" size={18} />
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Image URL (Optional)
          </label>
        </div>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          placeholder="Enter image URL"
        />
      </div>

      <div>
        <div className="flex items-center">
          <FileVideo className="mr-2 text-gray-500" size={18} />
          <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
            Video URL (Optional)
          </label>
        </div>
        <input
          type="text"
          id="videoUrl"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          placeholder="Enter video URL"
        />
      </div>

      <div>
        <div className="flex items-center">
          <Info className="mr-2 text-gray-500" size={18} />
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
            Additional Information (Optional)
          </label>
        </div>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          placeholder="Enter any additional information"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
}

export default EventForm;