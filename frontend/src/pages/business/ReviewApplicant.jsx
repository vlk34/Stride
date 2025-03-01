import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import {
  Brain,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  Download,
  FileText,
  MessageSquare,
  ThumbsUp,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

const ReviewApplicant = () => {
  const { id } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profile");
  const [applicant, setApplicant] = useState(null);
  const navigate = useNavigate();
  // Dummy data - this would normally be fetched based on the id
  const allApplicants = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Frontend Developer",
      status: "New",
      applied: "2 hours ago",
      email: "sarah.j@example.com",
      phone: "+1 234 567 8900",
      experience: "5 years",
      location: "San Francisco, CA",
      match_score: 92,
      skills: ["React", "TypeScript", "Node.js", "AWS", "REST APIs"],
      education: [
        {
          degree: "B.S. Computer Science",
          school: "University of California, Berkeley",
          year: "2018",
        },
      ],
      experience_history: [
        {
          role: "Frontend Developer",
          company: "Tech Corp",
          duration: "2018 - 2023",
          description:
            "Led development of multiple web applications using React and TypeScript.",
        },
      ],
      ai_analysis: {
        technical_match: 92,
        soft_skills: 88,
        culture_fit: 90,
        key_strengths: [
          "Strong React expertise",
          "Team leadership experience",
          "Problem-solving skills",
        ],
        potential_concerns: ["Remote work experience limited"],
      },
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Senior Frontend Developer",
      status: "Reviewed",
      applied: "1 day ago",
      email: "m.chen@example.com",
      phone: "+1 234 567 8901",
      experience: "6 years",
      location: "New York, NY",
      match_score: 89,
      skills: ["React", "Vue.js", "JavaScript", "GraphQL", "CSS"],
      education: [
        {
          degree: "M.S. Computer Science",
          school: "New York University",
          year: "2017",
        },
      ],
      experience_history: [
        {
          role: "Senior Developer",
          company: "Web Solutions Inc",
          duration: "2017 - 2023",
          description:
            "Developed and maintained multiple client websites and applications.",
        },
      ],
      ai_analysis: {
        technical_match: 89,
        soft_skills: 92,
        culture_fit: 85,
        key_strengths: [
          "Diverse framework experience",
          "Strong communication skills",
          "Client-facing experience",
        ],
        potential_concerns: ["Less experience with TypeScript"],
      },
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Senior Frontend Developer",
      status: "New",
      applied: "3 days ago",
      match_score: 75,
      email: "e.davis@example.com",
      phone: "+1 234 567 8902",
      location: "Chicago, IL",
      experience: "4 years",
      skills: ["JavaScript", "React", "CSS", "HTML"],
      education: [
        {
          degree: "B.A. Web Development",
          school: "University of Illinois",
          year: "2019",
        },
      ],
      experience_history: [
        {
          role: "Frontend Developer",
          company: "Digital Agency",
          duration: "2019 - 2023",
          description: "Created responsive web designs and interactive UIs.",
        },
      ],
      ai_analysis: {
        technical_match: 75,
        soft_skills: 80,
        culture_fit: 82,
        key_strengths: [
          "UI/UX focus",
          "Creative problem solver",
          "Fast learner",
        ],
        potential_concerns: ["Less backend experience"],
      },
    },
    // Add more applicants as needed
  ];

  // Simulate API call with a delay
  useEffect(() => {
    // Simulate API call with 500ms delay
    const timer = setTimeout(() => {
      // Find the applicant by ID from our dummy data
      const foundApplicant = allApplicants.find((a) => a.id === parseInt(id));
      setApplicant(foundApplicant || allApplicants[0]); // Fallback to first applicant if not found
    }, 500);

    // Clean up timer
    return () => clearTimeout(timer);
  }, [id]);

  if (!applicant) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with static back button */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center mb-4 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to the previous page
          </button>

          {/* Applicant name and role skeleton */}
          <div className="flex justify-between items-start">
            <div>
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Download CV
              </button>
            </div>
          </div>
        </div>

        {/* Static tabs */}
        <div className="flex gap-4 border-b border-gray-200 mb-6">
          {["profile", "ai analysis", "notes"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium capitalize ${
                tab === "profile"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column skeleton */}
          <div className="lg:col-span-2">
            {/* Basic info card skeleton */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-full bg-gray-200 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            </div>

            {/* Skills card skeleton */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"
                  ></div>
                ))}
              </div>
            </div>

            {/* Experience card skeleton */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Experience
              </h2>
              {[1, 2].map((i) => (
                <div key={i} className="mb-4">
                  <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-16 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Status
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">
                    Current Stage
                  </div>
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Applied</div>
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Match Score</div>
                  <div className="h-6 w-28 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <button className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center mb-4 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back to the previous page
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {applicant.name}
            </h1>
            <p className="text-gray-600">{applicant.role}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Download CV
            </button>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-6">
        {["profile", "ai analysis", "notes"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Always visible */}
        <div className="lg:col-span-2">
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* Basic Info Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Basic Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-2" />
                    {applicant.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-2" />
                    {applicant.phone}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    {applicant.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="w-5 h-5 mr-2" />
                    {applicant.experience} experience
                  </div>
                </div>
              </div>

              {/* Skills Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {applicant.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Experience
                </h2>
                {applicant.experience_history.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-medium text-gray-900">{exp.role}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.duration}</p>
                    <p className="text-gray-600 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "ai analysis" && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Brain className="w-6 h-6 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  AI Analysis Report
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-700 mb-1">
                    {applicant.ai_analysis.technical_match}%
                  </div>
                  <div className="text-sm text-purple-600">Technical Match</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-700 mb-1">
                    {applicant.ai_analysis.soft_skills}%
                  </div>
                  <div className="text-sm text-purple-600">Soft Skills</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-700 mb-1">
                    {applicant.ai_analysis.culture_fit}%
                  </div>
                  <div className="text-sm text-purple-600">Culture Fit</div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Key Strengths
                  </h3>
                  <ul className="space-y-2">
                    {applicant.ai_analysis.key_strengths.map(
                      (strength, index) => (
                        <li
                          key={index}
                          className="flex items-center text-gray-600"
                        >
                          <ThumbsUp className="w-4 h-4 text-green-600 mr-2" />
                          {strength}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Potential Concerns
                  </h3>
                  <ul className="space-y-2">
                    {applicant.ai_analysis.potential_concerns.map(
                      (concern, index) => (
                        <li
                          key={index}
                          className="flex items-center text-gray-600"
                        >
                          <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
                          {concern}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Notes
              </h2>
              <textarea
                className="w-full h-40 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add your notes about this candidate..."
              />
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Save Notes
              </button>
            </div>
          )}
        </div>

        {/* Right Column - Status Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Status</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Current Stage</div>
                <select className="w-full p-2 border border-gray-200 rounded-lg">
                  <option>New Application</option>
                  <option>Under Review</option>
                  <option>Shortlisted</option>
                  <option>Offer Made</option>
                  <option>Rejected</option>
                </select>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-1">Applied</div>
                <div className="flex items-center text-gray-900">
                  <Calendar className="w-4 h-4 mr-2" />
                  {applicant.applied}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-1">Match Score</div>
                <div className="flex items-center text-purple-700">
                  <Brain className="w-4 h-4 mr-2" />
                  {applicant.match_score}% match
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    navigate("/business/messages");
                  }}
                  className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewApplicant;
