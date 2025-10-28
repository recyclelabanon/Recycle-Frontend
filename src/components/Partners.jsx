import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";
import Section from "./Section";
import PartnerGrid from "./PartnerGrid";
import useApi from "../Hooks/useApi";
import {
  img1,
  img13,
  img15,
  img17,
  img18,
  img19,
  img2,
  img22,
  img23,
  img24,
  img26,
  img27,
  img3,
  img38,
  img39,
  img4,
  img42,
  img43,
  img45,
  img46,
  img5,
  img50,
  img6,
  img7,
  img8,
} from "../assets/Image";

const BRAND_BLUE = "#2726CC";

const Partners = () => {
  const navigate = useNavigate();
  const { sendRequest } = useApi();

  // 🟢 Dynamic Hero Section Data (initial fallback)
  const [heroData, setHeroData] = useState({
    title: "Allies and Benefactors",
    subtitle: "Our partners in creating change",
    backgroundImage:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2074&q=80",
  });

  // ✅ Fetch Hero Data from Backend
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await sendRequest("http://localhost:5000/api/partners-hero");
        console.log("Fetched hero data:", data);

        if (data) {
          setHeroData(data);
        }
      } catch (err) {
        console.error("Failed to fetch hero data:", err);
      }
    };
    fetchHeroData();
  }, []);

  const handleClick = () => {
    navigate("/joinus");
    window.scrollTo(0, 0);
  };

  // 🟡 Partner Data
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await sendRequest("http://localhost:5000/api/network-partners");
        console.log("Fetched partners:", data);
        setPartners(data);
      } catch (err) {
        console.error("Failed to fetch partners:", err);
      }
    };
    fetchPartners();
  }, []);


  return (
    <div className="pt-16">
      {/* 🟢 Dynamic Hero Section */}
      <Hero
        title={heroData.title}
        subtitle={heroData.subtitle}
        backgroundImage={heroData.backgroundImage}
      />

      {/* 🟣 Partners Sections */}
      <Section title="Our Network">
        <div className="max-w-7xl mx-auto">
          <PartnerGrid
            title="Coalitions"
            partners={partners.filter((p) => p.category === "coalition")}
          />
          <PartnerGrid
            title="Government Partners"
            partners={partners.filter((p) => p.category === "government")}
          />
          <PartnerGrid
            title="Project Partners"
            partners={partners.filter((p) => p.category === "project")}
          />
          <PartnerGrid
            title="Donors"
            partners={partners.filter((p) => p.category === "donor")}
          />
        </div>
      </Section>


      {/* 🔵 Join Network Section */}
      {/* 🟢 Join Our Network Section */}
      <Section
        title="Join Our Network"
        className="py-16 bg-[#F8F9FA]" // light white/gray background
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Subheading */}
          <p className="text-xl font-semibold text-gray-800 mb-3">
            Partner with us to advance ecological change
          </p>

          {/* Supporting text */}
          <p className="text-lg text-gray-600 mb-8">
            We&apos;re always looking to collaborate with organizations that share our
            vision for a sustainable future.
          </p>

          {/* CTA Button */}
          <button
            id="join-us"
            onClick={handleClick}
            className="cursor-pointer text-white px-8 py-3 rounded-md font-semibold shadow-md transition-all duration-300"
            style={{ backgroundColor: BRAND_BLUE }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = BRAND_BLUE_HOVER)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = BRAND_BLUE)
            }
          >
            Become a Partner
          </button>
        </div>
      </Section>


    </div>
  );
};

export default Partners;
