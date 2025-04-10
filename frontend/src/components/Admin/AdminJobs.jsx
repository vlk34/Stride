import React, { useState, useEffect } from "react";
import {
  Search,
  Edit,
  Trash2,
  Plus,
  Filter,
  MoreVertical,
  Loader,
} from "lucide-react";
import {
  useAllJobs,
  useUpdateAdminJob,
  useDeleteAdminJob,
} from "../../hooks/tanstack/useAdminFunctions";

// Modal component for editing a job
const EditJobModal = ({ job, onClose, onSubmit }) => {
  const [editedJob, setEditedJob] = useState({
    job_id: job.job_id,
    title: job.title || "",
    company: job.company || "",
    location: job.location || "",
    status: job.status || "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedJob);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Edit Job</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={editedJob.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={editedJob.company}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={editedJob.location}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={editedJob.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminJobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [jobToEdit, setJobToEdit] = useState(null);
  const [activeActionMenu, setActiveActionMenu] = useState(null);

  // Fetch all jobs using TanStack Query
  const { data: allJobs = [], isLoading, error } = useAllJobs();

  // Mutations for updating and deleting jobs
  const updateJobMutation = useUpdateAdminJob();
  const deleteJobMutation = useDeleteAdminJob();

  // Process the fetched jobs data to match our component's format
  const processJobs = (jobs) => {
    return jobs.map((job) => ({
      id: job.job_id,
      job_id: job.job_id,
      title: job.title,
      company: job.company || "Unknown Company",
      location: job.location,
      department: job.department,
      workstyle: job.workstyle,
      job_type: job.job_type,
      status: determineJobStatus(job),
      date: job.deadline
        ? new Date(job.deadline).toLocaleDateString()
        : "No deadline",
      // Include any other fields needed
    }));
  };

  // Helper function to determine job status based on deadline
  const determineJobStatus = (job) => {
    if (!job.deadline) return "Pending";

    const now = new Date();
    const deadlineDate = new Date(job.deadline);

    if (deadlineDate < now) {
      return "Closed";
    }

    return "Active";
  };

  const jobs = processJobs(allJobs);

  // Filter jobs based on search query and status filter
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.location &&
        job.location.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "All" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const openEditModal = (job) => {
    setJobToEdit(job);
    setActiveActionMenu(null); // Close action menu if open
  };

  const closeEditModal = () => {
    setJobToEdit(null);
  };

  const handleEditSubmit = async (updatedJob) => {
    try {
      // Call the update job mutation with properly formatted data
      await updateJobMutation.mutateAsync({
        job_id: updatedJob.job_id,
        title: updatedJob.title,
        // Include other required fields from the API schema
        // We might need to keep existing data for fields we don't edit in the form
      });

      closeEditModal();
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job");
    }
  };

  const handleDeleteClick = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJobMutation.mutateAsync(jobId);
        setActiveActionMenu(null); // Close action menu after deletion
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("Failed to delete job");
      }
    }
  };

  const toggleActionMenu = (jobId) => {
    setActiveActionMenu(activeActionMenu === jobId ? null : jobId);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-center h-64">
        <Loader className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="ml-2 text-gray-600">Loading jobs...</span>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-red-500 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Error loading jobs: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Jobs</h2>
        <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" /> Add Job
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center">
          <Filter className="text-gray-400 w-5 h-5 mr-2" />
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Custom styles for breakpoints */}
      <style jsx>{`
        @media (min-width: 1200px) {
          .custom-lg-visible {
            display: block;
          }
          .custom-md-visible {
            display: none;
          }
        }
        @media (max-width: 819px) and (min-width: 768px) {
          .custom-lg-visible {
            display: none;
          }
          .custom-md-visible {
            display: block;
          }
        }
      `}</style>

      {filteredJobs.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No jobs found. Try adjusting your search criteria.
        </div>
      ) : (
        /* Jobs Table */
        <div className="border rounded-lg overflow-hidden">
          {/* Large screen full table - now uses custom breakpoint */}
          <div className="hidden lg:hidden custom-lg-visible">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">{job.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{job.title}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {job.company}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {job.location}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : job.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : job.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{job.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <button
                        onClick={() => openEditModal(job)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(job.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Medium screen simplified table - now uses custom breakpoint */}
          <div className="hidden md:block lg:block custom-md-visible">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                    Title
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    Company
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium truncate">{job.title}</div>
                        <div className="text-sm text-gray-500 truncate">
                          {job.company}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : job.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : job.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            job.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : job.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : job.status === "Rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {job.status}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {job.date}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => openEditModal(job)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(job.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Small screen card layout */}
          <div className="md:hidden">
            <div className="divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 bg-white relative hover:bg-gray-50"
                >
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => toggleActionMenu(job.id)}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>

                    {/* Mobile Action Menu */}
                    {activeActionMenu === job.id && (
                      <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-lg py-1 w-32 z-10">
                        <button
                          onClick={() => openEditModal(job)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                        >
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(job.id)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mb-3 pr-8">
                    <h3 className="font-medium text-lg">{job.title}</h3>
                    <p className="text-gray-600 text-sm">{job.company}</p>
                  </div>

                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm text-gray-600">{job.location}</div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : job.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : job.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">{job.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {jobToEdit && (
        <EditJobModal
          job={jobToEdit}
          onClose={closeEditModal}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default AdminJobs;
