import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import {
  Search as SearchIcon,
  Sparkles,
  MapPin,
  Briefcase,
  Building2,
  GraduationCap,
  Filter,
  LogIn,
  UserPlus,
  Lock,
} from "lucide-react";

// Simple JobCard component with placeholder instead of loading images
const SimpleJobCard = ({ job, onSelect }) => {
  // Format job properties
  const formattedLocation = job.location;
  const formattedJobType = job.job_type || job.jobtype;
  const formattedWorkstyle = job.workstyle;
  const formattedCompany = job.company;

  return (
    <div
      onClick={onSelect}
      className="p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-all"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
          {job.company ? job.company.charAt(0).toUpperCase() : "?"}
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
              <span className="px-2 py-0.5 text-sm bg-blue-50 text-blue-600 rounded font-medium">
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

// Authentication required card component
const AuthRequiredCard = ({ title, description, onSignIn, onSignUp }) => {
  return (
    <div className="p-6 rounded-lg border border-gray-200 bg-blue-50">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-blue-100 p-2 rounded-full">
          <Lock className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex gap-3">
        <button
          onClick={onSignIn}
          className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          Sign In
        </button>
        <button
          onClick={onSignUp}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Create Account
        </button>
      </div>
    </div>
  );
};

const Search = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  // Set up search state with all filter parameters
  const [searchParams, setSearchParams] = useState({
    query: "",
    workstyle: "",
    type: "",
    industry: "",
    experience: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle the search form submission
  const handleSearch = (e) => {
    e.preventDefault();

    // Check if at least one parameter has been set
    if (
      searchParams.query ||
      searchParams.workstyle ||
      searchParams.type ||
      searchParams.industry ||
      searchParams.experience
    ) {
      // Build query parameters
      const params = new URLSearchParams();
      if (searchParams.query) params.append("q", searchParams.query);
      if (searchParams.workstyle)
        params.append("workstyle", searchParams.workstyle);
      if (searchParams.type) params.append("jobtype", searchParams.type);
      if (searchParams.industry)
        params.append("industry", searchParams.industry);
      if (searchParams.experience)
        params.append("experience", searchParams.experience);

      // Navigate to results page with the query parameters
      navigate(`/search?${params.toString()}`);
    }
  };

  // Sample data for display purposes
  const dummyData = {
    recommendedJobs: [
      {
        job_id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        job_type: "Full-time",
        workstyle: "Remote",
        isVerified: true,
      },
      {
        job_id: 2,
        title: "Product Designer",
        company: "Design Studio",
        location: "Remote",
        job_type: "Full-time",
        workstyle: "Remote",
        isVerified: true,
      },
      {
        job_id: 3,
        title: "Backend Engineer",
        company: "Cloud Systems",
        location: "Austin, TX",
        job_type: "Full-time",
        workstyle: "Hybrid",
        isVerified: false,
      },
    ],
    recentSearches: [
      {
        id: 1,
        query: "Frontend Developer",
        location: "San Francisco",
        timestamp: "Today",
        results: "24 jobs found",
      },
      {
        id: 2,
        query: "UX Designer",
        location: "Remote",
        timestamp: "Yesterday",
        results: "18 jobs found",
      },
      {
        id: 3,
        query: "Data Scientist",
        location: "New York",
        timestamp: "2 days ago",
        results: "32 jobs found",
      },
      {
        id: 4,
        query: "Product Manager",
        location: "Austin",
        timestamp: "3 days ago",
        results: "15 jobs found",
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
      {/* Hero Section with improved styling */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Find your dream job
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Discover opportunities that align with your skills and ambitions
        </p>

        {/* Updated Search Form with cleaner styling */}
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Job title, keyword, or company"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="query"
                value={searchParams.query}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              Search
            </button>
          </div>

          {/* Advanced Filters with improved styling */}
          <div className="p-5 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-gray-700">Filter results</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <select
                  name="workstyle"
                  value={searchParams.workstyle}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">Workstyle</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
                <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              <div className="relative">
                <select
                  name="type"
                  value={searchParams.type}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">Job Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
                <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              <div className="relative">
                <select
                  name="industry"
                  value={searchParams.industry}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                </select>
                <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              <div className="relative">
                <select
                  name="experience"
                  value={searchParams.experience}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 appearance-none bg-white"
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
        </form>
      </div>

      {/* Featured Opportunities */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Featured Opportunities
          </h2>
        </div>

        {!isLoaded ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : !isSignedIn ? (
          <div className="py-4">
            <AuthRequiredCard
              title="Sign in to see featured opportunities"
              description="Create an account or sign in to see personalized job recommendations based on your profile and preferences."
              onSignIn={() => navigate("/signin")}
              onSignUp={() => navigate("/signup")}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {dummyData.recommendedJobs.map((job) => (
              <SimpleJobCard
                key={job.job_id}
                job={job}
                onSelect={() => navigate(`/result?jobId=${job.job_id}`)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recent Searches */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recent Searches
        </h2>

        {!isLoaded ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : !isSignedIn ? (
          <div className="py-2">
            <AuthRequiredCard
              title="Sign in to see your recent searches"
              description="Create an account or sign in to track your search history and quickly return to previous job searches."
              onSignIn={() => navigate("/signin")}
              onSignUp={() => navigate("/signup")}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dummyData.recentSearches.map((search) => (
              <div
                key={search.id}
                onClick={() => {
                  setSearchParams((prev) => ({
                    ...prev,
                    query: search.query,
                  }));
                  navigate(`/result?q=${encodeURIComponent(search.query)}`);
                }}
                className="bg-white hover:bg-blue-50 p-4 rounded-xl border border-gray-200 cursor-pointer transition-colors group"
              >
                <p className="font-medium text-gray-900 group-hover:text-blue-600">
                  {search.query}
                </p>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-500">
                    {search.location}
                  </span>
                  <span className="text-sm text-blue-600 font-medium">
                    {search.results}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
