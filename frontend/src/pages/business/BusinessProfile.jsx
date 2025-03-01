import React, { useState, useEffect } from "react";
import {
  Building2,
  MapPin,
  Globe,
  Users,
  Calendar,
  Briefcase,
  Edit,
  Image,
  CheckCircle,
  Clock,
  Award,
  Heart,
  Coffee,
} from "lucide-react";
import { useUserData } from "../../contexts/UserDataContext";
import { Link, useNavigate } from "react-router";

const BusinessProfile = () => {
  const { localUserData } = useUserData();
  const [activeTab, setActiveTab] = useState("about");
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState(null);

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call with 500ms delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Example company data - would come from your user context in real app
      const data = {
        name: localUserData.companyName || "Acme Corporation",
        logo: localUserData.imageUrl || "/placeholder-logo.png",
        tagline: "Building the future of work",
        industry: "Technology",
        size: "50-200 employees",
        founded: "2015",
        headquarters: "San Francisco, CA",
        website: "acmecorp.com",
        description:
          "We're on a mission to transform how teams collaborate and build amazing products together.",
        about:
          "Acme Corporation is a technology company focused on creating innovative solutions for modern businesses. Our platform helps teams streamline their workflows, communicate effectively, and deliver exceptional results.",
        culture:
          "At Acme, we believe in fostering a culture of innovation, inclusion, and continuous learning. We value diverse perspectives and encourage our team members to bring their authentic selves to work every day.",
        benefits: [
          "Comprehensive health insurance",
          "Flexible work arrangements",
          "Competitive salary and equity",
          "Professional development",
          "Generous parental leave",
          "Wellness programs",
        ],
        values: [
          "Customer obsession",
          "Innovation",
          "Ownership",
          "Diversity & inclusion",
          "Excellence",
        ],
        openPositions: [
          {
            id: 1,
            title: "Senior Product Designer",
            location: "Remote",
            type: "Full-time",
            postedAt: "2 days ago",
            applicants: 23,
          },
          {
            id: 2,
            title: "Frontend Engineer",
            location: "San Francisco",
            type: "Full-time",
            postedAt: "1 week ago",
            applicants: 42,
          },
          {
            id: 3,
            title: "Marketing Manager",
            location: "New York",
            type: "Full-time",
            postedAt: "3 days ago",
            applicants: 18,
          },
        ],
      };

      setCompanyData(data);
      setLoading(false);
    };

    fetchData();
  }, [localUserData]);

  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Simplified Header Section */}
      <div className="mb-8 bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-xl bg-white border border-gray-200 p-2 flex items-center justify-center">
            {loading ? (
              <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse"></div>
            ) : (
              <img
                src={companyData.logo}
                alt={companyData.name}
                className="w-full h-full object-contain rounded-lg"
              />
            )}
          </div>

          <div>
            {loading ? (
              <>
                <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-5 w-64 bg-gray-200 rounded animate-pulse"></div>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold">{companyData.name}</h1>
                <p className="text-gray-600">{companyData.tagline}</p>
              </>
            )}
          </div>

          <div className="ml-auto">
            <Link
              to="/business/edit-company"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Building2 className="w-4 h-4" />
            {loading ? (
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <span>{companyData.industry}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {loading ? (
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <span>{companyData.size}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {loading ? (
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <span>{companyData.headquarters}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4" />
            {loading ? (
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <a
                href={`https://${companyData.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {companyData.website}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tabs - Static */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-8">
          {["about", "jobs", "team", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-1 font-medium capitalize ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === "about" && (
            <>
              {/* Company Description */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">About Us</h2>
                {loading ? (
                  <>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-6"></div>

                    <h3 className="text-lg font-semibold mb-3">Our Culture</h3>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse mb-6"></div>

                    <h3 className="text-lg font-semibold mb-3">Our Values</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {Array(5)
                        .fill()
                        .map((_, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        ))}
                    </div>

                    <h3 className="text-lg font-semibold mb-3">
                      Benefits & Perks
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Array(6)
                        .fill()
                        .map((_, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              {index % 4 === 0 && (
                                <Heart className="w-4 h-4 text-blue-600" />
                              )}
                              {index % 4 === 1 && (
                                <Award className="w-4 h-4 text-blue-600" />
                              )}
                              {index % 4 === 2 && (
                                <Coffee className="w-4 h-4 text-blue-600" />
                              )}
                              {index % 4 === 3 && (
                                <Calendar className="w-4 h-4 text-blue-600" />
                              )}
                            </div>
                            <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        ))}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {companyData.about}
                    </p>

                    <h3 className="text-lg font-semibold mb-3">Our Culture</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {companyData.culture}
                    </p>

                    <h3 className="text-lg font-semibold mb-3">Our Values</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {companyData.values.map((value, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-gray-700">{value}</span>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-lg font-semibold mb-3">
                      Benefits & Perks
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {companyData.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            {index % 4 === 0 && (
                              <Heart className="w-4 h-4 text-blue-600" />
                            )}
                            {index % 4 === 1 && (
                              <Award className="w-4 h-4 text-blue-600" />
                            )}
                            {index % 4 === 2 && (
                              <Coffee className="w-4 h-4 text-blue-600" />
                            )}
                            {index % 4 === 3 && (
                              <Calendar className="w-4 h-4 text-blue-600" />
                            )}
                          </div>
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {activeTab === "jobs" && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Open Positions</h2>
                <Link
                  to="/manage-jobs"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Manage Jobs
                </Link>
              </div>

              <div className="space-y-4">
                {loading
                  ? // Skeleton for job listings
                    Array(3)
                      .fill()
                      .map((_, index) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="flex justify-between">
                            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                          </div>

                          <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                          </div>

                          <div className="mt-3 flex justify-between items-center">
                            <div className="text-blue-600 text-sm font-medium">
                              View Details
                            </div>
                            <div className="text-sm text-gray-600">
                              View Applicants
                            </div>
                          </div>
                        </div>
                      ))
                  : companyData.openPositions.map((job) => (
                      <div
                        key={job.id}
                        className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                      >
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {job.type}
                          </span>
                        </div>

                        <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>Posted {job.postedAt}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{job.applicants} applicants</span>
                          </div>
                        </div>

                        <div className="mt-3 flex justify-between items-center">
                          <Link
                            to={`/job/${job.id}`}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            View Details
                          </Link>
                          <Link
                            to={`/business/job-applicants/${job.id}`}
                            className="text-sm text-gray-600 hover:text-gray-800"
                          >
                            View Applicants
                          </Link>
                        </div>
                      </div>
                    ))}
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/create-job-listing"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Post a New Job
                </Link>
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-6">Our Team</h2>
              <p className="text-gray-600 mb-8">
                Meet the talented people behind our success. Our diverse team
                brings together expertise from various backgrounds.
              </p>

              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">
                  Team members will appear here once added
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Add Team Members
                </button>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-6">Company Reviews</h2>
              <p className="text-gray-600 mb-8">
                See what people are saying about working at{" "}
                {loading ? "our company" : companyData.name}.
              </p>

              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No reviews yet</p>
                <p className="text-sm text-gray-500">
                  Reviews will appear here as candidates and employees share
                  their experiences.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-medium mb-4">Company Overview</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Founded</p>
                  {loading ? (
                    <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <p className="text-sm text-gray-600">
                      {companyData.founded}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Company size</p>
                  {loading ? (
                    <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <p className="text-sm text-gray-600">{companyData.size}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Open positions</p>
                  {loading ? (
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <p className="text-sm text-gray-600">
                      {companyData.openPositions.length} jobs
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Average hiring time</p>
                  <p className="text-sm text-gray-600">2 weeks</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Completion - Static */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-medium mb-4">Profile Completion</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div className="bg-blue-600 h-2.5 rounded-full w-[75%]"></div>
            </div>
            <p className="text-sm text-gray-600 mb-4">75% complete</p>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Basic info</span>
                </div>
                <span className="text-xs text-green-500">Complete</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Company details</span>
                </div>
                <span className="text-xs text-green-500">Complete</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">Team members</span>
                </div>
                <span className="text-xs text-gray-400">Pending</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">Social links</span>
                </div>
                <span className="text-xs text-gray-400">Pending</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/business/edit-company")}
              className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Complete Your Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
