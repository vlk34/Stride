import React from "react";
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
} from "lucide-react";
import { Link } from "react-router";

const BusinessDashboard = () => {
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
      applicants: 24,
      status: "Active",
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "Product Designer",
      applicants: 18,
      status: "Active",
      posted: "3 days ago",
    },
    {
      id: 3,
      title: "Marketing Manager",
      applicants: 31,
      status: "Closed",
      posted: "1 week ago",
    },
  ];

  const recentApplicants = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Frontend Developer",
      status: "New",
      applied: "2 hours ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Designer",
      status: "Reviewed",
      applied: "5 hours ago",
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Marketing Manager",
      status: "Interviewing",
      applied: "1 day ago",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Business Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, Company Name</p>
        </div>
        <Link
          to="/post-job"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Post New Job
        </Link>
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Jobs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
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
                    {job.applicants} applicants • Posted {job.posted}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    job.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applicants */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
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
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-blue-500 transition-colors"
              >
                <div>
                  <h3 className="font-medium text-gray-900">
                    {applicant.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {applicant.role} • Applied {applicant.applied}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    applicant.status === "New"
                      ? "bg-blue-100 text-blue-700"
                      : applicant.status === "Reviewed"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {applicant.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
