import React from "react";
import { useUser } from "@clerk/clerk-react";
import BusinessHeader from "./Business/BusinessHeader";
import AdminHeader from "./Admin/AdminHeader";
import RegularHeader from "./RegularHeader";
import { Compass } from "lucide-react";
import { Link } from "react-router";

const Header = () => {
  const { user, isLoaded } = useUser();

  // Skeleton loader for the header
  const HeaderSkeleton = () => (
    <header className="fixed top-0 inset-x-0 bg-white shadow-sm border-b border-gray-200 z-40">
      <nav className="max-w-7xl mx-auto py-2">
        <div className="flex items-center px-4">
          {/* Logo - No skeleton needed */}
          <Link to="/" className="flex items-center space-x-2 mr-8">
            <Compass className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">Stride</span>
          </Link>

          {/* Navigation skeleton - Desktop */}
          <div className="hidden md:flex items-center space-x-4 flex-1">
            <div className="w-28 h-6 bg-gray-100 rounded-lg animate-pulse"></div>
            <div className="w-20 h-6 bg-gray-100 rounded-lg animate-pulse"></div>
            <div className="w-24 h-6 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>

          {/* Profile Section Skeleton - Desktop */}
          <div className="hidden md:flex items-center ml-auto mr-9">
            {/* Messages icon skeleton */}
            <div className="w-10 h-10 mx-2 flex items-center justify-center relative">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
              {/* Message badge skeleton */}
            </div>

            <div className="h-8 w-px bg-gray-200 ml-2"></div>

            {/* Profile skeleton - avatar and name */}
            <div className="flex items-center space-x-3 px-4 py-2 mx-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden ml-auto p-2 text-gray-600">
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          </button>
        </div>
      </nav>
    </header>
  );

  // If user data is not loaded yet, show skeleton
  if (!isLoaded) {
    return (
      <>
        <HeaderSkeleton />
        {/* Spacer to prevent content from going under fixed header */}
        <div className="h-[60px]" />
      </>
    );
  }

  // Determine user role from publicMetadata
  const userRole = user?.publicMetadata?.role || "user";

  // Render the appropriate header based on role
  if (userRole === "admin" || userRole === "Admin") {
    return <AdminHeader />;
  } else if (userRole === "business") {
    return <BusinessHeader />;
  } else {
    return <RegularHeader />;
  }
};

export default Header;
