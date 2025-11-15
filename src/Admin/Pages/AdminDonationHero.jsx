import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/v1";

const AdminDonationHero = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // ✅ Fetch existing content
  const fetchHero = async () => {
    try {
      const res = await axios.get(`${API_BASE}/donation-hero`);
      if (res.data) {
        setFormData({
          title: res.data.title || "",
          subtitle: res.data.subtitle || "",
        });
      }
    } catch (err) {
      console.log("Fetch donation hero error:", err);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  // ✅ Update data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await axios.put(`${API_BASE}/donation-hero`, formData);
      setMsg("✅ Donation Hero Updated Successfully!");
      fetchHero();
    } catch (err) {
      setMsg("❌ Error updating content");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Donation Page Hero Text</h2>

      {msg && (
        <p className="mb-3 font-semibold">
          {msg}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Hero Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter hero main title"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Hero Subtitle</label>
          <textarea
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows="3"
            placeholder="Enter hero subtitle text"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-6 py-3 text-white rounded bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default AdminDonationHero;
