import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Section from "../components/Section";
import { Mail, Linkedin, Globe } from "lucide-react";
import { useTeamContext } from "../Admin/Context/TeamContext";
import { usePartnerContext } from "../Admin/Context/PartnerContext";

const BRAND_BLUE = "#2726CC";
const BRAND_BLUE_HOVER = "#1f25a5";

const Team = () => {
  const { teams, loading: teamLoading, error: teamError, refreshTeams } = useTeamContext();
  const { partners, } = usePartnerContext();
  const navigate = useNavigate();

  useEffect(() => {
    refreshTeams();
  }, [refreshTeams]);

  const handleClick = () => {
    navigate("/joinus");
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-16">
      {/* ---------- HERO SECTION ---------- */}
      <Hero
        title="Make an Impact with Us"
        subtitle="Be part of our passionate team and partners driving ecological change."
        backgroundImage="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=2070&q=80"
      />

      {/* ---------- WORK WITH US ---------- */}
      <Section title="Impact With Us">
        <div className="max-w-4xl mx-auto mb-12 grid md:grid-cols-2 gap-8">
          {/* Join Our Team */}
          <div
            className="p-8 rounded-lg transition-transform duration-300 hover:-translate-y-1"
            style={{ backgroundColor: "#e0e0ff" }}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: BRAND_BLUE }}>
              Join Our Team
            </h3>
            <p className="text-gray-700 mb-6">
              Explore career, volunteer, or partnership opportunities to contribute to meaningful ecological change.
            </p>
            <button
              onClick={handleClick}
              className="px-6 py-2 rounded-md text-white transition-colors"
              style={{ backgroundColor: BRAND_BLUE }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = BRAND_BLUE_HOVER)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = BRAND_BLUE)}
            >
              View Open Positions
            </button>
          </div>

          {/* Volunteer With Us */}
          <div
            className="p-8 rounded-lg transition-transform duration-300 hover:-translate-y-1"
            style={{ backgroundColor: "#e0e0ff" }}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: BRAND_BLUE }}>
              Volunteer With Us
            </h3>
            <p className="text-gray-700 mb-6">
              Contribute your time and skills to make a difference in our collective ecological mission.
            </p>
            <button
              onClick={handleClick}
              className="px-6 py-2 rounded-md text-white transition-colors"
              style={{ backgroundColor: BRAND_BLUE }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = BRAND_BLUE_HOVER)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = BRAND_BLUE)}
            >
              Explore Opportunities
            </button>
          </div>
        </div>
      </Section>

      {/* ---------- TEAM SECTIONS ---------- */}
      {teamLoading && <p className="text-center text-lg text-gray-600">Loading team members...</p>}
      {teamError && <p className="text-center text-red-500">{teamError}</p>}

      {!teamLoading && !teamError && (
        <>
          <Section title="Core Team" dark>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
              {teams.filter((t) => t.category === "core").map((member) => (
                <TeamCard key={member._id} member={member} />
              ))}
            </div>
          </Section>

          <Section title="Advisory Board">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
              {teams.filter((t) => t.category === "advisory").map((member) => (
                <TeamCard key={member._id} member={member} />
              ))}
            </div>
          </Section>

          <Section title="Board Members" dark>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
              {teams.filter((t) => t.category === "board").map((member) => (
                <TeamCard key={member._id} member={member} />
              ))}
            </div>
          </Section>
        </>
      )}

      {/* ---------- PARTNERS SECTION ---------- */}
      <Section title="Our Partners">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
          {partners.map((partner) => (
            <div
              key={partner._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-all overflow-hidden p-6 text-center"
            >
              {partner.logo && (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-40 object-contain mb-4"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
              {partner.description && (
                <p className="text-gray-600 text-sm mb-3">{partner.description}</p>
              )}
              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <Globe size={16} /> Visit Website
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- JOIN OUR NETWORK ---------- */}
      <Section title="Join Our Network" dark>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg mb-8">
            We&apos;re always looking to collaborate with organizations that share our vision for a sustainable future.
          </p>
          <button
            id="join-us"
            onClick={handleClick}
            className="bg-green-600 cursor-pointer text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Become a Partner
          </button>
        </div>
      </Section>
    </div>
  );
};

const TeamCard = ({ member }) => (
  <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all overflow-hidden">
    <img
      src={member.profilePic || "/assets/default-avatar.jpg"}
      alt={member.fullName}
      className="w-full h-64 object-cover"
    />
    <div className="p-6 text-center">
      <h3 className="text-xl font-semibold mb-1">{member.fullName}</h3>
      <p className="text-gray-600 mb-4">{member.position}</p>
      <div className="flex justify-center gap-4">
        {member.email && (
          <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-blue-600">
            <Mail className="h-5 w-5" />
          </a>
        )}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  </div>
);

export default Team;
