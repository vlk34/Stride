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

  // Apply for a job
  const applyJob = (jobId, applicationData) => {
    const newApplication = {
      jobId,
      applicationData,
      appliedAt: new Date().toISOString(),
    };
    const updatedJobs = [...appliedJobs, newApplication];
    setAppliedJobs(updatedJobs);
    localStorage.setItem("appliedJobs", JSON.stringify(updatedJobs));
  };

  // Check if already applied
  const hasApplied = (jobId) => {
    return appliedJobs.some((application) => application.jobId === jobId);
  };

  return {
    appliedJobs,
    applyJob,
    hasApplied,
  };
};

export default useAppliedJobs;
