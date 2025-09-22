import { Briefcase, MessageSquare, BookOpen, Mail, Calendar as CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Brand Blue (Pantone 2726C)
const BRAND_BLUE = "#2726CC";
const BRAND_BLUE_DARK = "#1e1ca3"; // darker shade for hover

const HireUs = () => {
  const navigate = useNavigate();
  
  const services = [
    {
      icon: <Briefcase className="h-8 w-8" style={{ color: BRAND_BLUE }} />,
      title: 'Consultancy',
      items: [
        'Advisory',
        'Creative Ecology',
        'Circular Economy',
        'Data Collection',
        'Mapping and Visualisation'
      ],
      clients: ['AUB', 'MedWaves', 'Amaze Creative Studio'],
      primaryAction: {
        text: 'Email Us',
        icon: <Mail className="h-4 w-4 ml-2" style={{ color: BRAND_BLUE }} />,
        onClick: () => window.location.href = 'mailto:contact@recyclelebanon.org'
      },
      secondaryAction: {
        text: 'Our Partners',
        onClick: () => navigate('/partners')
      }
    },
    {
      icon: <MessageSquare className="h-8 w-8" style={{ color: BRAND_BLUE }} />,
      title: 'Masterclasses and Speaking',
      items: ['Dutch University', 'GreenMena Network'],
      primaryAction: {
        text: 'Invite Us',
        onClick: () => navigate('/contacts?interest=speaking')
      },
      secondaryAction: {
        text: 'Media Page',
        onClick: () => navigate('/news')
      }
    },
    {
      icon: <BookOpen className="h-8 w-8" style={{ color: BRAND_BLUE }} />,
      title: 'Workshops & Trainings',
      items: ['Custom workshops', 'Corporate training', 'Community programs'],
      primaryAction: {
        text: 'View Calendar',
        icon: <CalendarIcon className="h-4 w-4 ml-2" style={{ color: BRAND_BLUE }} />,
        onClick: () => navigate('/events')
      },
      secondaryAction: {
        text: 'Request Training',
        onClick: () => navigate('/contacts?interest=training')
      }
    }
  ];

  return (
    <section className="py-20 bg-white-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Hire Us</h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col"
            >
              <div className="p-8 flex-grow">
                <div
                  className="rounded-full p-4 inline-block mb-6"
                  style={{ backgroundColor: `${BRAND_BLUE}20` }} // translucent blue instead of yellow
                >
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <ul className="space-y-2 mb-6">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="text-gray-600">• {item}</li>
                  ))}
                </ul>
                {service.clients && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Previous Clients:</h4>
                    <p className="text-gray-600">{service.clients.join(', ')}</p>
                  </div>
                )}
              </div>
              
              <div className="p-6 pt-0 space-y-3">
                <button
                  onClick={service.primaryAction.onClick}
                  className="w-full text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: BRAND_BLUE,
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = BRAND_BLUE_DARK)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = BRAND_BLUE)}
                >
                  {service.primaryAction.text}
                  {service.primaryAction.icon}
                </button>
                {service.secondaryAction && (
                  <button
                    onClick={service.secondaryAction.onClick}
                    className="w-full py-2 px-4 rounded-lg transition-colors"
                    style={{
                      border: `1px solid ${BRAND_BLUE}`,
                      color: BRAND_BLUE,
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = `${BRAND_BLUE}10`)}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    {service.secondaryAction.text}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HireUs;
