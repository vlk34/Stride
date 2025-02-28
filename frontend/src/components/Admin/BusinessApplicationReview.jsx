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
} from "lucide-react";

const BusinessApplicationReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get application data from navigation state
    if (location.state?.applicationData) {
      setApplication(location.state.applicationData);
    }
  }, [location.state]);

  const handleApprove = () => {
    setIsSubmitting(true);

    // Update the application status
    setApplication((prev) => ({
      ...prev,
      status: "Accepted",
    }));

    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/admin/approvals", {
        state: {
          message: `${application.companyName} has been approved`,
        },
      });
    }, 500);
  };

  const handleReject = () => {
    if (!feedback.trim()) {
      alert("Please provide feedback for rejection");
      return;
    }

    setIsSubmitting(true);

    // Update the application status
    setApplication((prev) => ({
      ...prev,
      status: "Declined",
      declineReason: feedback,
    }));

    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/admin/approvals", {
        state: {
          message: `${application.companyName} has been rejected`,
        },
      });
    }, 500);
  };

  if (loading) {
    return (
      <div className="p-6 text-center">Loading application details...</div>
    );
  }

  if (!application) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
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

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Building2 className="w-6 h-6 text-blue-600 mr-2" />
          <h1 className="text-xl font-bold">Business Application Review</h1>
        </div>
        <button
          onClick={() => navigate("/admin/approvals")}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Applications
        </button>
      </div>

      {/* Company Overview */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {application.companyName}
            </h2>
            <div className="flex items-center text-gray-600 mt-1">
              <Briefcase className="w-4 h-4 mr-1" />
              {application.industry}
              <span className="mx-2">•</span>
              <Users className="w-4 h-4 mr-1" />
              {application.companySize} employees
              <span className="mx-2">•</span>
              <Calendar className="w-4 h-4 mr-1" />
              Founded {application.foundedYear}
            </div>
          </div>
          <div className="mt-4 md:mt-0 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            {application.status || "Pending Review"}
          </div>
        </div>
        <div className="text-sm text-gray-600">
          <p>
            Submitted by {application.applicantName} on {application.date}
          </p>
        </div>
      </div>

      {/* Application Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Contact Information */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-gray-700">Email</div>
                <div className="text-gray-600">{application.email}</div>
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
                <div className="text-gray-600">
                  {application.website ? (
                    <a
                      href={application.website}
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
                      <div className="text-gray-600">
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
                      <div className="text-gray-600">
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
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Location</h3>
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

      {/* Company Details */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Company Details</h3>
        <div className="space-y-6">
          <div>
            <div className="flex items-center mb-2">
              <Info className="w-5 h-5 text-gray-400 mr-2" />
              <h4 className="text-md font-medium text-gray-700">Description</h4>
            </div>
            <p className="text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
              {application.description}
            </p>
          </div>

          <div>
            <div className="flex items-center mb-2">
              <Target className="w-5 h-5 text-gray-400 mr-2" />
              <h4 className="text-md font-medium text-gray-700">Mission</h4>
            </div>
            <p className="text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
              {application.mission}
            </p>
          </div>

          <div>
            <div className="flex items-center mb-2">
              <Award className="w-5 h-5 text-gray-400 mr-2" />
              <h4 className="text-md font-medium text-gray-700">
                Employee Benefits
              </h4>
            </div>
            <p className="text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
              {application.benefits}
            </p>
          </div>
        </div>
      </div>

      {/* Feedback and Actions */}
      {(application.status === "Pending" || !application.status) && (
        <div className="border-t border-gray-200 pt-6">
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
        <div className="border-t border-gray-200 pt-6">
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
