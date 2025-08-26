import { useState } from "react";
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const sendRequest = async (url, method = 'GET', body = null, headers = {}) => {
    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const config = {
        method,
        headers: {
          ...headers,
        },
        body: body instanceof FormData ? body : JSON.stringify(body),
      };

      const response = await fetch(url, config);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Something went wrong");
      }

      setSuccess(responseData.message || "Request successful");
      return responseData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, error, success };
};

export default useApi;