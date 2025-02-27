import React from "react";
import { Link } from "react-router";
import { Shield } from "lucide-react";

const UnauthorizedAccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 rounded-full p-3">
            <Shield className="w-12 h-12 text-red-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Unauthorized Access
        </h1>
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page. This area is restricted
          to business accounts only.
        </p>
        <Link
          to="/business-upgrade"
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          Upgrade to Business Account
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
