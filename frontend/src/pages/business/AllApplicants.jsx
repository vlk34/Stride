import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Users,
  Search,
  Filter,
  ChevronDown,
  Brain,
  FileText,
  Mail,
  Phone,
  Calendar,
  Star,
  MessageSquare,
  Download,
  Briefcase,
  SlidersHorizontal,
  X,
  Check,
  ArrowUpDown,
} from "lucide-react";

const AllApplicants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedJob, setSelectedJob] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  // Dummy data - replace with real data from your backend
  const jobs = [
    { id: "all", title: "All Jobs" },
    { id: "1", title: "Senior Frontend Developer" },
    { id: "2", title: "Product Designer" },
    { id: "3", title: "Marketing Manager" },
    { id: "4", title: "DevOps Engineer" },
  ];

  const applicants = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Frontend Developer",
      jobId: "1",
      status: "New",
      applied: "2 days ago",
      date: "2023-10-15",
      email: "sarah.j@example.com",
      phone: "+1 234 567 8900",
      location: "San Francisco, CA",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      match_score: 92,
      skills: ["React", "TypeScript", "Node.js"],
      hasResume: true,
      hasCoverLetter: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Designer",
      jobId: "2",
      status: "Reviewed",
      applied: "3 days ago",
      date: "2023-10-14",
      email: "m.chen@example.com",
      phone: "+1 234 567 8901",
      location: "New York, NY",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      match_score: 88,
      skills: ["Figma", "UI/UX", "Prototyping"],
      hasResume: true,
      hasCoverLetter: false,
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Marketing Manager",
      jobId: "3",
      status: "Shortlisted",
      applied: "5 days ago",
      date: "2023-10-12",
      email: "e.davis@example.com",
      phone: "+1 234 567 8902",
      location: "Chicago, IL",
      photo: "https://randomuser.me/api/portraits/women/67.jpg",
      match_score: 85,
      skills: ["Content Strategy", "SEO", "Social Media"],
      hasResume: true,
      hasCoverLetter: true,
    },
    {
      id: 4,
      name: "James Wilson",
      role: "DevOps Engineer",
      jobId: "4",
      status: "New",
      applied: "1 week ago",
      date: "2023-10-10",
      email: "j.wilson@example.com",
      phone: "+1 234 567 8903",
      location: "Austin, TX",
      photo: "https://randomuser.me/api/portraits/men/52.jpg",
      match_score: 79,
      skills: ["AWS", "Docker", "Kubernetes"],
      hasResume: true,
      hasCoverLetter: false,
    },
    {
      id: 5,
      name: "Olivia Martinez",
      role: "Senior Frontend Developer",
      jobId: "1",
      status: "Offered",
      applied: "2 weeks ago",
      date: "2023-10-03",
      email: "o.martinez@example.com",
      phone: "+1 234 567 8904",
      location: "Seattle, WA",
      photo: "https://randomuser.me/api/portraits/women/28.jpg",
      match_score: 94,
      skills: ["React", "JavaScript", "CSS"],
      hasResume: true,
      hasCoverLetter: true,
    },
    {
      id: 6,
      name: "Daniel Thompson",
      role: "Product Designer",
      jobId: "2",
      status: "Rejected",
      applied: "2 weeks ago",
      date: "2023-10-03",
      email: "d.thompson@example.com",
      phone: "+1 234 567 8905",
      location: "Boston, MA",
      photo: "https://randomuser.me/api/portraits/men/45.jpg",
      match_score: 72,
      skills: ["Adobe XD", "Sketch", "UI Design"],
      hasResume: true,
      hasCoverLetter: true,
    },
    {
      id: 7,
      name: "Sophia Lee",
      role: "Marketing Manager",
      jobId: "3",
      status: "New",
      applied: "3 weeks ago",
      date: "2023-09-26",
      email: "s.lee@example.com",
      phone: "+1 234 567 8906",
      location: "Los Angeles, CA",
      photo: "https://randomuser.me/api/portraits/women/33.jpg",
      match_score: 82,
      skills: ["Content Marketing", "Analytics", "Copywriting"],
      hasResume: true,
      hasCoverLetter: true,
    },
    {
      id: 8,
      name: "Noah Rodriguez",
      role: "Senior Frontend Developer",
      jobId: "1",
      status: "Hired",
      applied: "1 month ago",
      date: "2023-09-15",
      email: "n.rodriguez@example.com",
      phone: "+1 234 567 8907",
      location: "Denver, CO",
      photo: "https://randomuser.me/api/portraits/men/36.jpg",
      match_score: 95,
      skills: ["React", "TypeScript", "Redux"],
      hasResume: true,
      hasCoverLetter: true,
    },
  ];

  // Filter and sort applicants
  const filteredApplicants = applicants
    .filter((applicant) => {
      // Filter by search term
      const matchesSearch =
        applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.role.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by status
      const matchesStatus =
        selectedStatus === "all" || applicant.status === selectedStatus;

      // Filter by job
      const matchesJob =
        selectedJob === "all" || applicant.jobId === selectedJob;

      return matchesSearch && matchesStatus && matchesJob;
    })
    .sort((a, b) => {
      // Sort by selected criteria
      if (sortBy === "date") {
        return sortOrder === "desc"
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date);
      } else if (sortBy === "name") {
        return sortOrder === "desc"
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name);
      } else if (sortBy === "match") {
        return sortOrder === "desc"
          ? b.match_score - a.match_score
          : a.match_score - b.match_score;
      }
      return 0;
    });

  // Status options
  const statusOptions = [
    { id: "all", label: "All Statuses" },
    { id: "New", label: "New" },
    { id: "Reviewed", label: "Reviewed" },
    { id: "Shortlisted", label: "Shortlisted" },
    { id: "Offered", label: "Offered" },
    { id: "Hired", label: "Hired" },
    { id: "Rejected", label: "Rejected" },
  ];

  // Toggle sort order
  const toggleSortOrder = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700";
      case "Reviewed":
        return "bg-yellow-100 text-yellow-700";
      case "Shortlisted":
        return "bg-indigo-100 text-indigo-700";
      case "Offered":
        return "bg-green-100 text-green-700";
      case "Hired":
        return "bg-green-700 text-white";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Applicants</h1>
          <p className="text-gray-600">
            {filteredApplicants.length} applicants across all job postings
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>

          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search applicants by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Job Filter */}
          <div className="md:w-64">
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Advanced Filters (collapsible) */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Match Score
              </label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option>Any Score</option>
                <option>90% and above</option>
                <option>80% and above</option>
                <option>70% and above</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Application Date
              </label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option>Any Time</option>
                <option>Last 24 hours</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Documents
              </label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option>Any</option>
                <option>Has Resume</option>
                <option>Has Cover Letter</option>
                <option>Has Both</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Applicants Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredApplicants.length === 0 ? (
          <div className="py-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No applicants found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? `No applicants matching "${searchTerm}"`
                : "Try adjusting your filters"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <button
                      onClick={() => toggleSortOrder("name")}
                      className="flex items-center"
                    >
                      Applicant
                      {sortBy === "name" && (
                        <ArrowUpDown className="w-4 h-4 ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Job
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <button
                      onClick={() => toggleSortOrder("match")}
                      className="flex items-center"
                    >
                      Match
                      {sortBy === "match" && (
                        <ArrowUpDown className="w-4 h-4 ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <button
                      onClick={() => toggleSortOrder("date")}
                      className="flex items-center"
                    >
                      Applied
                      {sortBy === "date" && (
                        <ArrowUpDown className="w-4 h-4 ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={applicant.photo}
                          alt={applicant.name}
                          className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-200"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {applicant.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {applicant.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {applicant.role}
                      </div>
                      <div className="text-xs text-gray-500">
                        {applicant.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-purple-700">
                        {applicant.match_score}%
                      </div>
                      <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-purple-600 h-1.5 rounded-full"
                          style={{ width: `${applicant.match_score}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                          applicant.status
                        )}`}
                      >
                        {applicant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {applicant.applied}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/business/review-applicant/${applicant.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Review
                        </Link>
                        <button className="text-gray-500 hover:text-gray-700">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllApplicants;
