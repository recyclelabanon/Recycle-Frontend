import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminInitiatives = () => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  // form state for new program
  const [form, setForm] = useState({
    title: '', logo: '', color: '#2726CC', cta: '', shortDescription: '', image: '', layout: 'right'
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('/api/initiatives');
        setPage(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleUpload = async (file) => {
    if (!file) return '';
    const fd = new FormData();
    fd.append('file', file);
    // optional: specify folder
    fd.append('folder', 'initiatives');
    const res = await axios.post('/api/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' }});
    return res.data.url;
  };

  const handleAdd = async () => {
    try {
      await axios.post('/api/v1/initiatives/programs', form);
      const res = await axios.get('/api/v1/initiatives');
      setPage(res.data);
      setForm({ title: '', logo: '', color: '#2726CC', cta: '', shortDescription: '', image: '', layout: 'right' });
    } catch (err) {
      console.error(err);
      alert('Add failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this program?')) return;
    try {
      await axios.delete(`/api/initiatives/programs/${id}`);
      const res = await axios.get('/api/initiatives');
      setPage(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await handleUpload(file);
    setForm(prev => ({ ...prev, [field]: url }));
  };

  const updatePageSettings = async () => {
    try {
      await axios.put('/api/initiatives/page', {
        pageTitle: page.pageTitle,
        pageSubtitle: page.pageSubtitle,
        backgroundImage: page.backgroundImage
      });
      alert('Page updated');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">Initiatives — Admin</h2>

      <section className="bg-white rounded p-4 shadow">
        <h3 className="font-semibold">Page Settings</h3>
        <div className="mt-3 space-y-3">
          <input value={page.pageTitle} onChange={e => setPage({...page, pageTitle: e.target.value})} className="w-full border p-2 rounded" />
          <input value={page.pageSubtitle} onChange={e => setPage({...page, pageSubtitle: e.target.value})} className="w-full border p-2 rounded" />
          <div>
            <input type="file" onChange={async (e) => {
              const file = e.target.files?.[0]; if (!file) return;
              const url = await handleUpload(file);
              setPage({...page, backgroundImage: url});
            }} />
            {page.backgroundImage && <img src={page.backgroundImage} className="mt-2 w-48 h-24 object-cover rounded" alt="bg" />}
          </div>
          <button onClick={updatePageSettings} className="btn-primary mt-2">Save page settings</button>
        </div>
      </section>

      <section className="bg-white rounded p-4 shadow">
        <h3 className="font-semibold">Add Program</h3>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="border p-2 rounded" />
          <input placeholder="CTA" value={form.cta} onChange={e => setForm({...form, cta: e.target.value})} className="border p-2 rounded" />
          <input placeholder="Color" value={form.color} onChange={e => setForm({...form, color: e.target.value})} className="border p-2 rounded" />
          <select value={form.layout} onChange={e => setForm({...form, layout: e.target.value})} className="border p-2 rounded">
            <option value="right">Right</option>
            <option value="left">Left</option>
          </select>
          <textarea placeholder="Short description" value={form.shortDescription} onChange={e => setForm({...form, shortDescription: e.target.value})} className="border p-2 rounded col-span-1 md:col-span-2" />
          <div>
            <label className="block">Logo</label>
            <input type="file" onChange={(e) => handleFileChange(e, 'logo')} />
            {form.logo && <img src={form.logo} className="mt-2 w-28 h-14 object-contain" alt="logo" />}
          </div>
          <div>
            <label className="block">Hero image</label>
            <input type="file" onChange={(e) => handleFileChange(e, 'image')} />
            {form.image && <img src={form.image} className="mt-2 w-48 h-24 object-cover" alt="img" />}
          </div>
        </div>
        <div className="mt-4">
          <button onClick={handleAdd} className="btn-primary">Add Program</button>
        </div>
      </section>

      <section className="bg-white rounded p-4 shadow">
        <h3 className="font-semibold">Existing Programs</h3>
        <div className="mt-3 space-y-3">
          {page.programs.map(p => (
            <div key={p._id} className="flex items-center justify-between border rounded p-3">
              <div className="flex items-center gap-3">
                <img src={p.logo} className="w-12 h-12 object-contain rounded" alt="logo" />
                <div>
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-gray-500">{p.shortDescription?.slice(0, 80)}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => {
                  // quick edit: populate form
                  setForm({
                    title: p.title, logo: p.logo, color: p.color || '#2726CC', cta: p.cta, shortDescription: p.shortDescription, image: p.image, layout: p.layout
                  });
                }} className="btn-secondary">Load</button>
                <button onClick={() => handleDelete(p._id)} className="btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminInitiatives;
