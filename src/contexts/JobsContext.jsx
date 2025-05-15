import React, { createContext, useState } from 'react';

export const JobsContext = createContext();

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([
    { id: 1, status: 'Open' },
    { id: 2, status: 'In Progress' },
    { id: 3, status: 'Completed' },
  ]);

  return (
    <JobsContext.Provider value={{ jobs, setJobs }}>
      {children}
    </JobsContext.Provider>
  );
}
