import React, { useState } from "react";

// Modal component for editing a job
const EditJobModal = ({ job, onClose, onSubmit }) => {
  const [editedJob, setEditedJob] = useState({
    title: job.title,
    company: job.company,
    location: job.location,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...job, ...editedJob });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Edit Job</h3>
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

const ManageJobs = ({ jobs, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobToEdit, setJobToEdit] = useState(null);

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const openEditModal = (job) => {
    setJobToEdit(job);
  };

  const closeEditModal = () => {
    setJobToEdit(null);
  };

  const handleEditSubmit = (updatedJob) => {
    onEdit(updatedJob);
    closeEditModal();
  };

  const handleDeleteClick = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      onDelete(jobId);
    }
  };

  return (
    <div className="bg-white rounded p-6 shadow relative">
      <h2 className="text-2xl font-bold mb-4">Manage Jobs</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      {/* Jobs Table */}
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Job ID</th>
            <th className="text-left p-3">Title</th>
            <th className="text-left p-3">Company</th>
            <th className="text-left p-3">Location</th>
            <th className="p-3"></th> {/* Removed header text for actions */}
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map((job) => (
            <tr key={job.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{job.id}</td>
              <td className="p-3">{job.title}</td>
              <td className="p-3">{job.company}</td>
              <td className="p-3">{job.location}</td>
              <td className="p-3 text-right">
                <button
                  onClick={() => openEditModal(job)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(job.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default ManageJobs;
