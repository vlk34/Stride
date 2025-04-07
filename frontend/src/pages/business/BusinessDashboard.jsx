import React, { useState } from "react";
import {
  BarChart3,
  Users,
  Briefcase,
  Building2,
  Eye,
  ThumbsUp,
  Clock,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Star,
  Mail,
  MessageSquare,
  Bell,
  FileText,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  AlertCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import {
  useCompanyStats,
  useRecentJobs,
  useRecentApplicants,
} from "../../hooks/tanstack/useBusinessDashboard";

const BusinessDashboard = () => {
  const [timeRange, setTimeRange] = useState("week");
  const navigate = useNavigate();

  // Fetch real data using hooks
  const {
    data: statsData,
    isLoading: statsLoading,
    error: statsError,
  } = useCompanyStats();
  const {
    data: jobsData,
    isLoading: jobsLoading,
    error: jobsError,
  } = useRecentJobs();
  const {
    data: recentApplicants,
    isLoading: applicantsLoading,
    error: applicantsError,
  } = useRecentApplicants(5);

  // Check if any data fetching has errors
  const hasError = statsError || jobsError || applicantsError;

  // Static icons for stats
  const statIcons = [
    <Briefcase key="jobs" className="w-6 h-6 text-blue-600" />,
    <Users key="applicants" className="w-6 h-6 text-blue-600" />,
    <Eye key="views" className="w-6 h-6 text-blue-600" />,
    <ThumbsUp key="response" className="w-6 h-6 text-blue-600" />,
  ];

  const statTitles = [
    "Total Job Posts",
    "Total Applicants",
    "Profile Views",
    "Response Rate",
  ];

  // Format stats data
  const getFormattedStats = () => {
    if (!statsData)
      return Array(4).fill({ value: "0", change: "0", trend: "up" });

    return [
      {
        title: "Total Job Posts",
        value: statsData.total_jobs.toString(),
        change: "+0", // Change calculation would require historical data
        trend: "up",
      },
      {
        title: "Total Applicants",
        value: statsData.total_applicants.toString(),
        change: "+0",
        trend: "up",
      },
      {
        title: "Profile Views",
        value: statsData.profile_views.toString(),
        change: "+0",
        trend: "up",
      },
      {
        title: "Response Rate",
        value: statsData.response_rate ? `${statsData.response_rate}%` : "0%",
        change: "0",
        trend: "neutral",
      },
    ];
  };

  // Format jobs for display
  const getFormattedJobs = () => {
    if (!jobsData) return [];

    return jobsData.map((job) => ({
      id: job.job_id,
      title: job.title,
      department: job.department || "General",
      location:
        job.location || (job.workstyle === "remote" ? "Remote" : "On-site"),
      applicants: 0, // This would need additional API calls to count applicants
      newApplicants: 0,
      status: new Date(job.deadline) > new Date() ? "Active" : "Closed",
      posted: getRelativeTime(job.created_at || new Date()),
    }));
  };

  // Function to format relative time
  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const pastDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - pastDate) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  };

  // Handle card clicks
  const handleJobCardClick = (jobId) => {
    navigate(`/business/job-details/${jobId}`);
  };

  const handleApplicantCardClick = (userId, jobId) => {
    navigate(`/business/applicants/${jobId}/${userId}`);
  };

  const isLoading = statsLoading || jobsLoading || applicantsLoading;
  const stats = getFormattedStats();
  const jobs = getFormattedJobs();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header with Time Range Selector */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Business Dashboard
          </h1>
          <p className="text-gray-600">Welcome back</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
      </div>

      {/* Error Alert */}
      {hasError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-red-800 mb-1">
              Error Loading Dashboard Data
            </h3>
            <p className="text-sm text-red-700">
              {statsError?.message ||
                jobsError?.message ||
                applicantsError?.message ||
                "There was an error loading your dashboard data. Please try refreshing the page."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-3 py-1 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {Array(4)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 md:p-6 rounded-xl border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-50 p-2 md:p-3 rounded-lg">
                  {statIcons[index]}
                </div>
                {isLoading ? (
                  <div className="w-10 h-5 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <div
                    className={`flex items-center ${
                      stats[index].trend === "up"
                        ? "text-green-600"
                        : stats[index].trend === "down"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {stats[index].trend === "up" ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : stats[index].trend === "down" ? (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    ) : null}
                    {stats[index].change}
                  </div>
                )}
              </div>
              {isLoading ? (
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-1"></div>
              ) : (
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  {stats[index].value}
                </h3>
              )}
              <p className="text-sm md:text-base text-gray-600">
                {statTitles[index]}
              </p>
            </div>
          ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Recent Jobs */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 h-full">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Recent Jobs
            </h2>
            <Link
              to="/business/manage/jobs"
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {isLoading ? (
            // Skeleton for recent jobs
            <div className="space-y-3 md:space-y-4">
              {Array(5)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 md:p-4 h-auto min-h-[5rem] md:h-24 rounded-lg border border-gray-100"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="h-5 w-full max-w-[10rem] bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 w-full max-w-[8rem] bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="flex items-center mt-1">
                        <Users className="w-4 h-4 text-gray-400 mr-1 flex-shrink-0" />
                        <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end ml-2">
                      <div className="h-6 w-16 md:w-20 bg-gray-200 rounded-full animate-pulse mb-2"></div>
                      <div className="text-blue-600 text-xs md:text-sm mt-2 whitespace-nowrap">
                        View Applicants
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : jobs.length === 0 ? (
            // No jobs message
            <div className="text-center py-10">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                No Job Listings Yet
              </h3>
              <p className="text-gray-500 mb-4">
                Create your first job listing to start receiving applications.
              </p>
              <Link
                to="/business/create-job-listing"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Job Listing
              </Link>
            </div>
          ) : (
            // Actual jobs when loaded
            <div className="space-y-3 md:space-y-4">
              {jobs.slice(0, 5).map((job) => (
                <div
                  key={job.id}
                  onClick={() => handleJobCardClick(job.id)}
                  className="flex items-center justify-between p-3 md:p-4 h-auto min-h-[5rem] md:h-24 rounded-lg border border-gray-100 hover:border-blue-500 hover:bg-blue-50/30 transition-colors cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {job.department} • {job.location}
                    </p>
                    <div className="flex items-center mt-1 flex-wrap">
                      <Clock className="w-4 h-4 text-gray-400 mr-1 flex-shrink-0" />
                      <span className="text-sm text-gray-600 mr-3">
                        Posted {job.posted}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end ml-2">
                    <span
                      className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${
                        job.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {job.status}
                    </span>
                    <Link
                      to={`/business/applicants/${job.id}`}
                      className="text-blue-600 hover:text-blue-700 text-xs md:text-sm mt-2 whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()} // Prevent card click
                    >
                      View Applicants
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Applicants */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 h-full">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Recent Applicants
            </h2>
            <Link
              to="/business/applicants"
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {applicantsLoading ? (
            // Skeleton for recent applicants
            <div className="space-y-3 md:space-y-4">
              {Array(5)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 md:p-4 h-auto min-h-[5rem] md:h-24 rounded-lg border border-gray-100"
                  >
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 animate-pulse mr-2 md:mr-3 flex-shrink-0"></div>
                      <div className="min-w-0">
                        <div className="h-5 w-full max-w-[8rem] bg-gray-200 rounded animate-pulse mb-1"></div>
                        <div className="h-4 w-full max-w-[6rem] bg-gray-200 rounded animate-pulse mb-1"></div>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 mr-1 whitespace-nowrap">
                            Applied
                          </span>
                          <div className="h-3 w-12 md:w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end ml-2">
                      <div className="h-6 w-14 md:w-16 bg-gray-200 rounded-full animate-pulse mb-2"></div>
                      <div className="flex items-center whitespace-nowrap">
                        <div className="h-4 w-6 md:w-8 bg-gray-200 rounded animate-pulse inline-block align-middle mr-1"></div>
                        <span className="text-xs md:text-sm text-purple-700">
                          % match
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : applicantsError ? (
            // Error state for applicants
            <div className="text-center py-10">
              <AlertCircle className="w-12 h-12 text-red-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Couldn't Load Applicants
              </h3>
              <p className="text-gray-500 mb-4">
                There was an error loading recent applicants data.
              </p>
            </div>
          ) : recentApplicants?.length === 0 ? (
            // No applicants message
            <div className="text-center py-10">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                No Applicants Yet
              </h3>
              <p className="text-gray-500">
                When candidates apply to your job listings, they'll appear here.
              </p>
            </div>
          ) : (
            // Actual applicants when loaded
            <div className="space-y-3 md:space-y-4">
              {recentApplicants?.map((applicant) => (
                <div
                  key={applicant.id}
                  onClick={() =>
                    handleApplicantCardClick(applicant.id, applicant.job_id)
                  }
                  className="flex items-center justify-between p-3 md:p-4 h-auto min-h-[5rem] md:h-24 rounded-lg border border-gray-100 hover:border-blue-500 hover:bg-blue-50/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <img
                      src={applicant.photo}
                      alt={applicant.name}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover mr-2 md:mr-3 border border-gray-200 flex-shrink-0"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/150?text=Profile";
                      }}
                    />
                    <div className="min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {applicant.name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {applicant.role}
                      </p>
                      <p className="text-xs text-gray-500">
                        Applied {applicant.applied}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end ml-2">
                    <span
                      className={`px-2 md:px-3 py-1 rounded-full text-xs ${
                        applicant.status === "New"
                          ? "bg-blue-100 text-blue-700"
                          : applicant.status === "Reviewed"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {applicant.status}
                    </span>
                    <div className="text-xs md:text-sm font-medium text-purple-700 mt-2 whitespace-nowrap">
                      {applicant.match_score}% match
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Job Button (Visible on Mobile) */}
      <div className="lg:hidden mt-8 flex justify-center">
        <Link
          to="/business/create-job-listing"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center w-full max-w-xs"
        >
          <Briefcase className="w-5 h-5 mr-2" />
          Create New Job
        </Link>
      </div>
    </div>
  );
};

export default BusinessDashboard;
