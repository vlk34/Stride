// src/components/searchResult/Result.jsx
import React, { useState, useEffect } from "react";
import JobCard from "../components/searchResult/JobCard";
import JobInformation from "../components/searchResult/JobInformation";
import { useLocation, useSearchParams } from "react-router";
import {
  MapPin,
  Briefcase,
  Building2,
  GraduationCap,
  Search,
  Filter,
  X,
} from "lucide-react";
import { useSearch } from "../hooks/tanstack/useSearch";

const Result = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedJob, setSelectedJob] = useState(null);

  // Extract search parameters from URL
  const query = searchParams.get("q") || "";
  const workstyle = searchParams.get("workstyle") || "";
  const jobType = searchParams.get("jobtype") || "";
  const industry = searchParams.get("industry") || "";
  const experience = searchParams.get("experience") || "";

  // Set up local filters state for the form
  const [filterState, setFilterState] = useState({
    searchTerm: query,
    workstyle,
    type: jobType,
    industry,
    experience,
  });

  // Controls filter UI display
  const [showFilters, setShowFilters] = useState(false);

  // Fetch jobs using the search hook
  const {
    data: jobsData,
    isLoading,
    error,
  } = useSearch({
    query,
    workstyle,
    type: jobType,
    industry,
    experience,
  });

  // Ensure jobs is always an array
  const jobs = Array.isArray(jobsData) ? jobsData : [];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters to URL
  const applyFilters = () => {
    // Create a new URLSearchParams instance
    const newParams = new URLSearchParams();

    // Only add parameters that have values
    if (filterState.searchTerm) newParams.set("q", filterState.searchTerm);
    if (filterState.workstyle)
      newParams.set("workstyle", filterState.workstyle);
    if (filterState.type) newParams.set("jobtype", filterState.type);
    if (filterState.industry) newParams.set("industry", filterState.industry);
    if (filterState.experience)
      newParams.set("experience", filterState.experience);

    // Update the URL parameters
    setSearchParams(newParams);
  };

  // Handle searching
  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };

  // Handle job selection
  const handleSelectJob = (job) => {
    setSelectedJob(job);
  };

  // Handle closing job details
  const handleCloseJobDetail = () => {
    setSelectedJob(null);
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Jobs
          </h2>
          <p className="text-red-600">
            {error.message ||
              "There was an error fetching job listings. Please try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Search bar */}
      <div className="sticky top-0 z-10 bg-white pb-4">
        <form onSubmit={handleSearch}>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                placeholder="Search for jobs..."
                value={filterState.searchTerm}
                onChange={(e) =>
                  setFilterState((prev) => ({
                    ...prev,
                    searchTerm: e.target.value,
                  }))
                }
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="p-2.5 border border-gray-200 rounded-lg hover:border-gray-300"
            >
              <Filter className="w-5 h-5 text-gray-500" />
            </button>
            <button
              type="submit"
              className="p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </div>

          {showFilters && (
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex-1 relative">
                <select
                  name="workstyle"
                  value={filterState.workstyle}
                  onChange={handleFilterChange}
                  className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm appearance-none bg-white"
                >
                  <option value="">Workstyle</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
                <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              <div className="flex-1 relative">
                <select
                  name="type"
                  value={filterState.type}
                  onChange={handleFilterChange}
                  className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm appearance-none bg-white"
                >
                  <option value="">Job Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
                <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              <div className="flex-1 relative">
                <select
                  name="industry"
                  value={filterState.industry}
                  onChange={handleFilterChange}
                  className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm appearance-none bg-white"
                >
                  <option value="">Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                </select>
                <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              <div className="flex-1 relative">
                <select
                  name="experience"
                  value={filterState.experience}
                  onChange={handleFilterChange}
                  className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm appearance-none bg-white"
                >
                  <option value="">Experience</option>
                  <option value="0-1 years">0-1 years</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
                <GraduationCap className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Active Filters Display */}
      {(query || workstyle || jobType || industry || experience) && (
        <div className="mt-4 flex flex-wrap gap-2">
          <div className="text-sm font-medium text-gray-600 pt-1">
            Active filters:
          </div>

          {query && (
            <button
              onClick={() => {
                searchParams.delete("q");
                setSearchParams(searchParams);
                setFilterState((prev) => ({ ...prev, searchTerm: "" }));
              }}
              className="flex items-center gap-1 text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100"
            >
              Search: {query}
              <X className="w-3 h-3" />
            </button>
          )}

          {workstyle && (
            <button
              onClick={() => {
                searchParams.delete("workstyle");
                setSearchParams(searchParams);
                setFilterState((prev) => ({ ...prev, workstyle: "" }));
              }}
              className="flex items-center gap-1 text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100"
            >
              Workstyle: {workstyle}
              <X className="w-3 h-3" />
            </button>
          )}

          {jobType && (
            <button
              onClick={() => {
                searchParams.delete("jobtype");
                setSearchParams(searchParams);
                setFilterState((prev) => ({ ...prev, type: "" }));
              }}
              className="flex items-center gap-1 text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100"
            >
              Job Type: {jobType}
              <X className="w-3 h-3" />
            </button>
          )}

          {industry && (
            <button
              onClick={() => {
                searchParams.delete("industry");
                setSearchParams(searchParams);
                setFilterState((prev) => ({ ...prev, industry: "" }));
              }}
              className="flex items-center gap-1 text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100"
            >
              Industry: {industry}
              <X className="w-3 h-3" />
            </button>
          )}

          {experience && (
            <button
              onClick={() => {
                searchParams.delete("experience");
                setSearchParams(searchParams);
                setFilterState((prev) => ({ ...prev, experience: "" }));
              }}
              className="flex items-center gap-1 text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100"
            >
              Experience: {experience}
              <X className="w-3 h-3" />
            </button>
          )}

          {(query || workstyle || jobType || industry || experience) && (
            <button
              onClick={() => {
                setSearchParams({});
                setFilterState({
                  searchTerm: "",
                  workstyle: "",
                  type: "",
                  industry: "",
                  experience: "",
                });
              }}
              className="flex items-center gap-1 text-sm text-gray-600 underline hover:text-gray-800"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Content */}
      <div className="mt-6">
        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-6">
          {/* Job listings */}
          <div className="w-2/5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">
                {jobs.length} Job Listings Available
              </span>
              <select className="border rounded-lg px-2 py-1 text-sm">
                <option>Relevance</option>
                <option>Latest</option>
                <option>Oldest</option>
              </select>
            </div>

            {jobs.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-600">
                  No job listings match your criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchParams({});
                    setFilterState({
                      searchTerm: "",
                      workstyle: "",
                      type: "",
                      industry: "",
                      experience: "",
                    });
                  }}
                  className="mt-3 text-blue-600 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto">
                {jobs.map((job) => (
                  <JobCard
                    key={job.job_id}
                    job={job}
                    isSelected={selectedJob?.job_id === job.job_id}
                    onSelect={() => handleSelectJob(job)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Job details */}
          <div className="w-3/5">
            {selectedJob ? (
              <JobInformation
                job={selectedJob}
                onClose={handleCloseJobDetail}
              />
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg h-[calc(100vh-180px)] flex items-center justify-center">
                <div className="text-center px-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Select a job to view details
                  </h3>
                  <p className="text-gray-600">
                    Click on any job listing to view more information
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {selectedJob ? (
            <div className="mb-4">
              <button
                onClick={handleCloseJobDetail}
                className="flex items-center text-blue-600 mb-3"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to search results
              </button>
              <JobInformation job={selectedJob} />
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">
                  {jobs.length} Job Listings Available
                </span>
                <select className="border rounded-lg px-2 py-1 text-sm">
                  <option>Relevance</option>
                  <option>Latest</option>
                  <option>Oldest</option>
                </select>
              </div>

              {jobs.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-600">
                    No job listings match your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchParams({});
                      setFilterState({
                        searchTerm: "",
                        workstyle: "",
                        type: "",
                        industry: "",
                        experience: "",
                      });
                    }}
                    className="mt-3 text-blue-600 hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <JobCard
                      key={job.job_id}
                      job={job}
                      onSelect={() => handleSelectJob(job)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
