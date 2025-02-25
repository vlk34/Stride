import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  GraduationCap,
  CheckCircle,
  Users,
  Rocket,
} from "lucide-react";

// Simple fade in animation
const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

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
    navigate("/search", { state: { searchParams } });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-64px)]"
    >
      {/* Hero Section */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div
            variants={fadeIn}
            initial="initial"
            animate="animate"
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Your Career Journey Starts Here
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find your perfect job match with personalized recommendations and
              powerful search tools.
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            variants={fadeIn}
            initial="initial"
            animate="animate"
            className="max-w-3xl mx-auto"
          >
            <form
              onSubmit={handleSearch}
              className="bg-white p-5 rounded-xl border border-gray-200"
            >
              {/* Main Search Input */}
              <div className="relative mb-4">
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
                  className="w-full pl-10 pr-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Filters Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {/* Filter components */}
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

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Search Jobs
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 py-12"
      >
        <h2 className="text-2xl font-semibold text-center mb-2">
          Why Choose Stride?
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          We're revolutionizing how job seekers connect with opportunities.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </motion.div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-2">
            How Stride Works
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            We've simplified the job search process into three easy steps
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Create Your Profile</h3>
              <p className="text-gray-600">
                Set up your professional profile with your experience, skills,
                and preferences
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-semibold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Discover Opportunities</h3>
              <p className="text-gray-600">
                Browse personalized job recommendations or search with our
                powerful filters
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-semibold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Apply with Ease</h3>
              <p className="text-gray-600">
                Submit applications directly through our platform and track your
                progress
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* More Details Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-center mb-8">
          The Stride Advantage
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {whyStridePoints.map((point, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm hover:border-blue-400 transition-all"
            >
              <h3 className="font-semibold mb-2">{point.title}</h3>
              <p className="text-gray-600">{point.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Popular Job Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setSearchParams((prev) => ({
                    ...prev,
                    industry: category.name,
                  }));
                  handleSearch({ preventDefault: () => {} });
                }}
                className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-left"
              >
                <h3 className="font-medium mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} jobs</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Searches */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Trending Searches
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => {
                setSearchParams((prev) => ({ ...prev, query: term }));
                handleSearch({ preventDefault: () => {} });
              }}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors text-sm"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Simple Feature Card without hover animations
const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-lg border border-gray-200">
    <div className="mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const features = [
  {
    icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
    title: "Smart Job Matching",
    description:
      "Our AI-powered platform analyzes your profile to find the perfect job opportunities that match your skills and preferences.",
  },
  {
    icon: <Rocket className="w-6 h-6 text-blue-600" />,
    title: "Career Growth Tools",
    description:
      "Access comprehensive job search tools, application tracking, and personalized job recommendations all in one place.",
  },
  {
    icon: <Users className="w-6 h-6 text-blue-600" />,
    title: "Direct Applications",
    description:
      "Apply directly to top companies with our streamlined application process. No more jumping between multiple platforms.",
  },
];

const whyStridePoints = [
  {
    title: "Simplified Job Search",
    description:
      "We've reimagined the job search experience. No more endless scrolling through irrelevant positions - find what matters to you.",
  },
  {
    title: "All-in-One Platform",
    description:
      "Manage your job search, applications, and saved positions in one centralized dashboard. Stay organized and focused on your goals.",
  },
  {
    title: "Smart Recommendations",
    description:
      "Our intelligent system learns from your preferences and provides increasingly relevant job suggestions over time.",
  },
  {
    title: "Real-Time Updates",
    description:
      "Get instant notifications for new positions matching your criteria. Never miss out on your dream opportunity.",
  },
];

// Sample Data
const popularCategories = [
  { name: "Technology", count: "1.2k" },
  { name: "Healthcare", count: "850" },
  { name: "Finance", count: "750" },
  { name: "Education", count: "600" },
  { name: "Marketing", count: "500" },
  { name: "Design", count: "450" },
  { name: "Sales", count: "400" },
  { name: "Engineering", count: "350" },
];

const popularSearches = [
  "Software Engineer",
  "Product Designer",
  "Data Scientist",
  "Marketing Manager",
  "UX Designer",
  "Sales Representative",
  "Project Manager",
  "Full Stack Developer",
];

export default Home;
