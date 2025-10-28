import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Section from "../components/Section";


import Partners from "../components/Partners";
import { Mail, Linkedin } from "lucide-react";
import { useTeamContext } from "../Admin/Context/TeamContext";

const BRAND_BLUE = "#2726CC";
const BRAND_BLUE_HOVER = "#1f25a5";

const Team = () => {
  const { teams, loading, error, refreshTeams } = useTeamContext();
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
        subtitle="Be part of our passionate team working to drive ecological change. Contribute your skills to drive ecological solutions and empower communities."
        backgroundImage="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      />

      {/* ---------- WORK WITH US ---------- */}
      <Section title="Impact With Us">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-8">
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
        </div>
      </Section>

      {/* ---------- LOADING / ERROR ---------- */}
      {loading && <p className="text-center text-lg text-gray-600">Loading team members...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* ---------- CORE TEAM SECTION ---------- */}
      {!loading && !error && (
        <Section title="Core Team" dark>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {teams
              .filter((member) => member.category === "core")
              .map((member) => (
                <div
                  key={member._id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-all overflow-hidden"
                >
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
              ))}
          </div>
        </Section>
      )}

      {/* ---------- ADVISORY BOARD SECTION ---------- */}
      {!loading && !error && (
        <Section title="Advisory Board">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {teams
              .filter((member) => member.category === "advisory")
              .map((member) => (
                <div
                  key={member._id}
                  className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition-all overflow-hidden"
                >
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
              ))}
          </div>
        </Section>
      )}

      {/* ---------- BOARD MEMBERS SECTION ---------- */}
      {!loading && !error && (
        <Section title="Board Members" dark>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {teams
              .filter((member) => member.category === "board")
              .map((member) => (
                <div
                  key={member._id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-all overflow-hidden"
                >
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
              ))}
          </div>
        </Section>
      )}

      {/* ---------- PARTNERS SECTION ---------- */}
      <Partners />
    </div>
  );
};

export default Team;
