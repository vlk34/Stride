import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import JobCard from "../components/searchResult/JobCard";
import PreferencesModal from "../components/PreferencesModal";
import {
  Search as SearchIcon,
  Sliders,
  Sparkles,
  Clock,
  ExternalLink,
  ArrowRight,
  Building2,
} from "lucide-react";

const JobRecommendations = ({ dummyData }) => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch recommendations if user is signed in
    if (isSignedIn) {
      // Simulate API call to get personalized recommendations
      const fetchRecommendations = async () => {
        setLoading(true);
        // In a real app, this would be an API call with user skills/preferences
        setTimeout(() => {
          setRecommendations(dummyData?.recommendedJobs?.slice(0, 4) || []);
          setLoading(false);
        }, 800);
      };

      fetchRecommendations();
    } else {
      setLoading(false);
    }
  }, [dummyData, isSignedIn]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/result");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isSignedIn
            ? `Welcome back, ${user?.firstName || "there"}!`
            : "Welcome to Stride!"}
        </h1>
        <p className="text-gray-600">
          {isSignedIn
            ? "Here are some job opportunities that match your profile"
            : "Sign in to get personalized job recommendations"}
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for jobs, skills, or companies..."
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          {isSignedIn ? (
            <>
              {/* Preferences and Saved Jobs Buttons */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                <div className="space-y-3">
                  <button
                    onClick={toggleModal}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                  >
                    <Sliders className="w-5 h-5" />
                    <span>Job Preferences</span>
                  </button>

                  <Link
                    to="/jobs"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>Saved Jobs</span>
                  </Link>
                </div>
              </div>

              {/* Current Preferences Summary */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Your Preferences
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Job Types</span>
                    <span className="font-medium text-gray-900">
                      Full-time, Remote
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium text-gray-900">
                      Remote, Hybrid
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-medium text-gray-900">Mid-level</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Sign in to access
              </h3>
              <p className="text-gray-600 mb-4">
                Create an account or sign in to view your job preferences and
                saved jobs.
              </p>
              <Link
                to="/signin"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Recommended Jobs Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Recommended for You
                </h2>
              </div>
              {isSignedIn && (
                <Link
                  to="/result"
                  className="text-blue-600 font-medium flex items-center gap-1 hover:underline"
                >
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>

            {!isSignedIn ? (
              <div className="py-12 text-center">
                <p className="text-gray-600 mb-4">
                  Sign in to view personalized job recommendations based on your
                  skills and preferences.
                </p>
                <Link
                  to="/signin"
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            ) : loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {recommendations.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onSelect={() => {
                      navigate("/result");
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Recent Searches */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Recent Searches
              </h2>
            </div>
            {!isSignedIn ? (
              <div className="py-8 text-center">
                <p className="text-gray-600">
                  Sign in to view and track your recent job searches.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {dummyData?.recentSearches?.slice(0, 4).map((search) => (
                  <Link
                    key={search.id}
                    to={`/result`}
                    className="block bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 group-hover:text-blue-600">
                          {search.query}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{search.location}</span>
                          <span>•</span>
                          <span>{search.timestamp}</span>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Top Companies */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Top Companies Hiring
              </h2>
            </div>
            {!isSignedIn ? (
              <div className="py-8 text-center">
                <p className="text-gray-600">
                  Sign in to see top companies matching your profile.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {dummyData?.matchingCompanies?.slice(0, 3).map((company) => (
                  <Link
                    key={company.id}
                    to={`/search?company=${company.name}`}
                    className="block bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={company.companyLogo}
                        alt={company.name}
                        className="w-12 h-12 rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-gray-900 group-hover:text-blue-600">
                          {company.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {company.openPositions} open roles
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {isModalOpen && <PreferencesModal onClose={toggleModal} />}
    </div>
  );
};

export default JobRecommendations;
