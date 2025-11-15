// AdminFooterSettings.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Save, Image as ImageIcon } from "lucide-react";

const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1"
    : "https://your-production-backend.com/api/v1";

const AdminFooterSettings = () => {
  const [form, setForm] = useState({
    supportTitle: "",
    supportSubtitle: "",
    donateLabel: "",
    shopLabel: "",
    contactTitle: "",
    address: "",
    contactEmail: "",
    contactPhone: "",
    copyrightText: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [linkedinFile, setLinkedinFile] = useState(null);
  const [previewLogo, setPreviewLogo] = useState("");
  const [previewLinkedin, setPreviewLinkedin] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${API_BASE}/footer`);
      setForm({
        supportTitle: res.data.supportTitle,
        supportSubtitle: res.data.supportSubtitle,
        donateLabel: res.data.donateLabel,
        shopLabel: res.data.shopLabel,
        contactTitle: res.data.contactTitle,
        address: res.data.address,
        contactEmail: res.data.contactEmail,
        contactPhone: res.data.contactPhone,
        copyrightText: res.data.copyrightText,
      });
      setPreviewLogo(res.data.logoUrl || "");
      setPreviewLinkedin(res.data.linkedinIconUrl || "");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e, setter, previewSetter) => {
    const f = e.target.files[0];
    setter(f);
    if (f) previewSetter(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.keys(form).forEach((k) => fd.append(k, form[k] ?? ""));
      if (logoFile) fd.append("logo", logoFile);
      if (linkedinFile) fd.append("linkedinIcon", linkedinFile);

      const res = await axios.put(`${API_BASE}/footer`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      // update previews/values
      setPreviewLogo(res.data.logoUrl || previewLogo);
      setPreviewLinkedin(res.data.linkedinIconUrl || previewLinkedin);
    } catch (err) {
      console.error("Save footer error:", err);
      alert("Error saving footer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Footer Settings</h2>

      {saved && <div className="mb-3 p-2 border rounded text-green-700">Saved ✓</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Support Title</label>
          <input name="supportTitle" value={form.supportTitle} onChange={handleChange}
            className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium mb-1">Support Subtitle</label>
          <textarea name="supportSubtitle" value={form.supportSubtitle} onChange={handleChange}
            className="w-full p-2 border rounded" rows="3" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Donate Button Label</label>
            <input name="donateLabel" value={form.donateLabel} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-medium mb-1">Shop Button Label</label>
            <input name="shopLabel" value={form.shopLabel} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
        </div>

        <h3 className="font-semibold mt-4">Contact Block</h3>
        <div>
          <label className="block font-medium mb-1">Contact Title</label>
          <input name="contactTitle" value={form.contactTitle} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium mb-1">Address</label>
          <input name="address" value={form.address} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input name="contactEmail" value={form.contactEmail} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="contactPhone" value={form.contactPhone} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium mb-1">Copyright Text</label>
          <input name="copyrightText" value={form.copyrightText} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <h3 className="font-semibold mt-4">Branding</h3>
        <div className="grid grid-cols-2 gap-4 items-start">
          <div>
            <label className="block mb-1 font-medium">Logo (PNG/JPG)</label>
            <input type="file" accept="image/*" onChange={(e) => handleFile(e, setLogoFile, setPreviewLogo)} />
            {previewLogo && <img src={previewLogo} alt="logo" className="mt-2 h-14 object-contain" />}
          </div>

          <div>
            <label className="block mb-1 font-medium">LinkedIn Icon (optional)</label>
            <input type="file" accept="image/*" onChange={(e) => handleFile(e, setLinkedinFile, setPreviewLinkedin)} />
            {previewLinkedin && <img src={previewLinkedin} alt="linkedin" className="mt-2 h-10 w-10 object-contain rounded" />}
          </div>
        </div>

        <div className="pt-3">
          <button type="submit" disabled={loading} className="inline-flex items-center px-4 py-2 bg-blue-700 text-white rounded">
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminFooterSettings;
