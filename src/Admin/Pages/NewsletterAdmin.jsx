import { useEffect, useState } from "react";
import { Trash2, RefreshCcw } from "lucide-react";
import useApi from "../../Hooks/useApi";

const BRAND_BLUE = "#2726CC";

const NewsletterAdmin = () => {
  const [subscribers, setSubscribers] = useState([]);
  const { sendRequest, loading, error } = useApi();

  // ✅ Fetch all subscribers
  const fetchSubscribers = async () => {
    try {
      const response = await sendRequest(
        "https://recyclelabanonweb.onrender.com/api/newsletter",
        "GET"
      );
      setSubscribers(response || []);
    } catch (err) {
      console.error("Failed to fetch subscribers:", err);
    }
  };

  // ✅ Delete subscriber by ID
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subscriber?")) return;
    try {
      await sendRequest(
        `https://recyclelabanonweb.onrender.com/api/newsletter/${id}`,
        "DELETE"
      );
      setSubscribers(subscribers.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Failed to delete subscriber:", err);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6" style={{ color: BRAND_BLUE }}>
        Newsletter Subscribers
      </h1>

      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">Total Subscribers: {subscribers.length}</p>
        <button
          onClick={fetchSubscribers}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          <RefreshCcw size={16} />
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error loading subscribers</p>
      ) : subscribers.length === 0 ? (
        <p className="text-gray-500">No subscribers yet.</p>
      ) : (
        <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Date Subscribed</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber, index) => (
              <tr key={subscriber._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{subscriber.email}</td>
                <td className="p-3">
                  {new Date(subscriber.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(subscriber._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NewsletterAdmin;
