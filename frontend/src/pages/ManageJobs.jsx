import React, { useState } from "react";
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
} from "lucide-react";
import { Link } from "react-router";

const ManageJobs = () => {
  const [activeTab, setActiveTab] = useState("active");

  // Dummy data - replace with real data
  const jobs = [
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
    // ... more jobs
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Jobs</h1>
          <p className="text-gray-600">Create and manage your job listings</p>
        </div>
        <Link
          to="/create-job-listing"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Job
        </Link>
      </div>

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
              />
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {["active", "draft", "closed", "expired"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                activeTab === tab
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
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
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <h3 className="font-medium text-gray-900">{job.title}</h3>
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
                      <button className="p-2 text-gray-600 hover:text-blue-600">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;
