import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const apiKey = "YOUR_BREVO_API_KEY"; // ⚠️ Keep this secret!
    const listId = 2; // Replace with your Brevo list ID

    try {
      const response = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": apiKey,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          listIds: [listId],
        }),
      });

      if (response.ok) {
        setStatus("✅ Subscribed successfully!");
        setEmail("");
      } else {
        const errorData = await response.json();
        setStatus(`❌ Error: ${errorData.message}`);
      }
    } catch (err) {
      setStatus("❌ Network error");
    }
  };

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-3">Subscribe to our Newsletter</h2>
      <form onSubmit={handleSubscribe}>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="p-2 border rounded w-full mb-3 text-black"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Subscribe
        </button>
      </form>
      <p className="mt-3 text-sm">{status}</p>
    </div>
  );
};

export default Newsletter;
