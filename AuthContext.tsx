"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isLoggedOut: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedOut, setIsLoggedOut] = useState(true);

  useEffect(() => {
    
    const token = localStorage.getItem("userToken");
    setIsLoggedOut(!token); 
  }, []);

  const login = () => {
    localStorage.setItem("userToken", "dummyToken"); 
    setIsLoggedOut(false);
  };

  const logout = () => {
    localStorage.removeItem("userToken"); 
    setIsLoggedOut(true);
  };

  return (
    <AuthContext.Provider value={{ isLoggedOut, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);