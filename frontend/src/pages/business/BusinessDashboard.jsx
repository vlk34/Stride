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
      status: "Interviewing",
      applied: "1 day ago",
      photo: "https://randomuser.me/api/portraits/women/67.jpg",
      match_score: 85,
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Marketing Manager",
      status: "Interviewing",
      applied: "1 day ago",
      photo: "https://randomuser.me/api/portraits/women/67.jpg",
      match_score: 85,
    },
    {
      id: 5,
      name: "Emily Davis",
      role: "Marketing Manager",
      status: "Interviewing",
      applied: "1 day ago",
      photo: "https://randomuser.me/api/portraits/women/67.jpg",
      match_score: 85,
    },
    {
      id: 6,
      name: "Emily Davis",
      role: "Marketing Manager",
      status: "Interviewing",
      applied: "1 day ago",
      photo: "https://randomuser.me/api/portraits/women/67.jpg",
      match_score: 85,
    },
  ];

  // Upcoming interviews
  const upcomingInterviews = [
    {
      id: 1,
      candidate: "James Wilson",
      role: "DevOps Engineer",
      date: "Today",
      time: "2:00 PM",
      type: "Technical",
      photo: "https://randomuser.me/api/portraits/men/52.jpg",
    },
    {
      id: 2,
      candidate: "Olivia Martinez",
      role: "Senior Frontend Developer",
      date: "Tomorrow",
      time: "11:30 AM",
      type: "Final",
      photo: "https://randomuser.me/api/portraits/women/28.jpg",
    },
  ];

  // Notifications
  const notifications = [
    {
      id: 1,
      type: "application",
      message: "New application for Senior Frontend Developer",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "interview",
      message: "Interview scheduled with Michael Chen",
      time: "Yesterday",
    },
    {
      id: 3,
      type: "message",
      message: "Emily Davis sent you a message",
      time: "2 days ago",
    },
  ];

  // Hiring pipeline data
  const pipelineData = {
    applied: 115,
    reviewed: 78,
    interviewing: 42,
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
          <Link
            to="/hiring-pipeline"
            className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
          >
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
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

            {/* Interviewing */}
            <div className="flex-1 relative">
              <div className="h-2 bg-purple-500"></div>
              <div className="absolute top-4 left-0 text-center w-full">
                <div className="text-lg font-bold text-gray-900">
                  {pipelineData.interviewing}
                </div>
                <div className="text-xs text-gray-600">Interviewing</div>
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Jobs */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Jobs</h2>
            <Link
              to="/manage-jobs"
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-blue-500 transition-colors"
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
                    to={`/job-applicants/${job.id}`}
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
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Applicants
            </h2>
            <Link
              to="/applicants"
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentApplicants.map((applicant) => (
              <div
                key={applicant.id}
                className="flex items-center p-4 rounded-lg border border-gray-100 hover:border-blue-500 transition-colors"
              >
                <img
                  src={applicant.photo}
                  alt={applicant.name}
                  className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-200"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {applicant.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {applicant.role} • Applied {applicant.applied}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      applicant.status === "New"
                        ? "bg-blue-100 text-blue-700"
                        : applicant.status === "Reviewed"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {applicant.status}
                  </span>
                  <div className="text-sm font-medium text-purple-700 mt-1">
                    {applicant.match_score}% match
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Upcoming Interviews & Notifications */}
        <div className="lg:col-span-1 space-y-8">
          {/* Upcoming Interviews */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Upcoming Interviews
              </h2>
              <Link
                to="/interviews"
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
              >
                Schedule
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {upcomingInterviews.length > 0 ? (
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="flex items-center p-4 rounded-lg border border-gray-100 hover:border-blue-500 transition-colors"
                  >
                    <img
                      src={interview.photo}
                      alt={interview.candidate}
                      className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-200"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {interview.candidate}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {interview.role} • {interview.type} Interview
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        {interview.date}
                      </div>
                      <div className="text-sm text-gray-600">
                        {interview.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No upcoming interviews</p>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Notifications
              </h2>
              <Link
                to="/notifications"
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
              >
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 rounded-full bg-blue-50 mr-3">
                    {notification.type === "application" ? (
                      <FileText className="w-5 h-5 text-blue-600" />
                    ) : notification.type === "interview" ? (
                      <Calendar className="w-5 h-5 text-purple-600" />
                    ) : (
                      <MessageSquare className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
