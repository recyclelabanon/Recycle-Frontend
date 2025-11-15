import { useEffect, useState } from "react";
import axios from "axios";

const API_GET = "http://localhost:5000/api/v1/donation-page-hero";
const API_UPDATE = "http://localhost:5000/api/v1/donation-page-hero";

const AdminDonationPageHero = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    backgroundImage: null,
  });
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get(API_GET);
        console.log("Fetched hero for admin:", JSON.stringify(res.data, null, 2));
        if (res.data) {
          setFormData({
            title: res.data.title,
            subtitle: res.data.subtitle,
            backgroundImage: null,
          });
          setPreview(res.data.backgroundImage);
        }
      } catch (err) {
        console.error("Error fetching hero:", err.response?.data || err.message);
      }
    };
    fetchHero();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, backgroundImage: file });
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("subtitle", formData.subtitle);
      if (formData.backgroundImage instanceof File) fd.append("backgroundImage", formData.backgroundImage);

      const res = await axios.post(API_UPDATE, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Updated hero:", JSON.stringify(res.data, null, 2));
      setPreview(res.data.backgroundImage);
      alert("Donation Hero Updated Successfully!");
    } catch (err) {
      console.error("Error updating hero:", err.response?.data || err.message);
      alert("Failed to update hero. Check console.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Donation Page Hero Editor</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label className="font-semibold">Subtitle</label>
          <textarea
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter subtitle"
            rows="3"
          />
        </div>

        <div>
          <label className="font-semibold">Background Image</label>
          <input type="file" accept="image/*" onChange={handleFile} className="w-full border p-2 rounded" />
        </div>

        {preview && (
          <div className="mt-4">
            <p className="font-medium">Preview:</p>
            <img src={preview} alt="Preview" className="w-full rounded shadow-md object-cover h-56" />
          </div>
        )}

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AdminDonationPageHero;
