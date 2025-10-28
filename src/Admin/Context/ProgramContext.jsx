import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProgramContext = createContext();

export const useProgramContext = () => useContext(ProgramContext);

export const ProgramProvider = ({ children }) => {
  const [programs, setPrograms] = useState([]);

  const fetchPrograms = async () => {
    try {
      const res = await axios.get('/api/programs');
      setPrograms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createProgram = async (data) => {
    const res = await axios.post('/api/programs', data);
    setPrograms([...programs, res.data]);
  };

  const updateProgram = async (id, data) => {
    const res = await axios.put(`/api/programs/${id}`, data);
    setPrograms(programs.map(p => p._id === id ? res.data : p));
  };

  const deleteProgram = async (id) => {
    await axios.delete(`/api/programs/${id}`);
    setPrograms(programs.filter(p => p._id !== id));
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <ProgramContext.Provider value={{ programs, fetchPrograms, createProgram, updateProgram, deleteProgram }}>
      {children}
    </ProgramContext.Provider>
  );
};
