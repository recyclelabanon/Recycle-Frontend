import { useEffect, useRef, useState } from 'react';
import Leaf from '/EcoTools/Empowerment.jpg';
import Users from '/EcoTools/Abundance.jpg';
import Heart from '/EcoTools/Liberation.jpg';
import Sprout from '/EcoTools/solidarity.jpg';

// Recycle Lebanon Blue
const RECYCLE_LEBANON_BLUE = "#002D9B";
const RECYCLE_LEBANON_BLUE_DARK = "#001f6e"; // darker shade

const Mission = () => {
  const values = [
    { img: Leaf, text: 'Empowerment' },
    { img: Users, text: 'Abundance' },
    { img: Heart, text: 'Liberation' },
    { img: Sprout, text: 'Solidarity' },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cardsRef.current.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="py-20 bg-white md:px-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in-up"
            style={{ }}>
          Ecological Tools for Collective Action
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {values.map((value, index) => (
            <div 
              key={index}
              ref={el => el && (cardsRef.current[index] = el)}
              className="relative flex flex-col items-center bg-white border rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] p-6 cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                transform: hoveredIndex === index 
                  ? 'perspective(1000px) rotateX(var(--rotate-x)) rotateY(var(--rotate-y)) scale(1.02)'
                  : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
              }}
            >
              {/* Gradient border effect */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${RECYCLE_LEBANON_BLUE}, ${RECYCLE_LEBANON_BLUE_DARK})`
                }}
              />
              
              {/* Card content */}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className="w-32 h-32 mb-4 overflow-hidden rounded-full border-4 border-white shadow-lg transition-all duration-300"
                  style={{
                    borderColor: hoveredIndex === index ? `${RECYCLE_LEBANON_BLUE}66` : "#ffffff"
                  }}
                >
                  <img 
                    src={value.img} 
                    alt={value.text} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-semibold text-center text-lg relative inline-block">
                  {value.text}
                  {/* Animated underline */}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-1 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: RECYCLE_LEBANON_BLUE }}
                  />
                </h3>
              </div>

              {/* Particle burst effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full animate-particle"
                    style={{
                      backgroundColor: `${RECYCLE_LEBANON_BLUE}4D`, // translucent particles
                      left: `${Math.random() * 80 + 10}%`,
                      top: `${Math.random() * 80 + 10}%`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-lg text-center max-w-3xl mx-auto opacity-0 animate-fade-in-up [animation-delay:200ms] [animation-fill-mode:forwards] text-gray-700">
          Recycle Lebanon stewards a holistic and action-oriented approach, tackling the cross-sectorial ecology
          crisis through four interconnected programmes emphasising social justice, access to data, conscious
          consumption, art residency and agroecology bio-design alternatives.
        </p>
      </div>
    </section>
  );
};

export default Mission;
