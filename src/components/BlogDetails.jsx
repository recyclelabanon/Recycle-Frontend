import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNewsContext } from '../Admin/Context/NewsContext';

const NewsDetail = () => {
  const { slug } = useParams();
  const { getNewsBySlug } = useNewsContext();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await getNewsBySlug(slug);
        setNews(data);
      } catch (err) {
        console.error('Failed to fetch news:', err);
        setError('Failed to load this news article. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchNews();
    }
  }, [slug, getNewsBySlug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="text-lg">Loading news article...</div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'News article not found'}
        </div>
        <Link to="/news" className="mt-4 inline-block text-blue-600 hover:underline">
          ← Back to all news
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/news" className="text-yellow-600 hover:text-yellow-800 mb-4 inline-block">
        ← Back to all news
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img 
          src={news.coverImage || '/default-news.jpg'}
          alt={news.title}
          className="w-full h-64 md:h-96 object-cover"
        />
        
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center mb-4">
            <span className="text-sm font-semibold px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full mr-3">
              {news.category || 'General'}
            </span>
            <span className="text-sm text-gray-500">
              Published on {new Date(news.publishedAt || news.createdAt).toDateString()}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>
          
          <div className="flex items-center mb-8">
            <span className="text-md text-gray-600">By {news.author}</span>
          </div>
          
          {news.videoUrl && (
            <div className="mb-8">
              <iframe
                title={news.title}
                width="100%"
                height="400"
                src={news.videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          
          <div className="prose max-w-none">
            {/* Render content - you might want to use a Markdown renderer here if your content is in Markdown */}
            <div dangerouslySetInnerHTML={{ __html: news.content }}></div>
          </div>
          
          {news.tags && news.tags.length > 0 && (
            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {news.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
