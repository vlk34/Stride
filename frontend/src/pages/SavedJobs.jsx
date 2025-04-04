import React, { useState, useEffect } from "react";
import JobCard from "../components/searchResult/JobCard";
import JobInformation from "../components/searchResult/JobInformation";
import { useNavigate, Link } from "react-router";
import { X, Bookmark } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import {
  useSavedJobs,
  useAppliedJobs,
} from "../hooks/tanstack/useJobInteractions";

const SavedJobs = () => {
  const [activeTab, setActiveTab] = useState("saved");
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser();

  // Use TanStack Query hooks for data fetching
  const {
    data: savedJobsData = [],
    isLoading: isSavedLoading,
    error: savedError,
  } = useSavedJobs();

  const {
    data: appliedJobsData = [],
    isLoading: isAppliedLoading,
    error: appliedError,
  } = useAppliedJobs();

  // Safely access the jobs data
  const savedJobs = Array.isArray(savedJobsData) ? savedJobsData : [];
  const appliedJobs = Array.isArray(appliedJobsData) ? appliedJobsData : [];

  // Currently active jobs based on tab selection
  const currentJobs = activeTab === "saved" ? savedJobs : appliedJobs;
  const isLoading = activeTab === "saved" ? isSavedLoading : isAppliedLoading;
  const error = activeTab === "saved" ? savedError : appliedError;

  // Reset selected job when changing tabs
  useEffect(() => {
    setSelectedJob(null);
  }, [activeTab]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <Bookmark className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Sign in to save jobs
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Create an account to save jobs you're interested in and keep track
            of the positions you've applied to.
          </p>
          <Link
            to="/signin"
            className="inline-flex px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In to Get Started
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:text-blue-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs - keep these visible during loading */}
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

        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">
              Loading {activeTab === "saved" ? "saved" : "applied"} jobs...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs - keep these visible during error */}
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

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Jobs
          </h2>
          <p className="text-red-600 mb-4">
            {error.message ||
              "There was an error loading your jobs. Please try again."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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

      {/* Desktop Layout */}
      <div className="hidden lg:flex gap-6">
        {/* Job listings */}
        <div className="w-2/5">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">
              {currentJobs.length} {activeTab === "saved" ? "Saved" : "Applied"}{" "}
              Jobs
            </span>
            <select className="border rounded-lg px-2 py-1 text-sm">
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>

          {currentJobs.length > 0 ? (
            <div className="space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto">
              {currentJobs.map((job) => (
                <JobCard
                  key={job.job_id}
                  job={job}
                  isSelected={selectedJob?.job_id === job.job_id}
                  onSelect={() => setSelectedJob(job)}
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

        {/* Job details - Desktop */}
        <div className="w-3/5">
          {selectedJob ? (
            <JobInformation job={selectedJob} />
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg h-[calc(100vh-180px)] flex items-center justify-center">
              <div className="text-center px-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Select a job to view details
                </h3>
                <p className="text-gray-600">
                  Click on any job in your{" "}
                  {activeTab === "saved" ? "saved" : "applied"} list to view
                  more information
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">
            {currentJobs.length} {activeTab === "saved" ? "Saved" : "Applied"}{" "}
            Jobs
          </span>
          <select className="border rounded-lg px-2 py-1 text-sm">
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>

        {currentJobs.length > 0 ? (
          <div className="space-y-4">
            {currentJobs.map((job) => (
              <JobCard
                key={job.job_id}
                job={job}
                onSelect={() => setSelectedJob(job)}
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

        {/* Mobile Job details overlay */}
        {selectedJob && (
          <>
            <div
              className="fixed inset-0 bg-black/30 transition-opacity z-40"
              onClick={() => setSelectedJob(null)}
            />

            <div
              className="fixed inset-x-0 bottom-0 z-50 bg-white border-t border-gray-200 transform transition-transform duration-300 ease-out"
              style={{
                height: "90vh",
                transform: "translateY(0)",
                animation: "slideUp 300ms ease-out",
              }}
            >
              <div className="h-full overflow-y-auto overscroll-contain">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                  <h2 className="font-semibold text-lg">{selectedJob.title}</h2>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="p-2 hover:bg-gray-100 rounded-full lg:hidden"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <JobInformation job={selectedJob} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
