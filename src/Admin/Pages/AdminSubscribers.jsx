import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

const API = "http://localhost:5000/api/v1/newsletter";

const AdminSubscribers = () => {
  const [subs, setSubs] = useState([]);

  const fetchSubs = async () => {
    const res = await axios.get(`${API}/subscribers`);
    setSubs(res.data);
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  const deleteSubscriber = async (id) => {
    if (!window.confirm("Delete this subscriber?")) return;
    await axios.delete(`${API}/subscribers/${id}`);
    fetchSubs();
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Newsletter Subscribers</h1>

      {subs.length === 0 ? (
        <p className="text-gray-500">No subscribers yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg overflow-hidden">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Subscribed On</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s._id} className="border-b">
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => deleteSubscriber(s._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminSubscribers;
