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

// Sample job data to use when no jobs are provided
const sampleJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    companyLogo: "https://via.placeholder.com/150",
    location: "Remote",
    type: "Full-time",
    workstyle: "Remote",
    isVerified: true,
    overview:
      "We are looking for an experienced Frontend Developer to join our team and help build amazing user experiences.",
    responsibilities: [
      "Develop and maintain responsive web applications",
      "Collaborate with cross-functional teams",
      "Implement best practices and coding standards",
      "Mentor junior developers",
    ],
    about:
      "Tech Solutions Inc. is a leading technology company providing innovative solutions to businesses worldwide.",
    industry: "Technology",
    experience: "3-5 years",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Creative Designs",
    companyLogo: "https://via.placeholder.com/150",
    location: "New York, NY",
    type: "Full-time",
    workstyle: "Hybrid",
    isVerified: true,
    overview:
      "Join our design team to create beautiful and functional product experiences.",
    responsibilities: [
      "Create user-centered designs",
      "Develop UI/UX wireframes and prototypes",
      "Conduct user research and testing",
      "Collaborate with developers to implement designs",
    ],
    about:
      "Creative Designs is a design agency focused on creating exceptional digital experiences.",
    industry: "Design",
    experience: "1-3 years",
  },
  {
    id: 3,
    title: "Marketing Manager",
    company: "Global Marketing",
    companyLogo: "https://via.placeholder.com/150",
    location: "San Francisco, CA",
    type: "Full-time",
    workstyle: "On-site",
    isVerified: true,
    overview: "Lead our marketing efforts to drive growth and brand awareness.",
    responsibilities: [
      "Develop and implement marketing strategies",
      "Manage marketing campaigns across multiple channels",
      "Analyze market trends and competitor activities",
      "Collaborate with sales and product teams",
    ],
    about:
      "Global Marketing is a marketing agency helping businesses grow through strategic marketing initiatives.",
    industry: "Marketing",
    experience: "3-5 years",
  },
];

const Result = ({ jobs: propJobs }) => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    workstyle: "",
    type: "",
    industry: "",
    experience: "",
  });
  const [initialSelectionDone, setInitialSelectionDone] = useState(false);

  // Use provided jobs or fall back to sample jobs
  const [jobs, setJobs] = useState(propJobs || sampleJobs);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [selectedJob, setSelectedJob] = useState(null);

  // Modified useEffect to handle initial job selection and prevent reopening
  useEffect(() => {
    // Only select the first job if we haven't done the initial selection yet
    if (
      location.state?.fromDashboard &&
      filteredJobs.length > 0 &&
      !selectedJob &&
      !initialSelectionDone
    ) {
      setSelectedJob(filteredJobs[0]);
      // Mark that we've done the initial selection
      setInitialSelectionDone(true);
    }
  }, [filteredJobs, location.state, selectedJob, initialSelectionDone]);

  // Create a wrapper for setSelectedJob that respects user's choice to close
  const handleSelectJob = (job) => {
    setSelectedJob(job);
    // If user explicitly selects a job, we should consider initial selection done
    if (!initialSelectionDone) {
      setInitialSelectionDone(true);
    }
  };

  // Create a handler for closing the job detail view
  const handleCloseJobDetail = () => {
    setSelectedJob(null);
    // Ensure we don't reopen it automatically
    setInitialSelectionDone(true);
  };

  // Update jobs if props change
  useEffect(() => {
    if (propJobs && propJobs.length > 0) {
      setJobs(propJobs);
    }
  }, [propJobs]);

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
                  onSelect={handleSelectJob}
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
                onSelect={handleSelectJob}
              />
            ))}
          </div>

          {/* Mobile Job details overlay */}
          {selectedJob && (
            <>
              <div
                className="fixed inset-0 bg-black/30 transition-opacity z-40"
                onClick={handleCloseJobDetail}
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
                      onClick={handleCloseJobDetail}
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

              <style>
                {`
                  @keyframes slideUp {
                    from {
                      transform: translateY(100%);
                    }
                    to {
                      transform: translateY(0);
                    }
                  }
                `}
              </style>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
