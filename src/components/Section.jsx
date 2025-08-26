import PropTypes from 'prop-types';

const Section = ({ title, children, className = '', dark = false }) => {
    return (
        <section className={`md:px-16 py-16  ${dark ? 'bg-gray-900 text-white' : 'bg-white'} ${className}`}>
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">{title}</h2>
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
