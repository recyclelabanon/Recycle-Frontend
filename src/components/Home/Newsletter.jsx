import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import useApi from '../../Hooks/useApi.js';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { sendRequest, loading } = useApi();
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest("https://recyclelabanonweb.onrender.com/api/subscribe", "POST", { email });
      setSuccessMessage("You have subscribed successfully! 🎉");
      setEmail(""); // Clear form after submission
      setTimeout(() => {
        setSuccessMessage(""); // Clear the success message after 3 seconds
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccessMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-yellow-100 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Receive whispers of change</h2>
          <p className="text-gray-600 mb-8">
            Join our journey and receive reflections of our environmental impact.
          </p>
          {successMessage && (
            <div className="mb-4 p-4 text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-lg flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-yellow-700" />
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg flex items-center justify-center transition-colors"
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
