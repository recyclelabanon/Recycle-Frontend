// src/admin/context/TeamContext.js
import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';

// Define the API URL - adjust as needed for your environment
const API_URL = import.meta.env.VITE_REACT_APP_URL || 'http://localhost:5000/api';

// Define the context
const TeamContext = createContext();

export const useTeamContext = () => useContext(TeamContext);

// Create a provider component
export const TeamProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch all team members from API
  const fetchTeams = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/teams`);
      const fetched = res.data.data.team || [];
      setTeams(fetched);
      const uniqueCats = [...new Set(fetched.map(member => member.category || 'General'))];
      setCategories(uniqueCats);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  }, []); // empty deps so it's stable
  
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);
  
  // Get a team member by ID
  const getTeamById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/teams/${id}`);
      return response.data.data;
    } catch (err) {
      setError(err.message || `Failed to fetch team member with ID: ${id}`);
      return null;
    }
  };
  
  // Get team members by category
  const getTeamsByCategory = async (category) => {
    if (!category || category === 'All') {
      return teams;
    }
    // In a real implementation, you might want to make an API call with a category filter
    return teams.filter(member => member.category === category);
  };
  
  // Add a new team member
  const addTeam = async (teamData) => {
    try {
      // Handle file upload if present
      let formData = null;
      
      if (teamData.profilePic instanceof File) {
        formData = new FormData();
        Object.entries(teamData).forEach(([key, value]) => {
          formData.append(key, value);
        });
      }
      
      const response = await axios.post(
        `${API_URL}/teams`, 
        formData || teamData,
        formData ? {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        } : {}
      );
      
      // Refresh teams after adding a new member
      fetchTeams();
      return response.data.data;
    } catch (err) {
      setError(err.message || 'Failed to add team member');
      throw err;
    }
  };
  
  // Update an existing team member
  const updateTeam = async (id, updatedTeam) => {
    try {
      // Handle file upload if present
      let formData = null;
      
      if (updatedTeam.profilePic instanceof File) {
        formData = new FormData();
        Object.entries(updatedTeam).forEach(([key, value]) => {
          formData.append(key, value);
        });
      }
      
      const response = await axios.patch(
        `${API_URL}/teams/${id}`, 
        formData || updatedTeam,
        formData ? {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        } : {}
      );
      
      // Update local state with the updated team member
      setTeams(prevTeams => 
        prevTeams.map(item => 
          item._id === id ? response.data.data : item
        )
      );
      
      // Update categories if needed
      const uniqueCategories = [...new Set(teams.map(item => item.category))];
      setCategories(uniqueCategories);
      
      return response.data.data;
    } catch (err) {
      setError(err.message || `Failed to update team member with ID: ${id}`);
      throw err;
    }
  };
  
  // Delete a team member
  const deleteTeam = async (id) => {
    try {
      await axios.delete(`${API_URL}/teams/${id}`);
      
      // Update local state by removing the deleted team member
      setTeams(prevTeams => prevTeams.filter(item => item._id !== id));
      
      // Update categories if needed
      const remainingTeams = teams.filter(item => item._id !== id);
      const uniqueCategories = [...new Set(remainingTeams.map(item => item.category))];
      setCategories(uniqueCategories);
      
      return true;
    } catch (err) {
      setError(err.message || `Failed to delete team member with ID: ${id}`);
      throw err;
    }
  };
  
  // Get team statistics for admin dashboard
  const getTeamStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/teams/admin/stats`);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch team statistics');
      return null;
    }
  };
  
  const value = {
    teams,
    categories,
    loading,
    error,
    getTeamById,
    getTeamsByCategory,
    addTeam,
    updateTeam,
    deleteTeam,
    getTeamStats,
    refreshTeams: fetchTeams
  };
  
  return (
    <TeamContext.Provider value={value}>
      {children}
    </TeamContext.Provider>
  );
};