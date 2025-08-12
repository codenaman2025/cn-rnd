import React, { createContext, useEffect, useState } from "react";

export const JobContext = createContext();

const JobProvider = ({ children }) => {
  const [getJobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/jobs");
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  // Load initial data once
  useEffect(() => {
    fetchJobs();
  }, []);

  // Add new job method remains same
  const addJob = async (newJob) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });

      if (!res.ok) throw new Error("Failed to add job");
      const createdJob = await res.json();
      setJobs((prev) => [...prev, createdJob]);
    } catch (err) {
      console.error(err);
      alert("Could not create job.");
    }
  };

  return (
    <JobContext.Provider value={{ getJobs, addJob, fetchJobs }}>
      {children}
    </JobContext.Provider>
  );
};

export default JobProvider