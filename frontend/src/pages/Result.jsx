// src/components/searchResult/Result.jsx
import React, { useState } from "react";
import JobCard from "../components/searchResult/JobCard";
import JobInformation from "../components/searchResult/JobInformation";

const Result = ({ jobs }) => {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-white p-3 rounded-md border border-gray-200 mb-6">
        <div className="flex items-center gap-3">
          {/* Search bar - fixed width */}
          <div className="w-[40%]">
            <input
              placeholder="Search Jobs"
              className="w-full px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          {/* Filters container - distribute remaining space */}
          <div className="flex-1 flex items-center gap-3">
            <input
              placeholder="Location"
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 text-sm"
            />
            <input
              placeholder="Job type"
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 text-sm"
            />
            <input
              placeholder="Industry"
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 text-sm"
            />
            <input
              placeholder="Experience"
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 text-sm"
            />
            <button className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm whitespace-nowrap">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

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
