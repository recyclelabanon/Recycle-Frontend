// src/Admin/Pages/AdminHomepageWorkSection.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import * as Icons from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const iconNames = Object.keys(Icons);

const AdminHomepageWorkSection = () => {
  const [data, setData] = useState({
    heading: "",
    paragraph: "",
    programs: []
  });

  const [fileMap, setFileMap] = useState({});
  const [previewMap, setPreviewMap] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/api/v1/homepage-work`);

        if (res.data) {
          setData({
            heading: res.data.heading || "",
            paragraph: res.data.paragraph || "",
            programs: Array.isArray(res.data.programs) ? res.data.programs : []
          });

          const pm = {};
          (res.data.programs || []).forEach((p, idx) => {
            if (p.image) {
              pm[idx] = p.image.startsWith("http") ? p.image : `${API}${p.image}`;
            }
          });
          setPreviewMap(pm);
        }
      } catch (err) {
        console.error("Failed to load homepage work section", err);
        alert("Failed to load data. Check backend /api/v1/homepage-work");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleProgramChange = (index, key, value) => {
    const updated = [...data.programs];
    updated[index] = { ...updated[index], [key]: value };
    setData({ ...data, programs: updated });
  };

  const handleFileSelect = (index, file) => {
    setFileMap((m) => ({ ...m, [index]: file }));
    const url = URL.createObjectURL(file);
    setPreviewMap((p) => ({ ...p, [index]: url }));
  };

  const addProgram = () => {
    setData((prev) => ({
      ...prev,
      programs: [
        ...prev.programs,
        {
          collective: "",
          titleLine1: "",
          titleLine2: "",
          icon: "",
          tagline: "",
          description: "",
          linkText: "",
          image: "",
          color: ""
        }
      ]
    }));
  };

  const removeProgram = (index) => {
    setData({
      ...data,
      programs: data.programs.filter((_, i) => i !== index)
    });

    setFileMap((m) => {
      const nm = { ...m };
      delete nm[index];
      return nm;
    });

    setPreviewMap((p) => {
      const np = { ...p };
      delete np[index];
      return np;
    });
  };

  // ✅ Save + Upload
 const saveData = async () => {
  try {
    setLoading(true);

    const form = new FormData();
    form.append("heading", data.heading);
    form.append("paragraph", data.paragraph);
    form.append("programs", JSON.stringify(data.programs));

    Object.keys(fileMap).forEach((key) => {
      form.append(`programs[${key}].image`, fileMap[key]);
    });

    const res = await axios.put(`${API}/api/v1/homepage-work`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Homepage Work Section Updated ✅");

    setData(res.data);
    const pm = {};

    (res.data.programs || []).forEach((p, idx) => {
      if (p.image) pm[idx] = p.image.startsWith("http") ? p.image : `${API}${p.image}`;
    });

    setPreviewMap(pm);
    setFileMap({});

  } catch (err) {
    console.error("Save failed", err);
    alert("Save failed — backend error");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Homepage Work Section — Admin</h1>
        <button
          onClick={saveData}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
        >
          {loading ? "Saving..." : "Save Section"}
        </button>
      </div>

      <label>Section Heading</label>
      <input
        name="heading"
        value={data.heading}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />

      <label>Section Paragraph</label>
      <textarea
        name="paragraph"
        value={data.paragraph}
        onChange={handleChange}
        className="w-full border p-2 mb-5 rounded h-24"
      />

      <h2 className="text-xl font-bold mb-3">Programs</h2>

      {data.programs.map((p, i) => (
        <div key={i} className="border p-4 rounded mb-4 bg-white shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <b>Program {i + 1}</b>
            <button className="bg-red-500 text-white text-sm px-2 py-1 rounded" onClick={() => removeProgram(i)}>
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Collective" value={p.collective} onChange={(e) => handleProgramChange(i, "collective", e.target.value)} className="border p-2 rounded" />
            <input placeholder="Color class" value={p.color} onChange={(e) => handleProgramChange(i, "color", e.target.value)} className="border p-2 rounded" />
            <input placeholder="Title Line 1" value={p.titleLine1} onChange={(e) => handleProgramChange(i, "titleLine1", e.target.value)} className="border p-2 rounded" />
            <input placeholder="Title Line 2" value={p.titleLine2} onChange={(e) => handleProgramChange(i, "titleLine2", e.target.value)} className="border p-2 rounded" />

            <select value={p.icon} onChange={(e) => handleProgramChange(i, "icon", e.target.value)} className="border p-2 rounded">
              <option value="">Select Icon</option>
              {iconNames.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>

            <input placeholder="Tagline" value={p.tagline} onChange={(e) => handleProgramChange(i, "tagline", e.target.value)} className="border p-2 rounded" />

            <textarea placeholder="Description" value={p.description} onChange={(e) => handleProgramChange(i, "description", e.target.value)} className="border p-2 rounded h-20 md:col-span-2" />

            <input placeholder="Link Text" value={p.linkText} onChange={(e) => handleProgramChange(i, "linkText", e.target.value)} className="border p-2 rounded" />

            <div>
              <input type="file" accept="image/*" onChange={(e) => e.target.files[0] && handleFileSelect(i, e.target.files[0])} />
              <div className="mt-2">
                {previewMap[i] ? (
                  <img src={previewMap[i]} className="w-full h-32 object-cover rounded" />
                ) : p.image && (
                  <img src={p.image.startsWith("http") ? p.image : `${API}${p.image}`} className="w-full h-32 object-cover rounded" />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <button onClick={addProgram} className="bg-blue-600 text-white px-4 py-2 rounded">
        + Add Program
      </button>
    </div>
  );
};

export default AdminHomepageWorkSection;
