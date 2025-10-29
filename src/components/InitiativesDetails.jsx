import { useParams, Link } from "react-router-dom";
import {
  DiveIntoAction,
  EcoSouk,
  RegenerativeHubTeam,
  TerraPods,
} from "../assets/Image";

const programData = {
  regeneratehub: {
    title: "RegenerateHub",
    color: "#00897B",
    image: RegenerativeHubTeam,
    description:
      "RegenerateHub circular economy platform aims to engage community action by data visualising access to nature-based alternatives.",
    longDescription: `
      <p>RegenerateHub circular economy platform aims to engage community action by data visualising access to nature-based alternatives. With RegenerateHub, the organisation provides valuable data and insights that drive systemic change and promote transparent practices.</p>
      <p><strong>Access System Change</strong></p>
      <p>Regenerate Hub engages users to consider the flow, impact, and value of resources across sectors [e.g. human, waste, energy, water, earth], how systems can be improved, and who is working to create alternatives on the ground.</p>
      <p>Regenerate Hub is structured to visualise how you can create just and equitable change in harmony with nature, supporting the vitality and resiliency of interconnected ecosystems.</p>
    `,
    accomplishments: [
      { label: "Version", value: "4.0 of Regenerate Hub platform development" },
      { label: "Published Journals", value: "1 published journal" },
      {
        label: "Experts Hired",
        value: "10 sector experts, data analyst and data collectors hired",
      },
      {
        label: "Partnerships",
        value: "2 Public Private Partnerships with the Ministry of Environment & Ministry of Industry",
      },
    ],
    callToActions: [
      { label: "Access data", action: "Explore platform" },
      {
        label: "Add & Visualise Data",
        action: "Become a user or contributor",
      },
      { label: "Share Economy Module", action: "Join Membership" },
    ],
    offers: ["Consultancy", "Data analysis and mapping services"],
    donations: ["Data collectors", "Data analysts", "Platform improvements"],
    partners: [
      "Ministry of Industry",
      "Ministry of Environment",
      "UNDP",
      "Acted Lebanon",
    ],
    donors: ["EcoWise", "CLIMAS", "MedWaves"],
    imageBank: [RegenerativeHubTeam, DiveIntoAction, EcoSouk],
  },

  ecosouk: {
    title: "EcoSouk",
    color: "#0077CC",
    image: EcoSouk,
    description:
      "An eco-conscious marketplace promoting reusable, nature-based and plastic-free products from local producers.",
    longDescription: `
      <p>EcoSouk offers access to reusable, nature-based and plastic-free products with a refill bar on tap. With over 150 local producers, it showcases artisanal crafts, selfcare and botanical remedies, cleaning supplies, textiles, homeware and more.</p>
      <p>At EcoSouk, we steward a flourishing ecosystem, providing local producers with access to distribute their eco-friendly products and promoting a nature-based lifestyle.</p>
    `,
    accomplishments: [
      { label: "Shops", value: "2 EcoSouk brick-n-click shops" },
      { label: "Workshops", value: "50 workshops" },
      { label: "Trees Distributed", value: "150 freetrees distributed" },
      { label: "Producers", value: "150 Local Producers Products Exhibited" },
    ],
    callToActions: [
      { label: "Shop Eco Products", action: "Visit Hamra, Baskinta or online" },
      { label: "Become a Producer", action: "Join our network" },
    ],
    offers: ["Ecological Products", "Workshops", "Refill Bar Services"],
    donations: ["Packaging", "Events", "Marketing Support"],
    partners: [],
    donors: [],
    imageBank: [EcoSouk, DiveIntoAction],
  },

  terrapods: {
    title: "TerraPods",
    color: "#5D4037",
    image: TerraPods,
    description:
      "TerraPods integrates agroecology, bio-design, and the arts in a creative ecological hub.",
    longDescription: `
      <p>TerraPods is a hub for creative ecology, integrating agroecology, bio-design, and the arts in a biodiverse space featuring farmland, food forests, medicinal and dye gardens.</p>
      <p>It fosters STEAM-led interdisciplinary collaboration to address environmental challenges.</p>
    `,
    accomplishments: [
      { label: "Land Restored", value: "Ancestral land restoration" },
      { label: "Workers Hired", value: "20 seasonal labourers" },
      {
        label: "Farm Development",
        value: "Agroecology farm 6,000 m², 10 terraces",
      },
    ],
    callToActions: [
      { label: "Volunteer on the farm", action: "Join now" },
      { label: "Apply for Art Residency", action: "Open call" },
    ],
    offers: ["Farm Produce", "Residency", "Workshops"],
    donations: ["EcoWise", "MedWaves"],
    partners: ["DCDI"],
    donors: ["Embassy of France", "Het Grote Midden Oosten Platform"],
    imageBank: [TerraPods, EcoSouk],
  },

  diveintoaction: {
    title: "Dive Into Action",
    color: "#C62828",
    image: DiveIntoAction,
    description:
      "A policy and empowerment program with zero-waste cleanups, transitions, and native planting.",
    longDescription: `
      <p>A policy and empowerment programme with zero-waste cleanups, balaplastic transitions, and planting initiatives.</p>
      <p>We pioneered zero-waste sorting & recycling cleanups and hosted impactful art exhibits promoting environmental action.</p>
    `,
    accomplishments: [
      { label: "Waste Sorted", value: "800 tons waste sorted & recycled" },
      { label: "Clean Ups", value: "200 zero waste cleanups" },
      { label: "Volunteers", value: "8,000 volunteers mobilised" },
    ],
    callToActions: [
      { label: "Join Clean Ups", action: "Volunteer now" },
      { label: "Tree Planting", action: "Get involved" },
    ],
    offers: ["Environmental Campaigns"],
    donations: ["Community events", "Volunteer programs"],
    partners: ["GreenPeace", "Mashrou'Leila"],
    donors: ["Mercy Corp", "March", "Falamanke"],
    imageBank: [DiveIntoAction, EcoSouk],
  },
};

const InitiativesDetails = () => {
  const { id } = useParams();
  const program = programData[id];

  if (!program) {
    return <div className="p-8 text-center">Program not found</div>;
  }

  return (
    <div className="min-h-max p-6 md:p-10 max-w-6xl mx-auto bg-white rounded-lg shadow-lg mt-16">
      {/* Header */}
      <h1
        className="text-3xl font-bold mb-6"
        style={{ color: program.color }}
      >
        {program.title}
      </h1>

      <img
        src={program.image}
        alt={program.title}
        className="w-full h-64 md:h-80 object-cover rounded-lg mb-8"
      />

      <div
        className="prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: program.longDescription }}
      />

      {/* Accomplishments */}
      <section className="mb-8">
        <h2
          className="text-2xl font-semibold mb-4"
          style={{ color: program.color }}
        >
          Accomplishments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {program.accomplishments.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-lg shadow-sm border border-gray-100"
              style={{ backgroundColor: `${program.color}10` }}
            >
              <p
                className="font-bold"
                style={{ color: program.color }}
              >
                {item.value}
              </p>
              <p className="text-sm text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      

      {/* Sidebar-like sections below for simplicity */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        {program.offers?.length > 0 && (
          <div className="bg-gray-50 p-5 rounded-lg">
            <h3
              className="text-xl font-semibold mb-3"
              style={{ color: program.color }}
            >
              Offers & Services
            </h3>
            <ul className="space-y-2 list-disc pl-5">
              {program.offers.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {program.donations?.length > 0 && (
          <div className="bg-gray-50 p-5 rounded-lg">
            <h3
              className="text-xl font-semibold mb-3"
              style={{ color: program.color }}
            >
              Donations
            </h3>
            <ul className="space-y-2 list-disc pl-5">
              {program.donations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Image Bank */}
      {program.imageBank?.length > 0 && (
        <section>
          <h2
            className="text-2xl font-semibold mb-3"
            style={{ color: program.color }}
          >
            Image Bank
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {program.imageBank.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${program.title} image ${i + 1}`}
                className="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </section>
      )}

      {/* Back Button */}
      <div className="mt-12 text-center">
        <Link
          to="/initiatives"
          className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-colors"
          style={{
            color: program.color,
            border: `2px solid ${program.color}`,
            borderRadius: "10px",
          }}
        >
          ← Back to All Programs
        </Link>
      </div>
    </div>
  );
};

export default InitiativesDetails;
