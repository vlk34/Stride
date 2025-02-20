import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { Compass, Search, Bookmark, Menu, X } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useUserData } from "../contexts/UserDataContext";

const Header = () => {
  const { user } = useUser();
  const { localUserData } = useUserData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Use localUserData.name if available, otherwise fall back to user data
  const displayName =
    localUserData.name || `${user?.firstName || ""} ${user?.lastName || ""}`;

  const menuItems = [
    {
      path: "/search",
      icon: <Search className="w-5 h-5" />,
      label: "Search Jobs",
    },
    { path: "/jobs", icon: <Bookmark className="w-5 h-5" />, label: "My Jobs" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 bg-white transition-shadow duration-300 ${
          isMenuOpen ? "shadow-md" : "shadow-sm"
        } border-b border-gray-200 z-40`}
      >
        <nav className="max-w-7xl mx-auto py-3">
          <div className="flex items-center px-4">
            {/* Logo and App Name */}
            <Link to="/" className="flex items-center space-x-2 mr-8">
              <Compass className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">
                Stride
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 flex-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      location.pathname === item.path
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Profile Section - Desktop */}
            <div className="hidden md:flex items-center ml-auto">
              <Link
                to="/profile"
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                <img
                  src={localUserData.imageUrl || user?.imageUrl || ""}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                />
                <span className="text-sm font-medium text-gray-700">
                  {displayName}
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button - disabled when job details are open */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden ml-auto p-2 transition-colors ${
                location.pathname.includes("/job/")
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              disabled={location.pathname.includes("/job/")}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 transition-transform duration-200 ease-in-out transform rotate-180" />
              ) : (
                <Menu className="w-6 h-6 transition-transform duration-200 ease-in-out" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-64" : "max-h-0"
            }`}
          >
            <div className="px-4 py-2 space-y-1 bg-white shadow-lg">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200
                    ${
                      location.pathname === item.path
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              {/* Mobile Profile Link */}
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-2 px-4 py-3 border-t border-gray-200"
              >
                <img
                  src={localUserData.imageUrl || user?.imageUrl || ""}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                />
                <span className="font-medium text-gray-700">{displayName}</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-[60px]" />
    </>
  );
};

export default Header;
