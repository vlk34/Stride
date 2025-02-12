import React from "react";

const JobCard = ({ job, isSelected, onSelect }) => {
  return (
    <div
      className={`p-4 border rounded-lg mb-3 cursor-pointer hover:border-blue-500 transition-all
        ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
      onClick={() => onSelect(job)}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <img
            src={job.companyLogo}
            alt={`${job.company} logo`}
            className="w-8 h-8 object-contain"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{job.title}</h3>
          <p className="text-gray-600 text-sm">{job.company}</p>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-gray-500">{job.location}</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{job.type}</span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <div
              className={`flex items-center ${
                job.rating > 4 ? "text-green-500" : "text-yellow-500"
              }`}
            >
              <span className="text-sm font-medium">{job.rating}</span>
              <span className="ml-1 text-sm">
                {job.rating > 4 ? "Highly Rated" : "Moderately Rated"}
              </span>
            </div>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">
              {job.applicants} Applicants
            </span>
            {job.isVerified && (
              <>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-blue-500">Company Verified</span>
              </>
            )}
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <span className="sr-only">Save job</span>
          {/* Add your bookmark icon here */}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
