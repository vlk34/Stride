import React, { useState } from "react";

const ManageBusinessApplications = () => {
  // Example mock data for business opening applications
  const initialApplications = [
    {
      id: 1,
      businessName: "Tech Solutions",
      applicantName: "John Doe",
      email: "john@example.com",
      status: "Pending",
    },
    {
      id: 2,
      businessName: "Creative Designs",
      applicantName: "Jane Smith",
      email: "jane@example.com",
      status: "Pending",
    },
    {
      id: 3,
      businessName: "Fresh Bites",
      applicantName: "Mike Johnson",
      email: "mike@example.com",
      status: "Pending",
    },
  ];

  const [applications, setApplications] = useState(initialApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // New state for handling decline modal
  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [applicationToDecline, setApplicationToDecline] = useState(null);

  // Filter applications based on search query
  const filteredApplications = applications.filter(
    (app) =>
      app.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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

  // View modal to see application details
  const ViewModal = ({ application, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h3 className="text-xl font-semibold mb-4">Application Details</h3>
          <div className="space-y-3">
            <p>
              <span className="font-medium">Business Name:</span>{" "}
              {application.businessName}
            </p>
            <p>
              <span className="font-medium">Applicant:</span>{" "}
              {application.applicantName}
            </p>
            <p>
              <span className="font-medium">Email:</span> {application.email}
            </p>
            <p>
              <span className="font-medium">Status:</span>
              <span
                className={`ml-2 px-2 py-1 rounded ${
                  application.status === "Accepted"
                    ? "bg-green-100 text-green-800"
                    : application.status === "Declined"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {application.status}
              </span>
            </p>
            {application.declineReason && (
              <p>
                <span className="font-medium">Decline Reason:</span>{" "}
                {application.declineReason}
              </p>
            )}
          </div>
          <div className="mt-6 flex justify-end">
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

  // Decline modal to capture reason for declining
  const DeclineModal = ({ application, onClose, onSubmit }) => {
    const [reason, setReason] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(reason);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-[35rem]">
          <h3 className="text-xl font-semibold mb-3">Decline Application</h3>
          <p className="mb-5">
            Please provide a reason for declining the application for{" "}
            <strong>{application.businessName}</strong>.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Enter reason for decline..."
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Decline
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded p-6 shadow mt-3">
      <h2 className="text-2xl font-bold mb-4">
        Business Opening Applications
      </h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search applications..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      {/* Applications Table */}
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">ID</th>
            <th className="text-left p-3">Business Name</th>
            <th className="text-left p-3">Applicant Name</th>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Status</th>
            <th className="p-3"></th> {/* Action column header */}
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map((app) => (
            <tr key={app.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{app.id}</td>
              <td className="p-3">{app.businessName}</td>
              <td className="p-3">{app.applicantName}</td>
              <td className="p-3">{app.email}</td>
              <td className="p-3">{app.status}</td>
              <td className="p-3 text-right">
                <button
                  onClick={() => {
                    setSelectedApplication(app);
                    setIsViewModalOpen(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 mr-2"
                >
                  View
                </button>
                {app.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleAccept(app.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => openDeclineModal(app)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Decline
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isViewModalOpen && selectedApplication && (
        <ViewModal
          application={selectedApplication}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedApplication(null);
          }}
        />
      )}

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

export default ManageBusinessApplications;
