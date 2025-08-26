// Format date to a readable string
export const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Format date without time
  export const formatDateOnly = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    };
    
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get relative time (e.g., "2 days ago", "in 3 hours")
  export const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days ago`;
    } else if (diffDays === 0 && diffHours < 0) {
      return `${Math.abs(diffHours)} hours ago`;
    } else if (diffDays === 0 && diffHours >= 0 && diffHours < 24) {
      return `in ${diffHours} hours`;
    } else {
      return `in ${diffDays} days`;
    }
  };
  
  // Format time range (e.g., "10:00 AM - 2:00 PM")
  export const formatTimeRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startTime = start.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    const endTime = end.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    return `${startTime} - ${endTime}`;
  };