import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Landing from "./pages/Landing";
import Apply from "./pages/Apply";
import JobSeeker from "./pages/JobSeeker";
import LSForm from "./components/form/LSForm";
import HiringManager from "./pages/HiringManager";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";

const App = () => {
  
  return (
    // <AuthProvider>
    //   <NavBar />
    //   <Routes>
    //     <Route path="/" element={<Landing />} />
    //     <Route path="/login" element={<LSForm />} />
    //     <Route path="/apply" element={<Apply />} />

    //     {/* Protected Routes */}
    //     <Route
    //       path="/job_seeker"
    //       element={
    //         <PrivateRoute role="job_seeker">
    //           <JobSeeker />
    //         </PrivateRoute>
    //       }
    //     />
    //     <Route
    //       path="/hiring_manager"
    //       element={
    //         <PrivateRoute role="hiring_manager">
    //           <HiringManager />
    //         </PrivateRoute>
    //       }
    //     />
    //   </Routes>
    // </AuthProvider>
  <>
    <NavBar/>
    <HiringManager/>
  </>
  );
};

export default App;
