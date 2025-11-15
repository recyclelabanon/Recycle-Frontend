import { useEffect, useState } from "react";
import axios from "axios";
import { Save } from "lucide-react";

const API = "http://localhost:5000/api/v1/newsletter";

const AdminNewsletterSettings = () => {
  const [form, setForm] = useState({ title: "", subtitle: "" });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchSettings = async () => {
    const res = await axios.get(`${API}/settings`);
    setForm(res.data);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios.put(`${API}/settings`, form);
    
    setSaved(true);
    setLoading(false);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Newsletter Text Settings</h1>

      {saved && (
        <div className="mb-4 p-3 border border-green-500 text-green-600 rounded-lg">
          ✅ Saved Successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Enter main title"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Subtitle</label>
          <textarea
            name="subtitle"
            rows="3"
            value={form.subtitle}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Enter subtitle description"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center"
          disabled={loading}
        >
          <Save className="w-5 h-5 mr-2" />
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default AdminNewsletterSettings;
