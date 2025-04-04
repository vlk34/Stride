import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import JobCard from "../components/searchResult/JobCard";
import {
  Search as SearchIcon,
  Sparkles,
  Rocket,
  Clock,
  Building2,
  TrendingUp,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Briefcase,
  GraduationCap,
  Filter,
} from "lucide-react";

const Search = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const carouselRef = useRef(null);

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

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300; // Adjust scroll amount as needed
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
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
        logo: "999",
      },
      {
        job_id: 2,
        title: "Product Designer",
        company: "Design Studio",
        location: "Remote",
        job_type: "Full-time",
        workstyle: "Remote",
        isVerified: true,
        logo: "998",
      },
      {
        job_id: 3,
        title: "Backend Engineer",
        company: "Cloud Systems",
        location: "Austin, TX",
        job_type: "Full-time",
        workstyle: "Hybrid",
        isVerified: false,
        logo: "997",
      },
    ],
    trendingJobs: [
      {
        job_id: 5,
        title: "AI Engineer",
        company: "AI Solutions Ltd",
        location: "New York, NY",
        job_type: "Full-time",
        workstyle: "Hybrid",
        isVerified: true,
        logo: "996",
      },
      {
        job_id: 6,
        title: "DevOps Specialist",
        company: "Infrastructure Inc",
        location: "Seattle, WA",
        job_type: "Full-time",
        workstyle: "Remote",
        isVerified: true,
        logo: "995",
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
    matchingCompanies: [
      {
        id: 1,
        name: "TechCorp Inc.",
        industry: "Technology",
        openPositions: 5,
        logo: "994",
      },
      {
        id: 2,
        name: "Design Studio",
        industry: "Creative",
        openPositions: 3,
        logo: "993",
      },
      {
        id: 3,
        name: "Cloud Systems",
        industry: "Technology",
        openPositions: 7,
        logo: "992",
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Find your next opportunity
        </h1>
        <p className="text-gray-600 mb-6">
          Search through thousands of jobs matching your skills and preferences
        </p>

        {/* Updated Search Form with all filters */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="What's your dream role?"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="query"
                value={searchParams.query}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="relative">
              <select
                name="workstyle"
                value={searchParams.workstyle}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 appearance-none bg-white"
              >
                <option value="">Workstyle</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
              <MapPin className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <select
                name="type"
                value={searchParams.type}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 appearance-none bg-white"
              >
                <option value="">Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
              <Briefcase className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <select
                name="industry"
                value={searchParams.industry}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 appearance-none bg-white"
              >
                <option value="">Industry</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
              </select>
              <Building2 className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <select
                name="experience"
                value={searchParams.experience}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 appearance-none bg-white"
              >
                <option value="">Experience</option>
                <option value="0-1 years">0-1 years</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
              <GraduationCap className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </form>
      </div>

      {/* Featured Opportunities */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Sparkles className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Opportunities
            </h2>
            <p className="text-gray-600">
              Curated just for you based on your profile
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dummyData.recommendedJobs.slice(0, 4).map((job) => (
            <JobCard
              key={job.job_id}
              job={job}
              onSelect={() => navigate(`/result?jobId=${job.job_id}`)}
            />
          ))}
        </div>
      </div>

      {/* Companies Carousel */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Companies Hiring
              </h2>
              <p className="text-gray-600">
                Top companies matching your skills
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scrollbar-hide gap-6 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {dummyData.matchingCompanies.map((company) => (
            <div
              key={company.id}
              className="flex-none w-[300px] bg-white p-6 rounded-xl border border-gray-200"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">
                    {company.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-600">{company.industry}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-600 font-medium">
                  {company.openPositions} open positions
                </span>
                <Link
                  to={`/companies/${company.id}`}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View Jobs
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Searches and Trending Industries */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recent Searches */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Recent Searches
                </h2>
                <p className="text-gray-600">Your latest job searches</p>
              </div>
            </div>
            <div className="space-y-4">
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
                  className="block bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-blue-600">
                        {search.query}
                      </p>
                      <p className="text-sm text-gray-500">{search.location}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Industries */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Trending Industries
                </h2>
                <p className="text-gray-600">Popular sectors in your area</p>
              </div>
            </div>
            <div className="space-y-4">
              {["Tech", "Healthcare", "Finance"].map((industry, index) => (
                <div
                  key={industry}
                  onClick={() => {
                    setSearchParams((prev) => ({
                      ...prev,
                      industry,
                    }));
                    navigate(
                      `/result?industry=${encodeURIComponent(industry)}`
                    );
                  }}
                  className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-500 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      {industry}
                    </span>
                    <span className="text-blue-600 font-medium">
                      ↑ {24 - index * 6}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${85 - index * 15}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Career Resources */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-200 p-2 rounded-lg">
            <Rocket className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Level Up Your Career
            </h2>
            <p className="text-gray-600">Resources to help you grow</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/resources/resume" className="group">
            <div className="bg-white/50 p-6 rounded-lg hover:bg-white transition-colors">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                Resume Tips
              </h3>
              <p className="text-sm text-gray-600">Learn how to stand out</p>
            </div>
          </Link>
          <Link to="/resources/interview" className="group">
            <div className="bg-white/50 p-6 rounded-lg hover:bg-white transition-colors">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                Interview Prep
              </h3>
              <p className="text-sm text-gray-600">Ace your next interview</p>
            </div>
          </Link>
          <Link to="/resources/skills" className="group">
            <div className="bg-white/50 p-6 rounded-lg hover:bg-white transition-colors">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                Skill Building
              </h3>
              <p className="text-sm text-gray-600">Stay ahead of the curve</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Search;
