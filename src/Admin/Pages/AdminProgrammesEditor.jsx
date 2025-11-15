// src/admin/pages/Program.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  PlusCircle,
  Trash2,
  Edit3,
  Loader2,
  Globe,
  MapPin,
  Mail,
  Phone,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";


const API_URL = "http://localhost:5000/api/v1/programmes";


const AdminProgrammesEditor = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    hours: "",
    website: "",
    icon: null,
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all programs
  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setPrograms(res.data);
    } catch (err) {
      console.error("Error fetching programs:", err);
      alert("❌ Failed to fetch programs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, icon: e.target.files[0] });
  };

  // Create or Update Program
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in form) {
        data.append(key, form[key]);
      }

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, data);
        alert("✅ Program updated successfully");
      } else {
        await axios.post(API_URL, data);
        alert("✅ Program created successfully");
      }

      setForm({
        name: "",
        location: "",
        phone: "",
        email: "",
        hours: "",
        website: "",
        icon: null,
      });
      setEditingId(null);
      fetchPrograms();
    } catch (err) {
      console.error("Error submitting program:", err);
      alert("❌ Failed to save program");
    }
  };

  // Edit handler
  const handleEdit = (program) => {
    setForm({
      name: program.name,
      location: program.location,
      phone: program.phone,
      email: program.email,
      hours: program.hours,
      website: program.website,
      icon: null,
    });
    setEditingId(program._id);
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this program?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      alert("🗑️ Program deleted successfully");
      fetchPrograms();
    } catch (err) {
      console.error("Error deleting program:", err);
      alert("❌ Failed to delete program");
    }
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">🏢 Manage Programs</h1>

      {/* Add / Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Program Name"
          className="border p-3 rounded-lg"
          required
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-3 rounded-lg"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border p-3 rounded-lg"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="border p-3 rounded-lg"
        />
        <input
          name="hours"
          value={form.hours}
          onChange={handleChange}
          placeholder="Working Hours"
          className="border p-3 rounded-lg"
        />
        <input
          name="website"
          value={form.website}
          onChange={handleChange}
          placeholder="Website URL"
          className="border p-3 rounded-lg"
        />
        <input
          type="file"
          name="icon"
          onChange={handleFileChange}
          accept="image/*"
          className="border p-3 rounded-lg md:col-span-2"
        />

        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white md:col-span-2 py-3 flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          {editingId ? "Update Program" : "Add Program"}
        </Button>
      </form>

      {/* Program List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">All Programs</h2>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
          </div>
        ) : programs.length === 0 ? (
          <p className="text-gray-500">No programs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {programs.map((p) => (
              <Card key={p._id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-5 space-y-3">
                  {p.icon && (
                    <img
                      src={p.icon}
                      alt={p.name}
                      className="w-16 h-16 object-contain mb-3"
                    />
                  )}
                  <h3 className="text-xl font-bold text-green-700">{p.name}</h3>
                  <div className="space-y-1 text-gray-700">
                    <p className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {p.location}
                    </p>
                    <p className="flex items-center gap-1">
                      <Phone className="w-4 h-4" /> {p.phone}
                    </p>
                    <p className="flex items-center gap-1">
                      <Mail className="w-4 h-4" /> {p.email}
                    </p>
                    <p className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {p.hours}
                    </p>
                    <p className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />{" "}
                      <a
                        href={p.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Visit Website
                      </a>
                    </p>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button
                      onClick={() => handleEdit(p)}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
                    >
                      <Edit3 className="w-4 h-4" /> Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProgrammesEditor;
