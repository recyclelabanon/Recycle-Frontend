import { useState } from "react";
import { Sprout } from "lucide-react"; // icon representing seed/tree/root
import useApi from "../../Hooks/useApi.js";

const BRAND_BLUE = "#2726CC";

const Donate = () => {
  const { sendRequest, loading, error, success } = useApi();
  const [donationType, setDonationType] = useState(null);
  const [amount, setAmount] = useState(100);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    anonymous: false,
    seedName: "",
    supportSection: "",
  });

  const predefinedAmounts = [25, 50, 100, 250, 500];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
      setAmount(100);
      setFormData({
        name: "",
        email: "",
        message: "",
        anonymous: false,
        seedName: "",
        supportSection: "",
      });
    } catch (error) {
      error.response && alert(error.response.data.message);
    }
  };

  if (success) {
    return (
      <div className="bg-gray-50 flex items-center justify-center py-16">
        <div className="max-w-md w-full mx-4 bg-white rounded-xl shadow-lg p-8 text-center">
          <Sprout className="h-12 w-12 mx-auto mb-6" style={{ color: BRAND_BLUE }} />
          <h2 className="text-2xl font-bold mb-4">
            Thank You for Your Support!
          </h2>
          <p className="text-gray-600 mb-6">
            Your donation of ${amount} has been received successfully.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-white px-6 py-3 rounded-lg transition-colors"
            style={{ backgroundColor: BRAND_BLUE }}
          >
            Make Another Donation
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Donation Header Section */}
      <section className="py-10" style={{ backgroundColor: "#F5F6FF" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Sprout className="h-12 w-12 mx-auto mb-6" style={{ color: BRAND_BLUE }} />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Seeds of change begin with you – plant them today.
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Seed a one-time gift or nurture monthly blooms to cultivate impact.
              <br />
              Every contribution grows our shared vision for a collective future
              and thriving planet.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "One-time Donation", value: "one-time" },
                { label: "Monthly Donation", value: "monthly" },
                { label: "Bank Transfer", value: "bank-transfer" },
              ].map((btn) => (
                <button
                  key={btn.value}
                  className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                    donationType === btn.value
                      ? "text-white"
                      : "bg-transparent text-gray-700"
                  }`}
                  style={
                    donationType === btn.value
                      ? { backgroundColor: BRAND_BLUE }
                      : { border: `2px solid ${BRAND_BLUE}` }
                  }
                  onClick={() => setDonationType(btn.value)}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bank Transfer Section */}
      {donationType === "bank-transfer" && (
        <section className="py-10 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold mb-4 text-center">
                Bank Transfer Details
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                You can support us by making a direct bank transfer using the details below.
              </p>

              <div className="bg-gray-100 rounded-lg p-6 space-y-3 text-left">
                <p><strong>Bank Name:</strong> Example Bank</p>
                <p><strong>Account Name:</strong> Recycle Lebanon NGO</p>
                <p><strong>Account Number:</strong> 1234567890</p>
                <p><strong>SWIFT Code:</strong> EXAMP123</p>
                <p><strong>IBAN:</strong> LB12 3456 7890 1234 5678 9012 34</p>
              </div>

              <p className="text-gray-500 mt-6 text-sm text-center">
                Please include your full name as a reference so we can acknowledge your donation.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Donation Form */}
      {(donationType === "one-time" || donationType === "monthly") && (
        <section className="py-10 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleDonate}>
                {/* Personal Info */}
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
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent"
                    />
                    <textarea
                      name="message"
                      placeholder="Optional Message (e.g. dedication note)"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent"
                      rows="3"
                    ></textarea>

                    {/* Anonymous Donation Option */}
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="anonymous"
                        checked={formData.anonymous}
                        onChange={handleChange}
                      />
                      <span>Donate anonymously</span>
                    </label>
                  </div>
                </div>

                {/* Plant a Seed Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Plant a seed in your name</h3>
                  <input
                    type="text"
                    name="seedName"
                    placeholder="Write a plant or tree name (optional)"
                    value={formData.seedName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent"
                  />
                </div>

                {/* Support Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Support for</h3>
                  <select
                    name="supportSection"
                    value={formData.supportSection}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg"
                  >
                    <option value="">Select a section</option>
                    <option>Recycle Lebanon</option>
                    <option>TerraPods</option>
                    <option>EcoSouk</option>
                    <option>Regenerate Hub</option>
                    <option>Dive Into Action</option>
                  </select>
                </div>

                {/* Amount Selection */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Select Amount</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {predefinedAmounts.map((preset) => (
                      <button
                        type="button"
                        key={preset}
                        className={`py-3 rounded-lg transition-colors ${
                          amount === preset
                            ? "text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        style={
                          amount === preset
                            ? { backgroundColor: BRAND_BLUE }
                            : {}
                        }
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
                      className="w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent"
                      min="1"
                      required
                    />
                  </div>
                </div>

                {error && <div className="mb-4 text-red-600">{error}</div>}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white py-4 rounded-lg text-lg font-semibold transition-colors disabled:opacity-50"
                  style={{ backgroundColor: BRAND_BLUE }}
                >
                  {loading
                    ? "Processing..."
                    : `Donate $${amount} ${
                        donationType === "monthly" ? "Monthly" : "Now"
                      }`}
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Donate;
