import React, { createContext, useState } from 'react';

export const ShipsContext = createContext();

export function ShipsProvider({ children }) {
  // Sample ships data
  const [ships, setShips] = useState([
    { id: 1, name: 'Ship A' },
    { id: 2, name: 'Ship B' },
  ]);

  return (
    <ShipsContext.Provider value={{ ships, setShips }}>
      {children}
    </ShipsContext.Provider>
  );
}
