import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Section from '../components/Section';
import TeamMember from '../components/TeamMember';
import Partners from '../components/Partners';
import { useTeamContext } from '../Admin/Context/TeamContext';

const BRAND_BLUE = "#2726CC";
const BRAND_BLUE_HOVER = "#1f25a5";

const Team = () => {
  const { teams, loading, error, refreshTeams } = useTeamContext();
  const navigate = useNavigate();

  useEffect(() => {
    refreshTeams();
  }, [refreshTeams]);

  const categorizedTeams = teams.reduce((acc, member) => {
    const cat = member.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(member);
    return acc;
  }, {});

  const handleClick = () => {
    navigate("/joinus");
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-16">
      <Hero
        title="Collective Exchange"
        subtitle="Meet the passionate individuals driving environmental change"
        backgroundImage="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      />

      <Section title="Work With Us">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="p-8 rounded-lg transition-transform duration-300 hover:-translate-y-1"
              style={{ backgroundColor: "#e0e0ff" }}
            >
              <h3 className="text-xl font-bold mb-4" style={{ color: BRAND_BLUE }}>
                Join Our Team
              </h3>
              <p className="text-gray-700 mb-6">
                Be part of our mission to create sustainable change in Lebanon.
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

            <div
              className="p-8 rounded-lg transition-transform duration-300 hover:-translate-y-1"
              style={{ backgroundColor: "#e0e0ff" }}
            >
              <h3 className="text-xl font-bold mb-4" style={{ color: BRAND_BLUE }}>
                Volunteer With Us
              </h3>
              <p className="text-gray-700 mb-6">
                Contribute your time and skills to make a difference.
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

      {loading && <p className="text-center text-lg text-gray-600">Loading team members...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading &&
        !error &&
        Object.entries(categorizedTeams).map(([category, members]) => (
          <Section key={category} title={category} dark>
            <div className="flex flex-wrap justify-center gap-12">
              {members.map((member) => (
                <TeamMember
                  key={member._id}
                  name={member.fullName}
                  role={member.position}
                  description={member.introduction}
                  image={member.profilePic}
                />
              ))}
            </div>
          </Section>
        ))}

      <Partners />
    </div>
  );
};

export default Team;
