import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Signup
  const signup = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "resume" && data.resume?.length > 0) {
          formData.append("resume", data.resume[0]);
        } else {
          formData.append(key, data[key]);
        }
      });

      const res = await fetch("http://localhost:8000/signup", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Signup failed");
      }
      return true;
    } catch (error) {
      throw error;
    }
  };

  // Login
  const login = async ({ email, password }) => {
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Login failed");
      }

      const data = await res.json();
      setUser(data.user);
      setToken(data.access_token);
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("token", data.access_token);
      return data.user;
    } catch (error) {
      throw error;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
