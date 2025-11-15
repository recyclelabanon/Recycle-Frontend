import { useState, useEffect } from "react";
import axios from "axios";

const AdminContactHero = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    backgroundImage: null,
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      const res = await axios.get("http://localhost:5000/api/v1/contact-hero");
      setFormData({
        title: res.data.title,
        subtitle: res.data.subtitle,
        backgroundImage: null,
      });
      setPreview(res.data.backgroundImage);
    };
    fetchHero();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "backgroundImage") {
      setFormData({ ...formData, backgroundImage: e.target.files[0] });
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("subtitle", formData.subtitle);
    if (formData.backgroundImage) {
      data.append("backgroundImage", formData.backgroundImage);
    }

    await axios.post("http://localhost:5000/api/v1/contact-hero", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Hero updated successfully!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Update Contact Hero Section</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Background Image</label>
          <input
            type="file"
            name="backgroundImage"
            onChange={handleChange}
            accept="image/*"
          />
          {preview && <img src={preview} alt="preview" className="mt-2 w-64 h-40 object-cover" />}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Hero
        </button>
      </form>
    </div>
  );
};

export default AdminContactHero;
