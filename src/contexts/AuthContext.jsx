import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const mockUsers = [
  { id: '1', role: 'Admin', email: 'admin@entnt.in', password: 'admin123' },
  { id: '2', role: 'Inspector', email: 'inspector@entnt.in', password: 'inspect123' },
  { id: '3', role: 'Engineer', email: 'engineer@entnt.in', password: 'engine123' },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session) setUser(session);
  }, []);

  const login = (email, password) => {
    const found = mockUsers.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      localStorage.setItem('session', JSON.stringify(found));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('session');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
