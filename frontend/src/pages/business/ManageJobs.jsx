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
  Loader,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import {
  useCompanyJobs,
  useDeleteJob,
  getRelativeTime,
  getTimeRemaining,
} from "../../hooks/tanstack/useBusinessDashboard";

const ManageJobs = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [jobToDeleteTitle, setJobToDeleteTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();

  // Use TanStack Query to fetch jobs
  const { data: jobs = [], isLoading, error } = useCompanyJobs();

  // Use mutation for job deletion
  const deleteJobMutation = useDeleteJob();

  // Filter jobs based on search term and active tab
  useEffect(() => {
    if (!jobs || jobs.length === 0) {
      setFilteredJobs([]);
      return;
    }

    // Create a stable copy of the jobs array
    const jobsCopy = [...jobs];

    const filtered = jobsCopy.filter((job) => {
      // Determine job status based on deadline
      const jobStatus = determineJobStatus(job);

      // First filter by tab (status)
      const statusMatch =
        activeTab === "all" || jobStatus.toLowerCase() === activeTab;

      // Then filter by search term
      const searchMatch =
        searchTerm === "" ||
        (job.title &&
          job.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (job.department &&
          job.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (job.location &&
          job.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (job.job_type &&
          job.job_type.toLowerCase().includes(searchTerm.toLowerCase()));

      return statusMatch && searchMatch;
    });

    setFilteredJobs(filtered);
  }, [searchTerm, activeTab, jobs]);

  // Helper function to determine job status based on available data
  const determineJobStatus = (job) => {
    if (!job.deadline) return "Draft";

    const now = new Date();
    const deadlineDate = new Date(job.deadline);

    if (deadlineDate < now) {
      return "Expired";
    }

    return "Active";
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteClick = (job) => {
    setJobToDelete(job.job_id);
    setJobToDeleteTitle(job.title);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteJobMutation.mutateAsync(jobToDelete);
      // Close the modal after deletion
      setShowDeleteConfirm(false);
      setJobToDelete(null);
      setJobToDeleteTitle("");
    } catch (error) {
      console.error("Error deleting job:", error);
      // You could add an error notification here
    }
  };

  // Function to handle view job click
  const handleViewJobClick = (jobId) => {
    navigate(`/business/job-details/${jobId}`);
  };

  // Format job for display
  const formatJobForDisplay = (job) => {
    const status = determineJobStatus(job);
    const applicantCount = job.applicant_count || 0; // This might need to be fetched separately

    return {
      id: job.job_id,
      title: job.title || "Untitled Job",
      department: job.department || "General",
      location: job.location || "Unspecified",
      type: job.job_type
        ? job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1)
        : "Unspecified",
      applicants: applicantCount,
      status: status,
      posted: job.created_at ? getRelativeTime(job.created_at) : "Recently",
      closing: job.deadline ? getTimeRemaining(job.deadline) : "No deadline",
    };
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

      {/* Error message if data fetching fails */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Error Loading Jobs
              </h3>
              <p className="text-sm text-red-600 mt-1">
                {error.message ||
                  "There was an error loading your job listings. Please try again."}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["all", "active", "draft", "expired"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium capitalize whitespace-nowrap ${
                activeTab === tab
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              disabled={isLoading}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs List */}
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
                {isLoading ? (
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
                ) : filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => {
                    const formattedJob = formatJobForDisplay(job);
                    return (
                      <tr key={formattedJob.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {formattedJob.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {formattedJob.department} •{" "}
                              {formattedJob.location} • {formattedJob.type}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="w-4 h-4 mr-2" />
                            {formattedJob.applicants} applicants
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              formattedJob.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : formattedJob.status === "Draft"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {formattedJob.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <p>Posted {formattedJob.posted}</p>
                            <p className="text-gray-500">
                              {formattedJob.closing}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() =>
                                handleViewJobClick(formattedJob.id)
                              }
                              className="p-2 text-gray-600 hover:text-blue-600"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <Link
                              to={`/business/edit-job/${formattedJob.id}`}
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
                    );
                  })
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
                          {activeTab !== "all"
                            ? `No ${activeTab} jobs found. Try changing your filter.`
                            : "Try adjusting your search criteria or create your first job listing."}
                        </p>
                        {activeTab === "all" && jobs.length === 0 && (
                          <Link
                            to="/business/create-job-listing"
                            className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Create Job Listing
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-200">
          {isLoading ? (
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
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const formattedJob = formatJobForDisplay(job);
              return (
                <div key={formattedJob.id} className="p-4 hover:bg-gray-50">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {formattedJob.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {formattedJob.department} • {formattedJob.location} •{" "}
                    {formattedJob.type}
                  </p>

                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {formattedJob.applicants} applicants
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        formattedJob.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : formattedJob.status === "Draft"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {formattedJob.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-600">
                      <p>Posted {formattedJob.posted}</p>
                      <p className="text-gray-500">{formattedJob.closing}</p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleViewJobClick(formattedJob.id)}
                        className="p-2 text-gray-600 hover:text-blue-600"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <Link
                        to={`/business/edit-job/${formattedJob.id}`}
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
              );
            })
          ) : (
            <div className="p-8 text-center text-gray-500">
              <div className="flex flex-col items-center">
                <Search className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-lg font-medium">No jobs found</p>
                <p className="text-sm">
                  {activeTab !== "all"
                    ? `No ${activeTab} jobs found. Try changing your filter.`
                    : "Try adjusting your search criteria or create your first job listing."}
                </p>
                {activeTab === "all" && jobs.length === 0 && (
                  <Link
                    to="/business/create-job-listing"
                    className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Job Listing
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal with loading state */}
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
                disabled={deleteJobMutation.isPending}
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
                disabled={deleteJobMutation.isPending}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteJobMutation.isPending}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center order-1 sm:order-2 disabled:bg-red-400"
              >
                {deleteJobMutation.isPending ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Job
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
