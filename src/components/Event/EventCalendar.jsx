import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const BRAND_BLUE = "#2726CC";

moment.locale('en');
const localizer = momentLocalizer(moment);

const EventCalendar = ({ events, onSelectEvent }) => {
  // Custom styling for calendar events
  const eventStyleGetter = () => ({
    style: {
      backgroundColor: '#f0fdf4',
      border: '1px solid #4ade80',
      borderRadius: '6px',
      color: '#14532d',
      fontSize: '0.875rem',
      padding: '2px 6px',
    },
  });

  // Custom Toolbar Component
  const CustomToolbar = ({ date, onNavigate, onView, view }) => (
    <div className="mb-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button 
            onClick={() => onNavigate('PREV')}
            className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            ←
          </button>
          <button 
            onClick={() => onNavigate('NEXT')}
            className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            →
          </button>
        </div>
        <span className="text-lg font-semibold text-gray-800">
          {moment(date).format('MMMM YYYY')}
        </span>
        <button
          onClick={() => onNavigate('TODAY')}
          className="px-4 py-1.5 rounded-lg text-white hover:opacity-90"
          style={{ backgroundColor: BRAND_BLUE }}
        >
          Today
        </button>
      </div>
      <div className="flex gap-2">
        {['month', 'week', 'day'].map((v) => (
          <button
            key={v}
            onClick={() => onView(v)}
            className={`px-4 py-1.5 rounded-lg capitalize text-white`}
            style={{
              backgroundColor: view === v ? BRAND_BLUE : '#f3f4f6',
              color: view === v ? '#ffffff' : '#374151',
            }}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );

  CustomToolbar.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    onNavigate: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
    view: PropTypes.string.isRequired,
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={onSelectEvent}
        style={{ height: 600 }}
        components={{
          toolbar: CustomToolbar,
          event: ({ event }) => (
            <div className="hover:bg-blue-50 transition-colors">
              {event.title}
            </div>
          ),
        }}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={() => ({ className: 'hover:bg-gray-50' })}
        views={['month', 'week', 'day', 'agenda']}
        defaultView="month"
        popup
        showMultiDayTimes
        min={new Date().setHours(8, 0, 0)}
        max={new Date().setHours(20, 0, 0)}
        className="modern-calendar"
      />
    </div>
  );
};

EventCalendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      start: PropTypes.instanceOf(Date).isRequired,
      end: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  onSelectEvent: PropTypes.func.isRequired,
};

export default EventCalendar;
