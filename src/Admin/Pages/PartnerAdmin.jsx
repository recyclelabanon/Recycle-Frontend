import React, { useState, useEffect } from "react";
import { usePartnerContext } from "../Context/PartnerContext";

const PartnerAdmin = () => {
  const { partners, addPartner, updatePartner, deletePartner, fetchPartners } =
    usePartnerContext();

  const [form, setForm] = useState({
    name: "",
    description: "",
    website: "",
    logo: null,
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") setForm({ ...form, logo: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    await addPartner(formData);
    setForm({ name: "", description: "", website: "", logo: null });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Partner Management</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md bg-gray-100 p-4 rounded"
      >
        <input
          name="name"
          placeholder="Partner Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="website"
          placeholder="Website URL"
          value={form.website}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input type="file" name="logo" onChange={handleChange} />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Partner
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-8 mb-4">All Partners</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {partners.map((p) => (
          <div key={p._id} className="bg-white shadow p-4 rounded">
            {p.logo && (
              <img
                src={p.logo}
                alt={p.name}
                className="w-full h-32 object-contain mb-3"
              />
            )}
            <h4 className="font-bold">{p.name}</h4>
            <p className="text-gray-600 text-sm">{p.description}</p>
            {p.website && (
              <a
                href={p.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm hover:underline"
              >
                Visit Site
              </a>
            )}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => deletePartner(p._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerAdmin;
