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
} from "lucide-react";
import { Link } from "react-router";

const BusinessDashboard = () => {
  const [timeRange, setTimeRange] = useState("week");

  // Dummy data - replace with real data from your backend
  const stats = [
    {
      title: "Total Job Posts",
      value: "12",
      change: "+3",
      trend: "up",
      icon: <Briefcase className="w-6 h-6" />,
    },
    {
      title: "Total Applicants",
      value: "148",
      change: "+22",
      trend: "up",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Profile Views",
      value: "1,234",
      change: "+127",
      trend: "up",
      icon: <Eye className="w-6 h-6" />,
    },
    {
      title: "Response Rate",
      value: "94%",
      change: "-2",
      trend: "down",
      icon: <ThumbsUp className="w-6 h-6" />,
    },
  ];

  const recentJobs = [
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
  ];

  const recentApplicants = [
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
  ];

  // Hiring pipeline data
  const pipelineData = {
    applied: 115,
    reviewed: 78,
    offered: 12,
    hired: 4,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header with Time Range Selector */}
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                {React.cloneElement(stat.icon, {
                  className: "w-6 h-6 text-blue-600",
                })}
              </div>
              {stat.trend === "up" ? (
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.change}
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  {stat.change}
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </h3>
            <p className="text-gray-600">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Hiring Pipeline Visualization */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Hiring Pipeline
          </h2>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-2 md:gap-0">
            {/* Applied */}
            <div className="flex-1 relative">
              <div className="h-2 bg-blue-500 rounded-l-full"></div>
              <div className="absolute top-4 left-0 text-center w-full">
                <div className="text-lg font-bold text-gray-900">
                  {pipelineData.applied}
                </div>
                <div className="text-xs text-gray-600">Applied</div>
              </div>
            </div>

            {/* Reviewed */}
            <div className="flex-1 relative">
              <div className="h-2 bg-indigo-500"></div>
              <div className="absolute top-4 left-0 text-center w-full">
                <div className="text-lg font-bold text-gray-900">
                  {pipelineData.reviewed}
                </div>
                <div className="text-xs text-gray-600">Reviewed</div>
              </div>
            </div>

            {/* Offered */}
            <div className="flex-1 relative">
              <div className="h-2 bg-green-500"></div>
              <div className="absolute top-4 left-0 text-center w-full">
                <div className="text-lg font-bold text-gray-900">
                  {pipelineData.offered}
                </div>
                <div className="text-xs text-gray-600">Offered</div>
              </div>
            </div>

            {/* Hired */}
            <div className="flex-1 relative">
              <div className="h-2 bg-green-700 rounded-r-full"></div>
              <div className="absolute top-4 left-0 text-center w-full">
                <div className="text-lg font-bold text-gray-900">
                  {pipelineData.hired}
                </div>
                <div className="text-xs text-gray-600">Hired</div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <span className="font-medium text-green-600">
                {Math.round((pipelineData.hired / pipelineData.applied) * 100)}%
              </span>{" "}
              conversion rate from application to hire
            </div>
            <div className="text-sm text-gray-600">
              Average time to hire: <span className="font-medium">18 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid - With symmetrical cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Jobs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Jobs</h2>
            <Link
              to="/business/manage/jobs"
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentJobs.slice(0, 5).map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between p-4 h-24 rounded-lg border border-gray-100 hover:border-blue-500 transition-colors"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600">
                    {job.department} • {job.location}
                  </p>
                  <div className="flex items-center mt-1">
                    <Users className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600 mr-3">
                      {job.applicants}
                    </span>

                    {job.newApplicants > 0 && (
                      <>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          +{job.newApplicants} new
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      job.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {job.status}
                  </span>
                  <Link
                    to={`/business/job-applicants/${job.id}`}
                    className="text-blue-600 hover:text-blue-700 text-sm mt-2"
                  >
                    View Applicants
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applicants */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
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
          <div className="space-y-4">
            {recentApplicants.slice(0, 5).map((applicant) => (
              <div
                key={applicant.id}
                className="flex items-center justify-between p-4 h-24 rounded-lg border border-gray-100 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center">
                  <img
                    src={applicant.photo}
                    alt={applicant.name}
                    className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-200"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {applicant.name}
                    </h3>
                    <p className="text-sm text-gray-600">{applicant.role}</p>
                    <p className="text-xs text-gray-500">
                      Applied {applicant.applied}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      applicant.status === "New"
                        ? "bg-blue-100 text-blue-700"
                        : applicant.status === "Reviewed"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {applicant.status}
                  </span>
                  <div className="text-sm font-medium text-purple-700 mt-2">
                    {applicant.match_score}% match
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
