// Pages/Initiatives.jsx
import Hero from '../components/Hero';
import Section from '../components/Section';
import { Link } from 'react-router-dom';

const BRAND_BLUE = "#2726CC";

const Initiatives = () => {
  const programs = [
    {
      id: 'regeneratehub',
      title: 'RegenerateHub',
      shortDescription:
        'Our circular economy platform maps sustainable alternatives across Lebanon, visualizing data on waste flows, resource recovery, and ecological solutions. By connecting stakeholders and tracking impact metrics, we enable communities to transition toward regenerative systems. The platform features interactive tools for businesses, policymakers, and activists to collaborate on nature-positive solutions.',
      image:
        'https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1951&q=80',
      layout: 'right',
      actions: ['Access Data Platform', 'Become a User'],
    },
    {
      id: 'ecosouk',
      title: 'EcoSouk',
      shortDescription:
        "Lebanon's pioneering zero-waste marketplace brings together 150+ local artisans and eco-entrepreneurs offering plastic-free home goods, organic skincare, and sustainable alternatives. Our Hamra and Baskinta locations feature refill stations, upcycled crafts, and educational workshops. Each purchase supports ethical producers while reducing single-use plastic consumption through our innovative container return system.",
      image:
        'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
      layout: 'left',
      actions: ['Visit EcoSouk', 'Become a Producer'],
    },
    {
      id: 'terrapods',
      title: 'TerraPods',
      shortDescription:
        'This creative ecology center in Baskinta combines traditional farming with cutting-edge biodesign. Our 6,000m² site includes medicinal gardens, natural dye workshops, and artist residencies focused on ecological solutions. Visitors can join agroecology trainings, experiment with biomaterials in our makerspace, or stay in eco-cabins while developing projects that bridge sustainability and culture.',
      image:
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
      layout: 'right',
      actions: ['Volunteer on the Farm', 'Apply for Residency'],
    },
    {
      id: 'diveintoaction',
      title: 'Dive Into Action',
      shortDescription:
        'Engaging youth in hands-on environmental action, we have mobilized 8,000+ volunteers for beach cleanups, recycling drives, and urban greening projects. Our campaigns like #BalaPlastic have eliminated single-use plastics at major events while advocating for policy change. The program combines activism with practical skills training in waste management, community organizing, and sustainable living.',
      image:
        'https://images.unsplash.com/photo-1618477462146-050d2767eac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
      layout: 'left',
      actions: ['Join a Clean Up', 'Start a Campaign'],
    },
  ];

  return (
    <div className="pt-16 bg-gray-100">
      <Hero
        title="Ecological Programmes"
        subtitle="Fostering sustainable change through interconnected initiatives"
        backgroundImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2013&q=80"
      />

      <Section title="Our Initiatives">
        <div className="max-w-6xl mx-auto px-4 space-y-12 lg:space-y-16">
          {programs.map((program) => (
            <div
              key={program.id}
              className={`group flex flex-col ${
                program.layout === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-6 lg:gap-10 items-center p-6 rounded-2xl transition-all duration-300 bg-gray-100 hover:bg-white hover:shadow-lg`}
            >
              {/* Image */}
              <div className="lg:w-1/2 w-full relative overflow-hidden rounded-xl">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-xl transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl" />
              </div>

              {/* Content */}
              <div className="lg:w-1/2 w-full space-y-5">
                <h3 className="text-3xl font-bold text-gray-800">{program.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{program.shortDescription}</p>

                {/* Get Involved Section */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">Get Involved</h4>
                  <div className="space-y-3">
                    {program.actions.map((action, i) => (
                      <button
                        key={i}
                        className="w-full"
                        style={{
                          backgroundColor: BRAND_BLUE,
                          color: 'white',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1d22a0')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = BRAND_BLUE)}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/initiatives/${program.id}`}
                  className="inline-flex items-center font-medium gap-2 transition-colors"
                  style={{ color: BRAND_BLUE }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#1d22a0')}
                  onMouseOut={(e) => (e.currentTarget.style.color = BRAND_BLUE)}
                >
                  <span>Explore Initiative</span>
                  <svg
                    className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Initiatives;
