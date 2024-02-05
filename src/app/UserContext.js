"use client"

import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userp, setUserP] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };
  const userData = (userpdata) => {
    setUserP(userpdata);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, userData,userp }}>
      {children}
    </UserContext.Provider>
  );
};
