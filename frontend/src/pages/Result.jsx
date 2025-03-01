// src/components/searchResult/Result.jsx
import React, { useState, useEffect } from "react";
import JobCard from "../components/searchResult/JobCard";
import JobInformation from "../components/searchResult/JobInformation";
import { useLocation } from "react-router";
import {
  MapPin,
  Briefcase,
  Building2,
  GraduationCap,
  Search,
  Filter,
  X,
} from "lucide-react";

const Result = ({ jobs }) => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    workstyle: "",
    type: "",
    industry: "",
    experience: "",
  });
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [selectedJob, setSelectedJob] = useState(null);

  // Handle job selection directly without URL navigation
  const handleJobSelect = (job) => {
    setSelectedJob(job || null);
  };

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
      {/* Search bar */}
      <div className="sticky top-0 z-10 bg-white pb-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              placeholder="Search for jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2.5 border border-gray-200 rounded-lg hover:border-gray-300"
          >
            <Filter className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {showFilters && (
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
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
        )}
      </div>

      {/* Content */}
      <div className="mt-6">
        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-6">
          {/* Job listings */}
          <div className="w-2/5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">
                {filteredJobs.length} Job Listings Available
              </span>
              <select className="border rounded-lg px-2 py-1 text-sm">
                <option>Relevance</option>
                <option>Latest</option>
                <option>Oldest</option>
              </select>
            </div>

            <div className="space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSelected={selectedJob?.id === job.id}
                  onSelect={handleJobSelect}
                />
              ))}
            </div>
          </div>

          {/* Job details - Desktop */}
          <div className="w-3/5 bg-white rounded-lg border border-gray-200">
            <div className="h-[calc(100vh-180px)] overflow-y-auto">
              <JobInformation job={selectedJob} />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">
              {filteredJobs.length} Job Listings Available
            </span>
            <select className="border rounded-lg px-2 py-1 text-sm">
              <option>Relevance</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSelected={selectedJob?.id === job.id}
                onSelect={handleJobSelect}
              />
            ))}
          </div>

          {/* Mobile Job details overlay */}
          {selectedJob && (
            <>
              <div
                className="fixed inset-0 bg-black/30 transition-opacity z-40"
                onClick={() => handleJobSelect(null)}
              />

              <div
                className="fixed inset-x-0 bottom-0 z-50 bg-white border-t border-gray-200 transform transition-transform duration-300 ease-out"
                style={{
                  height: "90vh",
                  transform: "translateY(0)",
                  animation: "slideUp 300ms ease-out",
                }}
              >
                <div className="h-full overflow-y-auto overscroll-contain">
                  <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                    <h2 className="font-semibold text-lg">
                      {selectedJob.title}
                    </h2>
                    <button
                      onClick={() => handleJobSelect(null)}
                      className="p-2 hover:bg-gray-100 rounded-full lg:hidden"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4">
                    <JobInformation job={selectedJob} />
                  </div>
                </div>
              </div>

              <style jsx>{`
                @keyframes slideUp {
                  from {
                    transform: translateY(100%);
                  }
                  to {
                    transform: translateY(0);
                  }
                }
              `}</style>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
