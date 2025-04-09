import React, { useState } from "react";
import {
  Building2,
  MapPin,
  Globe,
  Users,
  Calendar,
  Briefcase,
  Edit,
  CheckCircle,
  Heart,
  Award,
  Coffee,
} from "lucide-react";
import { Link } from "react-router";
import {
  useCompanyJobs,
  useCompanyStats,
  getRelativeTime,
} from "../../hooks/tanstack/useBusinessDashboard";
import { useImage } from "../../hooks/tanstack/useImageAndCompany";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Helper function to get the session token from cookie
const getSessionToken = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("__session=")) {
      return cookie.substring("__session=".length, cookie.length);
    }
  }
  return null;
};

// Custom hook to fetch company details
const useCompanyDetails = () => {
  return useQuery({
    queryKey: ["myCompanyDetails"],
    queryFn: async () => {
      const sessionToken = getSessionToken();
      if (!sessionToken) {
        throw new Error("Session token not found");
      }

      const response = await axios.get("http://localhost:8080/company/5", {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

const BusinessProfile = () => {
  const [activeTab, setActiveTab] = useState("about");

  // Use TanStack Query hooks to fetch data
  const {
    data: companyDetails,
    isLoading: companyLoading,
    error: companyError,
  } = useCompanyDetails();

  const {
    data: jobsData,
    isLoading: jobsLoading,
    error: jobsError,
  } = useCompanyJobs();

  const {
    data: statsData,
    isLoading: statsLoading,
    error: statsError,
  } = useCompanyStats();

  // Fetch logo if available
  const { data: logoUrl, isLoading: logoLoading } = useImage(
    companyDetails?.logo || null
  );

  // Loading state for the company profile
  if (companyLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="mb-8 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-24 h-24 bg-gray-200 rounded-xl"></div>
              <div className="flex-1">
                <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          <div className="h-8 w-full bg-gray-200 rounded mb-6"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
                <div className="h-24 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-12 w-full bg-gray-200 rounded"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (companyError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Company Profile
          </h2>
          <p className="text-red-600">
            {companyError.message || "Failed to load company data"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Simplified Header Section */}
      <div className="mb-8 bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="w-24 h-24 rounded-xl bg-white border border-gray-200 p-2 flex items-center justify-center">
            {logoLoading ? (
              <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse"></div>
            ) : logoUrl ? (
              <img
                src={logoUrl}
                alt={companyDetails?.company || "Company Logo"}
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <Building2 className="w-12 h-12 text-gray-400" />
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {companyDetails?.company || "Your Company"}
            </h1>
            <p className="text-gray-600">
              {companyDetails?.industry || "Technology"}
            </p>
          </div>

          <div className="mt-4 sm:mt-0">
            <Link
              to="/business/edit-company"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Building2 className="w-4 h-4" />
            <span>{companyDetails?.industry || "Technology"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{companyDetails?.size || "Not specified"}</span>
          </div>
          {companyDetails?.address && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{companyDetails.address}</span>
            </div>
          )}
          {companyDetails?.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <a
                href={`https://${companyDetails.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {companyDetails.website}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Tabs - Only About and Jobs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-8">
          {["about", "jobs"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-1 font-medium capitalize ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === "about" && (
            <>
              {/* Company Description */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">About Us</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {companyDetails?.description ||
                    "Company description not available."}
                </p>

                {companyDetails?.mission && (
                  <>
                    <h3 className="text-lg font-semibold mb-3">Our Mission</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {companyDetails.mission}
                    </p>
                  </>
                )}

                {companyDetails?.benefits && (
                  <>
                    <h3 className="text-lg font-semibold mb-3">
                      Benefits & Perks
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {companyDetails.benefits
                        .split(",")
                        .map((benefit, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              {index % 4 === 0 && (
                                <Heart className="w-4 h-4 text-blue-600" />
                              )}
                              {index % 4 === 1 && (
                                <Award className="w-4 h-4 text-blue-600" />
                              )}
                              {index % 4 === 2 && (
                                <Coffee className="w-4 h-4 text-blue-600" />
                              )}
                              {index % 4 === 3 && (
                                <Calendar className="w-4 h-4 text-blue-600" />
                              )}
                            </div>
                            <span className="text-gray-700">
                              {benefit.trim()}
                            </span>
                          </div>
                        ))}
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {activeTab === "jobs" && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Open Positions</h2>
                <Link
                  to="/business/manage/jobs"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Manage Jobs
                </Link>
              </div>

              <div className="space-y-4">
                {jobsLoading ? (
                  // Skeleton for job listings
                  Array(3)
                    .fill()
                    .map((_, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex justify-between">
                          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>

                        <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        </div>

                        <div className="mt-3 flex justify-between items-center">
                          <div className="text-blue-600 text-sm font-medium">
                            View Details
                          </div>
                          <div className="text-sm text-gray-600">
                            View Applicants
                          </div>
                        </div>
                      </div>
                    ))
                ) : jobsError ? (
                  <div className="text-center py-8">
                    <p className="text-red-500 mb-4">
                      Error loading jobs: {jobsError.message}
                    </p>
                  </div>
                ) : !jobsData || jobsData.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No job listings yet</p>
                    <Link
                      to="/business/create-job-listing"
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Create Job Listing
                    </Link>
                  </div>
                ) : (
                  jobsData.map((job) => (
                    <div
                      key={job.job_id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                    >
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {job.jobtype
                            ? job.jobtype.charAt(0).toUpperCase() +
                              job.jobtype.slice(1)
                            : "Full-time"}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        {job.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                        )}
                        {job.workstyle && (
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            <span>
                              {job.workstyle.charAt(0).toUpperCase() +
                                job.workstyle.slice(1)}
                            </span>
                          </div>
                        )}
                        {job.start && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Posted {getRelativeTime(job.start)}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 flex justify-between items-center">
                        <Link
                          to={`/search?q=${encodeURIComponent(
                            job.title
                          )}&jobId=${job.job_id}`}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          View Details
                        </Link>
                        <Link
                          to={`/business/applicants/${job.job_id}`}
                          className="text-sm text-gray-600 hover:text-gray-800"
                        >
                          View Applicants
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/business/create-job-listing"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Post a New Job
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-medium mb-4">Company Overview</h3>
            <div className="space-y-4">
              {companyDetails?.founded && (
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Founded</p>
                    <p className="text-sm text-gray-600">
                      {companyDetails.founded}
                    </p>
                  </div>
                </div>
              )}
              {companyDetails?.size && (
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Company size</p>
                    <p className="text-sm text-gray-600">
                      {companyDetails.size}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Open positions</p>
                  <p className="text-sm text-gray-600">
                    {jobsLoading ? "Loading..." : jobsData?.length || 0} jobs
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Completion - Static */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-medium mb-4">Profile Completion</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div className="bg-blue-600 h-2.5 rounded-full w-[85%]"></div>
            </div>
            <p className="text-sm text-gray-600 mb-4">85% complete</p>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Basic info</span>
                </div>
                <span className="text-xs text-green-500">Complete</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Company details</span>
                </div>
                <span className="text-xs text-green-500">Complete</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">Social links</span>
                </div>
                <span className="text-xs text-gray-400">Pending</span>
              </div>
            </div>

            <Link
              to="/business/edit-company"
              className="mt-4 block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm text-center"
            >
              Complete Your Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
