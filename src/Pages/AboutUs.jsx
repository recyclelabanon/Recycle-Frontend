import { img10, img12, img34, img41 } from '../assets/Image';
import Hero from '../components/Hero';
import Section from '../components/Section';
import { Link } from 'react-router-dom';

const BRAND_BLUE = "#2726CC";

const AboutUs = () => {
  const contentSections = [
    {
      title: "Our Mission",
      dark: false,
      content: (
        <p className="text-lg leading-relaxed mb-6">
          We steward an interconnected approach to tackle the cross-sectorial ecology crisis.
          Established in 2015, Recycle Lebanon is a trailblazing Lebanese NGO on a mission to catalyse
          systemic change through creative ecology.
        </p>
      ),
      image: {
        src: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1470",
        alt: "Team working together",
        position: "right"
      }
    },
    {
      title: "Our Vision",
      dark: true,
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6">
            Recycle Lebanon stewards a holistic and action-oriented approach, tackling the cross-sectorial ecology
            crisis through four interconnected programmes.
          </p>
          <p className="text-lg leading-relaxed">
            We aim to model a circular economy and demonstrate the viability of regenerative practices to inspire
            others with practical, and hands-on examples to join us in growing a circular future.
          </p>
        </>
      ),
      image: {
        src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632",
        alt: "Sustainable vision",
        position: "left"
      }
    },
    {
      title: "Our Story",
      dark: true,
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6">
            The waste crisis was the last [plastic] straw in a crippling state where water, electricity, air quality, and
            basic rights dance in complacent corruption.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Recycle Lebanon - a pun to re[psy]cle the system from mindsets to actions.
          </p>
          <p className="text-lg leading-relaxed">
            The name of the NGO Recycle Lebanon is a pun, encapsulating our mission to re[psy]cle the system,
            fostering a shift from conventional linear mindsets towards actions that embrace an environmentally
            conscious approach.
          </p>
        </>
      ),
      image: {
        src: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1471",
        alt: "Waste crisis",
        position: "right"
      }
    }
  ];

  const impactPrograms = [
    {
      title: "RegenerateHub",
      description: "Propels data driven community engagement, fostering climate-driven practices and resilient ecosystems.",
      logo: img34,
      bgColor: "bg-[#2726CC]/10",
      hoverColor: "hover:bg-[#2726CC]/20"
    },
    {
      title: "EcoSouk",
      description: "Nurtures conscious living and local economies, connecting makers and consumers.",
      logo: img12,
      bgColor: "bg-[#2726CC]/10",
      hoverColor: "hover:bg-[#2726CC]/20"
    },
    {
      title: "TerraPods",
      description: "Fosters innovation and self sufficiency through STEAM-driven collaboration.",
      logo: img41,
      bgColor: "bg-[#2726CC]/10",
      hoverColor: "hover:bg-[#2726CC]/20"
    },
    {
      title: "Dive Into Action",
      description: "Sparks a transformative shift toward environmental conscious actions.",
      logo: img10,
      bgColor: "bg-[#2726CC]/10",
      hoverColor: "hover:bg-[#2726CC]/20"
    }
  ];

  const mission = contentSections.find(section => section.title === "Our Mission");
  const vision = contentSections.find(section => section.title === "Our Vision");
  const story = contentSections.find(section => section.title === "Our Story");

  return (
    <div className="pt-16">
      <Hero
        title="Founding Roots"
        subtitle="Catalyzing systemic change through creative ecology since 2015"
        backgroundImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2013&q=80"
      />

      {/* Our Mission */}
      <Section title={mission.title} dark={mission.dark}>
        <div className={`max-w-6xl mx-auto flex flex-col-reverse ${mission.image.position === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
          <div className="md:w-1/2">
            <div className={`prose ${mission.dark ? 'prose-invert' : ''} prose-lg`}>
              {mission.content}
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="rounded-xl overflow-hidden shadow-sm">
              <img
                src={mission.image.src}
                alt={mission.image.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Our Vision */}
      <Section title={vision.title} dark={vision.dark}>
        <div className={`max-w-6xl mx-auto flex flex-col-reverse ${vision.image.position === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
          <div className="md:w-1/2">
            <div className={`prose ${vision.dark ? 'prose-invert' : ''} prose-lg`}>
              {vision.content}
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="rounded-xl overflow-hidden shadow-sm">
              <img
                src={vision.image.src}
                alt={vision.image.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Impact Statement */}
      <Section title="Impact Statement">
        <div className="max-w-5xl mx-auto">
          <div className="prose prose-lg max-w-4xl mx-auto mb-8">
            <p className="text-lg leading-relaxed">
              As a committed advocate for transformative impact, Recycle Lebanon&apos;s holistic programmes shape our
              interconnected future, fostering resilience and cultivating ecological tools for collective liberation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {impactPrograms.map((program, index) => (
              <Link
                to={`/initiatives/${program.title.replace(/\s+/g, '').toLowerCase()}`} 
                key={index} 
                className={`${program.bgColor} ${program.hoverColor} rounded-lg p-6 transition-all duration-300 hover:shadow-md flex flex-col cursor-pointer`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 mr-4 flex-shrink-0 bg-white rounded-full shadow-md flex items-center justify-center p-2">
                    <img
                      src={program.logo}
                      alt={`${program.title} logo`}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: BRAND_BLUE }}>
                    {program.title}
                  </h3>
                </div>
                <p className="text-gray-700 mt-2">{program.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Our Story */}
      <Section title={story.title} dark={story.dark}>
        <div className={`max-w-6xl mx-auto flex flex-col-reverse ${story.image.position === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
          <div className="md:w-1/2">
            <div className={`prose ${story.dark ? 'prose-invert' : ''} prose-lg`}>
              {story.content}
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="rounded-xl overflow-hidden shadow-sm">
              <img
                src={story.image.src}
                alt={story.image.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default AboutUs;
