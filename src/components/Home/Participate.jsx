// Frontend: src/sections/Participate.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import * as Icons from "lucide-react";

// ✅ Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const iconMap = (name) => {
  return Icons[name] || Icons.Leaf;
};

const Participate = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API}/api/v1/homepage/participate`);
        setData(res.data);
      } catch (err) {
        console.error("Load participate error", err);
      }
    })();
  }, []);

  if (!data) return null;

  return (
    <section className="py-20 bg-gray-50 md:px-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {data.heading}
        </h2>
        <p className="text-gray-600 text-center mb-10">{data.subheading}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {data.opportunities?.map((item, i) => {
            const Icon = iconMap(item.icon);
            return (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 left-4 bg-green-100 rounded-full p-2">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="absolute top-4 right-4 bg-white/90 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                    {item.type}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Icons.Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{item.date}</span>
                  </div>

                  <a
                    href={item.buttonLink || "#"}
                    className="mt-auto w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
                  >
                    Register Now <Icons.ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* ✅ Swiper Carousel Slider (Autoplay) */}
        <div className="mt-16">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{
              delay: 3000, // slide every 3 seconds
              disableOnInteraction: false,
            }}
            spaceBetween={20}
            slidesPerView={1}
            className="rounded-xl shadow-lg"
          >
            {data.carouselImages?.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`carousel-${idx}`}
                  className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Participate;
