import { useState, useEffect } from "react";

const useSavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  // Load saved jobs from localStorage on initial render
  useEffect(() => {
    const saved = localStorage.getItem("savedJobs");
    if (saved) {
      setSavedJobs(JSON.parse(saved));
    }
  }, []);

  // Save a job
  const saveJob = (job) => {
    const updatedJobs = [...savedJobs, job];
    setSavedJobs(updatedJobs);
    localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
  };

  // Remove a job
  const removeJob = (jobId) => {
    const updatedJobs = savedJobs.filter((job) => job.id !== jobId);
    setSavedJobs(updatedJobs);
    localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
  };

  // Check if a job is saved
  const isJobSaved = (jobId) => {
    return savedJobs.some((job) => job.id === jobId);
  };

  return {
    savedJobs,
    saveJob,
    removeJob,
    isJobSaved,
  };
};

export default useSavedJobs;
