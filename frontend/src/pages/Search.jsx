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
} from "lucide-react";

const Search = ({ dummyData }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const carouselRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/result?q=${encodeURIComponent(searchTerm)}`);
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
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="What's your dream role?"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
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
            <JobCard key={job.id} job={job} />
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
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-12 h-12 rounded-lg"
                />
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
                <Link
                  key={search.id}
                  to={`/result?q=${search.query}`}
                  className="block bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors group"
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
                </Link>
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
                  className="bg-white p-4 rounded-xl border border-gray-200"
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
