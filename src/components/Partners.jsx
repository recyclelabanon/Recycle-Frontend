import { useNavigate } from "react-router-dom";
import Hero from './Hero';
import Section from './Section';
import PartnerGrid from './PartnerGrid';
import { img1, img13, img15, img17, img18, img19, img2, img22, img23, img24, img26, img27, img3, img38, img39, img4, img42, img43, img45, img46, img5, img50, img6, img7, img8 } from "../assets/Image";

const BRAND_BLUE = "#2726CC";

const Partners = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/joinus");
    window.scrollTo(0, 0); // Scroll to top
  };

  const coalitions = [
    { name: 'Break Free From Plastic', category: 'coalition', img: img50},
    { name: 'Chimica Verde Bionet', category: 'coalition', img: img5},
    { name: 'IPEN', category: 'coalition', img: img22},
    { name: 'GAIA', category: 'coalition', img: img42},
  ];

  const donors = [
    { name: 'COBIAC', category: 'donor', img:img7},
    { name: 'Mercy Corp', category: 'donor', img:img26},
    { name: 'March', category: 'donor', img:img23},
    { name: 'Talaya', category: 'donor', img:img39},
    { name: 'EcoWise', category: 'donor', img:img13},
    { name: 'CLIMAS', category: 'donor', img:img6},
    { name: 'The Embassy of Japan', category: 'donor', img:img19},
    { name: 'The Asfari Foundation', category: 'donor', img:img43},
  ];

  const governmentPartners = [
    { name: 'Ministry of Environment', category: 'government', img: img27},
    { name: 'Ministry of Industry', category: 'government', img: img38},
  ];

  const projectPartners = [
    { name: 'Imperium Code', category: 'project', img: img18},
    { name: 'Acted Lebanon', category: 'project', img: img2},
    { name: 'UNDP', category: 'project', img: img46},
    { name: 'University of Arizona Environment', category: 'project', img: img3},
    { name: 'RELIEF', category: 'project', img: img45},
    { name: 'AUB ESDU', category: 'project', img: img4},
    { name: "Mashrou'Leila", category: 'project', img: img24},
    { name: 'GreenPeace', category: 'project', img: img17},
    { name: 'Colonel Brewery', category: 'project', img: img8},
    { name: 'Falamanke', category: 'project', img: img15},
  ];

  return (
    <div className="pt-16">
      <Hero
        title="Allies and Benefactors"
        subtitle="Our partners in creating sustainable change"
        backgroundImage="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
      />

      <Section title="Our Network">
        <div className="max-w-7xl mx-auto">
          <PartnerGrid title="Coalitions" partners={coalitions} />
          <PartnerGrid title="Government Partners" partners={governmentPartners} />
          <PartnerGrid title="Project Partners" partners={projectPartners} />
          <PartnerGrid title="Donors" partners={donors} />
        </div>
      </Section>

      <Section title="Join Our Network" dark>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg mb-8">
            We&apos;re always looking to collaborate with organizations that share our vision for a sustainable future.
          </p>
          <button
            id="join-us"
            onClick={handleClick}
            className="cursor-pointer text-white px-8 py-3 rounded-md transition-colors"
            style={{ backgroundColor: BRAND_BLUE }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = BRAND_BLUE}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = BRAND_BLUE}
          >
            Become a Partner
          </button>
        </div>
      </Section>
    </div>
  );
};

export default Partners;
