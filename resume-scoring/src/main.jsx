import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import JobProvider from "./auth/JobsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <JobProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </JobProvider>
    </BrowserRouter>
  </StrictMode>
);
