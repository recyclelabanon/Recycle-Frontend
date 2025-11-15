import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000/api/v1/team";

  const refreshTeams = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setTeams(res.data);
    } catch (err) {
      console.error("Error fetching teams:", err);
      setError("Failed to load teams");
    } finally {
      setLoading(false);
    }
  };

  const addTeam = async (formData) => {
    try {
      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTeams((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding team:", err);
      setError("Failed to add team");
    }
  };

  const updateTeam = async (id, formData) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTeams((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Error updating team:", err);
      setError("Failed to update team");
    }
  };

  const deleteTeam = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTeams((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting team:", err);
      setError("Failed to delete team");
    }
  };

  useEffect(() => {
    refreshTeams();
  }, []);

  return (
    <TeamContext.Provider
      value={{
        teams,
        loading,
        error,
        refreshTeams,
        addTeam,
        updateTeam,
        deleteTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => useContext(TeamContext);
