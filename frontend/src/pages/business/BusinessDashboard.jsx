import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { Link, useNavigate } from "react-router";

const BusinessDashboard = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  // Static icons for stats
  const statIcons = [
    <Briefcase className="w-6 h-6 text-blue-600" />,
    <Users className="w-6 h-6 text-blue-600" />,
    <Eye className="w-6 h-6 text-blue-600" />,
    <ThumbsUp className="w-6 h-6 text-blue-600" />,
  ];

  const statTitles = [
    "Total Job Posts",
    "Total Applicants",
    "Profile Views",
    "Response Rate",
  ];

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Dummy data - replace with real data from your backend
      const data = {
        stats: [
          {
            title: "Total Job Posts",
            value: "12",
            change: "+3",
            trend: "up",
          },
          {
            title: "Total Applicants",
            value: "148",
            change: "+22",
            trend: "up",
          },
          {
            title: "Profile Views",
            value: "1,234",
            change: "+127",
            trend: "up",
          },
          {
            title: "Response Rate",
            value: "94%",
            change: "-2",
            trend: "down",
          },
        ],
        recentJobs: [
          {
            id: 1,
            title: "Senior Frontend Developer",
            department: "Engineering",
            location: "Remote",
            applicants: 24,
            newApplicants: 5,
            status: "Active",
            posted: "2 days ago",
            topMatch: 92,
          },
          {
            id: 2,
            title: "Product Designer",
            department: "Design",
            location: "New York, NY",
            applicants: 18,
            newApplicants: 3,
            status: "Active",
            posted: "3 days ago",
            topMatch: 88,
          },
          {
            id: 3,
            title: "Marketing Manager",
            department: "Marketing",
            location: "San Francisco, CA",
            applicants: 31,
            newApplicants: 0,
            status: "Closed",
            posted: "1 week ago",
            topMatch: 85,
          },
          {
            id: 4,
            title: "Marketing Manager",
            department: "Marketing",
            location: "San Francisco, CA",
            applicants: 31,
            newApplicants: 0,
            status: "Closed",
            posted: "1 week ago",
            topMatch: 85,
          },
          {
            id: 5,
            title: "Marketing Manager",
            department: "Marketing",
            location: "San Francisco, CA",
            applicants: 31,
            newApplicants: 0,
            status: "Closed",
            posted: "1 week ago",
            topMatch: 85,
          },
          {
            id: 6,
            title: "Marketing Manager",
            department: "Marketing",
            location: "San Francisco, CA",
            applicants: 31,
            newApplicants: 0,
            status: "Closed",
            posted: "1 week ago",
            topMatch: 85,
          },
        ],
        recentApplicants: [
          {
            id: 1,
            name: "Sarah Johnson",
            role: "Senior Frontend Developer",
            status: "New",
            applied: "2 hours ago",
            photo: "https://randomuser.me/api/portraits/women/44.jpg",
            match_score: 92,
          },
          {
            id: 2,
            name: "Michael Chen",
            role: "Product Designer",
            status: "Reviewed",
            applied: "5 hours ago",
            photo: "https://randomuser.me/api/portraits/men/32.jpg",
            match_score: 88,
          },
          {
            id: 3,
            name: "Emily Davis",
            role: "Marketing Manager",
            status: "New",
            applied: "1 day ago",
            photo: "https://randomuser.me/api/portraits/women/67.jpg",
            match_score: 85,
          },
          {
            id: 4,
            name: "Emily Davis",
            role: "Marketing Manager",
            status: "New",
            applied: "1 day ago",
            photo: "https://randomuser.me/api/portraits/women/67.jpg",
            match_score: 85,
          },
          {
            id: 5,
            name: "Emily Davis",
            role: "Marketing Manager",
            status: "New",
            applied: "1 day ago",
            photo: "https://randomuser.me/api/portraits/women/67.jpg",
            match_score: 85,
          },
          {
            id: 6,
            name: "Emily Davis",
            role: "Marketing Manager",
            status: "New",
            applied: "1 day ago",
            photo: "https://randomuser.me/api/portraits/women/67.jpg",
            match_score: 85,
          },
        ],
      };

      setDashboardData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Handle card clicks
  const handleJobCardClick = (jobId) => {
    // Navigate to the result page with a flag indicating we came from dashboard
    navigate("/result", { state: { fromDashboard: true } });
  };

  const handleApplicantCardClick = (applicantId) => {
    navigate(`/business/review-applicant/${applicantId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header with Time Range Selector - Keep static */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Business Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, Acme Corporation</p>
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

      {/* Stats Grid - Show skeleton only for values */}
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
                {loading ? (
                  <div className="w-10 h-5 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <div
                    className={`flex items-center ${
                      dashboardData.stats[index].trend === "up"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {dashboardData.stats[index].trend === "up" ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {dashboardData.stats[index].change}
                  </div>
                )}
              </div>
              {loading ? (
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-1"></div>
              ) : (
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  {dashboardData.stats[index].value}
                </h3>
              )}
              <p className="text-sm md:text-base text-gray-600">
                {statTitles[index]}
              </p>
            </div>
          ))}
      </div>

      {/* Main Content Grid - With symmetrical cards */}
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

          {loading ? (
            // Skeleton for recent jobs - keep icons visible
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
          ) : (
            // Actual jobs when loaded
            <div className="space-y-3 md:space-y-4">
              {dashboardData.recentJobs.slice(0, 5).map((job) => (
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
                      <Users className="w-4 h-4 text-gray-400 mr-1 flex-shrink-0" />
                      <span className="text-sm text-gray-600 mr-3">
                        {job.applicants}
                      </span>

                      {job.newApplicants > 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1 md:mt-0">
                          +{job.newApplicants} new
                        </span>
                      )}
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
                      to={`/business/job-applicants/${job.id}`}
                      className="text-blue-600 hover:text-blue-700 text-xs md:text-sm mt-2 whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()} // Prevent card click when clicking this link
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

          {loading ? (
            // Skeleton for recent applicants - keep static text
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
          ) : (
            // Actual applicants when loaded
            <div className="space-y-3 md:space-y-4">
              {dashboardData.recentApplicants.slice(0, 5).map((applicant) => (
                <div
                  key={applicant.id}
                  onClick={() => handleApplicantCardClick(applicant.id)}
                  className="flex items-center justify-between p-3 md:p-4 h-auto min-h-[5rem] md:h-24 rounded-lg border border-gray-100 hover:border-blue-500 hover:bg-blue-50/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <img
                      src={applicant.photo}
                      alt={applicant.name}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover mr-2 md:mr-3 border border-gray-200 flex-shrink-0"
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
    </div>
  );
};

export default BusinessDashboard;
