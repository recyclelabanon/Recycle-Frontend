import { ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';

const BRAND_BLUE = "#2726CC";

const Program = ({
  title,
  description,
  image,
  highlights,
  accomplishments,
  callToActions,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
      {image && (
        <div className="h-64 w-full">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>

        {highlights && highlights.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-lg mb-3 text-gray-900">Highlights</h4>
            <ul className="space-y-2">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 mt-1 flex-shrink-0" style={{ color: BRAND_BLUE }} />
                  <span className="text-gray-600">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {accomplishments && accomplishments.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-lg mb-3 text-gray-900">Accomplishments</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {accomplishments.map((item, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold" style={{ color: BRAND_BLUE }}>{item.value}</div>
                  <div className="text-sm text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {callToActions && callToActions.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-lg mb-3 text-gray-900">Get Involved</h4>
            {callToActions.map((cta, index) => (
              <button
                key={index}
                className="w-full py-2 px-4 text-white rounded-md transition-colors"
                style={{ backgroundColor: BRAND_BLUE }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = BRAND_BLUE}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = BRAND_BLUE}
              >
                {cta.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Program.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  highlights: PropTypes.arrayOf(PropTypes.string),
  accomplishments: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  callToActions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ),
};

export default Program;
