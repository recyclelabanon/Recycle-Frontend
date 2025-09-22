import PropTypes from 'prop-types';

const BRAND_BLUE = "#2726CC";

const News = ({ news }) => {
  return (
    <section className="space-y-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest News</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item, index) => (
          <article 
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">{item.date}</p>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 line-clamp-3">{item.description}</p>
              <button
                className="mt-4 font-medium transition-colors"
                style={{ color: BRAND_BLUE }}
                onMouseEnter={(e) => e.currentTarget.style.color = BRAND_BLUE}
                onMouseLeave={(e) => e.currentTarget.style.color = BRAND_BLUE}
              >
                Read more →
              </button>
            </div>
          </article>
        ))}
      </div>
      {news.length === 0 && (
        <p className="text-gray-600 text-center py-12">
          We will update you soon with any news.
        </p>
      )}
    </section>
  );
};

News.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
};

News.defaultProps = {
  news: [],
};

export default News;
