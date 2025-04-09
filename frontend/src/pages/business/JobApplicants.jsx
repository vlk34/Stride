import React, { useState } from "react";
import { useParams, Link } from "react-router";
import {
  Users,
  Search,
  Briefcase,
  Calendar,
  Star,
  Mail,
  Phone,
  Download,
  ArrowLeft,
  User,
} from "lucide-react";
import {
  useJobDetails,
  useJobApplicants,
  getRelativeTime,
} from "../../hooks/tanstack/useBusinessDashboard";
import axios from "axios";

const JobApplicants = () => {
  const { jobId } = useParams();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch job details using TanStack Query
  const {
    data: jobDetails,
    isLoading: jobDetailsLoading,
    error: jobDetailsError,
  } = useJobDetails(jobId);

  // Fetch job applicants using TanStack Query
  const {
    data: applicants,
    isLoading: applicantsLoading,
    error: applicantsError,
  } = useJobApplicants(jobId);

  // Simplified status tabs for filtering - only All, New and Reviewed
  const statusTabs = [
    { id: "all", label: "All" },
    { id: "new", label: "New" },
    { id: "reviewed", label: "Reviewed" },
  ];

  // Loading or error states
  const isLoading = jobDetailsLoading || applicantsLoading;
  const hasError = jobDetailsError || applicantsError;

  // Add this download CV function (similar to ReviewApplicant.jsx)
  const downloadCV = async (cvId) => {
    if (!cvId) {
      alert("No CV available for this applicant");
      return;
    }

    try {
      const sessionToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("__session="))
        ?.split("=")[1];

      if (!sessionToken) {
        console.error("Session token not found");
        return;
      }

      // Make request to get the CV file
      const response = await axios.get(`http://localhost:8080/resume/${cvId}`, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
        responseType: "blob", // Important for binary data
      });

      // Create blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `applicant_CV.pdf`);
      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading CV:", error);
      alert("Failed to download CV. Please try again later.");
    }
  };

  // Helper function to get CV ID from applicant data
  const getCvId = (applicant) => {
    if (!applicant) return null;
    return applicant.cv || applicant.resume_id || applicant.resume || null;
  };

  if (hasError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-red-600 mb-4">
            {(jobDetailsError || applicantsError)?.message ||
              "There was an error loading job data. Please try again."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Process applicants data when available
  const filteredApplicants =
    !isLoading && applicants
      ? applicants.filter((applicant) => {
          const matchesSearch = applicant.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          let matchesStatus = true;

          if (activeTab === "new") {
            matchesStatus = !applicant.status || applicant.status === "New";
          } else if (activeTab === "reviewed") {
            matchesStatus = applicant.status === "Reviewed";
          }

          return matchesSearch && matchesStatus;
        })
      : [];

  // Find top matches (applicants with highest similarity score)
  const topApplicants =
    !isLoading && applicants
      ? [...filteredApplicants]
          .sort((a, b) => {
            // Sort by similarity correctly (higher is better)
            const scoreA = typeof a.similarity === "number" ? a.similarity : 0;
            const scoreB = typeof b.similarity === "number" ? b.similarity : 0;
            return scoreB - scoreA;
          })
          .slice(0, 3)
      : [];

  // Prepare job display data
  const jobDisplayData = jobDetails
    ? {
        title: jobDetails.title || "Job Title",
        department: jobDetails.department || "Department",
        location: jobDetails.job_location || jobDetails.workstyle || "Location",
        applicantsCount: applicants?.length || 0,
        status:
          new Date(jobDetails.closes_at || jobDetails.deadline) > new Date()
            ? "Active"
            : "Closed",
        posted: getRelativeTime(jobDetails.created_at),
        deadline: getRelativeTime(jobDetails.closes_at || jobDetails.deadline),
      }
    : null;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Static back button - no skeleton needed */}
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

          {/* Job title and details skeleton */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-1"></div>
                <div className="text-sm text-gray-600">Applicants</div>
              </div>
              <div className="h-10 w-px bg-gray-200"></div>
              <Link
                to={`/search?q=${encodeURIComponent("Job Title")}&jobId=0`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                View Job Post
              </Link>
            </div>
          </div>
        </div>

        {/* Search box AND status tabs in the same container */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search applicants..."
                  value=""
                  disabled
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Status Tabs - INSIDE the white container */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            <button className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-blue-100 text-blue-700">
              All
            </button>
            <button className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap text-gray-600 hover:bg-gray-100">
              New
            </button>
            <button className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap text-gray-600 hover:bg-gray-100">
              Reviewed
            </button>
          </div>
        </div>

        {/* Loading skeletons for applicants */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Applicants</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
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
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-1"></div>
                      <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="h-5 w-16 bg-gray-200 rounded animate-pulse ml-auto"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
            Back to managing applicants
          </Link>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-600" />
              {jobDisplayData.title}
            </h1>
            <p className="text-gray-600">
              {jobDisplayData.department} • {jobDisplayData.location} •
              <span
                className={`ml-2 ${
                  jobDisplayData.status === "Active"
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {jobDisplayData.status}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {jobDisplayData.applicantsCount}
              </div>
              <div className="text-sm text-gray-600">Applicants</div>
            </div>
            <div className="h-10 w-px bg-gray-200"></div>
            <Link
              to={`/search?q=${encodeURIComponent(
                jobDisplayData.title
              )}&jobId=${jobDetails.job_id}`}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              View Job Post
            </Link>
          </div>
        </div>
      </div>

      {/* Search box AND status tabs in the same container */}
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
        </div>

        {/* Status Tabs - INSIDE the white container with simplified options */}
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

      {/* Top Applicants Cards */}
      {topApplicants.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Top Matches
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topApplicants.map((applicant) => (
              <div
                key={applicant.user_id}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-500 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    {applicant.image ? (
                      <img
                        src={applicant.image}
                        alt={applicant.name}
                        className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-200"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/150?text=Profile";
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {applicant.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {applicant.unsafeRole || "Applicant"}
                      </p>
                    </div>
                  </div>
                  <div className="text-center ml-4">
                    <div className="text-lg font-bold text-purple-700">
                      {typeof applicant.similarity === "number"
                        ? `${(applicant.similarity * 100).toFixed(0)}%`
                        : "—"}
                    </div>
                    <div className="text-xs text-purple-600">match</div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {applicant.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Applied {getRelativeTime(applicant.applied_at)}
                  </div>
                  {applicant.skills && applicant.skills.length > 0 && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Skills:</span>{" "}
                      {applicant.skills.join(", ")}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/business/applicants/${jobId}/${applicant.user_id}`}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Review Application
                  </Link>
                  <button
                    onClick={() => downloadCV(getCvId(applicant))}
                    disabled={!getCvId(applicant)}
                    className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                      getCvId(applicant)
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                    title={
                      getCvId(applicant) ? "Download CV" : "No CV Available"
                    }
                  >
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
        {filteredApplicants.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No applicants found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? `No applicants matching "${searchTerm}"`
                : "There are no applicants for this job yet."}
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
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
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
                {filteredApplicants.map((applicant) => (
                  <tr key={applicant.user_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {applicant.image ? (
                          <img
                            src={applicant.image}
                            alt={applicant.name}
                            className="w-8 h-8 rounded-full mr-3 object-cover"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/150?text=Profile";
                            }}
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                        )}
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
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm font-medium text-purple-700">
                        {typeof applicant.similarity === "number"
                          ? `${(applicant.similarity * 100).toFixed(0)}%`
                          : "—"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          !applicant.status || applicant.status === "New"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {applicant.status || "New"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getRelativeTime(applicant.applied_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <Link
                        to={`/business/applicants/${jobId}/${applicant.user_id}`}
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
        )}
      </div>
    </div>
  );
};

export default JobApplicants;
