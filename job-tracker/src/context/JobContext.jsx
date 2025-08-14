import React, { createContext, useState } from 'react';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  const addJob = (newJob) => {
    setJobs((prev) => [...prev, newJob]);
  };

  return (
    <JobContext.Provider value={{ jobs, addJob }}>
      {children}
    </JobContext.Provider>
  );
};
