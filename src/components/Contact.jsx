import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Globe,
  Leaf,
  CheckCircle,
} from "lucide-react";
import useApi from "../Hooks/useApi.js";

const RECYCLE_LEBANON_BLUE = "#2726CC";

const Contact = () => {
  const { sendRequest } = useApi();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const organizations = [
    {
      id: 1,
      name: "Regenerate Hub",
      location: [
        "Saint Louise Street,",
        "Corner Facing Edisson Roastery,",
        "Hamra, Beirut, Lebanon",
      ],
      phone: "+961 76 0090644",
      email: "connect@regeneratehub.org",
      hours: "Mon - Fri 10am - 5pm",
      website: "https://www.regeneratehub.org",
    },
    {
      id: 2,
      name: "EcoSouk Circular Hub",
      location: [
        "Makdassi St, Anwar Al Khalil Bldg,",
        "Corner Facing Edisson Roastery,",
        "Hamra, Beirut, Lebanon",
      ],
      phone: "+961 76 009 355",
      email: "connect@ecosouk.net",
      hours: "Mon - Sat 10am - 5pm",
      website: "https://ecosouk.net",
    },
    {
      id: 3,
      name: "TerraPods",
      location: ["Hay EI Ghabe, Baskinta,", "Metn, Beirut, Lebanon"],
      phone: "+961 76 009 44",
      email: "connect@terrapods.org",
      hours: "Mon - Fri 9am - 6pm",
      website: "https://terrapods.org",
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest("http://localhost:4000/api/contact", "POST", formData);
      setSuccessMessage("Your message has been sent successfully! 🎉");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccessMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Sow a Connection
          </h1>
          <p className="text-xl text-gray-600">Growing a regenerative future</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side - About & Information */}
          <div className="lg:w-1/2 space-y-12">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${RECYCLE_LEBANON_BLUE}20` }}>
                  <Leaf className="w-8 h-8" style={{ color: RECYCLE_LEBANON_BLUE }} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">About Us</h2>
              </div>
              <p className="text-gray-600 mb-4">
                At Recycle Lebanon, we&apos;re pioneering sustainable solutions
                through community-driven initiatives. Our mission is to create a
                circular economy that benefits both people and the planet.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-4 rounded-xl" style={{ backgroundColor: `${RECYCLE_LEBANON_BLUE}10` }}>
                  <Clock className="w-8 h-8 mx-auto mb-3" style={{ color: RECYCLE_LEBANON_BLUE }} />
                  <h3 className="font-semibold mb-1">Working Hours</h3>
                  <p className="text-sm text-gray-600">Mon-Fri: 9AM - 6PM</p>
                </div>
                <div className="text-center p-4 rounded-xl" style={{ backgroundColor: `${RECYCLE_LEBANON_BLUE}10` }}>
                  <MapPin className="w-8 h-8 mx-auto mb-3" style={{ color: RECYCLE_LEBANON_BLUE }} />
                  <h3 className="font-semibold mb-1">Our locations</h3>
                  <p className="text-sm text-gray-600">Beirut, Lebanon</p>
                </div>
                <div className="text-center p-4 rounded-xl" style={{ backgroundColor: `${RECYCLE_LEBANON_BLUE}10` }}>
                  <Phone className="w-8 h-8 mx-auto mb-3" style={{ color: RECYCLE_LEBANON_BLUE }} />
                  <h3 className="font-semibold mb-1">Contact</h3>
                  <p className="text-sm text-gray-600">+961 1 123 456</p>
                </div>
              </div>
            </div>

            {/* Information Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
              <div className="bg-white rounded-xl shadow-lg p-6 min-w-0">
                <h3 className="font-semibold mb-3" style={{ color: RECYCLE_LEBANON_BLUE }}>
                  <Mail className="w-5 h-5 inline-block mr-2" />
                  Email Us
                </h3>
                <p className="text-gray-600 text-sm">
                  connect@recyclelebanon.org
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold mb-3" style={{ color: RECYCLE_LEBANON_BLUE }}>
                  <Globe className="w-5 h-5 inline-block mr-2" />
                  Visit Us
                </h3>
                <p className="text-gray-600 text-sm whitespace-nowrap">
                  EcoSouk - Hamra, Beirut
                  <br />
                  TerraPods - Baskinta, Metn
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold mb-3" style={{ color: RECYCLE_LEBANON_BLUE }}>
                  <Clock className="w-5 h-5 inline-block mr-2" />
                  Shop Hours
                </h3>
                <p className="text-gray-600 text-sm">Mon-Fri: 9AM - 6PM</p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Get in Touch
              </h2>
              {successMessage && (
                <div className="mb-4 p-4 rounded-lg flex items-center"
                     style={{ backgroundColor: `${RECYCLE_LEBANON_BLUE}20`, color: RECYCLE_LEBANON_BLUE, borderColor: RECYCLE_LEBANON_BLUE, borderWidth: '1px' }}>
                  <CheckCircle className="w-6 h-6 mr-2" style={{ color: RECYCLE_LEBANON_BLUE }} />
                  {successMessage}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {["name", "email", "message"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field === "name" ? "Full Name" : field === "email" ? "Email Address" : "Your Message"}
                      </label>
                      {field !== "message" ? (
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                          style={{ focusRingColor: RECYCLE_LEBANON_BLUE }}
                          placeholder={field === "name" ? "John Doe" : "john@example.com"}
                          required
                        />
                      ) : (
                        <textarea
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          rows="4"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                          style={{ focusRingColor: RECYCLE_LEBANON_BLUE }}
                          placeholder="How can we help you?"
                          required
                        />
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg transition-colors font-semibold flex items-center justify-center"
                  style={{ backgroundColor: RECYCLE_LEBANON_BLUE, color: "#fff" }}
                >
                  Send Message
                  <Send className="w-5 h-5 ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Programmes Section */}
        <div className="space-y-6 md:py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Our Programmes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organizations.map((org) => (
              <div
                key={org.id}
                className="bg-white rounded-xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-shadow"
                style={{ borderColor: RECYCLE_LEBANON_BLUE }}
              >
                <h3 className="text-xl font-bold mb-4" style={{ color: RECYCLE_LEBANON_BLUE }}>
                  {org.name}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 mt-1" style={{ color: RECYCLE_LEBANON_BLUE }} />
                    <div className="text-gray-600">
                      {org.location.map((line, index) => (
                        <p key={index}>{line}</p>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5" style={{ color: RECYCLE_LEBANON_BLUE }} />
                    <a
                      href={`tel:${org.phone}`}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {org.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5" style={{ color: RECYCLE_LEBANON_BLUE }} />
                    <a
                      href={`mailto:${org.email}`}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {org.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" style={{ color: RECYCLE_LEBANON_BLUE }} />
                    <p className="text-gray-600">Open {org.hours}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5" style={{ color: RECYCLE_LEBANON_BLUE }} />
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: RECYCLE_LEBANON_BLUE }}
                      className="hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
