import PropTypes from 'prop-types';

const PartnerGrid = ({ title, partners }) => {
    return (
        <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">{title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {partners.map((partner, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center hover:shadow-md transition-shadow"
                    >
                        {partner.img ? (
                            <img src={partner.img} alt={partner.name} className="max-h-24" />
                        ) : (
                            <span className="text-center font-medium text-gray-700">{partner.name}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

PartnerGrid.propTypes = {
    title: PropTypes.string.isRequired,
    partners: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            logo: PropTypes.string,
            category: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default PartnerGrid;