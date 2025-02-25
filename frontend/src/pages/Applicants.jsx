import React, { useState } from "react";
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
  ArrowUpRight,
  Download,
} from "lucide-react";
import { Link } from "react-router";

const Applicants = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedJob, setSelectedJob] = useState("all");

  // Dummy data - replace with real data
  const topApplicants = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Frontend Developer",
      status: "New",
      applied: "2 hours ago",
      email: "sarah.j@example.com",
      phone: "+1 234 567 8900",
      experience: "5 years",
      match_score: 92,
      skills: ["React", "TypeScript", "Node.js"],
      hasAiAnalysis: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Senior Frontend Developer",
      status: "Reviewed",
      applied: "1 day ago",
      email: "m.chen@example.com",
      phone: "+1 234 567 8901",
      experience: "6 years",
      match_score: 89,
      skills: ["React", "Vue.js", "JavaScript"],
      hasAiAnalysis: true,
    },
    // ... more top applicants
  ];

  const otherApplicants = [
    {
      id: 3,
      name: "Emily Davis",
      role: "Senior Frontend Developer",
      status: "New",
      applied: "3 days ago",
      match_score: 75,
      email: "e.davis@example.com",
      hasAiAnalysis: true,
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Senior Frontend Developer",
      status: "New",
      applied: "3 days ago",
      match_score: 75,
      email: "e.davis@example.com",
      hasAiAnalysis: true,
    },
    {
      id: 5,
      name: "Emily Davis",
      role: "Senior Frontend Developer",
      status: "New",
      applied: "3 days ago",
      match_score: 75,
      email: "e.davis@example.com",
      hasAiAnalysis: true,
    },
    // ... more applicants
  ];

  const jobListings = [
    { id: "all", title: "All Positions" },
    { id: "1", title: "Senior Frontend Developer" },
    { id: "2", title: "Product Designer" },
    { id: "3", title: "Marketing Manager" },
  ];

  const statusTabs = [
    { id: "all", label: "All" },
    { id: "new", label: "New" },
    { id: "reviewed", label: "Reviewed" },
    { id: "interviewing", label: "Interviewing" },
    { id: "offered", label: "Offered" },
    { id: "rejected", label: "Rejected" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applicants</h1>
          <p className="text-gray-600">Manage and review your candidates</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search applicants..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Job Filter */}
          <div className="relative">
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {jobListings.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top Matches Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500" />
          <h2 className="text-xl font-semibold text-gray-900">Top Matches</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {topApplicants.map((applicant) => (
            <div
              key={applicant.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-500 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {applicant.name}
                  </h3>
                  <p className="text-sm text-gray-600">{applicant.role}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-2xl font-bold text-purple-700">
                    {applicant.match_score}%
                  </div>
                  <div className="text-xs text-purple-600">match score</div>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {applicant.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {applicant.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {applicant.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Applied {applicant.applied}
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/review-applicant/${applicant.id}`}
                  state={{ applicantData: applicant }}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Review Application
                </Link>
                <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other Applicants Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            All Applicants
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Match Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Applied
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {otherApplicants.map((applicant) => (
                <tr key={applicant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {applicant.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {applicant.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {applicant.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-purple-700">
                      {applicant.match_score}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        applicant.status === "New"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {applicant.applied}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <Link
                      to={`/review-applicant/${applicant.id}`}
                      state={{ applicantData: applicant }}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Review
                    </Link>
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

export default Applicants;
