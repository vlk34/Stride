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
          You need to have a Business account to access this page. You cannot access this page with your Admin account.
        </p>
        
      </div>
    </div>
  );
};

export default UnauthorizedAccess;