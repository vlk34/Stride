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
} from "lucide-react";
import { Link } from "react-router";

const Applicants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call with 500ms delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Dummy data - replace with real data from your backend
      const jobListings = [
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
          title: "DevOps Engineer",
          department: "Engineering",
          location: "Remote",
          applicants: 15,
          newApplicants: 2,
          status: "Active",
          posted: "5 days ago",
          topMatch: 90,
        },
        {
          id: 5,
          title: "Customer Success Manager",
          department: "Customer Support",
          location: "Chicago, IL",
          applicants: 27,
          newApplicants: 4,
          status: "Active",
          posted: "1 week ago",
          topMatch: 87,
        },
      ];

      // Recent applicants across all jobs
      const recentApplicants = [
        {
          id: 1,
          name: "Sarah Johnson",
          jobTitle: "Senior Frontend Developer",
          status: "New",
          applied: "2 hours ago",
          match_score: 92,
        },
        {
          id: 2,
          name: "Michael Chen",
          jobTitle: "Product Designer",
          status: "New",
          applied: "5 hours ago",
          match_score: 88,
        },
        {
          id: 3,
          name: "Emily Davis",
          jobTitle: "Marketing Manager",
          status: "Reviewed",
          applied: "1 day ago",
          match_score: 85,
        },
      ];

      // Stats for the dashboard
      const stats = [
        {
          title: "Total Applicants",
          value: jobListings.reduce((sum, job) => sum + job.applicants, 0),
          icon: <Users className="w-6 h-6 text-blue-600" />,
        },
        {
          title: "New This Week",
          value: jobListings.reduce((sum, job) => sum + job.newApplicants, 0),
          icon: <TrendingUp className="w-6 h-6 text-green-600" />,
        },
        {
          title: "Active Jobs",
          value: jobListings.filter((job) => job.status === "Active").length,
          icon: <Briefcase className="w-6 h-6 text-purple-600" />,
        },
      ];

      setData({ jobListings, recentApplicants, stats });
      setLoading(false);
    };

    fetchData();
  }, []);

  // Filter job listings based on search term and status
  const filteredJobs = !loading
    ? data.jobListings.filter((job) => {
        const matchesSearch =
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
          filterStatus === "all" ||
          job.status.toLowerCase() === filterStatus.toLowerCase();
        return matchesSearch && matchesStatus;
      })
    : [];

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
        {loading
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
          : data.stats.map((stat, index) => (
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
          {loading
            ? // Skeleton for recent applicants
              Array(3)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-100"
                  >
                    <div>
                      <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
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
            : data.recentApplicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-blue-500 transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {applicant.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Applied for {applicant.jobTitle} • {applicant.applied}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-700">
                        {applicant.match_score}%
                      </div>
                      <div className="text-xs text-purple-600">match</div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        applicant.status === "New"
                          ? "bg-blue-100 text-blue-700"
                          : applicant.status === "Reviewed"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {applicant.status}
                    </span>
                  </div>
                </div>
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
                disabled={loading}
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              disabled={loading}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
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
                <Link
                  key={job.id}
                  to={`/business/job-applicants/${job.id}`}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {job.department} • {job.location}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        job.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      {job.applicants} applicants
                    </div>
                    {job.newApplicants > 0 && (
                      <div className="flex items-center text-blue-600 text-sm font-medium">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.newApplicants} new
                      </div>
                    )}
                  </div>

                  {job.topMatch > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">
                        Top match:{" "}
                        <span className="font-medium text-purple-700">
                          {job.topMatch}%
                        </span>
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Posted {job.posted}
                    </div>
                    <div className="text-blue-600 font-medium text-sm flex items-center">
                      View Applicants
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              ))}
        </div>

        {/* Empty state - only show when not loading and no results */}
        {!loading && filteredJobs.length === 0 && (
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
