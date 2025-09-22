import {
  Calendar,
  Users,
  Palette,
  Leaf,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  EcoSouk,
  Hallak_Joslin_Cigrate,
  Kehdy_bedouine4,
  kehdy_ecosouk3,
  Kehdy_female,
  Kehdy_Installation,
  Kehdy_terrapods,
  Kehdy_Wala,
  Kendy_Allegraa,
  LeaderShip,
} from "../../assets/Image";

const Participate = () => {
  const opportunities = [
    {
      icon: <Leaf className="h-6 w-6 text-[#00239C]" />,
      title: "Agroecology trainings",
      date: "April - August 2024",
      type: "Training",
      image: Kendy_Allegraa,
    },
    {
      icon: <Users className="h-6 w-6 text-[#00239C]" />,
      title: "Sustainable Packaging Youth Fellowship",
      date: "6-12 May 2024",
      type: "Fellowship",
      image: EcoSouk,
    },
    {
      icon: <Users className="h-6 w-6 text-[#00239C]" />,
      title: "The Big Brotherhood Masculine Leadership Retreat",
      date: "June 2024",
      type: "Fellowship",
      image: LeaderShip,
    },
    {
      icon: <Palette className="h-6 w-6 text-[#00239C]" />,
      title: "Biodiversity Art Residency",
      date: "July - September 2024",
      type: "Fellowship",
      image: Kehdy_female,
    },
  ];

  // Past event images for carousel
  const pastEvents = [
    Kehdy_Installation,
    Kehdy_bedouine4,
    Kehdy_terrapods,
    Hallak_Joslin_Cigrate,
    Kehdy_Wala,
    kehdy_ecosouk3,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === pastEvents.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [pastEvents.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === pastEvents.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? pastEvents.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-20 bg-gray-50 md:px-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Participate
        </h2>

        {/* Opportunity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {opportunities.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
            >
              {/* Main Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-4 left-4 bg-[#00239C]/10 rounded-full p-2">
                  {item.icon}
                </div>
                <span className="absolute top-4 right-4 bg-white/90 text-[#00239C] text-xs font-semibold px-3 py-1 rounded-full">
                  {item.type}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">{item.date}</span>
                </div>

                {/* Register Button */}
                <button className="mt-auto w-full bg-[#00239C] hover:bg-[#001b7a] text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors">
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Past Events Carousel */}
        <div className="relative h-64 md:h-80 lg:h-96 mb-16 rounded-xl overflow-hidden shadow-lg mt-16">
          <div className="relative h-full w-full">
            {pastEvents.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Past event ${index + 1}`}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full hover:bg-white transition-colors z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full hover:bg-white transition-colors z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {pastEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Participate;
