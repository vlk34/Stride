import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";
import {
  Compass,
  Menu,
  X,
  ChevronDown,
  Settings,
  HelpCircle,
  LogOut,
  User,
  Shield,
  Users,
  BarChart3,
  FileText,
  Database,
  Flag,
  UserCog,
} from "lucide-react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useUserData } from "../../contexts/UserDataContext";
import { useNavigate } from "react-router";

const AdminHeader = () => {
  const { user, isLoaded } = useUser();
  const { localUserData } = useUserData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { openUserProfile, signOut } = useClerk();

  const displayName = user
    ? localUserData.name || `${user.firstName || ""} ${user.lastName || ""}`
    : "Admin";

  // Admin menu items
  const menuItems = [
    {
      path: "/admin/dashboard",
      icon: <BarChart3 className="w-5 h-5" />,
      label: "Dashboard",
    },
    {
      path: "/admin/users",
      icon: <Users className="w-5 h-5" />,
      label: "Users",
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/admin-login");
  };

  // Profile dropdown items for admin users
  const profileMenuItems = [
    {
      label: "Admin Settings",
      icon: <Settings className="w-4 h-4" />,
      onClick: () => navigate("/admin-settings"),
    },
    {
      label: "System Logs",
      icon: <FileText className="w-4 h-4" />,
      onClick: () => navigate("/admin-logs"),
    },
    {
      label: "Switch to User View",
      icon: <User className="w-4 h-4" />,
      onClick: () => navigate("/switch-to-user"),
      className: "text-blue-600 hover:bg-blue-50",
    },
    {
      label: "Logout",
      icon: <LogOut className="w-4 h-4" />,
      onClick: handleLogout,
      className: "text-red-600 hover:bg-red-50",
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 bg-white transition-shadow duration-300 ${
          isMenuOpen ? "shadow-md" : "shadow-sm"
        } border-b border-gray-200 z-40`}
      >
        <nav className="max-w-7xl mx-auto py-2">
          <div className="flex items-center px-4">
            {/* Logo and App Name */}
            <Link
              to="/admin/dashboard"
              className="flex items-center space-x-2 mr-8"
            >
              <Compass className="w-6 h-6 text-blue-700" />
              <span className="text-xl font-semibold text-gray-900">
                Stride
              </span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                Admin
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
            <div
              className="hidden md:flex items-center ml-auto"
              ref={profileRef}
            >
              {!isLoaded ? (
                // Loading skeleton
                <div className="flex items-center space-x-3 px-4 py-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                  <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
              ) : user ? (
                <>
                  {/* Admin profile - removed notifications and messages */}
                  <div className="relative mx-2">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {displayName}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                          isProfileOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Animated Profile Dropdown */}
                    {isProfileOpen && (
                      <div
                        className={`absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50
                          transition-all duration-200 ease-out
                          ${
                            isProfileOpen
                              ? "opacity-100 translate-y-0 visible"
                              : "opacity-0 -translate-y-2 invisible"
                          }`}
                      >
                        <div className="px-4 py-3 border-b border-gray-200">
                          <p className="text-sm font-medium text-gray-900">
                            {displayName}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {user?.primaryEmailAddress?.emailAddress}
                          </p>
                          <div className="mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full inline-block">
                            Administrator
                          </div>
                        </div>

                        <div className="py-1">
                          {profileMenuItems.map((item, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setIsProfileOpen(false);
                                item.onClick();
                              }}
                              className={`w-full px-4 py-2 text-sm text-left flex items-center space-x-2 hover:bg-gray-50 transition-colors ${
                                item.className || "text-gray-700"
                              }`}
                            >
                              {item.icon}
                              <span>{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="h-[48px] flex items-center">
                  <Link
                    to="/admin-login"
                    className="px-4 py-2 rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 hover:shadow-sm"
                  >
                    Admin Login
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden ml-auto p-2 transition-colors text-gray-600 hover:text-gray-900"
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
              isMenuOpen ? "max-h-screen" : "max-h-0"
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
              {user ? (
                <>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <Link
                      to="/admin-settings"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          {displayName}
                        </span>
                        <div className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full inline-block mt-1">
                          Administrator
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Additional mobile menu items for admin users */}
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <Link
                      to="/admin-logs"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:bg-gray-50"
                    >
                      <FileText className="w-5 h-5" />
                      <span className="font-medium">System Logs</span>
                    </Link>
                  </div>

                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center space-x-2 px-4 py-3 text-red-600 w-full text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to="/admin-login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-3 border-t border-gray-200"
                >
                  <span className="font-medium text-gray-700">Admin Login</span>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-[60px]" />
    </>
  );
};

export default AdminHeader;
