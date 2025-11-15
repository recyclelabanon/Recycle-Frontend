import { useEffect, useState } from "react";
import {
  Send,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Leaf,
} from "lucide-react";
import axios from "axios";
import useApi from "../Hooks/useApi.js";

const API_URL = "http://localhost:5000/api/v1/contact";
const PROGRAM_API = "http://localhost:5000/api/v1/programmes";
const MESSAGE_API = "http://localhost:5000/api/v1/messages";

const Contact = () => {
  const { sendRequest } = useApi();
  const [contactData, setContactData] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Fetch contact + programmes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactRes, programRes] = await Promise.all([
          axios.get(API_URL),
          axios.get(PROGRAM_API),
        ]);
        setContactData(contactRes.data);
        setPrograms(programRes.data);
      } catch (err) {
        console.error("❌ Error fetching contact data:", err);
      }
    };
    fetchData();
  }, []);

  // ✅ Handle input
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(MESSAGE_API, "POST", formData);
      setSuccessMessage("✅ Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      setSuccessMessage("❌ Something went wrong. Please try again.");
    }
  };

  if (!contactData)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;

  // dynamic admin-controlled fields
  const fields = [
    { label: "Working Hours", name: "workingHours", icon: "iconWorkingHours" },
    { label: "Address", name: "address", icon: "iconAddress" },
    { label: "Phone", name: "phone", icon: "iconPhone" },
    { label: "Email", name: "email", icon: "iconEmail" },
    { label: "Visit Us", name: "visitUs", icon: "iconVisitUs" },
    { label: "Shop Hours", name: "shopHours", icon: "iconShopHours" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 🟢 Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {contactData.heading || "Contact Us"}
          </h1>
          <p className="text-xl text-gray-600">{contactData.description}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* 🟢 Left: Contact Info */}
          <div className="lg:w-1/2 space-y-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {contactData.heading || "Get in Touch"}
                </h2>
              </div>

              {/* Dynamic contact fields from backend */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {fields.map(({ label, name, icon }) => (
                  <div
                    key={name}
                    className="text-center p-4 bg-green-50 rounded-xl"
                  >
                    {contactData[icon] ? (
                      <img
                        src={contactData[icon]}
                        alt={label}
                        className="w-10 h-10 mx-auto mb-2"
                      />
                    ) : (
                      <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    )}
                    <h3 className="font-semibold mb-1">{label}</h3>
                    <p className="text-sm text-gray-600">
                      {contactData[name] || "Not provided"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 🟢 Right: Message Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Send Us a Message
              </h2>

              {successMessage && (
                <div className="mb-4 p-4 text-green-700 bg-green-100 border border-green-300 rounded-lg flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-700" />
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center"
                >
                  Send Message
                  <Send className="w-5 h-5 ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 🟢 Programmes Section */}
        <div className="space-y-6 md:py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Our Programmes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((org) => (
              <div
                key={org._id}
                className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow"
              >
                {org.icon && (
                  <img
                    src={org.icon}
                    alt={org.name}
                    className="w-12 h-12 mb-3 object-contain"
                  />
                )}
                <h3 className="text-xl font-bold text-green-600 mb-2">
                  {org.name}
                </h3>
                <div className="space-y-2 text-gray-600 text-sm">
                  {org.location && (
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600" /> {org.location}
                    </p>
                  )}
                  {org.phone && (
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-600" /> {org.phone}
                    </p>
                  )}
                  {org.email && (
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-green-600" /> {org.email}
                    </p>
                  )}
                  {org.hours && (
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-600" /> {org.hours}
                    </p>
                  )}
                  {org.website && (
                    <p className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-green-600" />
                      <a
                        href={org.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        Visit Website
                      </a>
                    </p>
                  )}
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
