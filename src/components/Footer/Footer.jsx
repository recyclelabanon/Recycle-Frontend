import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/Recycle-Lebanon-Logo1.png";

const BRAND_BLUE = "#2726CC";
const BRAND_BLUE_HOVER = "#1f25a5";

const Footer = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { name: "Roots", path: "/about" },
    { name: "Collective Exchange", path: "/team" },
    { name: "Partners", path: "/partners" },
    { name: "Impact", path: "/impact" },
    { name: "Whispering Winds", path: "/news" },
  ];

  const resourceLinks = [
    { name: "Reflections", path: "/blog" },
    { name: "Time Trails", path: "/events" },
    { name: "Support", path: "/support" },
    { name: "Donate", path: "/donate" },
    { name: "Programmes", path: "/initiatives" },
  ];

  return (
    <footer className="bg-white mt-auto w-full overflow-hidden">
      <div className="container mx-auto px-4 md:px-12 lg:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div className="flex flex-col items-start space-y-3">
            {/* Logo + Text */}
            <div className="flex items-center">
              <img
                src={logo}
                alt="Recycle Lebanon"
                className="h-10 object-contain mr-3"
              />
              <span className="font-bold text-lg" style={{ color: BRAND_BLUE }}>
                Recycle Lebanon
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 max-w-xs">
              Empowering communities through a creative ecology NGO accelerating
              the transition towards regenerative system change for a greener
              future for Lebanon.
            </p>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/recyclelebanon/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: BRAND_BLUE }}
              onMouseOver={(e) => (e.currentTarget.style.color = BRAND_BLUE_HOVER)}
              onMouseOut={(e) => (e.currentTarget.style.color = BRAND_BLUE)}
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: BRAND_BLUE }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="transition-colors"
                    style={{ color: "#4B5563" }}
                    onMouseOver={(e) => (e.currentTarget.style.color = BRAND_BLUE)}
                    onMouseOut={(e) => (e.currentTarget.style.color = "#4B5563")}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: BRAND_BLUE }}>
              Resources
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="transition-colors"
                    style={{ color: "#4B5563" }}
                    onMouseOver={(e) => (e.currentTarget.style.color = BRAND_BLUE)}
                    onMouseOut={(e) => (e.currentTarget.style.color = "#4B5563")}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: BRAND_BLUE }}>
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5" style={{ color: BRAND_BLUE }} />
                <p className="text-gray-600">
                  Saint Louise Street, Kehdy Building, Fassouh, Beirut, Lebanon
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5" style={{ color: BRAND_BLUE }} />
                <a
                  href="mailto:contact@recyclelebanon.org"
                  className="transition-colors"
                  style={{ color: "#4B5563" }}
                  onMouseOver={(e) => (e.currentTarget.style.color = BRAND_BLUE)}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#4B5563")}
                >
                  contact@recyclelebanon.org
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5" style={{ color: BRAND_BLUE }} />
                <a
                  href="tel:+96171131115"
                  className="transition-colors"
                  style={{ color: "#4B5563" }}
                  onMouseOver={(e) => (e.currentTarget.style.color = BRAND_BLUE)}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#4B5563")}
                >
                  +961 71 131 115
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Recycle Lebanon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
