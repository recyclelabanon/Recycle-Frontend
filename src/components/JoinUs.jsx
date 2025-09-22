import { useState } from 'react';
import { Briefcase, Heart, Handshake } from 'lucide-react';
import CareerForm from './Form/CareerForm';
import VolunteerForm from './Form/VolunteerForm';
import PartnerForm from './Form/PartnerForm';

const BRAND_BLUE = "#2726CC";

const JoinUs = () => {
  const [activeTab, setActiveTab] = useState('careers');
  const [showSuccess, setShowSuccess] = useState(false);

  const tabs = [
    { id: 'careers', label: 'Careers', icon: Briefcase },
    { id: 'volunteer', label: 'Volunteer', icon: Heart },
    { id: 'partner', label: 'Partner With Us', icon: Handshake },
  ];

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-white rounded-xl shadow-lg p-8 text-center">
          <Heart className="h-12 w-12" style={{ color: BRAND_BLUE }} />
          <h2 className="text-2xl font-bold mb-4">Thank You for Your Interest!</h2>
          <p className="text-gray-600 mb-6">
            {activeTab === 'careers' && 'Our recruitment team will review your application and contact you soon.'}
            {activeTab === 'volunteer' && 'Our volunteer coordinator will reach out to discuss opportunities.'}
            {activeTab === 'partner' && 'Our partnership team will contact you to explore collaboration.'}
          </p>
          <button
            onClick={() => setShowSuccess(false)}
            className="text-white px-6 py-3 rounded-lg transition-colors"
            style={{ backgroundColor: BRAND_BLUE }}
          >
            Return to Join Us
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="join-us" className="min-h-screen bg-gray-100">
      <section className="py-24 bg-green-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Join Our Mission</h1>
            <p className="text-lg text-gray-600">
              Whether you&apos;re looking for a career, volunteer opportunity, or partnership,
              there&apos;s a place for you in our community.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-lg transition-colors`}
                style={{
                  backgroundColor: activeTab === tab.id ? BRAND_BLUE : '#ffffff',
                  color: activeTab === tab.id ? '#ffffff' : '#4B5563' // gray-600
                }}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">
              {tabs.find((t) => t.id === activeTab)?.label} Application
            </h2>
            {activeTab === 'careers' && <CareerForm onSuccess={() => setShowSuccess(true)} />}
            {activeTab === 'volunteer' && <VolunteerForm onSuccess={() => setShowSuccess(true)} />}
            {activeTab === 'partner' && <PartnerForm onSuccess={() => setShowSuccess(true)} />}
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinUs;
