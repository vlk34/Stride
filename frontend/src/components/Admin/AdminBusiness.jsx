import React, { useState } from "react";
import { Search, Eye, Check, X, Filter } from "lucide-react";

// Modal component for viewing application details
const ViewModal = ({ application, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-4">
          Business Application Details
        </h3>

        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Business Name</h4>
            <p className="text-gray-900">{application.businessName}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">
              Applicant Name
            </h4>
            <p className="text-gray-900">{application.applicantName}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Email</h4>
            <p className="text-gray-900">{application.email}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Business Type</h4>
            <p className="text-gray-900">
              {application.businessType || "Technology"}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Description</h4>
            <p className="text-gray-900">
              {application.description ||
                "A technology company focused on AI solutions for recruitment and HR."}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Status</h4>
            <p
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                application.status === "Accepted"
                  ? "bg-green-100 text-green-800"
                  : application.status === "Declined"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {application.status}
            </p>
          </div>

          {application.status === "Declined" && application.declineReason && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Decline Reason
              </h4>
              <p className="text-gray-900">{application.declineReason}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal component for declining with reason
const DeclineModal = ({ application, onClose, onSubmit }) => {
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reason);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Decline Application</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for declining
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 h-32"
              placeholder="Please provide a reason for declining this application..."
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Decline Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminBusiness = () => {
  // Example mock data for business opening applications
  const initialApplications = [
    {
      id: 1,
      businessName: "Tech Solutions",
      applicantName: "John Doe",
      email: "john@example.com",
      status: "Pending",
      date: "2023-06-15",
    },
    {
      id: 2,
      businessName: "Creative Designs",
      applicantName: "Jane Smith",
      email: "jane@example.com",
      status: "Pending",
      date: "2023-06-14",
    },
    {
      id: 3,
      businessName: "Fresh Bites",
      applicantName: "Mike Johnson",
      email: "mike@example.com",
      status: "Pending",
      date: "2023-06-10",
    },
    {
      id: 4,
      businessName: "Global Logistics",
      applicantName: "Sarah Williams",
      email: "sarah@example.com",
      status: "Accepted",
      date: "2023-06-05",
    },
    {
      id: 5,
      businessName: "Digital Marketing Pro",
      applicantName: "Alex Brown",
      email: "alex@example.com",
      status: "Declined",
      declineReason: "Insufficient business information provided.",
      date: "2023-06-01",
    },
  ];

  const [applications, setApplications] = useState(initialApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [applicationToDecline, setApplicationToDecline] = useState(null);

  // Filter applications based on search query and status filter
  const filteredApplications = applications.filter(
    (app) =>
      (app.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "All" || app.status === statusFilter)
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleAccept = (id) => {
    if (window.confirm("Are you sure you want to accept this application?")) {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: "Accepted" } : app
        )
      );
    }
  };

  // Open decline modal instead of immediate decline
  const openDeclineModal = (app) => {
    setApplicationToDecline(app);
    setDeclineModalOpen(true);
  };

  // Called when the admin submits the decline reason
  const handleDeclineSubmit = (reason) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationToDecline.id
          ? { ...app, status: "Declined", declineReason: reason }
          : app
      )
    );
    setDeclineModalOpen(false);
    setApplicationToDecline(null);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Business Applications</h2>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search applications..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center">
          <Filter className="text-gray-400 w-5 h-5 mr-2" />
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Declined">Declined</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applicant Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredApplications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">{app.id}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {app.businessName}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {app.applicantName}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{app.email}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      app.status === "Accepted"
                        ? "bg-green-100 text-green-800"
                        : app.status === "Declined"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{app.date}</td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <button
                    onClick={() => {
                      setSelectedApplication(app);
                      setIsViewModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {app.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleAccept(app.id)}
                        className="text-green-600 hover:text-green-800 mr-2"
                        title="Accept"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeclineModal(app)}
                        className="text-red-600 hover:text-red-800"
                        title="Decline"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {isViewModalOpen && selectedApplication && (
        <ViewModal
          application={selectedApplication}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedApplication(null);
          }}
        />
      )}

      {/* Decline Modal */}
      {declineModalOpen && applicationToDecline && (
        <DeclineModal
          application={applicationToDecline}
          onClose={() => {
            setDeclineModalOpen(false);
            setApplicationToDecline(null);
          }}
          onSubmit={handleDeclineSubmit}
        />
      )}
    </div>
  );
};

export default AdminBusiness;
