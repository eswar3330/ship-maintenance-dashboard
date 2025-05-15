import React, { createContext, useState } from 'react';

export const ComponentsContext = createContext();

export function ComponentsProvider({ children }) {
  const [components, setComponents] = useState([
    { id: 1, name: 'Engine', lastMaintenanceDate: '2024-01-01' },
    { id: 2, name: 'Radar', lastMaintenanceDate: '2023-10-01' },
  ]);

  return (
    <ComponentsContext.Provider value={{ components, setComponents }}>
      {children}
    </ComponentsContext.Provider>
  );
}
