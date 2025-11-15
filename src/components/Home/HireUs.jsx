// src/sections/HireUs.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const HireUs = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API}/api/v1/hire-us`);
        setData(res.data);
      } catch (err) {
        console.error("❌ Error loading Hire Us section", err);
      }
    })();
  }, []);

  if (!data) return null;

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {data.sectionTitle || "Hire Us"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
          {data.services?.map((service, i) => (
            <div
              key={i}
              className="relative bg-white border rounded-2xl shadow hover:shadow-lg transition p-0 flex flex-col"
            >
              <div className="p-6 sm:p-8 flex-grow">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-green-700">
                  {service.title}
                </h3>

                {/* Items */}
                {service.items?.length > 0 && (
                  <ul className="list-disc list-inside space-y-2 mb-5 text-gray-700 text-sm">
                    {service.items.map(
                      (item, idx) =>
                        item && <li key={idx} className="leading-relaxed">{item}</li>
                    )}
                  </ul>
                )}

                {/* Partners */}
                {service.partners?.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-800">Partners</h4>
                    <p className="text-gray-600 text-xs">
                      {service.partners.filter(Boolean).join(", ")}
                    </p>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="p-6 bg-gray-50 border-t space-y-3">
                {service.cta?.text && (
                  <p className="text-sm font-medium text-gray-700">
                    {service.cta.text}
                  </p>
                )}

                <button
                  onClick={() => {
                    const link = service.cta?.buttonLink;
                    if (!link) return;

                    if (link.startsWith("mailto:") || link.startsWith("http")) {
                      window.location.href = link;
                    } else {
                      navigate(link);
                    }
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-medium"
                >
                  {service.cta?.buttonText || "Learn More"}
                </button>

                {service.secondary?.buttonLink && (
                  <button
                    onClick={() => navigate(service.secondary.buttonLink)}
                    className="w-full border border-green-600 text-green-600 hover:bg-green-50 py-2.5 rounded-lg text-sm font-medium"
                  >
                    {service.secondary?.text || "More"}
                  </button>
                )}
              </div>

              <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-l border-b rotate-45"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HireUs;
