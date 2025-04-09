import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Briefcase,
  Calendar,
  ChevronRight,
  Filter,
  ArrowRight,
  Star,
  Clock,
  TrendingUp,
  User,
  MapPin,
} from "lucide-react";
import { Link } from "react-router";
import {
  useCompanyJobs,
  useRecentApplicants,
  useCompanyStats,
  getRelativeTime,
} from "../../hooks/tanstack/useBusinessDashboard";
import ApplicantCard from "../../components/ApplicantCard";

const Applicants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Use TanStack Query hooks to fetch data
  const {
    data: jobs,
    isLoading: jobsLoading,
    error: jobsError,
  } = useCompanyJobs();

  const {
    data: recentApplicants,
    isLoading: applicantsLoading,
    error: applicantsError,
  } = useRecentApplicants();

  useEffect(() => {
    console.log(recentApplicants);
  }, [recentApplicants]);

  const {
    data: statsData,
    isLoading: statsLoading,
    error: statsError,
  } = useCompanyStats();

  // Generate stats from the real data
  const stats =
    !statsLoading && statsData
      ? [
          {
            title: "Total Applicants",
            value: statsData.total_applicants || 0,
            icon: <Users className="w-6 h-6 text-blue-600" />,
          },
          {
            title: "New This Week",
            value: statsData.new_applicants || 0,
            icon: <TrendingUp className="w-6 h-6 text-green-600" />,
          },
          {
            title: "Active Jobs",
            value: statsData.active_jobs || 0,
            icon: <Briefcase className="w-6 h-6 text-purple-600" />,
          },
        ]
      : [];

  // Filter job listings based on search term and status
  const filteredJobs =
    !jobsLoading && jobs
      ? jobs.filter((job) => {
          const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (job.department &&
              job.department
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (job.location &&
              job.location.toLowerCase().includes(searchTerm.toLowerCase()));
          const matchesStatus =
            filterStatus === "all" ||
            (new Date(job.deadline) > new Date() ? "active" : "closed") ===
              filterStatus.toLowerCase();
          return matchesSearch && matchesStatus;
        })
      : [];

  // Check if there was an error in fetching real data
  const hasError = jobsError || applicantsError || statsError;
  if (hasError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-red-600 mb-4">
            {(jobsError || applicantsError || statsError)?.message ||
              "There was an error loading your data. Please try again."}
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header - Static */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Manage Applicants
          </h1>
          <p className="text-gray-600">
            Review and manage candidates across all your job listings
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statsLoading
          ? // Skeleton for stats - keep icons and titles
            Array(3)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      {index === 0 ? (
                        <Users className="w-6 h-6 text-blue-600" />
                      ) : index === 1 ? (
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      ) : (
                        <Briefcase className="w-6 h-6 text-purple-600" />
                      )}
                    </div>
                  </div>
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <p className="text-gray-600">
                    {index === 0
                      ? "Total Applicants"
                      : index === 1
                      ? "New This Week"
                      : "Active Jobs"}
                  </p>
                </div>
              ))
          : stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg">{stat.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600">{stat.title}</p>
              </div>
            ))}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Applicants
          </h2>
          <Link
            to="/business/all-applicants"
            className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
          >
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="space-y-4">
          {applicantsLoading
            ? // Skeleton for recent applicants with avatar
              Array(3)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                      <div>
                        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="h-6 w-10 bg-gray-200 rounded animate-pulse mb-1"></div>
                        <div className="text-xs text-purple-600">match</div>
                      </div>
                      <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ))
            : recentApplicants &&
              recentApplicants.map((applicant) => (
                <ApplicantCard
                  key={applicant.user_id || applicant.id}
                  applicant={applicant}
                  getRelativeTime={getRelativeTime}
                  isCompact={false}
                />
              ))}
        </div>
      </div>

      {/* Job Listings Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Select a Job to View Applicants
          </h2>

          {/* Search and Filter - Keep interactive during loading */}
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-48 md:w-64"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobsLoading
            ? // Skeleton for job listings
              Array(5)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-gray-200 p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Users className="w-4 h-4 mr-1" />
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center text-blue-600 text-sm font-medium">
                        <Clock className="w-4 h-4 mr-1" />
                        <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">
                        Top match:{" "}
                        <div className="h-4 w-10 bg-gray-200 rounded animate-pulse inline-block align-middle"></div>
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse inline-block align-middle"></div>
                      </div>
                      <div className="text-blue-600 font-medium text-sm flex items-center">
                        View Applicants
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                ))
            : filteredJobs.map((job) => (
                <div
                  key={job.job_id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {job.company} • {job.department || "General"}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        new Date(job.deadline) > new Date()
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {new Date(job.deadline) > new Date()
                        ? "Active"
                        : "Closed"}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      {job.applicant_count || 0}{" "}
                      {job.applicant_count === 1 ? "applicant" : "applicants"}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {job.jobtype
                        ? job.jobtype.charAt(0).toUpperCase() +
                          job.jobtype.slice(1)
                        : "Full-time"}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.workstyle
                        ? job.workstyle.charAt(0).toUpperCase() +
                          job.workstyle.slice(1)
                        : "On-site"}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Posted {getRelativeTime(job.start)}
                    </div>
                    <Link
                      to={`/business/applicants/${job.job_id}`}
                      className="text-blue-600 font-medium text-sm flex items-center"
                    >
                      View Applicants
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
        </div>

        {/* Empty state - only show when not loading and no results */}
        {!jobsLoading && filteredJobs.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No job listings found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm
                ? `No jobs matching "${searchTerm}"`
                : "Create your first job posting to get started"}
            </p>
            {!searchTerm && (
              <Link
                to="/create-job"
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create New Job
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applicants;
