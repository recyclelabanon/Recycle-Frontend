import Hero from "../components/Hero";
import Section from "../components/Section";
import { Link } from "react-router-dom";
import { img10, img12, img34, img41 } from "../assets/Image"; // Programme logos

const Initiatives = () => {
  const programs = [
    {
      id: "regeneratehub",
      title: "RegenerateHub",
      logo: img34,
      color: "#2726CC", // Blue/Purple
      cta: "Explore RegenerateHub Platform",
      shortDescription:
        "Our circular economy platform maps ecological alternatives across Lebanon, visualising data on waste flows, resource recovery, and regenerative practices. It connects stakeholders, tracks impact metrics, and enables communities to transition toward systemic, nature-positive models.",
      image:
        "https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2?auto=format&fit=crop&w=1951&q=80",
      layout: "right",
    },
    {
      id: "ecosouk",
      title: "EcoSouk",
      logo: img12,
      color: "#E84C3D", // Brand red
      cta: "Visit EcoSouk",
      shortDescription:
        "Lebanon’s zero-waste marketplace connecting 150+ local artisans and eco-entrepreneurs. From refill stations and upcycled crafts to educational workshops, EcoSouk supports ethical producers and circular economies through community engagement.",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1974&q=80",
      layout: "left",
    },
    {
      id: "terrapods",
      title: "TerraPods",
      logo: img41,
      color: "#E5A33F", // Brand yellow
      cta: "Create at TerraPods",
      shortDescription:
        "Our creative ecology centre in Baskinta merges traditional farming with biodesign innovation. TerraPods features gardens, natural dye studios, and residencies focused on ecological regeneration and cultural collaboration.",
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1950&q=80",
      layout: "right",
    },
    {
      id: "diveintoaction",
      title: "Dive Into Action",
      logo: img10,
      color: "#00A2C7", // Brand teal/blue
      cta: "It Starts With You[th]",
      shortDescription:
        "Youth-driven programme mobilising volunteers for cleanups, recycling drives, and urban greening. Through campaigns like #BalaPlastic, we combine activism, practical skills, and collective action for regenerative change.",
      image:
        "https://images.unsplash.com/photo-1618477462146-050d2767eac4?auto=format&fit=crop&w=1974&q=80",
      layout: "left",
    },
  ];

  return (
    <div className="pt-16 bg-gray-50">
      <Hero
        title="Ecological Programmes"
        subtitle="Fostering ecological change through interconnected initiatives"
        backgroundImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2013&q=80"
      />

      <Section title="Our Programmes">
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 space-y-20">
          {programs.map((program) => (
            <div
              key={program.id}
              className={`group flex flex-col ${
                program.layout === "right"
                  ? "lg:flex-row"
                  : "lg:flex-row-reverse"
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
                    style={{ color: program.color }}
                  >
                    {program.title}
                  </h3>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed">
                  {program.shortDescription}
                </p>

                <div>
                  <Link
                    to={`/initiatives/${program.id}`}
                    className="inline-block px-6 py-3 rounded-lg text-white font-semibold text-sm uppercase tracking-wide transition-all duration-300 shadow-md hover:shadow-lg"
                    style={{
                      backgroundColor: program.color,
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = `${program.color}cc`)
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = program.color)
                    }
                  >
                    {program.cta}
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
