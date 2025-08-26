import PropTypes from 'prop-types';

const Hero = ({ title, subtitle, backgroundImage }) => {
    return (
        <div 
            className="relative h-[60vh] flex items-center justify-center"
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{title}</h1>
                {subtitle && (
                    <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto">{subtitle}</p>
                )}
            </div>
        </div>
    );
};

Hero.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    backgroundImage: PropTypes.string,
};

export default Hero;