import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Brain,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  Download,
  FileText,
  MessageSquare,
  ThumbsUp,
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  User,
  Info,
} from "lucide-react";
import { Link } from "react-router";
import { useApplicantDetails } from "../../hooks/tanstack/useCompanyAccount";
import { getRelativeTime } from "../../hooks/tanstack/useBusinessDashboard";
import { useJobDetails } from "../../hooks/tanstack/useBusinessDashboard";
import axios from "axios";

const ReviewApplicant = () => {
  // Extract parameters from URL path
  const { jobId, userId } = useParams();
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  // Fetch applicant details using the jobId and userId from the path
  const {
    data: applicant,
    isLoading: applicantLoading,
    error: applicantError,
  } = useApplicantDetails(jobId, userId);

  // Fetch job details for context
  const {
    data: jobDetails,
    isLoading: jobLoading,
    error: jobError,
  } = useJobDetails(jobId);

  const isLoading = applicantLoading || jobLoading;
  const hasError = applicantError || jobError;

  // Go back to applicants list for this job
  const handleBack = () => {
    if (jobId) {
      navigate(`/business/applicants/${jobId}`);
    } else {
      window.history.back();
    }
  };

  // Inside the ReviewApplicant component, add this function for downloading the CV
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
      link.setAttribute("download", `${applicant.name || "applicant"}_CV.pdf`); // Set filename
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
    // Check all possible locations for CV ID based on your API response
    if (!applicant) return null;

    // Check each possible property where CV ID might be stored
    return applicant.cv || applicant.resume_id || applicant.resume || null;
  };

  // Check if applicant has a CV
  const hasCv = applicant && getCvId(applicant);

  // Show error state
  if (hasError && !isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={handleBack}
          className="flex items-center mb-4 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span>Back to applicants</span>
        </button>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Applicant Data
          </h2>
          <p className="text-red-600 mb-4">
            {(applicantError || jobError)?.message ||
              "There was an error loading this applicant's details. Please try again."}
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

  // Show loading state
  if (isLoading || !applicant) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        {/* Header with static back button */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={handleBack}
            className="flex items-center mb-4 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="hidden sm:inline">Back to applicants</span>
            <span className="sm:hidden">Back</span>
          </button>

          {/* Applicant name and role skeleton */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-gray-200 animate-pulse"></div>
              <div>
                <div className="h-7 sm:h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div>
              <div className="flex gap-2">
                <button
                  onClick={() => downloadCV(getCvId(applicant))}
                  disabled={!hasCv}
                  className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm ${
                    hasCv
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <span className="hidden sm:inline">
                    {hasCv ? "Download CV" : "No CV Available"}
                  </span>
                  <span className="sm:hidden flex items-center">
                    <Download className="w-4 h-4 mr-1" /> CV
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Static tabs - Scrollable on mobile */}
        <div className="flex gap-2 sm:gap-4 border-b border-gray-200 mb-6 overflow-x-auto pb-1">
          {["profile", "ai analysis"].map((tab) => (
            <button
              key={tab}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium capitalize whitespace-nowrap ${
                tab === "profile"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left column skeleton */}
          <div className="lg:col-span-2">
            {/* Basic info card skeleton */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-full bg-gray-200 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            </div>

            {/* Skills card skeleton */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"
                  ></div>
                ))}
              </div>
            </div>

            {/* Experience card skeleton */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Experience
              </h2>
              {[1, 2].map((i) => (
                <div key={i} className="mb-4">
                  <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-16 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column skeleton - Status card */}
          <div className="lg:col-span-1 order-first lg:order-last mb-4 sm:mb-0">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 lg:sticky lg:top-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Status
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Applied</div>
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Match Score</div>
                  <div className="h-6 w-28 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <button className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get experience information from experiences if available
  const getExperienceInfo = () => {
    if (applicant.experiences && applicant.experiences.length > 0) {
      const latestExperience = applicant.experiences[0];
      return `${latestExperience.role} at ${latestExperience.company}`;
    }
    return "Experience not specified";
  };

  // Render the page with data
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <button
          onClick={handleBack}
          className="flex items-center mb-4 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="hidden sm:inline">Back to applicants</span>
          <span className="sm:hidden">Back</span>
        </button>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="flex items-center gap-4">
            {applicant.image ? (
              <img
                src={applicant.image}
                alt={applicant.name}
                className="w-16 h-16 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
            )}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {applicant.name}
              </h1>
              <p className="text-gray-600 mb-2">
                {jobDetails?.title || "Position"}
              </p>
              {jobDetails && (
                <div className="flex items-center text-gray-900 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  {getRelativeTime(
                    applicant?.applied_at || "2025-04-04T15:47:21.261+00:00"
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => downloadCV(getCvId(applicant))}
              disabled={!hasCv}
              className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm ${
                hasCv
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <span className="hidden sm:inline">
                {hasCv ? "Download CV" : "No CV Available"}
              </span>
              <span className="sm:hidden flex items-center">
                <Download className="w-4 h-4 mr-1" /> CV
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Tabs - Scrollable on mobile */}
      <div className="flex gap-2 sm:gap-4 border-b border-gray-200 mb-6 overflow-x-auto pb-1">
        {["profile", "ai analysis"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium capitalize whitespace-nowrap ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Status Card - Shown first on mobile */}
        <div className="lg:col-span-1 order-first lg:order-last mb-4 sm:mb-0">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 lg:sticky lg:top-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
              Status
            </h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Applied</div>
                <div className="flex items-center text-gray-900 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  {getRelativeTime(applicant.applied_at)}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-1">Match Score</div>
                <div className="flex items-center text-purple-700 text-sm">
                  <Brain className="w-4 h-4 mr-2" />
                  {(() => {
                    const score = applicant.similarity || 0;
                    return `${Math.floor(score)}.${((score % 1) * 100)
                      .toFixed(0)
                      .padStart(2, "0")}%`;
                  })()}{" "}
                  match
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    navigate("/business/messages");
                  }}
                  className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Left Column - Content area */}
        <div className="lg:col-span-2">
          {activeTab === "profile" && (
            <div className="space-y-4 sm:space-y-6">
              {/* Basic Info Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                    <span className="truncate">{applicant.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                    {getExperienceInfo()}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                    {applicant.unsafeRole || "Role not specified"}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Info className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                    {applicant.about || "No additional information"}
                  </div>
                </div>
              </div>

              {/* Skills Card */}
              {applicant.skills && applicant.skills.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {(applicant.skills || ["React"]).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm"
                      >
                        {skill.charAt(0).toUpperCase() + skill.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Card */}
              {applicant.experiences && applicant.experiences.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                    Experience
                  </h2>
                  {applicant.experiences.map((exp, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-medium text-gray-900">
                        {exp.role.charAt(0).toUpperCase() + exp.role.slice(1)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {exp.company.charAt(0).toUpperCase() +
                          exp.company.slice(1)}
                        {exp.type && ` • ${exp.type}`}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {new Date(exp.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        -
                        {exp.current
                          ? " Present"
                          : ` ${new Date(exp.endDate).toLocaleDateString(
                              "en-US",
                              { month: "short", year: "numeric" }
                            )}`}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Education Card */}
              {applicant.education && applicant.education.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                    Education
                  </h2>
                  {applicant.education.map((edu, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <h3 className="font-medium text-gray-900">
                        {edu.degree.charAt(0).toUpperCase() +
                          edu.degree.slice(1)}{" "}
                        in{" "}
                        {edu.field.charAt(0).toUpperCase() + edu.field.slice(1)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {edu.school.charAt(0).toUpperCase() +
                          edu.school.slice(1)}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {new Date(edu.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        -
                        {edu.current
                          ? " Present"
                          : ` ${new Date(edu.endDate).toLocaleDateString(
                              "en-US",
                              { month: "short", year: "numeric" }
                            )}`}
                      </p>
                      {edu.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "ai analysis" && (
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-6">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  AI Analysis Report
                </h2>
              </div>

              {applicant.ai_analysis ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                    <div className="bg-purple-50 rounded-lg p-3 sm:p-4">
                      <div className="text-xl sm:text-2xl font-bold text-purple-700 mb-1">
                        {(() => {
                          const score =
                            applicant.ai_analysis.technical_match || 0;
                          return `${Math.floor(score)}.${((score % 1) * 100)
                            .toFixed(0)
                            .padStart(2, "0")}%`;
                        })()}
                      </div>
                      <div className="text-xs sm:text-sm text-purple-600">
                        Technical Match
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3 sm:p-4">
                      <div className="text-xl sm:text-2xl font-bold text-purple-700 mb-1">
                        {(() => {
                          const score = applicant.ai_analysis.soft_skills || 0;
                          return `${Math.floor(score)}.${((score % 1) * 100)
                            .toFixed(0)
                            .padStart(2, "0")}%`;
                        })()}
                      </div>
                      <div className="text-xs sm:text-sm text-purple-600">
                        Soft Skills
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3 sm:p-4">
                      <div className="text-xl sm:text-2xl font-bold text-purple-700 mb-1">
                        {(() => {
                          const score = applicant.ai_analysis.culture_fit || 0;
                          return `${Math.floor(score)}.${((score % 1) * 100)
                            .toFixed(0)
                            .padStart(2, "0")}%`;
                        })()}
                      </div>
                      <div className="text-xs sm:text-sm text-purple-600">
                        Culture Fit
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {applicant.ai_analysis.key_strengths &&
                      applicant.ai_analysis.key_strengths.length > 0 && (
                        <div>
                          <h3 className="font-medium text-gray-900 mb-2">
                            Key Strengths
                          </h3>
                          <ul className="space-y-2">
                            {applicant.ai_analysis.key_strengths.map(
                              (strength, index) => (
                                <li
                                  key={index}
                                  className="flex items-center text-sm text-gray-600"
                                >
                                  <ThumbsUp className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                                  {strength}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {applicant.ai_analysis.potential_concerns &&
                      applicant.ai_analysis.potential_concerns.length > 0 && (
                        <div>
                          <h3 className="font-medium text-gray-900 mb-2">
                            Potential Concerns
                          </h3>
                          <ul className="space-y-2">
                            {applicant.ai_analysis.potential_concerns.map(
                              (concern, index) => (
                                <li
                                  key={index}
                                  className="flex items-center text-sm text-gray-600"
                                >
                                  <AlertCircle className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" />
                                  {concern}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-500 mb-2">
                    AI analysis not available
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm">
                    Generate Analysis
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewApplicant;
