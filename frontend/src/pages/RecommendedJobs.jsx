import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router";
import {
  Sparkles,
  Building,
  MapPin,
  Clock,
  Briefcase,
  ChevronLeft,
  Filter,
  X,
  Search as SearchIcon,
  Check,
} from "lucide-react";
import JobCard from "../components/searchResult/JobCard";
import JobInformation from "../components/searchResult/JobInformation";

// Sample jobs data formatted to match what JobCard and JobInformation expect
const sampleJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp Solutions",
    logo: "/company-logos/techcorp.svg",
    location: "San Francisco, CA",
    type: "Full-time",
    workstyle: "Remote",
    salary: "$90,000 - $120,000",
    experience: "Mid-Level",
    posted: "2 days ago",
    description:
      "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces using React and implementing responsive designs.",
    responsibilities: [
      "Develop new user-facing features using React.js",
      "Build reusable components and libraries for future use",
      "Translate designs and wireframes into high-quality code",
      "Optimize components for maximum performance across devices",
      "Collaborate with backend developers and designers",
    ],
    requirements: [
      "3+ years of experience with React.js",
      "Proficiency in JavaScript, HTML, and CSS",
      "Experience with responsive design",
      "Familiarity with RESTful APIs",
      "Knowledge of modern frontend build pipelines and tools",
    ],
    benefits: [
      "Competitive salary",
      "Health, dental, and vision insurance",
      "401(k) matching",
      "Flexible work hours",
      "Remote work options",
      "Professional development budget",
    ],
    skills: ["React", "JavaScript", "HTML", "CSS", "RESTful APIs"],
    isSaved: false,
    companyInfo: {
      name: "TechCorp Solutions",
      logo: "/company-logos/techcorp.svg",
      website: "https://techcorp.example.com",
      industry: "Technology",
      employeeCount: "50-200 employees",
      founded: "2015",
      description:
        "TechCorp Solutions is a leading technology company specializing in web and mobile application development.",
    },
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataFlow Systems",
    logo: "/company-logos/dataflow.svg",
    location: "Austin, TX",
    type: "Full-time",
    workstyle: "Hybrid",
    salary: "$100,000 - $130,000",
    experience: "Senior",
    posted: "1 week ago",
    description:
      "DataFlow Systems is seeking a Backend Engineer to design and implement scalable APIs and services. You will work with our team to build robust backend solutions for our data processing platform.",
    responsibilities: [
      "Design and implement scalable backend services",
      "Optimize database queries and data structures",
      "Collaborate with frontend developers to integrate user-facing elements",
      "Implement security and data protection measures",
      "Monitor and troubleshoot application performance",
    ],
    requirements: [
      "5+ years of experience in backend development",
      "Proficiency in Node.js, Python, or Java",
      "Experience with SQL and NoSQL databases",
      "Knowledge of cloud services (AWS, Azure, or GCP)",
      "Understanding of microservices architecture",
    ],
    benefits: [
      "Competitive salary",
      "Health and wellness benefits",
      "Stock options",
      "Flexible work arrangements",
      "Professional development opportunities",
      "Company-sponsored events and activities",
    ],
    skills: [
      "Node.js",
      "Python",
      "Java",
      "SQL",
      "NoSQL",
      "AWS",
      "Microservices",
    ],
    isSaved: false,
    companyInfo: {
      name: "DataFlow Systems",
      logo: "/company-logos/dataflow.svg",
      website: "https://dataflow.example.com",
      industry: "Data Processing",
      employeeCount: "100-500 employees",
      founded: "2012",
      description:
        "DataFlow Systems specializes in building scalable data processing solutions for enterprise clients.",
    },
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Creative Minds",
    logo: "/company-logos/creative.svg",
    location: "New York, NY",
    type: "Full-time",
    workstyle: "On-site",
    salary: "$85,000 - $110,000",
    experience: "Mid-Level",
    posted: "3 days ago",
    description:
      "Creative Minds is looking for a talented UX/UI Designer to create amazing user experiences. You will work on designing intuitive interfaces for web and mobile applications.",
    responsibilities: [
      "Create user flows, wireframes, and prototypes",
      "Conduct user research and usability testing",
      "Collaborate with developers to implement designs",
      "Create and maintain design systems",
      "Stay up-to-date with design trends and best practices",
    ],
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency in design tools like Figma or Adobe XD",
      "Portfolio demonstrating strong design skills",
      "Understanding of user-centered design principles",
      "Experience with responsive design",
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Flexible work hours",
      "Creative work environment",
      "Professional development budget",
      "Team outings and events",
    ],
    skills: [
      "Figma",
      "Adobe XD",
      "User Research",
      "Wireframing",
      "Prototyping",
      "UI Design",
    ],
    isSaved: false,
    companyInfo: {
      name: "Creative Minds",
      logo: "/company-logos/creative.svg",
      website: "https://creativeminds.example.com",
      industry: "Design Agency",
      employeeCount: "20-50 employees",
      founded: "2018",
      description:
        "Creative Minds is a design agency focused on creating beautiful and functional digital experiences.",
    },
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "Insight Analytics",
    logo: "/company-logos/insight.svg",
    location: "Boston, MA",
    type: "Full-time",
    workstyle: "Remote",
    salary: "$110,000 - $140,000",
    experience: "Senior",
    posted: "5 days ago",
    description:
      "Insight Analytics is seeking a Data Scientist to join our team. You will analyze complex data sets to help our clients make data-driven decisions and develop predictive models.",
    responsibilities: [
      "Analyze large datasets to identify patterns and insights",
      "Develop machine learning models for predictive analytics",
      "Create data visualizations and reports",
      "Collaborate with engineering teams to implement models",
      "Present findings to stakeholders and clients",
    ],
    requirements: [
      "Master's or PhD in a quantitative field",
      "4+ years of experience in data science",
      "Proficiency in Python, R, or similar languages",
      "Experience with machine learning frameworks",
      "Strong statistical knowledge and mathematical skills",
    ],
    benefits: [
      "Competitive salary",
      "Comprehensive benefits package",
      "Remote work flexibility",
      "Continuous learning opportunities",
      "Collaborative work environment",
      "Work-life balance",
    ],
    skills: [
      "Python",
      "R",
      "Machine Learning",
      "Statistics",
      "Data Visualization",
      "SQL",
    ],
    isSaved: false,
    companyInfo: {
      name: "Insight Analytics",
      logo: "/company-logos/insight.svg",
      website: "https://insightanalytics.example.com",
      industry: "Data Analytics",
      employeeCount: "50-200 employees",
      founded: "2014",
      description:
        "Insight Analytics helps businesses leverage data to make better decisions through advanced analytics and machine learning.",
    },
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudScale Technologies",
    logo: "/company-logos/cloudscale.svg",
    location: "Seattle, WA",
    type: "Full-time",
    workstyle: "Hybrid",
    salary: "$95,000 - $125,000",
    experience: "Mid-Level",
    posted: "1 week ago",
    description:
      "CloudScale Technologies is looking for a DevOps Engineer to help us build and maintain our cloud infrastructure. You will work on automating deployment processes and ensuring system reliability.",
    responsibilities: [
      "Design and implement CI/CD pipelines",
      "Manage cloud infrastructure using IaC tools",
      "Monitor system performance and troubleshoot issues",
      "Implement security best practices",
      "Collaborate with development teams to improve deployment processes",
    ],
    requirements: [
      "3+ years of experience in DevOps or SRE roles",
      "Experience with AWS, Azure, or GCP",
      "Knowledge of containerization (Docker, Kubernetes)",
      "Proficiency in scripting languages (Python, Bash)",
      "Experience with CI/CD tools (Jenkins, GitLab CI)",
    ],
    benefits: [
      "Competitive salary",
      "Health and dental insurance",
      "401(k) with company match",
      "Flexible work arrangements",
      "Professional development opportunities",
      "Company events and team building activities",
    ],
    skills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Python",
      "Bash",
      "Jenkins",
    ],
    isSaved: false,
    companyInfo: {
      name: "CloudScale Technologies",
      logo: "/company-logos/cloudscale.svg",
      website: "https://cloudscale.example.com",
      industry: "Cloud Infrastructure",
      employeeCount: "100-500 employees",
      founded: "2016",
      description:
        "CloudScale Technologies provides cloud infrastructure solutions and DevOps services to help businesses scale efficiently.",
    },
  },
  {
    id: 6,
    title: "Product Manager",
    company: "InnovateTech",
    logo: "/company-logos/innovate.svg",
    location: "Chicago, IL",
    type: "Full-time",
    workstyle: "On-site",
    salary: "$100,000 - $130,000",
    experience: "Senior",
    posted: "2 weeks ago",
    description:
      "InnovateTech is seeking a Product Manager to lead the development of our SaaS platform. You will work closely with engineering, design, and marketing teams to define product strategy and roadmap.",
    responsibilities: [
      "Define product vision, strategy, and roadmap",
      "Gather and prioritize product requirements",
      "Work with engineering teams to deliver features",
      "Analyze market trends and competitive landscape",
      "Collect and analyze user feedback to improve products",
    ],
    requirements: [
      "5+ years of experience in product management",
      "Experience with SaaS products",
      "Strong analytical and problem-solving skills",
      "Excellent communication and leadership abilities",
      "Technical background or understanding of software development",
    ],
    benefits: [
      "Competitive salary",
      "Comprehensive benefits package",
      "Stock options",
      "Professional development budget",
      "Flexible work hours",
      "Team events and activities",
    ],
    skills: [
      "Product Management",
      "SaaS",
      "Agile",
      "Market Research",
      "User Stories",
      "Roadmapping",
    ],
    isSaved: false,
    companyInfo: {
      name: "InnovateTech",
      logo: "/company-logos/innovate.svg",
      website: "https://innovatetech.example.com",
      industry: "Software",
      employeeCount: "50-200 employees",
      founded: "2017",
      description:
        "InnovateTech develops SaaS solutions that help businesses streamline their operations and improve productivity.",
    },
  },
  {
    id: 7,
    title: "Mobile Developer (iOS)",
    company: "AppWorks Studio",
    logo: "/company-logos/appworks.svg",
    location: "Los Angeles, CA",
    type: "Full-time",
    workstyle: "Remote",
    salary: "$90,000 - $120,000",
    experience: "Mid-Level",
    posted: "3 days ago",
    description:
      "AppWorks Studio is looking for an iOS Developer to join our mobile team. You will be responsible for developing and maintaining iOS applications for our clients.",
    responsibilities: [
      "Develop and maintain iOS applications",
      "Collaborate with cross-functional teams",
      "Implement new features and functionality",
      "Ensure the performance and quality of applications",
      "Fix bugs and improve application performance",
    ],
    requirements: [
      "3+ years of experience in iOS development",
      "Proficiency in Swift and Objective-C",
      "Experience with iOS frameworks and APIs",
      "Knowledge of mobile UI design principles",
      "Understanding of Apple's design principles and guidelines",
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Remote work options",
      "Flexible schedule",
      "Professional development opportunities",
      "Collaborative work environment",
    ],
    skills: ["Swift", "Objective-C", "iOS", "UI Design", "Mobile Development"],
    isSaved: false,
    companyInfo: {
      name: "AppWorks Studio",
      logo: "/company-logos/appworks.svg",
      website: "https://appworks.example.com",
      industry: "Mobile Development",
      employeeCount: "10-50 employees",
      founded: "2019",
      description:
        "AppWorks Studio specializes in creating high-quality mobile applications for businesses and consumers.",
    },
  },
  {
    id: 8,
    title: "Full Stack Developer",
    company: "Omni Solutions",
    logo: "/company-logos/omni.svg",
    location: "Denver, CO",
    type: "Full-time",
    workstyle: "Hybrid",
    salary: "$95,000 - $125,000",
    experience: "Mid-Level",
    posted: "1 week ago",
    description:
      "Omni Solutions is seeking a Full Stack Developer to work on our enterprise applications. You will be involved in all aspects of development, from database design to frontend implementation.",
    responsibilities: [
      "Develop both frontend and backend components",
      "Design and implement database schemas",
      "Build RESTful APIs and services",
      "Ensure cross-browser compatibility and responsiveness",
      "Collaborate with designers and other developers",
    ],
    requirements: [
      "4+ years of full stack development experience",
      "Proficiency in JavaScript/TypeScript and a backend language",
      "Experience with modern frontend frameworks (React, Angular, or Vue)",
      "Knowledge of database systems (SQL and NoSQL)",
      "Understanding of web security best practices",
    ],
    benefits: [
      "Competitive salary",
      "Health and dental coverage",
      "401(k) matching",
      "Flexible work arrangements",
      "Continuous learning opportunities",
      "Team building events",
    ],
    skills: [
      "JavaScript",
      "TypeScript",
      "Node.js",
      "SQL",
      "NoSQL",
      "RESTful APIs",
      "Web Security",
    ],
    isSaved: false,
    companyInfo: {
      name: "Omni Solutions",
      logo: "/company-logos/omni.svg",
      website: "https://omnisolutions.example.com",
      industry: "Software Development",
      employeeCount: "50-200 employees",
      founded: "2013",
      description:
        "Omni Solutions provides comprehensive software development services to businesses of all sizes.",
    },
  },
];

const RecommendedJobs = () => {
  const location = useLocation();
  const userDescription = location.state?.userDescription || "";
  const [loading, setLoading] = useState(true);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Current applied filters
  const [filters, setFilters] = useState({
    workstyle: [],
    type: [],
    experience: [],
  });

  // Temporary filters that are only applied when the Apply button is clicked
  const [tempFilters, setTempFilters] = useState({
    workstyle: [],
    type: [],
    experience: [],
  });

  useEffect(() => {
    // Simulate fetching recommended jobs from an AI backend
    const fetchRecommendedJobs = async () => {
      setLoading(true);

      // In a real implementation, you would send the userDescription to your backend
      // and get AI-recommended jobs in return
      // For now, we'll just simulate a delay and use sample jobs
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate AI-recommended jobs (in reality, these would come from your backend)
      const aiRecommendedJobs = sampleJobs.map((job) => ({
        ...job,
        matchScore: Math.floor(Math.random() * 30) + 70, // Random score between 70-99
      }));

      setRecommendedJobs(aiRecommendedJobs);
      setFilteredJobs(aiRecommendedJobs);

      // Auto-select the first job on desktop
      if (aiRecommendedJobs.length > 0 && window.innerWidth >= 1024) {
        setSelectedJob(aiRecommendedJobs[0]);
      }

      setLoading(false);
    };

    fetchRecommendedJobs();
  }, [userDescription]);

  // Filter jobs based on search term and filters
  useEffect(() => {
    if (recommendedJobs.length === 0) return;

    let results = [...recommendedJobs];

    // Apply search term filter
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(term) ||
          job.company.toLowerCase().includes(term) ||
          job.location.toLowerCase().includes(term) ||
          job.description.toLowerCase().includes(term) ||
          job.skills.some((skill) => skill.toLowerCase().includes(term))
      );
    }

    // Apply workstyle filters
    if (filters.workstyle.length > 0) {
      results = results.filter((job) =>
        filters.workstyle.includes(job.workstyle)
      );
    }

    // Apply job type filters
    if (filters.type.length > 0) {
      results = results.filter((job) => filters.type.includes(job.type));
    }

    // Apply experience filters
    if (filters.experience.length > 0) {
      results = results.filter((job) =>
        filters.experience.includes(job.experience)
      );
    }

    setFilteredJobs(results);

    // If the currently selected job is filtered out, select the first job in the filtered list
    if (
      selectedJob &&
      !results.some((job) => job.id === selectedJob.id) &&
      results.length > 0
    ) {
      setSelectedJob(results[0]);
    }
  }, [searchTerm, filters, recommendedJobs, selectedJob]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectJob = (job) => {
    setSelectedJob(job);
  };

  const handleCloseJobDetail = () => {
    setSelectedJob(null);
  };

  const handleFilterToggle = (category, value) => {
    setTempFilters((prevFilters) => {
      const updatedCategory = prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value];

      return {
        ...prevFilters,
        [category]: updatedCategory,
      };
    });
  };

  const applyFilters = () => {
    // Apply the temporary filters
    setFilters(tempFilters);
    setShowFilters(false);
  };

  const clearFilters = () => {
    const emptyFilters = {
      workstyle: [],
      type: [],
      experience: [],
    };

    setFilters(emptyFilters);
    setTempFilters(emptyFilters);
    setSearchTerm("");
  };

  // Initialize temp filters when opening the filter panel
  useEffect(() => {
    if (showFilters) {
      setTempFilters(filters);
    }
  }, [showFilters, filters]);

  // Count total active filters
  const activeFilterCount = Object.values(filters).flat().length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/job-match"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Job Match
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-600" />
              AI-Recommended Jobs
            </h1>
            <p className="text-gray-600 mt-1">
              Based on your profile and preferences
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search within results..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${
                activeFilterCount > 0
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-300 hover:bg-gray-50 text-gray-700"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="ml-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Work Style */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Work Style
              </h4>
              <div className="space-y-2">
                {["Remote", "Hybrid", "On-site"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        tempFilters.workstyle.includes(option)
                          ? "bg-blue-600 border-blue-600"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleFilterToggle("workstyle", option)}
                    >
                      {tempFilters.workstyle.includes(option) && (
                        <Check className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Job Type */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Job Type
              </h4>
              <div className="space-y-2">
                {["Full-time", "Part-time", "Contract", "Internship"].map(
                  (option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          tempFilters.type.includes(option)
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300"
                        }`}
                        onClick={() => handleFilterToggle("type", option)}
                      >
                        {tempFilters.type.includes(option) && (
                          <Check className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </h4>
              <div className="space-y-2">
                {["Entry-Level", "Mid-Level", "Senior", "Executive"].map(
                  (option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          tempFilters.experience.includes(option)
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300"
                        }`}
                        onClick={() => handleFilterToggle("experience", option)}
                      >
                        {tempFilters.experience.includes(option) && (
                          <Check className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setShowFilters(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mt-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">
              Finding your perfect matches...
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Job listings - Make this scrollable */}
            <div className="lg:w-2/5 max-h-[calc(100vh-180px)] overflow-y-auto">
              {filteredJobs.length > 0 ? (
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="relative"
                      onClick={() => handleSelectJob(job)}
                    >
                      <JobCard
                        job={job}
                        isSelected={selectedJob?.id === job.id}
                        onSelect={handleSelectJob}
                      />
                      <div className="absolute top-3 right-3">
                        <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                          <Sparkles className="w-3 h-3 mr-1" />
                          {job.matchScore}% Match
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-center justify-center">
                  <SearchIcon className="w-12 h-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No jobs found
                  </h3>
                  <p className="text-gray-500 text-center mb-4">
                    Try adjusting your search or filters to find more results.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Job details - Desktop - Make this fixed */}
            <div className="hidden lg:block lg:w-3/5">
              {selectedJob ? (
                <div className="sticky top-24 bg-white rounded-lg border border-gray-200">
                  <JobInformation job={selectedJob} />
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-center justify-center h-64">
                  <p className="text-gray-500 text-center">
                    Select a job to view details
                  </p>
                </div>
              )}
            </div>

            {/* Job details - Mobile */}
            {selectedJob && (
              <div className="lg:hidden">
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
                      <div className="flex items-center">
                        <button
                          onClick={handleCloseJobDetail}
                          className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
                        >
                          <X className="w-5 h-5" />
                        </button>
                        <h2 className="font-semibold text-lg ml-2">
                          {selectedJob.title}
                        </h2>
                      </div>
                      <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {selectedJob.matchScore}% Match
                      </div>
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
                    @keyframes fadeIn {
                      from {
                        opacity: 0;
                      }
                      to {
                        opacity: 1;
                      }
                    }
                    .animate-fadeIn {
                      animation: fadeIn 0.2s ease-out;
                    }
                  `}
                </style>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedJobs;
