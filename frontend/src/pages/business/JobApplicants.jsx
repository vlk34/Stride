import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
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
  ArrowLeft,
  Briefcase,
} from "lucide-react";

const JobApplicants = () => {
  const { jobId } = useParams();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [jobDetails, setJobDetails] = useState(null);

  // Fetch job details and applicants - replace with real API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJobDetails({
        id: jobId,
        title: "Senior Frontend Developer",
        department: "Engineering",
        location: "Remote",
        applicantsCount: 24,
        status: "Active",
        posted: "2023-09-15",
        expires: "2023-10-15",
      });
    }, 500);
  }, [jobId]);

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
      name: "James Wilson",
      role: "Senior Frontend Developer",
      status: "New",
      applied: "3 days ago",
      match_score: 72,
      email: "j.wilson@example.com",
      hasAiAnalysis: true,
    },
    {
      id: 5,
      name: "Olivia Martinez",
      role: "Senior Frontend Developer",
      status: "New",
      applied: "4 days ago",
      match_score: 68,
      email: "o.martinez@example.com",
      hasAiAnalysis: true,
    },
  ];

  const statusTabs = [
    { id: "all", label: "All" },
    { id: "new", label: "New" },
    { id: "reviewed", label: "Reviewed" },
    { id: "shortlisted", label: "Shortlisted" },
    { id: "offered", label: "Offered" },
    { id: "rejected", label: "Rejected" },
  ];

  // Filter applicants based on search term and status
  const filteredTopApplicants = topApplicants.filter(
    (applicant) =>
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeTab === "all" || applicant.status.toLowerCase() === activeTab)
  );

  const filteredOtherApplicants = otherApplicants.filter(
    (applicant) =>
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeTab === "all" || applicant.status.toLowerCase() === activeTab)
  );

  if (!jobDetails) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-4">
          <Link to="/manage-jobs" className="text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-8"></div>
        {/* Loading skeleton for the rest of the content */}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Link
            to="/business/applicants"
            className="text-blue-600 hover:text-blue-700 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to Applicants
          </Link>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-600" />
              {jobDetails.title}
            </h1>
            <p className="text-gray-600">
              {jobDetails.department} • {jobDetails.location} •
              <span
                className={`ml-2 ${
                  jobDetails.status === "Active"
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {jobDetails.status}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {jobDetails.applicantsCount}
              </div>
              <div className="text-sm text-gray-600">Applicants</div>
            </div>
            <div className="h-10 w-px bg-gray-200"></div>
            <Link
              to="/search"
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              View Job Post
            </Link>
          </div>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Additional filters could go here */}
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
      {filteredTopApplicants.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-900">Top Matches</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTopApplicants.map((applicant) => (
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
                    to={`/business/review-applicant/${applicant.id}?jobId=${jobId}`}
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
      )}

      {/* All Applicants Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            All Applicants
          </h2>
        </div>

        {filteredTopApplicants.length === 0 &&
        filteredOtherApplicants.length === 0 ? (
          <div className="py-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No applicants found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? `No applicants matching "${searchTerm}"`
                : "No applicants for this job yet"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
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
                {[...filteredTopApplicants, ...filteredOtherApplicants].map(
                  (applicant) => (
                    <tr key={applicant.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {applicant.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {applicant.email}
                        </div>
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
                              : applicant.status === "Reviewed"
                              ? "bg-yellow-100 text-yellow-700"
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
                          to={`/business/review-applicant/${applicant.id}?jobId=${jobId}`}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicants;
