import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useApi from "../../Hooks/useApi.js";
import logo from "../../assets/Logo/Recycle-Lebanon-Logo1.png";

const BRAND_BLUE = "#2726CC";
const BRAND_BLUE_HOVER = "#1f25a5";

// ✅ Auto-detect environment
const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1"
    : "https://recycle-backend-07zo.onrender.com/api/v1";

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { sendRequest, loading, error, success } = useApi();
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Works for both local & live backend
      await sendRequest(`${API_BASE_URL}/subscribe`, "POST", { email });

      setSuccessMessage("You have subscribed successfully! 🎉");
      setEmail("");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccessMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="bg-white mt-auto w-full border-t border-gray-200">
      {/* 📬 Newsletter Subscription */}
      <div className="w-full text-center py-6 px-4 md:py-8 border-b border-gray-100">
        <h3
          className="text-lg md:text-xl font-semibold mb-3"
          style={{ color: BRAND_BLUE }}
        >
          Receive Whispers of Change
        </h3>
        <p className="text-gray-700 mb-4 text-sm md:text-base max-w-lg mx-auto">
          Join our journey and receive reflections of our environmental impact.
        </p>

        {(successMessage || error || success) && (
          <div
            className="mb-4 p-3 rounded-lg inline-flex items-center text-sm font-medium"
            style={{
              color: BRAND_BLUE,
              borderColor: BRAND_BLUE,
              backgroundColor: `${BRAND_BLUE}10`,
              borderWidth: "1px",
            }}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            {successMessage || success || error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full sm:w-auto flex-1 px-4 py-2.5 rounded-lg border text-sm focus:outline-none"
            style={{
              borderColor: BRAND_BLUE,
              color: BRAND_BLUE,
            }}
            required
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center px-5 py-2.5 rounded-lg text-white text-sm font-medium transition-colors"
            style={{ backgroundColor: BRAND_BLUE }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = BRAND_BLUE_HOVER)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = BRAND_BLUE)
            }
          >
            {loading ? "Subscribing..." : "Subscribe"}
            {!loading && <Send className="ml-2 h-4 w-4" />}
          </button>
        </form>
      </div>

      {/* 💰 Donation + Shop CTA */}
      <div className="w-full text-center py-6 px-4 md:py-8">
        <h3
          className="text-lg md:text-xl font-semibold mb-2"
          style={{ color: BRAND_BLUE }}
        >
          Support the Movement
        </h3>
        <p className="text-gray-700 mb-3 text-sm md:text-base max-w-md mx-auto">
          Help us accelerate Lebanon’s transition toward a regenerative and
          ecological future. Your support makes a real impact.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <button
            onClick={() => navigate("/donate")}
            className="px-5 py-2 rounded-lg font-medium text-white text-sm md:text-base transition-transform transform hover:scale-105"
            style={{ backgroundColor: BRAND_BLUE }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = BRAND_BLUE_HOVER)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = BRAND_BLUE)
            }
          >
            Donate Now
          </button>
          <button
            onClick={() => window.open("https://www.ecosouk.net", "_blank")}
            className="px-5 py-2 rounded-lg font-medium text-white text-sm md:text-base bg-green-600 hover:bg-green-700 transition-transform transform hover:scale-105"
          >
            Shop at EcoSouk
          </button>
        </div>
      </div>

      {/* 🌿 Footer Info Section */}
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* About + LinkedIn */}
          <div className="flex flex-col items-start space-y-3">
            <div className="flex items-center">
              <img
                src={logo}
                alt="Recycle Lebanon"
                className="h-8 md:h-10 object-contain mr-2"
              />
              <span
                className="font-bold text-base md:text-lg"
                style={{ color: BRAND_BLUE }}
              >
                Recycle Lebanon
              </span>
            </div>
            <p className="text-gray-700 text-xs md:text-sm max-w-xs leading-relaxed">
              Empowering communities through creative ecology — accelerating
              Lebanon’s transition towards regenerative system change for a
              greener future.
            </p>
            <a
              href="https://www.linkedin.com/company/recyclelebanon/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: BRAND_BLUE }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = BRAND_BLUE_HOVER)
              }
              onMouseOut={(e) => (e.currentTarget.style.color = BRAND_BLUE)}
            >
              <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col space-y-3 text-sm md:text-base">
            <h3 className="font-semibold" style={{ color: BRAND_BLUE }}>
              Contact Us
            </h3>
            <div className="flex items-start space-x-2">
              <MapPin
                className="h-4 w-4 md:h-5 md:w-5"
                style={{ color: BRAND_BLUE }}
              />
              <p className="text-gray-600 text-xs md:text-sm">
                Saint Louise Street, Kehdy Building, Fassouh, Beirut, Lebanon
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Mail
                className="h-4 w-4 md:h-5 md:w-5"
                style={{ color: BRAND_BLUE }}
              />
              <a
                href="mailto:contact@recyclelebanon.org"
                className="transition-colors text-xs md:text-sm"
                style={{ color: "#4B5563" }}
                onMouseOver={(e) => (e.currentTarget.style.color = BRAND_BLUE)}
                onMouseOut={(e) => (e.currentTarget.style.color = "#4B5563")}
              >
                contact@recyclelebanon.org
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Phone
                className="h-4 w-4 md:h-5 md:w-5"
                style={{ color: BRAND_BLUE }}
              />
              <a
                href="tel:+96171131115"
                className="transition-colors text-xs md:text-sm"
                style={{ color: "#4B5563" }}
                onMouseOver={(e) => (e.currentTarget.style.color = BRAND_BLUE)}
                onMouseOut={(e) => (e.currentTarget.style.color = "#4B5563")}
              >
                +961 71 131 115
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-4">
          <p className="text-center text-gray-500 text-xs md:text-sm">
            © {new Date().getFullYear()} Recycle Lebanon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
