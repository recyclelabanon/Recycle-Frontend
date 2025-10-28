import PropTypes from 'prop-types';

const BRAND_BLUE = "#2726CC";

const Section = ({ title, children, className = '', dark = false }) => {
  return (
    <section
      className={`md:px-16 py-16 transition-colors duration-300 ${
        dark ? 'text-white' : 'text-black'
      } ${className}`}
      style={{
        backgroundColor: dark ? BRAND_BLUE : 'white',
      }}
    >
      <div className="container mx-auto px-4">
        {title && (
          <h2
            className={`text-3xl font-bold mb-8 ${
              dark ? 'text-white' : 'text-black'
            }`}
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dark: PropTypes.bool,
};

Section.defaultProps = {
  className: '',
  dark: false,
};

export default Section;
