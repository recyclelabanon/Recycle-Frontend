import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import moment from 'moment';

const EventTimeline = ({ timeline }) => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Timeline</h2>
    <div className="relative">
      <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200" />
      {timeline.map((step, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative flex items-start gap-4 pb-8"
        >
          <div className="relative z-10">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
              {index + 1}
            </div>
          </div>
          <div className="flex-1 pt-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">{step.step}</h3>
            <p className="text-gray-600">{moment(step.date).format('MMMM D, YYYY')}</p>
            {index < timeline.length - 1 && (
              <div className="absolute bottom-0 left-5 w-px h-8 bg-gray-200" />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

EventTimeline.propTypes = {
  timeline: PropTypes.array.isRequired
};

export default EventTimeline;
