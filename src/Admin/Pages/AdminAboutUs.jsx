import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminAboutUs = () => {
  const [about, setAbout] = useState({
    hero: { title: "", subtitle: "", background: {} },
    sections: [],
  });
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState({});
  const [exists, setExists] = useState(false); // track if document exists

  // Fetch current AboutUs data
  const fetchAboutUs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/aboutus");
      if (res.data.data) {
        setAbout(res.data.data);
        setExists(true);
      } else {
        setExists(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load About Us data");
      setExists(false);
    }
  };

  useEffect(() => {
    fetchAboutUs();
  }, []);

  // Handle text updates
  const handleChange = (section, field, value) => {
    if (section) {
      setAbout((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    } else {
      setAbout((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Handle section field change, including image position
  const handleSectionChange = (index, field, value) => {
    const updated = [...(about.sections || [])];

    if (field === "image" && typeof value === "object") {
      updated[index].image = { ...updated[index].image, ...value };
    } else if (field === "position") {
      updated[index].image = { ...(updated[index].image || {}), position: value };
    } else {
      updated[index][field] = value;
    }

    setAbout((prev) => ({ ...prev, sections: updated }));
  };

  // Handle image file selection
  const handleFileChange = (key, file) => {
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  // Add new section dynamically
  const handleAddSection = () => {
    const newSection = {
      key: `section_${Date.now()}`,
      title: "",
      contentHtml: "",
      image: { position: "right" }, // default right
    };
    setAbout((prev) => ({
      ...prev,
      sections: [...(prev.sections || []), newSection],
    }));
  };

  // Submit form (handles both create + update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // send hero as a JSON string
      formData.append("hero", JSON.stringify(about.hero || {}));

      // sections
      formData.append("sections", JSON.stringify(about.sections || []));

      // hero background image
      if (files.heroBackground)
        formData.append("heroBackground", files.heroBackground);

      // section images
      (about.sections || []).forEach((sec) => {
        if (files[`sectionImage_${sec.key}`])
          formData.append(`sectionImage_${sec.key}`, files[`sectionImage_${sec.key}`]);
      });

      const endpoint = exists
        ? "http://localhost:5000/api/v1/aboutus"
        : "http://localhost:5000/api/v1/aboutus/create";
      const method = exists ? "put" : "post";

      const res = await axios[method](endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(exists ? "About Us updated successfully!" : "About Us created!");
      setAbout(res.data.data);
      setExists(true);
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    } finally {
      setLoading(false);
    }
  };

  if (!about) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-md space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">Admin: About Us</h1>

      {/* Hero Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">Hero Section</h2>
        <input
          type="text"
          placeholder="Hero Title"
          value={about.hero?.title || ""}
          onChange={(e) => handleChange("hero", "title", e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Hero Subtitle"
          value={about.hero?.subtitle || ""}
          onChange={(e) => handleChange("hero", "subtitle", e.target.value)}
          className="w-full border p-2 rounded"
        />
        <label className="block font-medium">Hero Background Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange("heroBackground", e.target.files[0])}
        />
        {about.hero?.background?.url && (
          <img
            src={about.hero.background.url}
            alt="hero"
            className="w-full h-48 object-cover rounded-md mt-2"
          />
        )}
      </section>

      {/* Sections */}
      <section>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold border-b pb-2 mb-3">
            Content Sections
          </h2>
          <button
            onClick={handleAddSection}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            + Add Section
          </button>
        </div>

        {(about.sections || []).map((sec, index) => (
          <div key={sec.key} className="border p-4 rounded-md mb-4 bg-gray-50">
            <h3 className="font-semibold mb-2">{sec.title || sec.key}</h3>

            {/* Flex container for image + content */}
            <div
              className={`flex flex-col md:gap-4 ${
                sec.image?.position === "left" ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <label className="block font-medium">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(`sectionImage_${sec.key}`, e.target.files[0])
                  }
                />
                {sec.image?.url && (
                  <img
                    src={sec.image.url}
                    alt={sec.title}
                    className="w-full h-48 object-cover rounded-md mt-2"
                  />
                )}
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Section Title"
                  value={sec.title}
                  onChange={(e) =>
                    handleSectionChange(index, "title", e.target.value)
                  }
                  className="w-full border p-2 rounded mb-2"
                />
                <textarea
                  placeholder="Section Content (HTML allowed)"
                  value={sec.contentHtml}
                  onChange={(e) =>
                    handleSectionChange(index, "contentHtml", e.target.value)
                  }
                  className="w-full border p-2 rounded h-28"
                />
              </div>
            </div>

           
          </div>
        ))}
      </section>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Saving..." : exists ? "Update About Us" : "Create About Us"}
      </button>
    </div>
  );
};

export default AdminAboutUs;
