// components/InitiativesDetails.jsx
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DiveIntoAction, EcoSouk, RegenerativeHubTeam, TerraPods } from '../assets/Image';

const BRAND_BLUE = "#2726CC";

const programData = {
  regeneratehub: {
    title: 'RegenerateHub',
    description: 'RegenerateHub circular economy platform aims to engage community action by data visualising access to nature-based alternatives. With RegenerateHub, the organisation provides valuable data and insights that drive systemic change and promote transparent practices.',
    longDescription: `
      <p>RegenerateHub circular economy platform aims to engage community action by data visualising access to nature-based alternatives. With RegenerateHub, the organisation provides valuable data and insights that drive systemic change and promote transparent practices.</p>
      <p><strong>Access System Change</strong></p>
      <p>Regenerate Hub engages users to consider the flow, impact, and value of resources across sectors [e.g. human, waste, energy, water, earth], how systems can be improved, and who is working to create alternatives on the ground.</p>
      <p>Regenerate Hub is structured to visualise how you can create just and equitable change in harmony with nature, supporting the vitality and resiliency of interconnected ecosystems.</p>
    `,
    image: RegenerativeHubTeam,
    accomplishments: [
      { label: 'Version', value: '4.0 of Regenerate Hub platform development' },
      { label: 'Published Journals', value: '1 published journal' },
      { label: 'Experts Hired', value: '10 sector experts, data analyst and data collectors hired' },
      { label: 'Partnerships', value: '2 Public Private Partnerships with the Ministry of Environment & Ministry of Industry' },
      { label: 'Data Points Cleaned', value: '10,000 data points cleaned' },
      { label: 'Data Points Mapped', value: '7,000 data points mapped' },
      { label: 'Surveyed Entries', value: '3,027 quantitative surveyed data entries' },
      { label: 'Validated Data', value: '1,522 validated data on waste & industry' },
      { label: 'Reports Created', value: '10 aggregated data reports created by data analyst' },
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
      'Rachel Rosenbaum, Kevin Matar, Chadi Nachabe, Fouad Yehya, Noura Al Akkari, Sara Chokor, Karen Feghali, Rey Granillo, C.J. Larsen, & Benni Delgado, AIR at the University of Arizona (2021)'
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
    description: 'An eco-conscious marketplace, EcoSouk offers access to reusable, nature based and plastic-free products with a refill bar on tap. Packed with over 150 local producers and change makers showcasing artisanal crafts, selfcare and botanical remedies, cleaning supplies, textiles, homeware and more.',
    longDescription: `
      <p>An eco-conscious marketplace, EcoSouk offers access to reusable, nature based and plastic-free products with a refill bar on tap. Packed with over 150 local producers and change makers showcasing artisanal crafts, selfcare and botanical remedies, cleaning supplies, textiles, homeware and more.</p>
      <p>At EcoSouk, we steward a flourishing ecosystem, providing local producers with access to distribute their eco-friendly products, promoting a nature-based lifestyle for our growing community, intentionally cultivating conscious living in practice.</p>
      <p><strong>Community and Wellbeing</strong></p>
      <p>We are committed to promoting accessibility and awareness while reducing the harmful impacts of consumables. EcoSouk helps create equitable access to resources, reducing dependence on unsustainable practices, access to market and income generation for over 150 local producers.</p>
      <p>EcoSouk marketplace connects makers and consumers, shifts consumption habits and creates income generation streams for our members. By supporting small-scale producers who may not have access to larger markets, we strengthen local economies. Our platform is designed to enable us to make eco-conscious choices with ease. Whether you browse our curated selection online or visit our physical store in Beirut or Baskinta, you'll find a range of thoughtfully sourced products that align with your values.</p>
    `,
    image: EcoSouk,
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
    team: [
      'Nariman Hamdan, Store Manager'
    ],
    partners: [],
    donors: []
  },
  terrapods: {
    title: 'TerraPods',
    description: 'TerraPods is a hub for creative ecology, integrating agroecology, bio-design, and the arts in a biodiverse space featuring farmland, food forests, medicinal and dye gardens.',
    longDescription: `
      <p>TerraPods is a hub for creative ecology, integrating agroecology, bio-design, and the arts in a biodiverse space featuring farmland, food forests, medicinal and dye gardens. The facility includes a bio-design makerspace, residency units, a lab kitchen, an art gallery, and an EcoSouk marketplace. Welcoming artists and researchers, TerraPods fosters STEAM-led interdisciplinary collaboration to address environmental challenges.</p>
      <p>The residency program provides creators with a supportive platform to tackle our planetary crises. Engaging with the surroundings, artists contribute to ecological solutions challenging traditional industry and agriculture models, aligning with TerraPods' holistic mission.</p>
      <p>With four residency units, TerraPods focuses on fostering creativity, collaboration, and cross-sectoral engagement. Through the "Grow, Create, Market" initiative, the project promotes self-sufficiency by utilising farm-grown materials for bio-compostable products. The farm serves as a hub for bio-design exploration, developing alternatives to single-use plastics. TerraPods connects creators with consumers through the EcoSouk marketplace, supporting local economies and promoting sustainable consumption. The "grow-create-market" model is central to the project's mission, aiming to increase the availability of locally produced bio-material alternatives and foster a harmonious relationship between the environment and the community.</p>
    `,
    image: TerraPods,
    accomplishments: [
      { label: 'Land Restoration', value: 'Ancestral land restoration' },
      { label: 'Workers Hired', value: '20 Cash for Work seasonal labourers' },
      { label: 'Farm Development', value: 'Development of Agroecology farm 6,000 m2, 10 terraces' },
      { label: 'Plants Farmed', value: '2,000 vegetable heirloom plants farmed' },
      { label: 'Produce Harvested', value: '2,000 kilos of Produce harvested' },
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
      'Guest chef or host a pop-up culinary event',
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
    partners: [
      'DCDI'
    ],
    donors: [
      'EcoWise',
      'Embassy of France',
      'MedWaves',
      'Het Grote Midden Oosten Platform'
    ]
  },
  diveintoaction: {
    title: 'Dive Into Action',
    description: 'A policy and empowerment programme with zero waste clean ups, balaplastic (plastic free) transitions, food waste events and native planting initiatives.',
    longDescription: `
      <p>A policy and empowerment programme with zero waste clean ups, balaplastic (plastic free) transitions, food waste events and native planting initiatives.</p>
      <p>We pioneered zero-waste sorting & recycling clean-ups at the peak of the waste crisis. Our most memorable moment, the #BalaPlastic installation with Mashrou3Leila concert!</p>
      <p>BalaPlastic concert for Mashrou3Leila, last concert in Lebanon: The plastic invading Mashroue Leila concert is part of the #BalaPlastic movement to raise awareness on the tragic impacts of single use plastic on Lebanon public health, environment and economy. The plastic used at Mashroue Leila concert at the Ehdeniyat festival, was collected from a beach cleanup organised by Greenpeace Mediterranean and Recycle Lebanon, and donated by different NGOs. A group of architects from the American University of Beirut- (DI-LAB) worked on the design of the art installation.</p>
      <p>Art Exhibits: Between 2016 and 2018 we hosted 3 art exhibits during Beirut Design Week with 45 curated artists and trainers exhibited at our 1920's restored heritage residency in Gemayze, including highlighted artists Tom Young, Charbel Samuel Aoun, Noor Haydar, Thierry Magniez, and the Haven for Artist collective calling for a collective Dive Into Action to address the climate crisis in the ecological collapse as a means for hope through action.</p>
    `,
    image: DiveIntoAction,
    accomplishments: [
      { label: 'Waste Sorted', value: '800 tons waste sorted & recycled' },
      { label: 'Clean Ups', value: '200 zero waste clean ups' },
      { label: 'Volunteers', value: '8,000 volunteers mobilised' },
      { label: 'Plastic-free Meals', value: '16,000 plastic-free meals' },
      { label: 'Events', value: '1 Mashrou3Leila BalaPlastic Concert' },
      { label: 'Campaigns', value: '1 International anti incineration campaign' },
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
    <div className="min-h-max p-6 md:p-10 max-w-6xl mx-auto bg-gray-50 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row gap-8 mt-16">
        {/* Main content */}
        <div className="md:w-4/5">
          <h1 className="text-3xl font-bold mb-6" style={{ color: BRAND_BLUE }}>
            {program.title}
          </h1>
          
          <div className="mb-8">
            <img 
              src={program.image} 
              alt={program.title} 
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </div>
          
          <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: program.longDescription }} />
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: BRAND_BLUE }}>Accomplishments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {program.accomplishments.map((item, index) => (
                <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: `${BRAND_BLUE}10` }}>
                  <p className="font-bold" style={{ color: BRAND_BLUE }}>{item.value}</p>
                  <p className="text-sm text-gray-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          {program.callToActions.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: BRAND_BLUE }}>Call to Actions</h2>
              <div className="space-y-2">
                {program.callToActions.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold mr-3" style={{ backgroundColor: `${BRAND_BLUE}20`, color: BRAND_BLUE }}>
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
        </div>
        
        {/* Sidebar */}
        <div className="md:w-1/3 space-y-6">
          {program.offers.length > 0 && (
            <div className="p-5 rounded-lg" style={{ backgroundColor: `${BRAND_BLUE}10` }}>
              <h3 className="text-xl font-semibold mb-3" style={{ color: BRAND_BLUE }}>Offers & Services</h3>
              <ul className="space-y-2">
                {program.offers.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2" style={{ color: BRAND_BLUE }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {program.donations.length > 0 && (
            <div className="p-5 rounded-lg bg-purple-50">
              <h3 className="text-xl font-semibold mb-3" style={{ color: BRAND_BLUE }}>Donations & Support</h3>
              <ul className="space-y-2">
                {program.donations.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2" style={{ color: BRAND_BLUE }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {program.team.length > 0 && (
            <div className="p-5 rounded-lg" style={{ backgroundColor: `${BRAND_BLUE}10` }}>
              <h3 className="text-xl font-semibold mb-3" style={{ color: BRAND_BLUE }}>Team</h3>
              <ul className="space-y-2">
                {program.team.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2" style={{ color: BRAND_BLUE }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {program.partners.length > 0 && (
            <div className="p-5 rounded-lg" style={{ backgroundColor: `${BRAND_BLUE}10` }}>
              <h3 className="text-xl font-semibold mb-3" style={{ color: BRAND_BLUE }}>Partners</h3>
              <ul className="space-y-2">
                {program.partners.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2" style={{ color: BRAND_BLUE }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {program.donors.length > 0 && (
            <div className="p-5 rounded-lg bg-red-50">
              <h3 className="text-xl font-semibold mb-3" style={{ color: BRAND_BLUE }}>Donors</h3>
              <ul className="space-y-2">
                {program.donors.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2" style={{ color: BRAND_BLUE }}>•</span>
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
          className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-colors"
          style={{ color: BRAND_BLUE }}
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ color: BRAND_BLUE }}
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
