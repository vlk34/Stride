import React from "react";
import { useImage } from "../../hooks/tanstack/useImageAndCompany";

const JobCard = ({ job, isSelected, onSelect }) => {
  // Fetch the company logo if available
  const { data: logoUrl, isLoading: logoLoading } = useImage(job.logo || null);

  // Helper function to capitalize each word in a string
  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Format job properties
  const formattedLocation = capitalizeWords(job.location);
  const formattedJobType = capitalizeWords(job.job_type || job.jobtype);
  const formattedWorkstyle = capitalizeWords(job.workstyle);
  const formattedCompany = capitalizeWords(job.company);

  return (
    <div
      onClick={() => onSelect(job)}
      className={`p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-all
        ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          {logoLoading ? (
            // Show a loading placeholder
            <div className="w-8 h-8 rounded-full animate-pulse bg-blue-200"></div>
          ) : logoUrl ? (
            // Show the actual logo if available
            <img
              src={logoUrl}
              alt={`${formattedCompany} logo`}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                // Fallback if image fails to load
                e.target.style.display = "none";
                e.target.parentNode.innerHTML = `<div class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">${
                  job.company ? job.company.charAt(0).toUpperCase() : "?"
                }</div>`;
              }}
            />
          ) : (
            // Fallback to company initial
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
              {job.company ? job.company.charAt(0).toUpperCase() : "?"}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate">{job.title}</h3>
          <p className="text-gray-600 text-sm font-medium truncate">
            {formattedCompany}
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {formattedLocation && (
              <span className="text-sm text-gray-600 font-medium">
                {formattedLocation}
              </span>
            )}
            {formattedLocation && formattedJobType && (
              <span className="text-sm text-gray-400">•</span>
            )}
            {formattedJobType && (
              <span className="text-sm text-gray-600 font-medium">
                {formattedJobType}
              </span>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {formattedWorkstyle && (
              <span
                className={`px-2 py-0.5 text-sm ${
                  isSelected ? "bg-blue-200" : "bg-blue-50"
                } text-blue-600 rounded font-medium transition-all duration-300`}
              >
                {formattedWorkstyle}
              </span>
            )}
            {job.isVerified && (
              <span className="px-2 py-0.5 text-sm bg-green-50 text-green-600 rounded font-medium">
                Verified
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
