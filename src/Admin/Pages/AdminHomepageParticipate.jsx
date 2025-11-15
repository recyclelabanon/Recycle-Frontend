// Frontend: src/admin/pages/AdminHomepageParticipate.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const AdminHomepageParticipate = () => {
  const [data, setData] = useState({
    heading: "",
    subheading: "",
    opportunities: [],
    carouselImages: []
  });

  const [loading, setLoading] = useState(false);
  const [carouselFile, setCarouselFile] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API}/api/v1/homepage/participate`);
        if (res.data) setData(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    })();
  }, []);

  const addOpportunity = () => {
    setData(prev => ({
      ...prev,
      opportunities: [
        ...prev.opportunities,
        { title: "", date: "", type: "", icon: "Leaf", image: "", buttonLink: "" }
      ]
    }));
  };

  const updateOpportunity = (i, field, val) => {
    const ops = [...data.opportunities];
    ops[i] = { ...ops[i], [field]: val };
    setData({ ...data, opportunities: ops });
  };

  const removeOpportunity = (i) => {
    const ops = [...data.opportunities];
    ops.splice(i, 1);
    setData({ ...data, opportunities: ops });
  };

  const uploadToCloudinary = async (file) => {
    if (!file) return null;

    if (CLOUDINARY_UPLOAD_PRESET && CLOUDINARY_CLOUD_NAME) {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        form
      );
      return res.data.secure_url;
    } else {
      const form = new FormData();
      form.append("image", file);

      const res = await axios.post(`${API}/api/v1/homepage/participate/upload`, form, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      return res.data.url;
    }
  };

  const onOpportunityImage = async (i, file) => {
    try {
      setLoading(true);
      const url = await uploadToCloudinary(file);
      updateOpportunity(i, "image", url);
    } catch (err) {
      console.error("Upload err:", err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const uploadCarouselImage = async () => {
    if (!carouselFile) return;
    setLoading(true);
    try {
      const url = await uploadToCloudinary(carouselFile);
      setData(prev => ({ ...prev, carouselImages: [...prev.carouselImages, url] }));
      setCarouselFile(null);
    } catch (err) {
      console.error("Carousel upload error", err);
    } finally {
      setLoading(false);
    }
  };

  const removeCarouselImage = (i) => {
    const arr = [...data.carouselImages];
    arr.splice(i, 1);
    setData({ ...data, carouselImages: arr });
  };

  const saveAll = async () => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        opportunities: data.opportunities // backend now parses if needed
      };

      await axios.post(`${API}/api/v1/homepage/participate`, payload);

      alert("✅ Saved Successfully");
    } catch (err) {
      console.error("Save error:", err.response?.data || err);
      alert("❌ Save Failed — check console");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin — Participate</h1>

      <div className="bg-white p-4 shadow rounded mb-4">
        <label className="font-semibold">Heading</label>
        <input className="border p-2 w-full mb-2"
          value={data.heading}
          onChange={e => setData({ ...data, heading: e.target.value })}
        />
        
        <label className="font-semibold">Subheading</label>
        <textarea className="border p-2 w-full"
          value={data.subheading}
          onChange={e => setData({ ...data, subheading: e.target.value })}
        />
      </div>

      <h2 className="text-xl font-bold mb-2">Opportunities</h2>

      {data.opportunities.map((op, i) => (
        <div key={i} className="bg-white p-4 rounded shadow mb-3">
          <div className="flex gap-2 mb-2">
            <input className="border p-2 flex-1" placeholder="Title"
              value={op.title} onChange={e => updateOpportunity(i, "title", e.target.value)} />

            <input className="border p-2 w-32" placeholder="Date"
              value={op.date} onChange={e => updateOpportunity(i, "date", e.target.value)} />

            <input className="border p-2 w-32" placeholder="Type"
              value={op.type} onChange={e => updateOpportunity(i, "type", e.target.value)} />
          </div>

          <div className="flex gap-2 mb-2 items-center">
            <input className="border p-2 w-40" placeholder="Icon (Lucide)"
              value={op.icon} onChange={e => updateOpportunity(i, "icon", e.target.value)} />

            <input className="border p-2 flex-1" placeholder="Button Link"
              value={op.buttonLink} onChange={e => updateOpportunity(i, "buttonLink", e.target.value)} />
          </div>

          <div>
            <input type="file" onChange={e => onOpportunityImage(i, e.target.files[0])} />
            {op.image && <img src={op.image} className="w-28 mt-2 rounded" />}
          </div>

          <button className="bg-red-600 text-white px-3 py-1 rounded mt-2"
            onClick={() => removeOpportunity(i)}>Delete</button>
        </div>
      ))}

      <button className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
        onClick={addOpportunity}>+ Add Opportunity</button>

      <h2 className="text-xl font-bold mb-2">Carousel Images</h2>

      <div className="bg-white p-4 rounded shadow mb-4">
        <input type="file" onChange={e => setCarouselFile(e.target.files[0])} />
        <button className="ml-2 bg-green-600 text-white px-3 py-1 rounded"
          onClick={uploadCarouselImage}>Upload</button>

        <div className="grid grid-cols-3 gap-3 mt-3">
          {data.carouselImages.map((img, i) => (
            <div key={i} className="relative">
              <img src={img} className="rounded w-full" />
              <button className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 rounded"
                onClick={() => removeCarouselImage(i)}>X</button>
            </div>
          ))}
        </div>
      </div>

      <button className="bg-green-700 text-white px-6 py-2 rounded"
        onClick={saveAll} disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default AdminHomepageParticipate;
