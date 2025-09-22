import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import useApi from '../../Hooks/useApi.js';

const RECYCLE_LEBANON_BLUE = "#2726CC";

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { sendRequest, loading } = useApi();
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest("https://recyclelabanonweb.onrender.com/api/subscribe", "POST", { email });
      setSuccessMessage("You have subscribed successfully! 🎉");
      setEmail(""); 
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccessMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: RECYCLE_LEBANON_BLUE }}
          >
            Receive whispers of change
          </h2>
          <p className="text-gray-600 mb-8">
            Join our journey and receive reflections of our environmental impact.
          </p>

          {successMessage && (
            <div
              className="mb-4 p-4 border rounded-lg flex items-center justify-center"
              style={{
                color: RECYCLE_LEBANON_BLUE,
                borderColor: RECYCLE_LEBANON_BLUE,
                backgroundColor: `${RECYCLE_LEBANON_BLUE}20`, // 20% opacity
              }}
            >
              <CheckCircle className="w-6 h-6 mr-2" />
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border focus:outline-none"
              style={{
                borderColor: RECYCLE_LEBANON_BLUE,
                backgroundColor: "#ffffff",
                color: RECYCLE_LEBANON_BLUE,
              }}
              required
              disabled={loading}
            />

            <button
              type="submit"
              className="px-8 py-3 rounded-lg flex items-center justify-center text-white transition-colors"
              style={{
                backgroundColor: RECYCLE_LEBANON_BLUE,
              }}
              disabled={loading}
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
              {!loading && <Send className="ml-2 h-5 w-5" />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
