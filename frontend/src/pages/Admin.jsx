import React from "react";
import { Navigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import AdminDashboard from "../components/Admin/AdminDashboard";

const Admin = () => {
  const { user, isLoaded } = useUser();

  // Check if user is loaded and has admin role
  if (isLoaded) {
    const userRole = user?.publicMetadata?.role;
    if (userRole !== "admin") {
      // Redirect non-admin users
      return <Navigate to="/" replace />;
    }
  }

  if (!isLoaded) {
    // Show loading state
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <AdminDashboard />;
};

export default Admin;
