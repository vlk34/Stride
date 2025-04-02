import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import {
  Building2,
  MapPin,
  Globe,
  Phone,
  Mail,
  Users,
  Briefcase,
  Calendar,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Linkedin,
  Twitter,
  Info,
  Target,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useCompanyDetails } from "../../hooks/tanstack/useAdminFunctions";
import axios from "axios";

// Helper function to get the session token from cookie
const getSessionToken = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("__session=")) {
      return cookie.substring("__session=".length, cookie.length);
    }
  }
  return null;
};

const BusinessApplicationReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mobile-friendly state for expandable sections
  const [expandedSections, setExpandedSections] = useState({
    contact: true,
    location: true,
    description: true,
    mission: true,
    benefits: true,
  });

  // Get company details from either location state or fetch them
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Check if we already have application data from navigation state
        if (location.state?.applicationData) {
          // Map API response fields to our component's expected structure
          const appData = location.state.applicationData;
          setApplication({
            companyName: appData.company,
            companySize: appData.size,
            industry: appData.industry,
            foundedYear: appData.founded,
            email: appData.email,
            phone: appData.phone,
            website: appData.website,
            address: appData.address,
            city: appData.city,
            state: appData.state,
            country: appData.country,
            postalCode: appData.postal_code,
            description: appData.description,
            mission: appData.mission,
            benefits: appData.benefits,
            logo: appData.logo,
            company_id: appData.company_id,
            created_at: appData.created_at,
            // These may come from the businessApplications list
            status: appData.status || "Pending",
            applied_at: appData.applied_at,
            name: appData.name,
            applicantName: appData.name || "Applicant",
            date: appData.applied_at
              ? new Date(appData.applied_at).toLocaleDateString()
              : "Recent",
          });
        } else {
          // Fetch company details if not available
          const token = getSessionToken();
          const response = await axios.get(
            `http://localhost:8080/company/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const appData = response.data;
          setApplication({
            companyName: appData.company,
            companySize: appData.size,
            industry: appData.industry,
            foundedYear: appData.founded,
            email: appData.email,
            phone: appData.phone,
            website: appData.website,
            address: appData.address,
            city: appData.city,
            state: appData.state,
            country: appData.country,
            postalCode: appData.postal_code,
            description: appData.description,
            mission: appData.mission,
            benefits: appData.benefits,
            logo: appData.logo,
            company_id: appData.company_id,
            created_at: appData.created_at,
            status: "Pending",
            date: new Date(appData.created_at).toLocaleDateString(),
            applicantName: "Applicant",
          });
        }
      } catch (error) {
        console.error("Error fetching company details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, location.state]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleApprove = async () => {
    try {
      setIsSubmitting(true);

      // Call API to approve the application
      const token = getSessionToken();

      // Use the actual user_id from the application data
      // This comes from the application data passed from the ApprovalsList component
      await axios.post(
        "http://localhost:8080/upgradeuser",
        {
          user_id:
            application.user_id || location.state?.applicationData?.user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state
      setApplication((prev) => ({
        ...prev,
        status: "Accepted",
      }));

      setTimeout(() => {
        navigate("/admin/approvals", {
          state: {
            message: `${application.companyName} has been approved`,
            success: true,
          },
        });
      }, 500);
    } catch (error) {
      console.error("Error approving application:", error);
      alert(
        `Failed to approve application: ${
          error.response?.data || error.message
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!feedback.trim()) {
      alert("Please provide feedback for rejection");
      return;
    }

    try {
      setIsSubmitting(true);

      // Call API to decline the application
      const token = getSessionToken();
      await axios.post(
        "http://localhost:8080/declineupgrade",
        { user_id: application.user_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state
      setApplication((prev) => ({
        ...prev,
        status: "Declined",
        declineReason: feedback,
      }));

      setTimeout(() => {
        navigate("/admin/approvals", {
          state: {
            message: `${application.companyName} has been rejected`,
          },
        });
      }, 500);
    } catch (error) {
      console.error("Error rejecting application:", error);
      alert("Failed to reject application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application details...</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
        <div className="text-center py-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Application Not Found
          </h3>
          <p className="text-gray-600 mb-4">
            The business application you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/admin/approvals")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Applications
          </button>
        </div>
      </div>
    );
  }

  // Add custom style for 1200px breakpoint
  const customStyles = `
    @media (min-width: 1200px) {
      .custom-lg-visible {
        display: block;
      }
      .custom-md-hidden {
        display: none;
      }
    }
    @media (max-width: 1199px) {
      .custom-lg-hidden {
        display: none;
      }
      .custom-md-visible {
        display: block;
      }
    }
  `;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
      {/* Add the custom style */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* Header - More responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
        <div className="flex items-center">
          <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2" />
          <h1 className="text-lg sm:text-xl font-bold">
            Business Application Review
          </h1>
        </div>
        <button
          onClick={() => navigate("/admin/approvals")}
          className="flex items-center justify-center sm:justify-start text-gray-600 hover:text-gray-900 py-1 px-2 border border-gray-300 rounded-md sm:border-0 sm:p-0"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Applications
        </button>
      </div>

      {/* Company Overview - More responsive */}
      <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex items-center">
            {application.logo && (
              <div className="flex-shrink-0 h-12 w-12 mr-3">
                <img
                  src={`http://localhost:8080/images/${application.logo}`}
                  alt={`${application.companyName} logo`}
                  className="h-12 w-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/48?text=Logo";
                  }}
                />
              </div>
            )}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {application.companyName}
              </h2>
              <div className="flex flex-wrap items-center text-gray-600 gap-2 mt-1">
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-1" />
                  {application.industry}
                </div>
                <span className="hidden sm:inline mx-1">•</span>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {application.companySize} employees
                </div>
                <span className="hidden sm:inline mx-1">•</span>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Founded {application.foundedYear}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 sm:mt-0 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium w-fit">
            {application.status || "Pending Review"}
          </div>
        </div>
        <div className="text-sm text-gray-600">
          <p>
            Submitted by {application.applicantName} on {application.date}
          </p>
        </div>
      </div>

      {/* Application Details - Change md to custom breakpoint */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Contact Information */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Collapsible header for mobile and medium screens */}
          <div
            className="bg-gray-50 p-3 sm:p-4 flex justify-between items-center cursor-pointer lg:cursor-default"
            onClick={() => toggleSection("contact")}
          >
            <h3 className="text-base sm:text-lg font-semibold">
              Contact Information
            </h3>
            <button className="lg:hidden text-gray-500 custom-md-visible">
              {expandedSections.contact ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
          </div>

          {/* Content - collapsible on mobile and medium */}
          <div
            className={`p-3 sm:p-4 space-y-3 ${
              expandedSections.contact ? "" : "hidden lg:block"
            }`}
          >
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-gray-700">Email</div>
                <div className="text-gray-600 break-all">
                  {application.email}
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-gray-700">Phone</div>
                <div className="text-gray-600">
                  {application.phone || "Not provided"}
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <Globe className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-gray-700">Website</div>
                <div className="text-gray-600 break-all">
                  {application.website ? (
                    <a
                      href={
                        application.website.startsWith("http")
                          ? application.website
                          : `https://${application.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {application.website}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </div>
              </div>
            </div>
            {/* Social Media Links */}
            {(application.linkedin || application.twitter) && (
              <>
                {application.linkedin && (
                  <div className="flex items-start">
                    <Linkedin className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">
                        LinkedIn
                      </div>
                      <div className="text-gray-600 break-all">
                        <a
                          href={application.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {application.linkedin}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                {application.twitter && (
                  <div className="flex items-start">
                    <Twitter className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">
                        Twitter
                      </div>
                      <div className="text-gray-600 break-all">
                        <a
                          href={application.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {application.twitter}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Collapsible header for mobile and medium */}
          <div
            className="bg-gray-50 p-3 sm:p-4 flex justify-between items-center cursor-pointer lg:cursor-default"
            onClick={() => toggleSection("location")}
          >
            <h3 className="text-base sm:text-lg font-semibold">Location</h3>
            <button className="lg:hidden text-gray-500 custom-md-visible">
              {expandedSections.location ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
          </div>

          {/* Content - collapsible on mobile and medium */}
          <div
            className={`p-3 sm:p-4 ${
              expandedSections.location ? "" : "hidden lg:block"
            }`}
          >
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-gray-700">Address</div>
                <div className="text-gray-600">
                  {application.address && (
                    <>
                      {application.address}
                      <br />
                      {application.city}, {application.state}{" "}
                      {application.postalCode}
                      <br />
                      {application.country}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Details - Collapsible sections on mobile and medium */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg font-semibold mb-3 sm:mb-4">Company Details</h3>
        <div className="space-y-4">
          {/* Description */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div
              className="bg-gray-50 p-3 flex justify-between items-center cursor-pointer lg:cursor-default"
              onClick={() => toggleSection("description")}
            >
              <div className="flex items-center">
                <Info className="w-5 h-5 text-gray-400 mr-2" />
                <h4 className="text-base font-medium text-gray-700">
                  Description
                </h4>
              </div>
              <button className="lg:hidden text-gray-500 custom-md-visible">
                {expandedSections.description ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
            </div>
            {expandedSections.description && (
              <p className="text-gray-600 p-3 sm:p-4">
                {application.description}
              </p>
            )}
          </div>

          {/* Mission */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div
              className="bg-gray-50 p-3 flex justify-between items-center cursor-pointer lg:cursor-default"
              onClick={() => toggleSection("mission")}
            >
              <div className="flex items-center">
                <Target className="w-5 h-5 text-gray-400 mr-2" />
                <h4 className="text-base font-medium text-gray-700">Mission</h4>
              </div>
              <button className="lg:hidden text-gray-500 custom-md-visible">
                {expandedSections.mission ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
            </div>
            {expandedSections.mission && (
              <p className="text-gray-600 p-3 sm:p-4">{application.mission}</p>
            )}
          </div>

          {/* Benefits */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div
              className="bg-gray-50 p-3 flex justify-between items-center cursor-pointer lg:cursor-default"
              onClick={() => toggleSection("benefits")}
            >
              <div className="flex items-center">
                <Award className="w-5 h-5 text-gray-400 mr-2" />
                <h4 className="text-base font-medium text-gray-700">
                  Employee Benefits
                </h4>
              </div>
              <button className="lg:hidden text-gray-500 custom-md-visible">
                {expandedSections.benefits ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
            </div>
            {expandedSections.benefits && (
              <p className="text-gray-600 p-3 sm:p-4">{application.benefits}</p>
            )}
          </div>
        </div>
      </div>

      {/* Feedback and Actions - Responsive buttons */}
      {(application.status === "Pending" || !application.status) && (
        <div className="border-t border-gray-200 pt-4 sm:pt-6">
          <div className="mb-4">
            <label
              htmlFor="feedback"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Feedback (required for rejection)
            </label>
            <textarea
              id="feedback"
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter feedback for the applicant..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={handleReject}
              disabled={isSubmitting}
              className="flex items-center justify-center px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <XCircle className="w-5 h-5 mr-2" />
              Reject Application
            </button>
            <button
              onClick={handleApprove}
              disabled={isSubmitting}
              className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Approve Application
            </button>
          </div>
        </div>
      )}

      {/* Rejection Reason (if already rejected) */}
      {application.status === "Declined" && application.declineReason && (
        <div className="border-t border-gray-200 pt-4 sm:pt-6">
          <h4 className="text-md font-medium text-gray-700 mb-2">
            Rejection Reason
          </h4>
          <p className="text-gray-600 bg-red-50 p-3 rounded-lg border border-red-200">
            {application.declineReason}
          </p>
        </div>
      )}
    </div>
  );
};

export default BusinessApplicationReview;
