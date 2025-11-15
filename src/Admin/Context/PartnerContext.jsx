import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const PartnerContext = createContext();

export const PartnerProvider = ({ children }) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5000/api/v1/partners";

  // ✅ Fetch All Partners
  const fetchPartners = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setPartners(res.data);
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add Partner
  const addPartner = async (formData) => {
    try {
      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPartners((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding partner:", error);
    }
  };

  // ✅ Update Partner
  const updatePartner = async (id, formData) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPartners((prev) => prev.map((p) => (p._id === id ? res.data : p)));
    } catch (error) {
      console.error("Error updating partner:", error);
    }
  };

  // ✅ Delete Partner
  const deletePartner = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPartners((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting partner:", error);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <PartnerContext.Provider
      value={{
        partners,
        loading,
        addPartner,
        updatePartner,
        deletePartner,
        fetchPartners,
      }}
    >
      {children}
    </PartnerContext.Provider>
  );
};

export const usePartnerContext = () => useContext(PartnerContext);
