import React, { useState, useEffect, useRef } from "react";
import { Bookmark, BookmarkX } from "lucide-react";
import ApplicationModal from "../modals/ApplicationModal";
import {
  useJobDetails,
  useSaveJob,
  useUnsaveJob,
  useApplyToJob,
  useSavedJobs,
  useAppliedJobs,
} from "../../hooks/tanstack/useJobInteractions";
import { useImage } from "../../hooks/tanstack/useImageAndCompany";
import { useQueryClient } from "@tanstack/react-query";

const JobInformation = ({ job }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contentRef = useRef(null);

  // Mutation hooks for job actions
  const saveJobMutation = useSaveJob();
  const unsaveJobMutation = useUnsaveJob();
  const applyJobMutation = useApplyToJob();

  // Fetch saved and applied jobs for checking status
  const { data: savedJobsData = [] } = useSavedJobs();
  const { data: appliedJobsData = [] } = useAppliedJobs();

  // Fetch job details using tanstack query
  const {
    data: jobDetails,
    isLoading: jobLoading,
    error: jobError,
  } = useJobDetails(job?.job_id);

  // Fetch the company logo if available - using the logo ID from the card
  const { data: logoUrl, isLoading: logoLoading } = useImage(job?.logo || null);

  // Reset scroll position when job changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [job?.job_id]); // Only trigger when job ID changes

  // Check if job is saved or applied
  const isSaved =
    Array.isArray(savedJobsData) &&
    savedJobsData.some((savedJob) => savedJob.job_id === job?.job_id);
  const isApplied =
    Array.isArray(appliedJobsData) &&
    appliedJobsData.some((appliedJob) => appliedJob.job_id === job?.job_id);

  if (!job) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg h-[calc(100vh-180px)] flex items-center justify-center">
        <div className="text-center px-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Select a job to view details
          </h3>
          <p className="text-gray-600">
            Click on any job listing to view more information
          </p>
        </div>
      </div>
    );
  }

  // Use title and company from job card while loading details
  if (jobLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg h-[calc(100vh-180px)] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                {logoLoading ? (
                  <div className="w-8 h-8 rounded-full animate-pulse bg-blue-200"></div>
                ) : logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={`${job.company} logo`}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentNode.innerHTML = `<div class="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center font-semibold">${
                        job.company ? job.company.charAt(0).toUpperCase() : "?"
                      }</div>`;
                    }}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center font-semibold">
                    {job.company ? job.company.charAt(0).toUpperCase() : "?"}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold">
                  {job.title}
                </h2>
                <p className="text-gray-600">
                  {job.company || "Unknown Company"}
                </p>
              </div>
            </div>
          </div>

          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6 mb-6"></div>

            <h3 className="text-lg font-semibold mb-3">
              Loading job details...
            </h3>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6 mb-2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (jobError) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg h-[calc(100vh-180px)] flex items-center justify-center">
        <div className="text-center px-6">
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            Error loading job details
          </h3>
          <p className="text-gray-600">
            There was a problem fetching the job information. Please try again.
          </p>
        </div>
      </div>
    );
  }

  // Merge the job details with the basic job info
  // This way we keep the company and logo from the job card even when we get full details
  const displayJob = {
    ...job, // Keep basic info from job card (including logo and company)
    ...jobDetails, // Add detailed info from API
    company: job.company, // Ensure we always use the company name from the job card
    logo: job.logo, // Ensure we always use the logo from the job card
  };

  // Parse responsibilities if it's a string
  const responsibilitiesArray = Array.isArray(displayJob.responsibilities)
    ? displayJob.responsibilities
    : typeof displayJob.responsibilities === "string"
    ? displayJob.responsibilities.split("\n").filter((item) => item.trim())
    : [];

  // Parse qualifications if it's a string
  const qualificationsArray = Array.isArray(displayJob.qualifications)
    ? displayJob.qualifications
    : typeof displayJob.qualifications === "string"
    ? displayJob.qualifications.split("\n").filter((item) => item.trim())
    : [];

  const handleSaveToggle = () => {
    if (isSaved) {
      unsaveJobMutation.mutate(displayJob.job_id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["savedJobs"] });
        },
      });
    } else {
      saveJobMutation.mutate(displayJob.job_id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["savedJobs"] });
        },
      });
    }
  };

  const handleApplicationSubmit = (applicationData) => {
    applyJobMutation.mutate(applicationData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["appliedJobs"] });
        setIsModalOpen(false);
      },
    });
  };

  return (
    <div
      ref={contentRef}
      className="bg-white border border-gray-200 rounded-lg h-[calc(100vh-180px)] overflow-y-auto overscroll-contain scroll-smooth"
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              {logoLoading ? (
                <div className="w-8 h-8 rounded-full animate-pulse bg-blue-200"></div>
              ) : logoUrl ? (
                <img
                  src={logoUrl}
                  alt={`${displayJob.company} logo`}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentNode.innerHTML = `<div class="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center font-semibold">${
                      displayJob.company
                        ? displayJob.company.charAt(0).toUpperCase()
                        : "?"
                    }</div>`;
                  }}
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center font-semibold">
                  {displayJob.company
                    ? displayJob.company.charAt(0).toUpperCase()
                    : "?"}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">
                {displayJob.title}
              </h2>
              <p className="text-gray-600">
                {displayJob.company || "Unknown Company"}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveToggle}
              disabled={
                saveJobMutation.isLoading || unsaveJobMutation.isLoading
              }
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border ${
                isSaved
                  ? "border-red-600 text-red-600 hover:bg-red-50"
                  : "border-blue-600 text-blue-600 hover:bg-blue-50"
              } ${
                saveJobMutation.isLoading || unsaveJobMutation.isLoading
                  ? "opacity-50 cursor-wait"
                  : ""
              }`}
            >
              {isSaved ? (
                <>
                  <BookmarkX className="w-4 h-4" />
                  <span>
                    {unsaveJobMutation.isLoading ? "Removing..." : "Remove"}
                  </span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>
                    {saveJobMutation.isLoading ? "Saving..." : "Save"}
                  </span>
                </>
              )}
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={isApplied || applyJobMutation.isLoading}
              className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                isApplied
                  ? "bg-green-600 text-white cursor-not-allowed"
                  : applyJobMutation.isLoading
                  ? "bg-blue-500 text-white cursor-wait"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isApplied
                ? "Applied"
                : applyJobMutation.isLoading
                ? "Applying..."
                : "Apply Now"}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-3">Overview</h3>
            <p className="text-gray-600">
              {displayJob.description ||
                displayJob.overview ||
                "No description provided."}
            </p>
          </section>

          {responsibilitiesArray.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold mb-3">What You'll Do</h3>
              <ul className="space-y-2">
                {responsibilitiesArray.length === 1 ? (
                  <p className="text-gray-600">{responsibilitiesArray[0]}</p>
                ) : (
                  responsibilitiesArray.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))
                )}
              </ul>
            </section>
          )}

          {qualificationsArray.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold mb-3">Qualifications</h3>
              {qualificationsArray.length === 1 ? (
                <p className="text-gray-600">{qualificationsArray[0]}</p>
              ) : (
                <ul className="space-y-2">
                  {qualificationsArray.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Skills section */}
          {displayJob.skills && displayJob.skills.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {displayJob.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Job details summary */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Job Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayJob.job_type && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Job Type:</span>
                  <span className="text-gray-600">{displayJob.job_type}</span>
                </div>
              )}
              {displayJob.experience && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Experience:</span>
                  <span className="text-gray-600">{displayJob.experience}</span>
                </div>
              )}
              {displayJob.education && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Education:</span>
                  <span className="text-gray-600">{displayJob.education}</span>
                </div>
              )}
              {displayJob.workstyle && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Work Style:</span>
                  <span className="text-gray-600">{displayJob.workstyle}</span>
                </div>
              )}
              {displayJob.location && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Location:</span>
                  <span className="text-gray-600">{displayJob.location}</span>
                </div>
              )}
              {displayJob.deadline && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">
                    Application Deadline:
                  </span>
                  <span className="text-gray-600">
                    {new Date(displayJob.deadline).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </section>

          {displayJob.about && (
            <section>
              <h3 className="text-lg font-semibold mb-3">
                About {displayJob.company}
              </h3>
              <p className="text-gray-600">{displayJob.about}</p>
            </section>
          )}
        </div>
      </div>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleApplicationSubmit}
        job={displayJob}
        isSubmitting={applyJobMutation.isLoading}
      />
    </div>
  );
};

export default JobInformation;
