"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isLoggedOut: boolean;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedOut: true,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedOut, setIsLoggedOut] = useState(true);

  useEffect(() => {
    // Check localStorage for login state
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedOut(!loggedIn);
  }, []);

  const login = () => {
    setIsLoggedOut(false);
    localStorage.setItem("isLoggedIn", "true"); // Persist login state
  };

  const logout = () => {
    setIsLoggedOut(true);
    localStorage.removeItem("isLoggedIn"); // Clear login state
  };

  const isLoggedIn = !isLoggedOut;

  return (
    <AuthContext.Provider value={{ isLoggedOut, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);