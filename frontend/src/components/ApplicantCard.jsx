import React from "react";
import { User } from "lucide-react";
import { Link } from "react-router";

const ApplicantCard = ({
  applicant,
  handleApplicantCardClick,
  getRelativeTime,
  isCompact = false, // For different layouts in different views
}) => {
  return (
    <div
      key={applicant.user_id}
      onClick={
        handleApplicantCardClick
          ? () => handleApplicantCardClick(applicant.user_id, applicant.job_id)
          : undefined
      }
      className={`flex items-center justify-between ${
        isCompact ? "p-3 md:p-4 h-auto min-h-[5rem] md:h-24" : "p-4"
      } rounded-lg border border-gray-100 hover:border-blue-500 hover:bg-blue-50/30 transition-colors ${
        handleApplicantCardClick ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex items-center flex-1 min-w-0">
        {applicant.image ? (
          <img
            src={applicant.image}
            alt={applicant.name}
            className={`${
              isCompact ? "w-8 h-8 md:w-10 md:h-10" : "w-10 h-10"
            } rounded-full object-cover ${
              isCompact ? "mr-2 md:mr-3" : "mr-3"
            } border border-gray-200 flex-shrink-0`}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150?text=Profile";
            }}
          />
        ) : (
          <div
            className={`${
              isCompact ? "w-8 h-8 md:w-10 md:h-10" : "w-10 h-10"
            } rounded-full bg-blue-100 flex items-center justify-center ${
              isCompact ? "mr-2 md:mr-3" : "mr-3"
            } flex-shrink-0`}
          >
            <User
              className={`${
                isCompact ? "w-4 h-4 md:w-5 md:h-5" : "w-5 h-5"
              } text-blue-600`}
            />
          </div>
        )}
        <div className="min-w-0">
          <h3 className="font-medium text-gray-900 truncate">
            {applicant.name}
          </h3>
          <p className="text-sm text-gray-600 truncate">
            {applicant.unsafeRole || "Applicant"}
          </p>
          <p className="text-xs text-gray-500">
            Applied {getRelativeTime(applicant.applied_at)}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end ml-2">
        <span
          className={`px-2 md:px-3 py-1 rounded-full text-xs ${
            applicant.status === "Reviewed"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {applicant.status || "New"}
        </span>
        <div className="text-xs md:text-sm font-medium text-purple-700 mt-2 whitespace-nowrap">
          {typeof applicant.similarity === "number"
            ? `${(applicant.similarity * 100).toFixed(0)}%`
            : typeof applicant.match_score === "number"
            ? `${applicant.match_score}%`
            : "—"}{" "}
          match
        </div>
      </div>
    </div>
  );
};

export default ApplicantCard;
