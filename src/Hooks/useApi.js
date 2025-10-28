import { useState } from "react";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const sendRequest = async (url, method = "GET", body = null, headers = {}) => {
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

      const response = await fetch(url, config);

      // Try to safely parse JSON
      let responseData = null;
      try {
        responseData = await response.json();
      } catch (parseError) {
        console.warn("Response is not valid JSON:", parseError);
      }

      // Handle error responses gracefully
      if (!response.ok) {
        const errorMessage =
          (responseData && responseData.message) ||
          `Request failed with status ${response.status}`;
        throw new Error(errorMessage);
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

  return { sendRequest, loading, error, success };
};

export default useApi;
