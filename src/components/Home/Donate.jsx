import { useState } from "react";
import { Heart } from "lucide-react";
import useApi from "../../Hooks/useApi.js";

const Donate = () => {
  const { sendRequest, loading, error, success } = useApi();
  const [donationType, setDonationType] = useState(null);
  const [amount, setAmount] = useState(50);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const predefinedAmounts = [25, 50, 100, 250, 500];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!donationType || amount <= 0) {
      alert("Please select a donation type and enter a valid amount.");
      return;
    }

    const donationData = {
      donationType,
      amount,
      ...formData,
    };

    try {
      await sendRequest(
        "https://recyclelabanonweb.onrender.com/api/donation",
        "POST",
        donationData
      );

      setDonationType(null);
      setAmount(50);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      error.response && alert(error.response.data.message);
    }
  };

  if (success) {
    return (
      <div className="bg-gray-50 flex items-center justify-center py-16">
        <div className="max-w-md w-full mx-4 bg-white rounded-xl shadow-lg p-8 text-center">
          <Heart className="h-12 w-12 text-yellow-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">
            Thank You for Your Support!
          </h2>
          <p className="text-gray-600 mb-6">
            Your donation of ${amount} has been received successfully.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Make Another Donation
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Donation Header Section (Under Carousel) */}
      <section
        className="py-12"
        style={{ backgroundColor: "#FFF9E6" }} // yellow-tinted background
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="h-12 w-12 text-yellow-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Seeds of change begin with you—plant them today.
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Seed a one-time gift or nurture monthly blooms to cultivate impact.
              Every contribution grows our shared vision for a collective future
              and thriving planet.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
                onClick={() => setDonationType("one-time")}
              >
                One-time Donation
              </button>
              <button
                className="border border-yellow-600 text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-colors"
                onClick={() => setDonationType("monthly")}
              >
                Monthly Donation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      {donationType && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Personal Info */}
              <form onSubmit={handleDonate}>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <textarea
                      name="message"
                      placeholder="Optional Message (e.g. dedication note)"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Select Amount</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {predefinedAmounts.map((preset) => (
                      <button
                        type="button"
                        key={preset}
                        className={`py-3 rounded-lg transition-colors ${
                          amount === preset
                            ? "bg-yellow-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        onClick={() => setAmount(preset)}
                      >
                        ${preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Custom Amount</h3>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      min="1"
                      required
                    />
                  </div>
                </div>

                {error && <div className="mb-4 text-red-600">{error}</div>}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-yellow-700 transition-colors disabled:opacity-50"
                >
                  {loading
                    ? "Processing..."
                    : `Donate $${amount} ${
                        donationType === "monthly" ? "Monthly" : "Now"
                      }`}
                </button>

                <p className="text-center text-gray-500 mt-4">
                  Your donation is tax-deductible to the extent allowed by law.
                </p>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Donate;
