import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Verifica se há um token no localStorage ao carregar a página
    const token = localStorage.getItem("token");
    setIsValid(!!token); // Define isValid com base na existência do token
  }, []);

  const login = (token) => {
    // Armazena o token no localStorage
    localStorage.setItem("token", token);
    setIsValid(true);
  };

  return (
    <AuthContext.Provider value={{ isValid, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
