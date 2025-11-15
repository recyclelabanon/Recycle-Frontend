// src/components/Footer/Footer.jsx
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logoFallback from "../../assets/Logo/Recycle-Lebanon-Logo1.png"; // local fallback

const BRAND_BLUE = "#2726CC";

const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1"
    : "https://your-production-backend.com/api/v1";

const Footer = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${API_BASE}/footer`);
      setSettings(res.data);
    } catch (err) {
      console.error("Footer fetch error:", err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  if (!settings) return null;

  return (
    <footer className="bg-white mt-auto w-full border-t border-gray-200">

      {/* Top CTA area */}
      <div className="w-full text-center py-6 px-4 md:py-8">
        <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: BRAND_BLUE }}>
          {settings.supportTitle}
        </h3>

        <p className="text-gray-700 mb-3 text-sm md:text-base max-w-md mx-auto">
          {settings.supportSubtitle}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/donate")}
            className="px-5 py-2 rounded-lg font-medium text-white text-sm md:text-base transition-transform transform hover:scale-105"
            style={{ backgroundColor: BRAND_BLUE }}
          >
            {settings.donateLabel || "Donate Now"}
          </button>

          <button
            onClick={() => window.open("https://www.ecosouk.net", "_blank")}
            className="px-5 py-2 rounded-lg font-medium text-white text-sm md:text-base bg-green-600 hover:bg-green-700 transition-transform transform hover:scale-105"
          >
            {settings.shopLabel || "Shop at EcoSouk"}
          </button>
        </div>
      </div>

      {/* Bottom info area */}
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

          <div className="flex flex-col items-start space-y-3">
            <div className="flex items-center">
              <img
                src={settings.logoUrl || logoFallback}
                alt="Recycle Lebanon"
                className="h-8 md:h-10 object-contain mr-2"
              />
              <span className="font-bold text-base md:text-lg" style={{ color: BRAND_BLUE }}>
                Recycle Lebanon
              </span>
            </div>

            <p className="text-gray-700 text-xs md:text-sm max-w-xs leading-relaxed">
              {settings.supportSubtitle}
            </p>

            <a
              href="https://www.linkedin.com/company/recyclelebanon/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: BRAND_BLUE }}
            >
              {settings.linkedinIconUrl ? (
                <img src={settings.linkedinIconUrl} alt="LinkedIn" className="h-6 w-6" />
              ) : (
                <Linkedin className="h-6 w-6" />
              )}
            </a>
          </div>

          <div className="flex flex-col space-y-3 text-sm md:text-base">
            <h3 className="font-semibold" style={{ color: BRAND_BLUE }}>
              {settings.contactTitle}
            </h3>

            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5" style={{ color: BRAND_BLUE }} />
              <p className="text-gray-600 text-xs md:text-sm">{settings.address}</p>
            </div>

            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5" style={{ color: BRAND_BLUE }} />
              <a
                href={`mailto:${settings.contactEmail}`}
                className="text-xs md:text-sm text-gray-700"
              >
                {settings.contactEmail}
              </a>
            </div>

            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5" style={{ color: BRAND_BLUE }} />
              <a
                href={`tel:${settings.contactPhone}`}
                className="text-xs md:text-sm text-gray-700"
              >
                {settings.contactPhone}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-4">
          <p className="text-center text-gray-500 text-xs md:text-sm">
            {settings.copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
