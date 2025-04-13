import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  ChevronLeft,
  Filter,
  X,
  Search as SearchIcon,
  Check,
} from "lucide-react";
import JobCard from "../components/searchResult/JobCard";
import JobInformation from "../components/searchResult/JobInformation";

const RecommendedJobs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recommendedJobs = location.state?.results || [];

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Current applied filters
  const [filters, setFilters] = useState({
    workstyle: [],
    type: [],
    experience: [],
  });

  // Temporary filters that are only applied when the Apply button is clicked
  const [tempFilters, setTempFilters] = useState({
    workstyle: [],
    type: [],
    experience: [],
  });

  // Process jobs to ensure they have IDs
  const processJobs = useCallback((jobs) => {
    return jobs.map((job) => ({
      ...job,
      // Generate an ID if one doesn't exist
      id: job.id || Math.random().toString(36).substring(2, 9),
    }));
  }, []);

  // Initialize job data when component mounts
  useEffect(() => {
    if (recommendedJobs && recommendedJobs.length > 0) {
      const processedJobs = processJobs(recommendedJobs);
      setFilteredJobs(processedJobs);

      // If no jobs were passed via location state, redirect back to job match page
    } else if (location.state === null) {
      navigate("/job-match");
    }
  }, [location.state, navigate, processJobs, recommendedJobs]);

  // First useEffect - just for filtering
  useEffect(() => {
    if (!recommendedJobs.length) {
      setFilteredJobs([]);
      return;
    }

    let results = processJobs([...recommendedJobs]);

    // Apply search term filter
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      results = results.filter((job) => {
        // Check all text fields that might exist
        return (
          (job.title && job.title.toLowerCase().includes(term)) ||
          (job.job_location && job.job_location.toLowerCase().includes(term)) ||
          (job.job_type && job.job_type.toLowerCase().includes(term)) ||
          (job.job_description &&
            (typeof job.job_description === "string"
              ? job.job_description.toLowerCase().includes(term)
              : Array.isArray(job.job_description) &&
                job.job_description.some((desc) =>
                  desc.toLowerCase().includes(term)
                ))) ||
          (job.skills &&
            (typeof job.skills === "string"
              ? job.skills.toLowerCase().includes(term)
              : Array.isArray(job.skills) &&
                job.skills.some((skill) => skill.toLowerCase().includes(term))))
        );
      });
    }

    // Apply workstyle filters
    if (filters.workstyle.length > 0) {
      results = results.filter(
        (job) => job.workstyle && filters.workstyle.includes(job.workstyle)
      );
    }

    // Apply job type filters
    if (filters.type.length > 0) {
      results = results.filter(
        (job) => job.job_type && filters.type.includes(job.job_type)
      );
    }

    // Apply experience filters
    if (filters.experience.length > 0) {
      results = results.filter(
        (job) => job.experience && filters.experience.includes(job.experience)
      );
    }

    setFilteredJobs(results);
  }, [recommendedJobs, searchTerm, filters, processJobs]);

  // Second useEffect - handle selecting a new job when filtered jobs change
  useEffect(() => {
    if (
      selectedJob &&
      filteredJobs.length > 0 &&
      !filteredJobs.some((job) => job.id === selectedJob.id)
    ) {
      setSelectedJob(filteredJobs[0]);
    }
  }, [filteredJobs, selectedJob]);

  // Third useEffect - auto-select first job on initial load
  useEffect(() => {
    if (filteredJobs.length > 0 && !selectedJob && window.innerWidth >= 1024) {
      setSelectedJob(filteredJobs[0]);
    }
  }, [filteredJobs]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectJob = (job) => {
    setSelectedJob(job);
  };

  const handleCloseJobDetail = () => {
    setSelectedJob(null);
  };

  const handleFilterToggle = (category, value) => {
    setTempFilters((prevFilters) => {
      const updatedCategory = prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value];

      return {
        ...prevFilters,
        [category]: updatedCategory,
      };
    });
  };

  const applyFilters = () => {
    // Apply the temporary filters
    setFilters(tempFilters);
    setShowFilters(false);
  };

  const clearFilters = () => {
    const emptyFilters = {
      workstyle: [],
      type: [],
      experience: [],
    };

    setFilters(emptyFilters);
    setTempFilters(emptyFilters);
    setSearchTerm("");
  };

  // Initialize temp filters when opening the filter panel
  useEffect(() => {
    if (showFilters) {
      setTempFilters(filters);
    }
  }, [showFilters, filters]);

  // Count total active filters
  const activeFilterCount = Object.values(filters).flat().length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/job-match"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Job Match
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Recommended Jobs
            </h1>
            <p className="text-gray-600 mt-1">
              Based on your profile and preferences
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search within results..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${
                activeFilterCount > 0
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-300 hover:bg-gray-50 text-gray-700"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="ml-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Work Style */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Work Style
              </h4>
              <div className="space-y-2">
                {["Remote", "Hybrid", "On-site"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        tempFilters.workstyle.includes(option)
                          ? "bg-blue-600 border-blue-600"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleFilterToggle("workstyle", option)}
                    >
                      {tempFilters.workstyle.includes(option) && (
                        <Check className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Job Type */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Job Type
              </h4>
              <div className="space-y-2">
                {["Full-time", "Part-time", "Contract", "Internship"].map(
                  (option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          tempFilters.type.includes(option)
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300"
                        }`}
                        onClick={() => handleFilterToggle("type", option)}
                      >
                        {tempFilters.type.includes(option) && (
                          <Check className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </h4>
              <div className="space-y-2">
                {["Entry-Level", "Mid-Level", "Senior", "Executive"].map(
                  (option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          tempFilters.experience.includes(option)
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300"
                        }`}
                        onClick={() => handleFilterToggle("experience", option)}
                      >
                        {tempFilters.experience.includes(option) && (
                          <Check className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setShowFilters(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mt-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">
              Loading job recommendations...
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Job listings - Make this scrollable */}
            <div className="lg:w-2/5 max-h-[calc(100vh-180px)] overflow-y-auto">
              {filteredJobs.length > 0 ? (
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="relative"
                      onClick={() => handleSelectJob(job)}
                    >
                      <JobCard
                        job={job}
                        isSelected={selectedJob?.id === job.id}
                        onSelect={handleSelectJob}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-center justify-center">
                  <SearchIcon className="w-12 h-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No jobs found
                  </h3>
                  <p className="text-gray-500 text-center mb-4">
                    Try adjusting your search or filters to find more results.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Job details - Desktop */}
            <div className="hidden lg:block lg:w-3/5">
              {selectedJob ? (
                <div className="sticky top-24 bg-white rounded-lg border border-gray-200">
                  <JobInformation job={selectedJob} />
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-center justify-center h-64">
                  <p className="text-gray-500 text-center">
                    Select a job to view details
                  </p>
                </div>
              )}
            </div>

            {/* Job details - Mobile */}
            {selectedJob && (
              <div className="lg:hidden">
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
                      <div className="flex items-center">
                        <button
                          onClick={handleCloseJobDetail}
                          className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
                        >
                          <X className="w-5 h-5" />
                        </button>
                        <h2 className="font-semibold text-lg ml-2">
                          {selectedJob.title}
                        </h2>
                      </div>
                    </div>
                    <div className="p-4">
                      <JobInformation job={selectedJob} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedJobs;
