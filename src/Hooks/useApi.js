import { useState } from "react";

// ✅ Automatically switch between local and deployed backend
const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1"
    : "https://recycle-backend-07zo.onrender.com/api/v1";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // 🔹 Core Request Function
  const sendRequest = async (endpoint, method = "GET", body = null, headers = {}) => {
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const config = {
        method,
        headers,
      };

      if (body) {
        config.body = body instanceof FormData ? body : JSON.stringify(body);
      }

      const url = endpoint.startsWith("http")
        ? endpoint
        : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

      const response = await fetch(url, config);

      let responseData = null;
      try {
        responseData = await response.json();
      } catch {
        console.warn("Response is not valid JSON");
      }

      if (!response.ok) {
        const message =
          (responseData && responseData.message) ||
          `Request failed with status ${response.status}`;
        throw new Error(message);
      }

      setSuccess(
        (responseData && responseData.message) || "Request completed successfully"
      );

      return responseData;
    } catch (err) {
      console.error("API Error:", err.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Newsletter API helpers
  const subscribeToNewsletter = async (email) => {
    return await sendRequest("/subscribe", "POST", { email });
  };

  const getAllSubscribers = async () => {
    return await sendRequest("/subscribe", "GET");
  };

  const deleteSubscriber = async (id) => {
    return await sendRequest(`/subscribe/${id}`, "DELETE");
  };

  return {
    sendRequest,
    subscribeToNewsletter,
    getAllSubscribers,
    deleteSubscriber,
    loading,
    error,
    success,
  };
};

export default useApi;
