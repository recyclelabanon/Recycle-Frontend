import { useEffect, useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import axios from "axios";

const RECYCLE_LEBANON_BLUE = "#2726CC";

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [settings, setSettings] = useState({ title: "", subtitle: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchSettings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/newsletter/settings");
      setSettings(res.data);
    } catch (err) {
      console.error("Error fetching newsletter settings:", err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/v1/newsletter/subscribe", { email });
      setMessage("Subscribed successfully 🎉");
      setEmail("");
    } catch {
      setMessage("Something went wrong");
    }

    setLoading(false);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6" style={{ color: RECYCLE_LEBANON_BLUE }}>
          {settings.title || "Receive whispers of change"}
        </h2>
        <p className="text-gray-600 mb-8">
          {settings.subtitle || "Join our journey..."}
        </p>

        {message && (
          <div className="mb-4 p-4 border rounded-lg flex items-center justify-center"
            style={{ color: RECYCLE_LEBANON_BLUE, borderColor: RECYCLE_LEBANON_BLUE }}>
            <CheckCircle className="w-6 h-6 mr-2" />{message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 justify-center">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full md:w-1/3 px-4 py-2.5 border border-[#2726CC] rounded-lg focus:outline-none"
            required
          />

          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg text-white font-medium flex items-center justify-center shadow-sm"
            style={{ backgroundColor: RECYCLE_LEBANON_BLUE }}
            disabled={loading}
          >
            {loading ? "..." : "Subscribe"}
            {!loading && <Send className="ml-2 w-4 h-4" />}
          </button>
        </form>

      </div>
    </section>
  );
};

export default Newsletter;
