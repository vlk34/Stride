import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  GraduationCap,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    query: "",
    workstyle: "",
    type: "",
    industry: "",
    experience: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to results page with search params
    navigate("/search", { state: { searchParams } });
  };

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Next Career Opportunity
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover thousands of job opportunities with all the information you
            need.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            {/* Main Search Input */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search for jobs (e.g., 'Frontend Developer')"
                value={searchParams.query}
                onChange={(e) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    query: e.target.value,
                  }))
                }
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <Search className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Workstyle Filter */}
              <div className="relative">
                <select
                  value={searchParams.workstyle}
                  onChange={(e) =>
                    setSearchParams((prev) => ({
                      ...prev,
                      workstyle: e.target.value,
                    }))
                  }
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">Workstyle</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
                <MapPin className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Job Type Filter */}
              <div className="relative">
                <select
                  value={searchParams.type}
                  onChange={(e) =>
                    setSearchParams((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
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

              {/* Industry Filter */}
              <div className="relative">
                <select
                  value={searchParams.industry}
                  onChange={(e) =>
                    setSearchParams((prev) => ({
                      ...prev,
                      industry: e.target.value,
                    }))
                  }
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

              {/* Experience Filter */}
              <div className="relative">
                <select
                  value={searchParams.experience}
                  onChange={(e) =>
                    setSearchParams((prev) => ({
                      ...prev,
                      experience: e.target.value,
                    }))
                  }
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

            {/* Search Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Search Jobs
            </button>
          </form>

          {/* Popular Searches */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Popular Searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Software Engineer",
                "Product Designer",
                "Data Scientist",
                "Marketing Manager",
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchParams((prev) => ({ ...prev, query: term }));
                    handleSearch({ preventDefault: () => {} });
                  }}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
