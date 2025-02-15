// src/components/searchResult/Result.jsx
import React, { useState, useEffect } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    workstyle: "",
    type: "",
    industry: "",
    experience: "",
  });
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  // Update filtered jobs whenever search term, filters, or jobs change
  useEffect(() => {
    const normalizedSearch = searchTerm.toLowerCase().replace(/\s+/g, "");

    const filtered = jobs.filter((job) => {
      const normalizedTitle = job.title.toLowerCase().replace(/\s+/g, "");
      const matchesSearch = normalizedTitle.includes(normalizedSearch);

      const matchesWorkstyle =
        !filters.workstyle || job.workstyle === filters.workstyle;
      const matchesType = !filters.type || job.type === filters.type;
      const matchesIndustry =
        !filters.industry || job.industry === filters.industry;
      const matchesExperience =
        !filters.experience || job.experience === filters.experience;

      return (
        matchesSearch &&
        matchesWorkstyle &&
        matchesType &&
        matchesIndustry &&
        matchesExperience
      );
    });

    setFilteredJobs(filtered);
  }, [searchTerm, filters, jobs]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-white p-3 rounded-lg border border-gray-200 mb-6">
        <div className="flex items-center gap-3">
          {/* Search bar - fixed width */}
          <div className="w-[40%] relative">
            <input
              placeholder="Search Jobs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Filters container */}
          <div className="flex-1 flex items-center gap-3">
            <div className="flex-1 relative">
              <select
                name="workstyle"
                value={filters.workstyle}
                onChange={handleFilterChange}
                className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm appearance-none bg-white"
              >
                <option value="">Workstyle</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
              <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex-1 relative">
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm appearance-none bg-white"
              >
                <option value="">Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
              <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex-1 relative">
              <select
                name="industry"
                value={filters.industry}
                onChange={handleFilterChange}
                className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm appearance-none bg-white"
              >
                <option value="">Industry</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
              </select>
              <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex-1 relative">
              <select
                name="experience"
                value={filters.experience}
                onChange={handleFilterChange}
                className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm appearance-none bg-white"
              >
                <option value="">Experience</option>
                <option value="0-1 years">0-1 years</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
              <GraduationCap className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left column - Job listings */}
        <div className="w-2/5">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">
              {filteredJobs.length} Job Listings Available
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="border rounded-lg px-2 py-1 text-sm">
                <option>Relevance</option>
                <option>Latest</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
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
