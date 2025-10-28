import { useNavigate } from 'react-router-dom';

const HireUs = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: 'Consultancy',
      items: [
        'Research, Data Collection & Mapping',
        'Biobased R&D & Product Development',
        'Circular Strategy & Solutions',
        'Agroecology Consulting'
      ],
      partners: ['AUB', 'MedWaves', 'Amaze', 'Falamanke', 'Colonel Brewery'],
      cta: {
        text: 'CTA - Request a Consultation',
        buttonText: 'Email Us',
        onClick: () => (window.location.href = 'mailto:contact@recyclelebanon.org')
      },
      secondary: {
        text: 'Our Partners',
        onClick: () => navigate('/partners')
      }
    },
    {
      title: 'Engagement',
      items: [
        'Masterclasses, Panels & Talks',
        'Tailored Events, Workshops & Residencies',
        'Youth Mentorship',
        'CSR Activities'
      ],
      partners: [
        'Duke University',
        'Arab Institute for Women',
        'L’Institut du monde arabe',
        'GreenMena Network'
      ],
      cta: {
        text: 'CTA - Let’s Discuss Your Event',
        buttonText: 'Invite Us',
        onClick: () => navigate('/contacts?interest=event')
      },
      secondary: {
        text: 'Media Page',
        onClick: () => navigate('/news')
      }
    },
    {
      title: 'Alternatives',
      items: [
        'Low-tech Biomaterial Lab',
        'EcoSouk Marketplace (Physical & Online)',
        'Cigacycle Bin Production, Filter Collection & R&D',
        'GreenScreen Impact Guide F&B Rental Services',
        'Exhibitions & Art Showcases'
      ],
      partners: ['Aflamuna', 'AUBNI'],
      cta: {
        text: 'CTA - Explore Our Offerings',
        buttonText: 'View Calendar',
        onClick: () => navigate('/events')
      },
      secondary: {
        text: 'Request Training',
        onClick: () => navigate('/contacts?interest=training')
      }
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Join Forces</h2>
          
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-white border border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Card Content */}
              <div className="p-6 sm:p-8 flex-grow">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>

                {/* List Items */}
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                  {service.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

                {/* Partners */}
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Partners</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {service.partners.join(', ')}
                  </p>
                </div>
              </div>

              {/* CTA Section */}
              <div className="p-6 pt-0 space-y-3 border-t border-gray-200 bg-gray-50">
                <p className="text-sm font-medium text-gray-700">
                  {service.cta.text}
                </p>

                <button
                  onClick={service.cta.onClick}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
                >
                  {service.cta.buttonText}
                </button>

                <button
                  onClick={service.secondary.onClick}
                  className="w-full border border-green-600 text-green-600 hover:bg-green-50 py-2.5 px-4 rounded-lg font-medium transition-colors"
                >
                  {service.secondary.text}
                </button>
              </div>

              {/* Speech Bubble Pointer */}
              <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-5 h-5 bg-white border-l border-b border-gray-300 rotate-45"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HireUs;
