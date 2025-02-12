// src/components/searchResult/Result.jsx
import React, { useState } from "react";
import JobCard from "../components/searchResult/JobCard";
import JobInformation from "../components/searchResult/JobInformation";
import {
  MapPin,
  Briefcase,
  Building2,
  GraduationCap,
  Search,
} from "lucide-react";

const Result = ({ jobs }) => {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-white p-3 rounded-lg border border-gray-200 mb-6">
        <div className="flex items-center gap-3">
          {/* Search bar - fixed width */}
          <div className="w-[40%] relative">
            <input
              placeholder="Search Jobs"
              className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Filters container - distribute remaining space */}
          <div className="flex-1 flex items-center gap-3">
            <div className="flex-1 relative">
              <select
                className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm appearance-none bg-white"
                defaultValue=""
              >
                <option value="" disabled>
                  Location
                </option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
                <option value="usa">United States</option>
                <option value="europe">Europe</option>
              </select>
              <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex-1 relative">
              <select
                className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm appearance-none bg-white"
                defaultValue=""
              >
                <option value="" disabled>
                  Job Type
                </option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
              <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex-1 relative">
              <select
                className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm appearance-none bg-white"
                defaultValue=""
              >
                <option value="" disabled>
                  Industry
                </option>
                <option value="tech">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="education">Education</option>
                <option value="consulting">Consulting</option>
              </select>
              <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex-1 relative">
              <select
                className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm appearance-none bg-white"
                defaultValue=""
              >
                <option value="" disabled>
                  Experience
                </option>
                <option value="entry">0-1 years</option>
                <option value="junior">1-3 years</option>
                <option value="mid">3-5 years</option>
                <option value="senior">5+ years</option>
              </select>
              <GraduationCap className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm whitespace-nowrap">
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
