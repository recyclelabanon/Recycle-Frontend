import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const defaultService = {
  title: "",
  items: [""],
  partners: [""],
  cta: { text: "", buttonText: "", buttonLink: "" },
  secondary: { text: "", buttonLink: "" },
};

const AdminHireUs = () => {
  const [hireUs, setHireUs] = useState({
    sectionTitle: "",
    services: [defaultService],
  });

  const fetchHireUs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/hire-us");
      const data = res.data;

      setHireUs({
        sectionTitle: data?.sectionTitle ?? "",
        services:
          data?.services?.map((s) => ({
            title: s.title ?? "",
            items: Array.isArray(s.items) && s.items.length ? s.items : [""],
            partners: Array.isArray(s.partners) && s.partners.length ? s.partners : [""],
            cta: {
              text: s.cta?.text ?? "",
              buttonText: s.cta?.buttonText ?? "",
              buttonLink: s.cta?.buttonLink ?? "",
            },
            secondary: {
              text: s.secondary?.text ?? "",
              buttonLink: s.secondary?.buttonLink ?? "",
            },
          })) ?? [defaultService],
      });
    } catch (err) {
      console.error("Fetch HireUs error:", err);
      toast.error("Error fetching Hire Us section");
    }
  };

  useEffect(() => {
    fetchHireUs();
  }, []);

  const updateServices = (callback) => {
    const updated = [...hireUs.services];
    callback(updated);
    setHireUs({ ...hireUs, services: updated });
  };

  const handleServiceChange = (idx, field, value) =>
    updateServices((u) => (u[idx][field] = value));

  const handleItemChange = (idx, sub, value, type) =>
    updateServices((u) => (u[idx][type][sub] = value));

  const handleCtaChange = (idx, field, value) =>
    updateServices((u) => (u[idx].cta[field] = value));

  const handleSecondaryChange = (idx, field, value) =>
    updateServices((u) => (u[idx].secondary[field] = value));

  const addService = () =>
    setHireUs({ ...hireUs, services: [...hireUs.services, defaultService] });

  const handleSave = async () => {
    try {
      console.log("Sending:", hireUs);

      await axios.patch("http://localhost:5000/api/v1/hire-us/update", hireUs, {
  headers: { "Content-Type": "application/json" },
});


      toast.success("✅ Hire Us section updated");
      fetchHireUs();
    } catch (err) {
      console.error("Save HireUs error:", err.response?.data || err);
      toast.error("❌ Error saving Hire Us section");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Hire Us Section</h2>

      <label className="block font-semibold mb-1">Section Title</label>
      <input
        className="w-full mb-6 p-2 border rounded-md bg-white"
        value={hireUs.sectionTitle}
        onChange={(e) => setHireUs({ ...hireUs, sectionTitle: e.target.value })}
      />

      <h3 className="text-xl font-bold mb-4">Services</h3>

      {hireUs.services.map((svc, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-6 border">
          <label className="block font-semibold mb-1">Service Title</label>
          <input
            className="w-full mb-3 p-2 border rounded-md bg-gray-50"
            value={svc.title}
            onChange={(e) => handleServiceChange(index, "title", e.target.value)}
          />

          <h4 className="font-semibold mb-1">Items</h4>
          {svc.items.map((item, sub) => (
            <input
              key={sub}
              className="w-full mb-2 p-2 border rounded-md bg-gray-50"
              value={item}
              onChange={(e) => handleItemChange(index, sub, e.target.value, "items")}
            />
          ))}

          <h4 className="font-semibold mt-3 mb-1">Partners</h4>
          {svc.partners.map((p, sub) => (
            <input
              key={sub}
              className="w-full mb-2 p-2 border rounded-md bg-gray-50"
              value={p}
              onChange={(e) => handleItemChange(index, sub, e.target.value, "partners")}
            />
          ))}

          <h4 className="font-semibold mt-4 mb-1">Primary CTA</h4>
          <input
            className="w-full mb-2 p-2 border rounded-md bg-gray-50"
            placeholder="CTA Text"
            value={svc?.cta?.text}
            onChange={(e) => handleCtaChange(index, "text", e.target.value)}
          />
          <input
            className="w-full mb-2 p-2 border rounded-md bg-gray-50"
            placeholder="Button Text"
            value={svc?.cta?.buttonText}
            onChange={(e) => handleCtaChange(index, "buttonText", e.target.value)}
          />
          <input
            className="w-full mb-2 p-2 border rounded-md bg-gray-50"
            placeholder="Button Link"
            value={svc?.cta?.buttonLink}
            onChange={(e) => handleCtaChange(index, "buttonLink", e.target.value)}
          />

          <h4 className="font-semibold mt-4 mb-1">Secondary CTA</h4>
          <input
            className="w-full mb-2 p-2 border rounded-md bg-gray-50"
            placeholder="Secondary Text"
            value={svc?.secondary?.text}
            onChange={(e) => handleSecondaryChange(index, "text", e.target.value)}
          />
          <input
            className="w-full mb-2 p-2 border rounded-md bg-gray-50"
            placeholder="Secondary Link"
            value={svc?.secondary?.buttonLink}
            onChange={(e) => handleSecondaryChange(index, "buttonLink", e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={addService}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mr-3"
      >
        + Add Service
      </button>

      <button
        onClick={handleSave}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
      >
        ✅ Save Changes
      </button>
    </div>
  );
};

export default AdminHireUs;
