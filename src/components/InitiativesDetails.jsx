// components/InitiativesDetails.jsx
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DiveIntoAction, EcoSouk, RegenerativeHubTeam, TerraPods } from '../assets/Image';

const programData = {
  regeneratehub: {
    title: 'RegenerateHub',
    description:
      'RegenerateHub circular economy platform aims to engage community action by data visualising access to nature-based alternatives...',
    longDescription: `
      <p>RegenerateHub circular economy platform aims...</p>
      <p><strong>Access System Change</strong></p>
      <p>Regenerate Hub engages users to consider...</p>
      <p>Regenerate Hub is structured to visualise...</p>
    `,
    image: RegenerativeHubTeam,

    imageBank: [
      RegenerativeHubTeam,
      EcoSouk,
      TerraPods,
      DiveIntoAction
    ],

    accomplishments: [
      { label: 'Version', value: '4.0 of Regenerate Hub platform development' },
      { label: 'Published Journals', value: '1 published journal' },
      { label: 'Experts Hired', value: '10 sector experts, data analyst and data collectors hired' },
      { label: 'Partnerships', value: '2 Public Private Partnerships...' },
      { label: 'Data Points Cleaned', value: '10,000 data points cleaned' },
      { label: 'Data Points Mapped', value: '7,000 data points mapped' },
      { label: 'Surveyed Entries', value: '3,027 quantitative surveyed data entries' },
      { label: 'Validated Data', value: '1,522 validated data on waste & industry' },
      { label: 'Reports Created', value: '10 aggregated data reports' },
    ],
    callToActions: [
      { label: 'Access data', action: 'explore platform' },
      { label: 'Become a User, Add Data, Visualise Data', action: 'register' },
      { label: 'Share Economy Module Memberships', action: 'Become a Member' },
    ],
    offers: [
      'Consultancy',
      'Data surveying, collection, validation, mapping & visualisations'
    ],
    donations: [
      'Data collectors',
      'Data Analysts',
      'Running costs',
      'Platform developments'
    ],
    team: [
      'Rachel Rosenbaum, Mazen Jabbour, Mariam Freijeh (2024)',
      'Rachel Rosenbaum, Mazen Jabbour, Mariam Freijeh, Diyaa Freijeh (2022-23)',
      'Rachel Rosenbaum, Kevin Matar, Chadi Nachabe... (2021)'
    ],
    partners: [
      'Ministry of Industry',
      'Ministry of Environment',
      'UNDP',
      'Acted Lebanon',
      'University of Arizona Environment',
      'RELIEF',
      'AUB ESDU',
      'AUB Neighbourhood Initiative'
    ],
    donors: [
      'EcoWise',
      'CLIMAS',
      'Visualising Impact',
      'The Embassy of Japan',
      'The Asfari Foundation',
      'COSV',
      'MedWaves'
    ]
  },

  ecosouk: {
    title: 'EcoSouk',
    description:
      'An eco-conscious marketplace offering access to reusable and nature-based products...',
    longDescription: `
      <p>An eco-conscious marketplace, EcoSouk offers...</p>
      <p>At EcoSouk, we steward a flourishing ecosystem...</p>
      <p><strong>Community and Wellbeing</strong></p>
      <p>We are committed to promoting accessibility...</p>
      <p>EcoSouk marketplace connects makers and consumers...</p>
    `,
    image: EcoSouk,

    imageBank: [
      EcoSouk,
      TerraPods,
      RegenerativeHubTeam,
      DiveIntoAction
    ],

    accomplishments: [
      { label: 'Shops', value: '2 EcoSouk brick-n-click shops' },
      { label: 'Workshops', value: '50 workshops' },
      { label: 'Trees Distributed', value: '150 freetrees distributed' },
      { label: 'Producers', value: '150 Local Producers Products Exhibited' },
      { label: 'Glass Jars', value: '1,000 Glass Jars Filled' },
      { label: 'Plastic Bags', value: '6,000 Plastic Bags Diverted' },
    ],
    callToActions: [
      { label: 'Access zero waste products', action: 'Visit EcoSouk Hamra, Baskinta, or online' },
      { label: 'Market your handmade goods at EcoSouk', action: 'become a producer' },
      { label: 'Drop off', action: 'reusable glass bottles, cigarette butts, plastic bags, books' },
    ],
    offers: [
      'Ecological Products Hamra, Baskinta, ecosouk.net'
    ],
    donations: [
      'Carbon Exchange - freetree - seedling',
      'Packaging solutions',
      'Educational activities and events',
      'Team trainings',
      'Marketing and Outreach',
      'Maintenance and upgrading space'
    ],
    team: ['Nariman Hamdan, Store Manager'],
    partners: [],
    donors: []
  },

  terrapods: {
    title: 'TerraPods',
    description:
      'A hub for creative ecology integrating agroecology, bio-design and arts...',
    longDescription: `
      <p>TerraPods is a hub for creative ecology...</p>
      <p>The residency program provides creators...</p>
      <p>With four residency units, TerraPods focuses...</p>
    `,
    image: TerraPods,

    imageBank: [
      TerraPods,
      EcoSouk,
      RegenerativeHubTeam,
      DiveIntoAction
    ],

    accomplishments: [
      { label: 'Land Restoration', value: 'Ancestral land restoration' },
      { label: 'Workers Hired', value: '20 Cash for Work seasonal labourers' },
      { label: 'Farm Development', value: '6,000 m2 agroecology farm, 10 terraces' },
      { label: 'Plants Farmed', value: '2,000 vegetable heirloom plants farmed' },
      { label: 'Produce Harvested', value: '2,000 kilos of harvest' },
    ],
    callToActions: [
      { label: 'Volunteer on the farm homestead', action: 'link to activity' },
      { label: 'Join a workshop or training', action: 'link to activity' },
      { label: 'Share your knowledge, apply to lead a workshop', action: 'link to form' },
      { label: 'Apply for a fellowship, art residency', action: 'link to calls' },
    ],
    offers: [
      'Reserve a stay at TerraPods',
      'Purchase Farm Produce',
      'Order monthly harvest basket',
      'Offer Workshops & Trainings',
      'Guest chef / pop-up culinary event',
      'Offer an Art Residency',
      'Book the Gallery Exhibition Space',
      'Book the MakerSpace Bio-Design Lab'
    ],
    donations: [
      'EcoWise',
      'Embassy of France',
      'MedWaves',
      'Het Grote Midden Oosten Platform'
    ],
    team: [],
    partners: ['DCDI'],
    donors: [
      'EcoWise',
      'Embassy of France',
      'MedWaves',
      'Het Grote Midden Osten Platform'
    ]
  },

  diveintoaction: {
    title: 'Dive Into Action',
    description:
      'A policy and empowerment programme with zero waste cleanups...',
    longDescription: `
      <p>A policy and empowerment programme...</p>
      <p>We pioneered zero-waste sorting & recycling clean-ups...</p>
      <p>BalaPlastic concert for Mashrou3Leila...</p>
      <p>Art Exhibits during Beirut Design Week...</p>
    `,
    image: DiveIntoAction,

    imageBank: [
      DiveIntoAction,
      EcoSouk,
      TerraPods,
      RegenerativeHubTeam
    ],

    accomplishments: [
      { label: 'Waste Sorted', value: '800 tons waste sorted & recycled' },
      { label: 'Clean Ups', value: '200 zero waste clean ups' },
      { label: 'Volunteers', value: '8,000 volunteers mobilised' },
      { label: 'Plastic-free Meals', value: '16,000 plastic-free meals' },
      { label: 'Events', value: '1 Mashrou3Leila BalaPlastic Concert' },
      { label: 'Campaigns', value: '1 International anti-incineration campaign' },
      { label: 'Transitions', value: '30 recycling & BalaPlastic transitions' },
    ],
    callToActions: [
      { label: 'Clean Ups', action: '' },
      { label: 'Tree Planting', action: '' },
      { label: 'Campaigns & Awareness Raising', action: '' },
    ],
    offers: [],
    donations: [],
    team: [],
    partners: [
      'GreenPeace',
      'Mashrou\'Leila',
      'Colonel Brewery',
      'Wickerpark',
      'The Farm',
      'The Volunteer Circle',
      'Matisse',
      'Lebanon Mountain Trail'
    ],
    donors: [
      'Mercy Corp',
      'March',
      'Talaya',
      'Falamanke'
    ]
  }
};


const InitiativesDetails = () => {
  const { id } = useParams();
  const program = programData[id];

  if (!program) {
    return <div className="p-8 text-center">Program not found</div>;
  }

  return (
    <div className="min-h-max p-6 md:p-10 max-w-6xl mx-auto bg-white-50 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row gap-8 mt-16">
        {/* Main content (60-70% width) */}
        <div className="md:w-4/5">
          <h1 className="text-3xl font-bold text-green-800 mb-6">{program.title}</h1>
          
          <div className="mb-8">
            <img 
              src={program.image} 
              alt={program.title} 
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </div>
          
          <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: program.longDescription }} />
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Accomplishments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {program.accomplishments.map((item, index) => (
                <div key={index} className="bg-green-50 p-4 rounded-lg">
                  <p className="font-bold text-green-700">{item.value}</p>
                  <p className="text-sm text-gray-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          {program.callToActions.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">Call to Actions</h2>
              <div className="space-y-2">
                {program.callToActions.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <span className="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold mr-3">
                      {index + 1}
                    </span>
                    <p>
                      <span className="font-medium">{item.label}: </span>
                      {item.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}












          {/* Image Bank */}
{program.imageBank && program.imageBank.length > 0 && (
  <div className="mt-12">
    <h2 className="text-2xl font-semibold text-green-700 mb-4">
      Image Bank
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {program.imageBank.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`${program.title} image ${index}`}
          className="w-full h-48 object-cover rounded-lg shadow"
        />
      ))}
    </div>
  </div>
)}

        </div>
        
        {/* Sidebar (30-40% width) */}
        <div className="md:w-1/3 space-y-6">
          {program.offers.length > 0 && (
            <div className="bg-blue-50 p-5 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Offers & Services</h3>
              <ul className="space-y-2">
                {program.offers.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {program.donations.length > 0 && (
            <div className="bg-purple-50 p-5 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Donations & Support</h3>
              <ul className="space-y-2">
                {program.donations.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {program.team.length > 0 && (
            <div className="bg-yellow-50 p-5 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-3">Team</h3>
              <ul className="space-y-2">
                {program.team.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {program.partners.length > 0 && (
            <div className="bg-green-50 p-5 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Partners</h3>
              <ul className="space-y-2">
                {program.partners.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {program.donors.length > 0 && (
            <div className="bg-red-50 p-5 rounded-lg">
              <h3 className="text-xl font-semibold text-red-800 mb-3">Donors</h3>
              <ul className="space-y-2">
                {program.donors.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <Link 
          to="/initiatives" 
          className="inline-flex items-center gap-2 px-6 py-3 text-green-600 hover:text-green-700 hover:underline font-medium transition-colors"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to All Programs
        </Link>
      </div>
    </div>
  );
};

export default InitiativesDetails;