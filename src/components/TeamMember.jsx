import PropTypes from 'prop-types';

const BRAND_BLUE = "#2726CC";

const TeamMember = ({ name, role, description, image }) => {
  return (
    <div className="w-72 bg-white hover:scale-105 transition duration-300 rounded-2xl shadow-lg overflow-hidden relative text-center">
      {/* Top Gradient Background */}
      <div
        className="h-42 relative flex justify-center items-end"
        style={{ background: `linear-gradient(to bottom, ${BRAND_BLUE}, ${BRAND_BLUE})` }}
      >
        {/* Profile Image */}
        <div className="absolute -bottom-10 w-48 h-48 bg-white p-1 rounded-full shadow-md">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover rounded-full border-2 border-white"
          />
        </div>
      </div>
      
      {/* Profile Details */}
      <div className="mt-12 p-4">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 font-medium mb-2">{role}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
};

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default TeamMember;
