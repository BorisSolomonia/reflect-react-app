// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    user: null,
  });

  const login = (token, user) => {
    setAuthState({ token, isAuthenticated: true, user });
    localStorage.setItem('token', token);
    console.log('Token set in localStorage:', token); // Debugging line
  };

  const logout = () => {
    setAuthState({ token: null, isAuthenticated: false, user: null });
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setAuthState(prevState => ({
        ...prevState,
        token: storedToken,
        isAuthenticated: true,
      }));
      console.log('Token retrieved from localStorage:', storedToken); // Debugging line
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
