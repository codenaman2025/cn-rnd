import React from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const signup = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.email === data.email);

    if (exists) {
      throw new Error("User already exists");
    }

    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
  };

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
  
    if (!foundUser) {
      throw new Error("Invalid credentials");
    }
  
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    setUser(foundUser);
   
    return foundUser;
  };
  

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider


