import { useState, useEffect } from "react";
import { useTeamContext } from "../Context/TeamContext";

const TeamAdmin = () => {
  const { teams, addTeam, updateTeam, deleteTeam, refreshTeams } = useTeamContext();
  const [form, setForm] = useState({
    fullName: "",
    position: "",
    email: "",
    linkedin: "",
    category: "core",
    profilePic: null,
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    refreshTeams();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "profilePic") {
      setForm({ ...form, profilePic: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    if (editId) {
      await updateTeam(editId, formData);
      setEditId(null);
    } else {
      await addTeam(formData);
    }

    setForm({
      fullName: "",
      position: "",
      email: "",
      linkedin: "",
      category: "core",
      profilePic: null,
    });
  };

  const handleEdit = (team) => {
    setEditId(team._id);
    setForm({
      fullName: team.fullName,
      position: team.position,
      email: team.email,
      linkedin: team.linkedin,
      category: team.category,
      profilePic: null,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{editId ? "Edit Team Member" : "Add Team Member"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="border p-2 w-full" required />
        <input name="position" value={form.position} onChange={handleChange} placeholder="Position" className="border p-2 w-full" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 w-full" />
        <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn URL" className="border p-2 w-full" />
        <select name="category" value={form.category} onChange={handleChange} className="border p-2 w-full">
          <option value="core">Core Team</option>
          <option value="advisory">Advisory Board</option>
          <option value="board">Board Members</option>
        </select>
        <input type="file" name="profilePic" onChange={handleChange} className="border p-2 w-full" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Team Members</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {teams.map((t) => (
            <div key={t._id} className="border p-4 rounded shadow">
              <img src={t.profilePic} alt={t.fullName} className="h-32 w-full object-cover rounded" />
              <h4 className="font-semibold mt-2">{t.fullName}</h4>
              <p className="text-gray-600">{t.position}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleEdit(t)} className="bg-yellow-400 px-3 py-1 rounded">Edit</button>
                <button onClick={() => deleteTeam(t._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamAdmin;
