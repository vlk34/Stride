import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Building2,
  Calendar,
  ArrowRight,
  Search,
  Filter,
  MoreVertical,
  XCircle,
  CheckCircle,
} from "lucide-react";
import {
  useBusinessApplications,
  useCompanyDetails,
  useUpgradeUser,
  useDeclineBusinessApplication,
} from "../../hooks/tanstack/useAdminFunctions";
import { useQueryClient } from "@tanstack/react-query";
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

// Decline Confirmation Modal
const DeclineConfirmationModal = ({ application, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-red-600 mb-2">
          Confirm Decline
        </h3>
        <p className="mb-4 text-gray-700">
          Are you sure you want to decline the business application for{" "}
          <span className="font-medium">{application.company}</span>?
        </p>

        <div className="bg-red-50 p-3 rounded-md mb-4">
          <p className="text-red-800 text-sm">
            <strong>Note:</strong> This action will reject the business upgrade
            request. The user will remain as a regular user.
          </p>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Decline Application
          </button>
        </div>
      </div>
    </div>
  );
};

const ApprovalsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeActionMenu, setActiveActionMenu] = useState(null);
  const [selectingCompanyId, setSelectingCompanyId] = useState(null);
  const [applicationToDecline, setApplicationToDecline] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Use the hooks for business applications
  const {
    data: applications = [],
    isLoading: isLoadingApplications,
    error: applicationsError,
  } = useBusinessApplications();

  // Use the TanStack query hook for company details when needed
  const {
    data: companyDetails,
    isLoading: isLoadingDetails,
    error: detailsError,
  } = useCompanyDetails(selectingCompanyId);

  // Use the upgrade and decline mutation hooks
  const upgradeUserMutation = useUpgradeUser();
  const declineApplicationMutation = useDeclineBusinessApplication();

  // When company details are loaded, navigate to the review page
  useEffect(() => {
    if (selectingCompanyId && companyDetails && !isLoadingDetails) {
      // Find the basic application data
      const baseApplication = applications.find(
        (app) => app.company_id === selectingCompanyId
      );

      // Combine with detailed data
      const detailedApplication = {
        ...baseApplication,
        ...companyDetails,
      };

      // Navigate to review page with updated URL pattern
      navigate(`/admin/approvals/${selectingCompanyId}`);

      // Reset the selecting state
      setSelectingCompanyId(null);
    }
  }, [
    selectingCompanyId,
    companyDetails,
    isLoadingDetails,
    applications,
    navigate,
  ]);

  const handleReviewClick = (id) => {
    // Close any open action menu
    setActiveActionMenu(null);

    // Set the company ID we want to get details for
    setSelectingCompanyId(id);

    // Prefetch the company details
    queryClient.prefetchQuery({
      queryKey: ["companyDetails", id],
      queryFn: async () => {
        const token = getSessionToken();
        const response = await axios.get(
          `http://localhost:8080/company/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      },
    });
  };

  const handleDeclineClick = (application) => {
    setApplicationToDecline(application);
    setActiveActionMenu(null);
  };

  const closeDeclineModal = () => {
    setApplicationToDecline(null);
  };

  const confirmDecline = async () => {
    try {
      // Call the decline mutation with the user_id
      await declineApplicationMutation.mutateAsync(
        applicationToDecline.user_id
      );
      closeDeclineModal();
    } catch (error) {
      console.error("Error declining business application:", error);
      alert("Failed to decline application. Please try again.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const toggleActionMenu = (appId) => {
    setActiveActionMenu(activeActionMenu === appId ? null : appId);
  };

  // Filter applications based on search term and status
  const filteredApplications = applications.filter(
    (app) =>
      (app.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.industry?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "All" || app.status === statusFilter)
  );

  // Render loading state
  if (isLoadingApplications) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (applicationsError) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="bg-red-50 p-4 rounded-md">
          <h3 className="text-red-800 font-medium">Error loading data</h3>
          <p className="text-red-700 mt-1">
            {applicationsError.message ||
              "Failed to load applications. Please try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 bg-red-100 text-red-800 px-4 py-2 rounded-md hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-lg sm:text-xl font-bold mb-4 sm:mb-0">
          Business Account Applications
        </h1>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search applications..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <Filter className="text-gray-400 w-5 h-5 mr-2" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Declined">Declined</option>
            </select>
          </div>
        </div>
      </div>

      {/* Custom styles for breakpoints */}
      <style jsx>{`
        @media (min-width: 1200px) {
          .custom-lg-visible {
            display: block;
          }
          .custom-md-visible {
            display: none;
          }
        }
        @media (max-width: 1199px) and (min-width: 768px) {
          .custom-lg-visible {
            display: none;
          }
          .custom-md-visible {
            display: block;
          }
        }
      `}</style>

      {/* No applications message */}
      {filteredApplications.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No applications found
          </h3>
          <p className="text-gray-600">
            {searchTerm || statusFilter !== "All"
              ? "No applications match your search criteria."
              : "There are no business applications to review at this time."}
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          {/* Large screen full table */}
          <div className="hidden lg:hidden custom-lg-visible">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr key={application.company_id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        {application.logo && (
                          <div className="flex-shrink-0 h-10 w-10 mr-3">
                            <img
                              src={`http://localhost:8080/images/${application.logo}`}
                              alt={`${application.company} logo`}
                              className="h-10 w-10 rounded-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://via.placeholder.com/40?text=Logo";
                              }}
                            />
                          </div>
                        )}
                        <div className="font-medium text-gray-900">
                          {application.company}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {application.industry}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-gray-900">
                        {application.name || "Unknown"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.email || "No email provided"}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(application.applied_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          application.status || "Pending"
                        )}`}
                      >
                        {application.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() =>
                            handleReviewClick(application.company_id)
                          }
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Review"
                          disabled={
                            isLoadingDetails &&
                            selectingCompanyId === application.company_id
                          }
                        >
                          {isLoadingDetails &&
                          selectingCompanyId === application.company_id
                            ? "Loading..."
                            : "Review"}
                        </button>
                        {(!application.status ||
                          application.status === "Pending") && (
                          <button
                            onClick={() => handleDeclineClick(application)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Decline"
                          >
                            Decline
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Medium screen simplified table */}
          <div className="hidden md:block lg:block custom-md-visible">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                    Business
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    Applicant
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    Status
                  </th>
                  <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr key={application.company_id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        {application.logo && (
                          <div className="flex-shrink-0 h-8 w-8 mr-3">
                            <img
                              src={`http://localhost:8080/images/${application.logo}`}
                              alt={`${application.company} logo`}
                              className="h-8 w-8 rounded-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://via.placeholder.com/32?text=Logo";
                              }}
                            />
                          </div>
                        )}
                        <div>
                          <div className="font-medium truncate">
                            {application.company}
                          </div>
                          <div className="text-sm text-gray-500">
                            {application.industry}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3">
                      <div className="truncate">
                        {application.name || "Unknown"}
                      </div>
                    </td>
                    <td className="px-2 py-3">
                      <div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            application.status || "Pending"
                          )}`}
                        >
                          {application.status || "Pending"}
                        </span>
                        <div className="text-xs text-gray-500 mt-1 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(
                            application.applied_at
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() =>
                            handleReviewClick(application.company_id)
                          }
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 p-1"
                          disabled={
                            isLoadingDetails &&
                            selectingCompanyId === application.company_id
                          }
                        >
                          {isLoadingDetails &&
                          selectingCompanyId === application.company_id ? (
                            "Loading..."
                          ) : (
                            <>
                              <ArrowRight className="ml-1 h-4 w-4" /> Review
                            </>
                          )}
                        </button>
                        {(!application.status ||
                          application.status === "Pending") && (
                          <button
                            onClick={() => handleDeclineClick(application)}
                            className="inline-flex items-center text-red-600 hover:text-red-800 p-1"
                          >
                            <XCircle className="h-4 w-4" /> Decline
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Small screen card layout */}
          <div className="md:hidden">
            <div className="divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <div
                  key={application.company_id}
                  className="p-4 bg-white relative hover:bg-gray-50"
                >
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => toggleActionMenu(application.company_id)}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>

                    {/* Mobile Action Menu */}
                    {activeActionMenu === application.company_id && (
                      <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-lg py-1 w-32 z-10">
                        <button
                          onClick={() =>
                            handleReviewClick(application.company_id)
                          }
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center text-blue-600"
                          disabled={
                            isLoadingDetails &&
                            selectingCompanyId === application.company_id
                          }
                        >
                          {isLoadingDetails &&
                          selectingCompanyId === application.company_id ? (
                            "Loading..."
                          ) : (
                            <>
                              <ArrowRight className="w-4 h-4 mr-2" /> Review
                            </>
                          )}
                        </button>
                        {(!application.status ||
                          application.status === "Pending") && (
                          <button
                            onClick={() => handleDeclineClick(application)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center text-red-600"
                          >
                            <XCircle className="w-4 h-4 mr-2" /> Decline
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mb-3 pr-8 flex items-center">
                    {application.logo && (
                      <div className="flex-shrink-0 h-10 w-10 mr-3">
                        <img
                          src={`http://localhost:8080/images/${application.logo}`}
                          alt={`${application.company} logo`}
                          className="h-10 w-10 rounded-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/40?text=Logo";
                          }}
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium text-lg">
                        {application.company}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {application.industry}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm">
                      <div>{application.name || "Unknown"}</div>
                      <div className="text-gray-500 text-xs">
                        {application.email || "No email provided"}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        application.status || "Pending"
                      )}`}
                    >
                      {application.status || "Pending"}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(application.applied_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Decline Confirmation Modal */}
      {applicationToDecline && (
        <DeclineConfirmationModal
          application={applicationToDecline}
          onClose={closeDeclineModal}
          onConfirm={confirmDecline}
        />
      )}
    </div>
  );
};

export default ApprovalsList;
