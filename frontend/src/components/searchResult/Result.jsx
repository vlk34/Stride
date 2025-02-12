// src/components/searchResult/Result.jsx
import React, { useState } from "react";
import JobCard from "./JobCard";
import JobInformation from "./JobInformation";

const Result = ({ jobs }) => {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex gap-6">
        {/* Left column - Job listings */}
        <div className="w-2/5">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">
              {jobs.length} Job Posting Available
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort By:</span>
              <select className="border rounded-lg px-2 py-1 text-sm">
                <option>Relevance</option>
                <option>Latest</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSelected={selectedJob?.id === job.id}
                onSelect={setSelectedJob}
              />
            ))}
          </div>
        </div>

        {/* Right column - Job details */}
        <div className="w-3/5 bg-white rounded-lg shadow-sm border">
          <JobInformation job={selectedJob} />
        </div>
      </div>
    </div>
  );
};

export default Result;
