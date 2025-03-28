import { useState, useEffect } from "react";

const useAppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Load applied jobs from localStorage on initial render
  useEffect(() => {
    const applied = localStorage.getItem("appliedJobs");
    if (applied) {
      setAppliedJobs(JSON.parse(applied));
    }
  }, []);

  // Save a job application
  const applyJob = (jobId, applicationData) => {
    // Make sure we have the complete job object with all properties
    const jobData = applicationData.job || {};

    const newApplication = {
      ...jobData,
      id: jobId,
      workstyle: jobData.workstyle || "Full-time", // Ensure workstyle exists
      isVerified: jobData.isVerified || false, // Ensure isVerified exists
      applicationData, // Keep the application form data
      appliedAt: new Date().toISOString(),
    };

    const updatedJobs = [...appliedJobs, newApplication];
    setAppliedJobs(updatedJobs);
    localStorage.setItem("appliedJobs", JSON.stringify(updatedJobs));
  };

  // Remove a job
  const removeJob = (jobId) => {
    const updatedJobs = appliedJobs.filter((job) => job.id !== jobId);
    setAppliedJobs(updatedJobs);
    localStorage.setItem("appliedJobs", JSON.stringify(updatedJobs));
  };

  // Check if a job is saved
  const hasApplied = (jobId) => {
    return appliedJobs.some((job) => job.id === jobId);
  };

  return {
    appliedJobs,
    applyJob,
    removeJob,
    hasApplied,
  };
};

export default useAppliedJobs;
