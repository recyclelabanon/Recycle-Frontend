import { useState } from "react";
import { Heart } from "lucide-react";

const Donate = () => {
  const [donationType, setDonationType] = useState(null);
  const [amount, setAmount] = useState(50);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const predefinedAmounts = [25, 50, 100, 250, 500];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDonate = (e) => {
    e.preventDefault();
    if (!donationType || amount <= 0) {
      alert("Please select a donation type and enter a valid amount.");
      return;
    }

    // Normally, you could send this data to your backend to save the donation info
    console.log("Donation Submitted:", { donationType, amount, ...formData });

    setSuccess(true);
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
      {/* Donation Header Section */}
      <section className="py-12" style={{ backgroundColor: "#FFF9E6" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="h-12 w-12 text-yellow-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Seeds of change begin with you—plant them today.
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Only bank transfers are accepted. Please use the bank details below to make your donation. Every contribution grows our shared vision for a thriving planet.
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

      {/* Bank Transfer Form */}
      {donationType && (
        <section className="py-16 bg-gray-50">
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
                        className={`py-3 rounded-lg transition-colors ${amount === preset
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

                {/* Bank Details */}
                {/* Bank Details */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6 text-center text-yellow-600">
                    Bank Transfer Details
                  </h3>
                  <p className="text-center text-gray-600 mb-6">
                    <strong>Only bank transfers are accepted.</strong> After transferring, please email the receipt to <strong>donations@recyclelebanon.org</strong>
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    <div className="bg-yellow-50 p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                      <p className="text-gray-700"><span className="font-semibold">Bank Name:</span> ABC Bank</p>
                      <p className="text-gray-700"><span className="font-semibold">Account Name:</span> Recycle Lebanon</p>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                      <p className="text-gray-700"><span className="font-semibold">Account Number:</span> 1234567890</p>
                      <p className="text-gray-700"><span className="font-semibold">IBAN:</span> LB12ABCD1234567890</p>
                      <p className="text-gray-700"><span className="font-semibold">SWIFT Code:</span> ABCDLBBX</p>
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <p className="text-gray-500 italic">
                      Please make sure to include your name in the transfer notes.
                    </p>
                  </div>
                </div>


                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-yellow-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-yellow-700 transition-colors"
                >
                  Submit Donation Info
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
