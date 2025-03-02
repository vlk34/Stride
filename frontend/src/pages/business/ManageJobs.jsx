import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Search,
  Users,
  Calendar,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  X,
  AlertTriangle,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

const ManageJobs = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [jobToDeleteTitle, setJobToDeleteTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call with 500ms delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Dummy data - replace with real data
      const jobsData = [
        {
          id: 1,
          title: "Senior Frontend Developer",
          department: "Engineering",
          location: "Remote",
          type: "Full-time",
          applicants: 24,
          status: "Active",
          posted: "2 days ago",
          closing: "2 weeks left",
        },
        {
          id: 2,
          title: "Product Designer",
          department: "Design",
          location: "New York, NY",
          type: "Full-time",
          applicants: 18,
          status: "Active",
          posted: "3 days ago",
          closing: "3 weeks left",
        },
        {
          id: 3,
          title: "Marketing Manager",
          department: "Marketing",
          location: "San Francisco, CA",
          type: "Full-time",
          applicants: 31,
          status: "Closed",
          posted: "1 week ago",
          closing: "Closed",
        },
        {
          id: 4,
          title: "DevOps Engineer",
          department: "Engineering",
          location: "Remote",
          type: "Full-time",
          applicants: 15,
          status: "Active",
          posted: "5 days ago",
          closing: "1 week left",
        },
        {
          id: 5,
          title: "Customer Success Manager",
          department: "Customer Support",
          location: "Chicago, IL",
          type: "Full-time",
          applicants: 27,
          status: "Draft",
          posted: "Not posted",
          closing: "N/A",
        },
      ];

      setJobs(jobsData);
      setFilteredJobs(jobsData);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Filter jobs based on search term and active tab
  useEffect(() => {
    if (jobs.length === 0) return;

    const filtered = jobs.filter((job) => {
      // First filter by tab (status)
      const statusMatch =
        activeTab === "all" || job.status.toLowerCase() === activeTab;

      // Then filter by search term
      const searchMatch =
        searchTerm === "" ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.type.toLowerCase().includes(searchTerm.toLowerCase());

      return statusMatch && searchMatch;
    });

    setFilteredJobs(filtered);
  }, [searchTerm, activeTab, jobs]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteClick = (job) => {
    setJobToDelete(job.id);
    setJobToDeleteTitle(job.title);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    // In a real app, you would send a delete request to your API
    console.log("Deleting job:", jobToDelete);
    // Close the modal after deletion
    setShowDeleteConfirm(false);
    setJobToDelete(null);
    setJobToDeleteTitle("");
  };

  // Add a function to handle view job click
  const handleViewJobClick = (jobId) => {
    // Navigate to the result page with a flag to select the first job
    navigate("/result", { state: { fromDashboard: true } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header - Static */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Manage Jobs
          </h1>
          <p className="text-gray-600">Create and manage your job listings</p>
        </div>
        <Link
          to="/business/create-job-listing"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto text-center sm:text-left"
        >
          Create New Job
        </Link>
      </div>

      {/* Filters and Search - Updated with onChange handler */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        {/* Status Tabs - Add 'all' tab */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["all", "active", "draft", "closed", "expired"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium capitalize whitespace-nowrap ${
                activeTab === tab
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              disabled={loading}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs List - Update to use filteredJobs instead of jobs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Table Header - Hidden on Mobile */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Job Details
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Applicants
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  // Skeleton rows for loading state
                  Array(5)
                    .fill()
                    .map((_, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="w-4 h-4 mr-2" />
                            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
                            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <div className="p-2 text-gray-400">
                              <Eye className="w-5 h-5" />
                            </div>
                            <div className="p-2 text-gray-400">
                              <Edit className="w-5 h-5" />
                            </div>
                            <div className="p-2 text-gray-400">
                              <Trash2 className="w-5 h-5" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                ) : // Actual job data when loaded - use filteredJobs instead of jobs
                filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {job.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {job.department} • {job.location} • {job.type}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          {job.applicants} applicants
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            job.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : job.status === "Draft"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          <p>Posted {job.posted}</p>
                          <p className="text-gray-500">{job.closing}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleViewJobClick(job.id)}
                            className="p-2 text-gray-600 hover:text-blue-600"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <Link
                            to={`/business/edit-job/${job.id}`}
                            className="p-2 text-gray-600 hover:text-blue-600"
                          >
                            <Edit className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(job)}
                            className="p-2 text-gray-600 hover:text-red-600"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <Search className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="text-lg font-medium">No jobs found</p>
                        <p className="text-sm">
                          Try adjusting your search or filter criteria
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View - Update to use filteredJobs */}
        <div className="md:hidden divide-y divide-gray-200">
          {loading ? (
            // Skeleton cards for loading state on mobile
            Array(5)
              .fill()
              .map((_, index) => (
                <div key={index} className="p-4">
                  <div className="h-5 w-full max-w-[200px] bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-full max-w-[150px] bg-gray-200 rounded animate-pulse mb-3"></div>

                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-gray-400" />
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="p-2 text-gray-400">
                        <Eye className="w-5 h-5" />
                      </div>
                      <div className="p-2 text-gray-400">
                        <Edit className="w-5 h-5" />
                      </div>
                      <div className="p-2 text-gray-400">
                        <Trash2 className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : // Actual job cards for mobile - use filteredJobs
          filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="p-4 hover:bg-gray-50">
                <h3 className="font-medium text-gray-900 mb-1">{job.title}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {job.department} • {job.location} • {job.type}
                </p>

                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {job.applicants} applicants
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      job.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : job.status === "Draft"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-600">
                    <p>Posted {job.posted}</p>
                    <p className="text-gray-500">{job.closing}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleViewJobClick(job.id)}
                      className="p-2 text-gray-600 hover:text-blue-600"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <Link
                      to={`/business/edit-job/${job.id}`}
                      className="p-2 text-gray-600 hover:text-blue-600"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(job)}
                      className="p-2 text-gray-600 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <div className="flex flex-col items-center">
                <Search className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-lg font-medium">No jobs found</p>
                <p className="text-sm">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Delete Confirmation Modal - Made responsive */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-red-50 px-4 sm:px-6 py-4 border-b border-red-100 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-red-800">
                  Delete Job Listing
                </h3>
              </div>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-4 sm:px-6 py-5">
              <p className="text-gray-700 mb-4">
                You are about to delete the job listing:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <p className="font-medium text-gray-900">{jobToDeleteTitle}</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-yellow-800 font-medium">Warning</p>
                  <p className="text-yellow-700 text-sm">
                    This action cannot be undone. This will permanently delete
                    the job listing and remove all associated applicant data.
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Please confirm that you want to proceed with this action.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center order-1 sm:order-2"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
