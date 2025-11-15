import { useEffect, useState } from "react";
import axios from "axios";
import * as Icons from "lucide-react";

const iconNames = Object.keys(Icons);

const AdminHomepageWorkSection = () => {
  const [data, setData] = useState({
    heading: "",
    paragraph: "",
    programs: []
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/homepage-work-section")
      .then(res => setData(res.data))
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleProgramChange = (index, key, value) => {
    const updated = [...data.programs];
    updated[index][key] = value;
    setData({ ...data, programs: updated });
  };

  const addProgram = () => {
    setData({
      ...data,
      programs: [
        ...data.programs,
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
    });
  };

  const removeProgram = (index) => {
    const updated = data.programs.filter((_, i) => i !== index);
    setData({ ...data, programs: updated });
  };

  const saveData = () => {
    axios.put("http://localhost:5000/api/homepage-work-section", data)
      .then(() => alert("Homepage Work Section Updated ✅"))
      .catch(console.error);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">Homepage Work Section Admin</h1>

      {/* Heading */}
      <input
        name="heading"
        value={data.heading}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        placeholder="Section Heading"
      />

      {/* Paragraph */}
      <textarea
        name="paragraph"
        value={data.paragraph}
        onChange={handleChange}
        className="w-full border p-2 rounded h-24"
        placeholder="Section Paragraph"
      />

      {/* Programs */}
      <h2 className="text-xl font-bold mt-6">Programs</h2>

      {data.programs.map((p, i) => (
        <div key={i} className="border p-4 rounded mb-3 bg-white">
          <div className="font-semibold mb-2">Program {i + 1}</div>

          <input
            value={p.collective}
            onChange={(e) => handleProgramChange(i, "collective", e.target.value)}
            className="w-full border p-2 rounded mb-2"
            placeholder="Collective Text (e.g., COLLECTIVE EMPOWERMENT)"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              value={p.titleLine1}
              onChange={(e) => handleProgramChange(i, "titleLine1", e.target.value)}
              className="border p-2 rounded"
              placeholder="Title Line 1"
            />

            <input
              value={p.titleLine2}
              onChange={(e) => handleProgramChange(i, "titleLine2", e.target.value)}
              className="border p-2 rounded"
              placeholder="Title Line 2"
            />
          </div>

          {/* Icon Dropdown */}
          <select
            value={p.icon}
            onChange={(e) => handleProgramChange(i, "icon", e.target.value)}
            className="w-full border p-2 rounded my-2"
          >
            <option value="">Select Icon</option>
            {iconNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>

          <input
            value={p.tagline}
            onChange={(e) => handleProgramChange(i, "tagline", e.target.value)}
            className="w-full border p-2 rounded mb-2"
            placeholder="Tagline"
          />

          <textarea
            value={p.description}
            onChange={(e) => handleProgramChange(i, "description", e.target.value)}
            className="w-full border p-2 rounded mb-2"
            placeholder="Description"
          />

          <input
            value={p.linkText}
            onChange={(e) => handleProgramChange(i, "linkText", e.target.value)}
            className="w-full border p-2 rounded mb-2"
            placeholder="Link Text"
          />

          <input
            value={p.image}
            onChange={(e) => handleProgramChange(i, "image", e.target.value)}
            className="w-full border p-2 rounded mb-2"
            placeholder="Image URL"
          />

          <input
            value={p.color}
            onChange={(e) => handleProgramChange(i, "color", e.target.value)}
            className="w-full border p-2 rounded mb-2"
            placeholder="Tailwind Color Class (ex: text-green-600)"
          />

          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => removeProgram(i)}
          >
            Remove Program
          </button>
        </div>
      ))}

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={addProgram}
      >
        + Add Program
      </button>

      <button
        className="bg-green-600 text-white px-6 py-2 rounded block mt-4"
        onClick={saveData}
      >
        ✅ Save Section
      </button>
    </div>
  );
};

export default AdminHomepageWorkSection;
