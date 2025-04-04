import React, { useState } from "react";
import { AlertTriangle, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useUser, useClerk } from "@clerk/clerk-react"; // Import Clerk hooks

const SwitchToPersonal = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { user } = useUser(); // Get the current user from Clerk
  const { session } = useClerk(); // Get the current session from Clerk

  // Helper function to get the session token from Clerk
  const getSessionToken = async () => {
    try {
      return await session.getToken();
    } catch (error) {
      console.error("Failed to get session token:", error);
      return null;
    }
  };

  const handleSwitchConfirm = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = await getSessionToken();
      if (!token) {
        throw new Error("Session token not found");
      }

      // Call the /descend endpoint to switch from business to personal
      await axios.post(
        "http://localhost:8080/descend",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Reload user data from Clerk to refresh metadata
      await user.reload();

      // Close modal and navigate to homepage
      setShowConfirmModal(false);
      navigate("/"); // Navigate to the homepage
    } catch (error) {
      console.error("Error switching account type:", error);
      setError("Failed to switch account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Back button */}
      <Link
        to="/business-dashboard"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      {/* Main content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">
          Switch to Personal Account
        </h1>
        <p className="text-gray-600 text-center mb-8">
          You're about to switch from a Business account to a Personal account
        </p>

        <div className="border-t border-b border-gray-200 py-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Important changes to understand:
          </h2>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium">
                  You'll lose access to business features
                </h3>
                <p className="text-sm text-gray-600">
                  This includes job posting management, applicant tracking,
                  analytics dashboard, and team collaboration tools.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium">
                  Your business data will be archived
                </h3>
                <p className="text-sm text-gray-600">
                  All job postings, applicant data, and business profile
                  information will be archived. You can restore this data if you
                  switch back within 30 days.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium">
                  You'll lose access to AI recruitment tools
                </h3>
                <p className="text-sm text-gray-600">
                  This includes AI-powered candidate matching, automated resume
                  screening, and intelligent insights for hiring decisions.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">You can switch back anytime</h3>
                <p className="text-sm text-gray-600">
                  If you change your mind, you can switch back to a business
                  account at any time.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/business-profile"
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center"
          >
            Cancel
          </Link>
          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Continue to Personal Account
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold">Are you absolutely sure?</h3>
              <p className="text-gray-600 mt-2">
                This action will switch your account from Business to Personal
                immediately.
              </p>
              {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                No, cancel
              </button>
              <button
                onClick={handleSwitchConfirm}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Yes, switch to personal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwitchToPersonal;
