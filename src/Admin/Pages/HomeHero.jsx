import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const HomeHero = () => {
  const [hero, setHero] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    backgroundImage: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios.get(`${API}/api/v1/home-hero`)
      .then((res) => {
        if (res.data) {
          setHero(res.data);
          setImagePreview(res.data.backgroundImage);
        }
      })
      .catch((err) => console.log("Fetch Hero Error:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", hero.title);
    formData.append("subtitle", hero.subtitle);
    formData.append("buttonText", hero.buttonText);
    if (file) formData.append("backgroundImage", file);

    try {
      await axios.put(`${API}/api/v1/home-hero`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Home Hero updated!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("❌ Update failed.");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Home Hero Section</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold text-gray-700">Title</label>
          <input
            className="border p-2 w-full rounded-md"
            value={hero.title}
            onChange={(e) => setHero({ ...hero, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700">Subtitle</label>
          <input
            className="border p-2 w-full rounded-md"
            value={hero.subtitle}
            onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700">Button Text</label>
          <input
            className="border p-2 w-full rounded-md"
            value={hero.buttonText}
            onChange={(e) => setHero({ ...hero, buttonText: e.target.value })}
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700">Background Image</label>
          <input
            type="file"
            className="border p-2 w-full rounded-md"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setImagePreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </div>

        {imagePreview && (
          <img
            src={
              imagePreview.startsWith("/uploads")
                ? `${API}${imagePreview}`
                : imagePreview
            }
            alt="Hero Preview"
            className="rounded-lg mt-3 w-full h-48 object-cover border"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default HomeHero;
