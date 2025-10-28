import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DiveIntoAction, EcoSouk, RegenerativeHubTeam, TerraPods } from '../assets/Image';

const imageMap = {
  regeneratehub: RegenerativeHubTeam,
  ecosouk: EcoSouk,
  terrapods: TerraPods,
  diveintoaction: DiveIntoAction,
};

const InitiativesDetails = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/programs/${id}`)
      .then(res => {
        setProgram(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load program.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!program) return <div className="p-8 text-center">Program not found</div>;

  return (
    <div className="min-h-max p-6 md:p-10 max-w-6xl mx-auto bg-white-50 rounded-lg shadow-lg">
      {/* Program title */}
      <h1 className="text-3xl font-bold text-green-800 mb-6">{program.title}</h1>

      {/* Program image */}
      {imageMap[id] && (
        <div className="mb-8">
          <img src={imageMap[id]} alt={program.title} className="w-full h-64 md:h-80 object-cover rounded-lg"/>
        </div>
      )}

      {/* Long Description */}
      <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: program.longDescription }} />

      {/* Accomplishments */}
      {program.accomplishments?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Accomplishments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {program.accomplishments.map((item, i) => (
              <div key={i} className="bg-green-50 p-4 rounded-lg">
                <p className="font-bold text-green-700">{item.value}</p>
                <p className="text-sm text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Actions */}
      {program.callToActions?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Call to Actions</h2>
          <ul className="space-y-2">
            {program.callToActions.map((item, i) => (
              <li key={i}>• {item.label}: {item.action}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Sidebar Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {program.offers?.length > 0 && (
          <div className="bg-blue-50 p-5 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Offers & Services</h3>
            <ul>{program.offers.map((o, i) => <li key={i}>• {o}</li>)}</ul>
          </div>
        )}
        {program.donations?.length > 0 && (
          <div className="bg-purple-50 p-5 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-800 mb-3">Donations</h3>
            <ul>{program.donations.map((d, i) => <li key={i}>• {d}</li>)}</ul>
          </div>
        )}
        {program.team?.length > 0 && (
          <div className="bg-yellow-50 p-5 rounded-lg">
            <h3 className="text-xl font-semibold text-yellow-800 mb-3">Team</h3>
            <ul>{program.team.map((t, i) => <li key={i}>• {t}</li>)}</ul>
          </div>
        )}
        {program.partners?.length > 0 && (
          <div className="bg-green-50 p-5 rounded-lg">
            <h3 className="text-xl font-semibold text-green-800 mb-3">Partners</h3>
            <ul>{program.partners.map((p, i) => <li key={i}>• {p}</li>)}</ul>
          </div>
        )}
        {program.donors?.length > 0 && (
          <div className="bg-red-50 p-5 rounded-lg">
            <h3 className="text-xl font-semibold text-red-800 mb-3">Donors</h3>
            <ul>{program.donors.map((d, i) => <li key={i}>• {d}</li>)}</ul>
          </div>
        )}
      </div>

      {/* Back link */}
      <div className="mt-12 text-center">
        <Link to="/initiatives" className="text-green-600 hover:text-green-700 hover:underline font-medium">
          ← Back to All Programs
        </Link>
      </div>
    </div>
  );
};

export default InitiativesDetails;
