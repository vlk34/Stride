import React from "react";

const JobCard = ({ job, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(job)}
      className={`p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-all
        ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <img
            src={job.companyLogo}
            alt={`${job.company} logo`}
            className="w-8 h-8 object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate">{job.title}</h3>
          <p className="text-gray-600 text-sm truncate">{job.company}</p>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className="text-sm text-gray-500">{job.location}</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{job.type}</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="px-2 py-0.5 text-sm bg-blue-50 text-blue-600 rounded">
              {job.workstyle}
            </span>
            {job.isVerified && (
              <span className="px-2 py-0.5 text-sm bg-green-50 text-green-600 rounded">
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
