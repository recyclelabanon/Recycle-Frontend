import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, Upload } from "lucide-react";

const API_URL = "http://localhost:5000/api/v1/contact";

// 🔹 Simple reusable UI components
const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 flex items-center justify-center ${className}`}
  >
    {children}
  </button>
);

const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
  />
);

const Textarea = ({ className = "", ...props }) => (
  <textarea
    {...props}
    className={`border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
  />
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`space-y-4 ${className}`}>{children}</div>
);

// 🔹 Admin Contact Editor
const AdminContactEditor = () => {
  const [contact, setContact] = useState({
    heading: "",
    description: "",
    workingHours: "",
    address: "",
    phone: "",
    email: "",
    visitUs: "",
    shopHours: "",
    iconWorkingHours: "",
    iconAddress: "",
    iconPhone: "",
    iconEmail: "",
    iconVisitUs: "",
    iconShopHours: "",
  });

  const [icons, setIcons] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch existing contact info
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data) setContact(res.data);
      } catch (err) {
        console.error("❌ Error fetching contact:", err);
      }
    };
    fetchContact();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setIcons({ ...icons, [e.target.name]: e.target.files[0] });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(contact).forEach(([key, val]) => formData.append(key, val || ""));
      Object.entries(icons).forEach(([key, file]) => {
        if (file) formData.append(key, file);
      });

      const res = await axios.put(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setContact(res.data);
      alert("✅ Contact info updated successfully!");
    } catch (err) {
      console.error("❌ Error updating contact:", err);
      alert("❌ Failed to update contact info");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-6">📞 Manage Contact / About Us</h1>

      <Card className="max-w-4xl">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* --- Heading & Description --- */}
            <div>
              <label className="block font-medium mb-1">Heading</label>
              <Input
                name="heading"
                value={contact.heading}
                onChange={handleChange}
                placeholder="e.g. About Us"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Description</label>
              <Textarea
                name="description"
                value={contact.description}
                onChange={handleChange}
                placeholder="Short description about your mission..."
                rows="3"
              />
            </div>

            {/* --- Main Info Fields --- */}
            {[
              { label: "Working Hours", name: "workingHours", icon: "iconWorkingHours" },
              { label: "Address", name: "address", icon: "iconAddress" },
              { label: "Phone", name: "phone", icon: "iconPhone" },
              { label: "Email", name: "email", icon: "iconEmail" },
              { label: "Visit Us", name: "visitUs", icon: "iconVisitUs" },
              { label: "Shop Hours", name: "shopHours", icon: "iconShopHours" },
            ].map(({ label, name, icon }) => (
              <div key={name}>
                <label className="block font-medium mb-1">{label}</label>
                <Input
                  name={name}
                  value={contact[name] || ""}
                  onChange={handleChange}
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
                <Input
                  type="file"
                  name={icon}
                  onChange={handleFileChange}
                  className="mt-2"
                />
                {contact[icon] && (
                  <img
                    src={contact[icon]}
                    alt={`${label} Icon`}
                    className="w-12 h-12 mt-2 rounded border"
                  />
                )}
              </div>
            ))}

            {/* --- Submit Button --- */}
            <Button type="submit" disabled={loading} className="mt-4">
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 w-5 h-5" /> Saving...
                </>
              ) : (
                <>
                  <Upload className="mr-2 w-5 h-5" /> Update Contact Info
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContactEditor;
