// src/components/searchResult/Result.jsx
import React, { useState, useEffect } from "react";
import JobCard from "../components/searchResult/JobCard";
import JobInformation from "../components/searchResult/JobInformation";
import { useLocation } from "react-router";
import {
  MapPin,
  Briefcase,
  Building2,
  GraduationCap,
  Search,
  Filter,
  X,
} from "lucide-react";
import { useAllJobs } from "../hooks/tanstack/useJobSearch";

const Result = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    workstyle: "",
    type: "",
    industry: "",
    experience: "",
  });
  const [initialSelectionDone, setInitialSelectionDone] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch jobs using tanstack query
  const { data: jobs = [], isLoading, error } = useAllJobs();

  // Filter jobs based on search and filters
  const filteredJobs = React.useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().replace(/\s+/g, "");

    return jobs.filter((job) => {
      const normalizedTitle = (job.title || "")
        .toLowerCase()
        .replace(/\s+/g, "");
      const matchesSearch = normalizedTitle.includes(normalizedSearch);

      const matchesWorkstyle =
        !filters.workstyle || job.workstyle === filters.workstyle;
      const matchesType = !filters.type || job.type === filters.type;
      const matchesIndustry =
        !filters.industry || job.industry === filters.industry;
      const matchesExperience =
        !filters.experience || job.experience === filters.experience;

      return (
        matchesSearch &&
        matchesWorkstyle &&
        matchesType &&
        matchesIndustry &&
        matchesExperience
      );
    });
  }, [jobs, searchTerm, filters]);

  // Handle initial job selection only when filteredJobs changes
  useEffect(() => {
    if (
      location.state?.fromDashboard &&
      filteredJobs.length > 0 &&
      !selectedJob &&
      !initialSelectionDone
    ) {
      setSelectedJob(filteredJobs[0]);
      setInitialSelectionDone(true);
    }
  }, [filteredJobs, location.state, selectedJob, initialSelectionDone]);

  // Create a wrapper for setSelectedJob that respects user's choice to close
  const handleSelectJob = (job) => {
    setSelectedJob(job);
    if (!initialSelectionDone) {
      setInitialSelectionDone(true);
    }
  };

  // Create a handler for closing the job detail view
  const handleCloseJobDetail = () => {
    setSelectedJob(null);
    setInitialSelectionDone(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              placeholder="Search for jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2.5 border border-gray-200 rounded-lg hover:border-gray-300"
          >
            <Filter className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {showFilters && (
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex-1 relative">
              <select
                name="workstyle"
                value={filters.workstyle}
                onChange={handleFilterChange}
                className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm appearance-none bg-white"
              >
                <option value="">Workstyle</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="on-site">On-site</option>
              </select>
              <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex-1 relative">
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm appearance-none bg-white"
              >
                <option value="">Job Type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
              <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex-1 relative">
              <select
                name="industry"
                value={filters.industry}
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
                value={filters.experience}
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
      </div>

      {/* Content */}
      <div className="mt-6">
        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-6">
          {/* Job listings */}
          <div className="w-2/5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">
                {filteredJobs.length} Job Listings Available
              </span>
              <select className="border rounded-lg px-2 py-1 text-sm">
                <option>Relevance</option>
                <option>Latest</option>
                <option>Oldest</option>
              </select>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-600">
                  No job listings match your criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({
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
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSelected={selectedJob?.id === job.id}
                    onSelect={handleSelectJob}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Job details - Desktop */}
          <div className="w-3/5 bg-white rounded-lg border border-gray-200">
            <div className="h-[calc(100vh-180px)] overflow-y-auto">
              <JobInformation job={selectedJob} />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">
              {filteredJobs.length} Job Listings Available
            </span>
            <select className="border rounded-lg px-2 py-1 text-sm">
              <option>Relevance</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-600">
                No job listings match your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilters({
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
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSelected={selectedJob?.id === job.id}
                  onSelect={handleSelectJob}
                />
              ))}
            </div>
          )}

          {/* Mobile Job details overlay */}
          {selectedJob && (
            <>
              <div
                className="fixed inset-0 bg-black/30 transition-opacity z-40"
                onClick={handleCloseJobDetail}
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
                    <h2 className="font-semibold text-lg">
                      {selectedJob.title}
                    </h2>
                    <button
                      onClick={handleCloseJobDetail}
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

              <style>
                {`
                  @keyframes slideUp {
                    from {
                      transform: translateY(100%);
                    }
                    to {
                      transform: translateY(0);
                    }
                  }
                `}
              </style>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
