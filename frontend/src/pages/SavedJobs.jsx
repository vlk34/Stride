import React, { useState } from "react";
import JobCard from "../components/searchResult/JobCard";
import JobInformation from "../components/searchResult/JobInformation";
import useSavedJobs from "../hooks/useSavedJobs";
import useAppliedJobs from "../hooks/useAppliedJobs";
import { useNavigate } from "react-router";

const SavedJobs = () => {
  const [activeTab, setActiveTab] = useState("saved"); // "saved" or "applied"
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();
  const { savedJobs } = useSavedJobs();
  const { appliedJobs } = useAppliedJobs();

  // Get the full job details for applied jobs
  const appliedJobsWithDetails = appliedJobs
    .map((application) => {
      // Find the matching saved job to get full job details
      const jobDetails = savedJobs.find((job) => job.id === application.jobId);
      return {
        ...jobDetails, // Include all job details
        applicationData: application.applicationData,
        appliedAt: application.appliedAt,
      };
    })
    .filter((job) => job); // Remove any undefined entries

  const currentJobs =
    activeTab === "saved" ? savedJobs : appliedJobsWithDetails;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab("saved")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${
              activeTab === "saved"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
        >
          Saved Jobs
        </button>
        <button
          onClick={() => setActiveTab("applied")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${
              activeTab === "applied"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
        >
          Applied Jobs
        </button>
      </div>

      {/* Content */}
      <div className="flex gap-6">
        {/* Left column - Job listings */}
        <div className="w-2/5">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">
              {currentJobs.length} {activeTab === "saved" ? "Saved" : "Applied"}{" "}
              Jobs
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="border rounded-lg px-2 py-1 text-sm">
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>

          {currentJobs.length > 0 ? (
            <div className="space-y-4">
              {currentJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSelected={selectedJob?.id === job.id}
                  onSelect={setSelectedJob}
                  appliedAt={job.appliedAt}
                  isApplied={activeTab === "applied"}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">
                {activeTab === "saved"
                  ? "You haven't saved any jobs yet."
                  : "You haven't applied to any jobs yet."}
              </p>
              <button
                onClick={() => navigate("/search")}
                className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
              >
                Explore Job Listings
              </button>
            </div>
          )}
        </div>

        {/* Right column - Job details */}
        <div className="w-3/5 bg-white rounded-lg border border-gray-200">
          <JobInformation job={selectedJob} />
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;
