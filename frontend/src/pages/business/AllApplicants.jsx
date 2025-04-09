import React, { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  Users,
  Search,
  Filter,
  ChevronDown,
  Download,
  ArrowUpDown,
  ArrowLeft,
} from "lucide-react";
import {
  useAllApplicants,
  useCompanyJobs,
  getRelativeTime,
} from "../../hooks/tanstack/useBusinessDashboard";

const AllApplicants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  // Fetch data from API
  const {
    data: applicantsData,
    isLoading: isLoadingApplicants,
    error: applicantsError,
  } = useAllApplicants();
  const { data: jobsData, isLoading: isLoadingJobs } = useCompanyJobs();

  // Process jobs data for the dropdown
  const jobs = useMemo(() => {
    const allJobsOption = [{ id: "all", title: "All Jobs" }];
    if (!jobsData) return allJobsOption;

    return [
      ...allJobsOption,
      ...jobsData.map((job) => ({
        id: job.job_id.toString(),
        title: job.title,
      })),
    ];
  }, [jobsData]);

  // Format skills with capitalized first letter
  const formatSkill = (skill) => {
    if (!skill) return "";
    return skill.charAt(0).toUpperCase() + skill.slice(1);
  };

  // Filter and sort applicants
  const filteredApplicants = useMemo(() => {
    if (!applicantsData) return [];

    return applicantsData
      .filter((applicant) => {
        // Filter by search term
        const matchesSearch =
          applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (applicant.unsafeRole &&
            applicant.unsafeRole
              .toLowerCase()
              .includes(searchTerm.toLowerCase()));

        // Filter by job
        const matchesJob =
          selectedJob === "all" ||
          (applicant.job_id && applicant.job_id.toString() === selectedJob);

        return matchesSearch && matchesJob;
      })
      .sort((a, b) => {
        // Sort by selected criteria
        if (sortBy === "date") {
          return sortOrder === "desc"
            ? new Date(b.applied_at || 0) - new Date(a.applied_at || 0)
            : new Date(a.applied_at || 0) - new Date(b.applied_at || 0);
        } else if (sortBy === "name") {
          return sortOrder === "desc"
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name);
        } else if (sortBy === "match") {
          const aScore = a.similarity || 0;
          const bScore = b.similarity || 0;
          return sortOrder === "desc" ? bScore - aScore : aScore - bScore;
        }
        return 0;
      });
  }, [applicantsData, searchTerm, selectedJob, sortBy, sortOrder]);

  // Toggle sort order
  const toggleSortOrder = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  // Loading state
  if (isLoadingApplicants || isLoadingJobs) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (applicantsError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>Error loading applicants. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
      {/* Back button */}
      <div className="flex items-center gap-2 mb-4">
        <Link
          to="/business/applicants"
          className="text-blue-600 hover:text-blue-700 flex items-center"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back to Applicants
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            All Applicants
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {filteredApplicants.length} applicants across all job postings
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 text-xs sm:text-sm"
          >
            <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
            Filters
            <ChevronDown
              className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>

          <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 text-xs sm:text-sm">
            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search applicants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Job Filter */}
          <div>
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Advanced Filters (collapsible) */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Match Score
              </label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option>Any Score</option>
                <option>90% and above</option>
                <option>80% and above</option>
                <option>70% and above</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Application Date
              </label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option>Any Time</option>
                <option>Last 24 hours</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Applicants Table/Cards */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredApplicants.length === 0 ? (
          <div className="py-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No applicants found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? `No applicants matching "${searchTerm}"`
                : "Try adjusting your filters"}
            </p>
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-200">
              {filteredApplicants.map((applicant) => (
                <div key={applicant.user_id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={applicant.image}
                      alt={applicant.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      onError={(e) => {
                        e.target.src =
                          "https://ui-avatars.com/api/?name=" +
                          encodeURIComponent(applicant.name);
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-900 truncate">
                            {applicant.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {applicant.email}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm text-gray-900">
                      {applicant.unsafeRole || "Applicant"}
                      <div className="text-xs text-gray-500">
                        {applicant.location || "Location not specified"}
                      </div>
                    </div>
                    {applicant.similarity > 0 && (
                      <div className="text-sm font-medium text-purple-700">
                        {applicant.similarity}%
                      </div>
                    )}
                  </div>

                  {applicant.similarity > 0 && (
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                      <div
                        className="bg-purple-600 h-1.5 rounded-full"
                        style={{ width: `${applicant.similarity}%` }}
                      ></div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      Applied {getRelativeTime(applicant.applied_at)}
                    </div>
                    <Link
                      to={`/business/applicants/${applicant.job_id}/${applicant.user_id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      <button
                        onClick={() => toggleSortOrder("name")}
                        className="flex items-center"
                      >
                        Applicant
                        {sortBy === "name" && (
                          <ArrowUpDown className="w-4 h-4 ml-1" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Skills
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      <button
                        onClick={() => toggleSortOrder("match")}
                        className="flex items-center"
                      >
                        Match
                        {sortBy === "match" && (
                          <ArrowUpDown className="w-4 h-4 ml-1" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      <button
                        onClick={() => toggleSortOrder("date")}
                        className="flex items-center"
                      >
                        Applied
                        {sortBy === "date" && (
                          <ArrowUpDown className="w-4 h-4 ml-1" />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredApplicants.map((applicant) => (
                    <tr key={applicant.user_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={applicant.image}
                            alt={applicant.name}
                            className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-200"
                            onError={(e) => {
                              e.target.src =
                                "https://ui-avatars.com/api/?name=" +
                                encodeURIComponent(applicant.name);
                            }}
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              {applicant.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {applicant.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {applicant.skills && applicant.skills.length > 0 ? (
                            applicant.skills.slice(0, 3).map((skill, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-xs px-2 py-1 rounded"
                              >
                                {formatSkill(skill)}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-sm">
                              No skills listed
                            </span>
                          )}
                          {applicant.skills && applicant.skills.length > 3 && (
                            <span className="text-gray-500 text-xs">
                              +{applicant.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {applicant.similarity > 0 ? (
                          <>
                            <div className="text-sm font-medium text-purple-700">
                              {applicant.similarity}%
                            </div>
                            <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                              <div
                                className="bg-purple-600 h-1.5 rounded-full"
                                style={{ width: `${applicant.similarity}%` }}
                              ></div>
                            </div>
                          </>
                        ) : (
                          <span className="text-gray-400 text-sm">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getRelativeTime(applicant.applied_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <Link
                          to={`/business/applicants/${applicant.job_id}/${applicant.user_id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllApplicants;
