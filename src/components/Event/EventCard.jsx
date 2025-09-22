import { formatDate } from "../../Utils/dateUtils";

const BRAND_BLUE = "#2726CC";

const EventCard = ({ event }) => {
  // Calculate status based on dates
  const getStatusBadge = () => {
    const now = new Date();
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    
    let badgeClass = '';
    let status = '';
    
    if (now < startDate) {
      badgeClass = 'bg-blue-100 text-blue-800';
      status = 'Upcoming';
    } else if (now >= startDate && now <= endDate) {
      badgeClass = `bg-${BRAND_BLUE}-100 text-${BRAND_BLUE}-800`;
      status = 'Happening Now';
    } else {
      badgeClass = 'bg-gray-100 text-gray-600';
      status = 'Past Event';
    }
    
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full`} style={{
        backgroundColor: now >= startDate && now <= endDate ? BRAND_BLUE + '20' : undefined,
        color: now >= startDate && now <= endDate ? BRAND_BLUE : undefined
      }}>
        {status}
      </span>
    );
  };

  // Calculate seats availability badge
  const getAvailabilityBadge = () => {
    if (event.remainingSeats === 0) {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
          Sold Out
        </span>
      );
    }
    
    if (event.remainingSeats <= 5) {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: BRAND_BLUE + '20', color: BRAND_BLUE }}>
          Few Seats Left
        </span>
      );
    }
    
    return (
      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100" style={{ color: BRAND_BLUE }}>
        Seats Available
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
      {/* Event Image */}
      <div className="h-48 bg-gray-200 relative">
        {event.featuredImage ? (
          <img 
            src={event.featuredImage} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          {getStatusBadge()}
        </div>
      </div>
      
      {/* Event Details */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">{event.title}</h3>
        
        <div className="mt-2 text-sm text-gray-600">
          <div className="flex items-center mb-1">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span>{formatDate(event.startDate)}</span>
          </div>
          
          <div className="flex items-center mb-1">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
        
        {/* Event Description */}
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
          {event.description}
        </p>
        
        {/* Availability and Price */}
        <div className="mt-4 flex items-center justify-between">
          {getAvailabilityBadge()}
          
          <span className="font-semibold text-gray-800">
            {event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
