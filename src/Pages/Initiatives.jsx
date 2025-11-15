import { useEffect, useState } from 'react';
import Hero from "../components/Hero";
import Section from "../components/Section";
import { Link } from "react-router-dom";
import axios from 'axios';

const Initiatives = () => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios.get('/api/v1/initiatives');
        setPage(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, []);

  if (loading) return <div className="pt-20 text-center">Loading...</div>;
  if (!page) return <div className="pt-20 text-center">No content found</div>;

  return (
    <div className="pt-16 bg-gray-50">
      <Hero
        title={page.pageTitle}
        subtitle={page.pageSubtitle}
        backgroundImage={page.backgroundImage}
      />

      <Section title="Our Programmes">
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 space-y-20">
           {(page.programs || []).map((program) => (

            <div
              key={program._id}
              className={`group flex flex-col ${
                program.layout === "right" ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 lg:gap-14 items-center p-6 md:p-8 lg:p-10 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300`}
            >
              {/* Image */}
              <div className="lg:w-1/2 w-full relative overflow-hidden rounded-xl">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-64 md:h-80 object-cover rounded-xl transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl" />
              </div>

              {/* Content */}
              <div className="lg:w-1/2 w-full space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 flex-shrink-0 bg-white rounded-full shadow-md flex items-center justify-center p-2">
                    <img
                      src={program.logo}
                      alt={`${program.title} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3
                    className="text-3xl font-extrabold font-brand tracking-tight"
                    style={{ color: program.color || '#111827' }}
                  >
                    {program.title}
                  </h3>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed">
                  {program.shortDescription}
                </p>

                <div>
                  <Link
                    to={`/initiatives/${program._id}`}
                    className="inline-block px-6 py-3 rounded-lg text-white font-semibold text-sm uppercase tracking-wide transition-all duration-300 shadow-md hover:shadow-lg"
                    style={{
                      backgroundColor: program.color || '#111827',
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = `${program.color || '#111827'}cc`)
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = program.color || '#111827')
                    }
                  >
                    {program.cta || 'Learn more'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Initiatives;
