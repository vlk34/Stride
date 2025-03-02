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
  Building2,
  MessageSquare,
  Briefcase,
  Users,
  BarChart3,
  CreditCard,
  Bell,
} from "lucide-react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useUserData } from "../../contexts/UserDataContext";
import { useNavigate } from "react-router";

const BusinessHeader = () => {
  const { user, isLoaded } = useUser();
  const { localUserData } = useUserData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { openUserProfile, signOut } = useClerk();

  const displayName = user
    ? localUserData.name || `${user.firstName || ""} ${user.lastName || ""}`
    : "Guest";

  // Business menu items
  const menuItems = [
    {
      path: "/business/dashboard",
      icon: <BarChart3 className="w-5 h-5" />,
      label: "Dashboard",
    },
    {
      path: "/business/manage/jobs",
      icon: <Briefcase className="w-5 h-5" />,
      label: "Jobs",
    },
    {
      path: "/business/applicants",
      icon: <Users className="w-5 h-5" />,
      label: "Applicants",
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

  // Reset mobile profile dropdown when menu is closed
  useEffect(() => {
    if (!isMenuOpen) {
      setIsMobileProfileOpen(false);
    }
  }, [isMenuOpen]);

  const handleLogout = async () => {
    await signOut();
    navigate("/signin");
  };

  // Toggle hamburger menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Always ensure profile dropdown is closed when toggling menu
    setIsMobileProfileOpen(false);
  };

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsMobileProfileOpen(false);
  };

  // Profile dropdown items for business users
  const profileMenuItems = [
    {
      label: "Company Profile",
      icon: <Building2 className="w-4 h-4" />,
      onClick: () => navigate("/business/profile"),
    },
    {
      label: "Account Settings",
      icon: <Settings className="w-4 h-4" />,
      onClick: () => openUserProfile(),
    },
    {
      label: "Help Center",
      icon: <HelpCircle className="w-4 h-4" />,
      onClick: () => navigate("/business/help"),
    },
    {
      label: "Switch to Personal",
      icon: <User className="w-4 h-4" />,
      onClick: () => navigate("/business/switch-to-personal"),
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
            <Link to="/" className="flex items-center space-x-2 mr-8">
              <Compass className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">
                Stride
              </span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                Business
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
              {user ? (
                <>
                  {/* Messages */}
                  <Link
                    to="/business/messages"
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-900 relative mx-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      2
                    </span>
                  </Link>

                  <div className="h-8 w-px bg-gray-200 ml-2" />
                  <div className="relative mx-2">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50"
                    >
                      <img
                        src={localUserData.imageUrl || user?.imageUrl || ""}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border border-gray-200"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {localUserData.companyName || displayName}
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
                            {localUserData.companyName || displayName}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {user?.primaryEmailAddress?.emailAddress}
                          </p>
                          <div className="mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full inline-block">
                            Business Account
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
                    to="/signin"
                    className="px-4 py-2 rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 hover:shadow-sm"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden ml-auto p-2 text-gray-600 hover:text-gray-900"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
                  onClick={() => handleNavigation(item.path)}
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

              {/* Mobile Profile Section with Collapsible Menu */}
              {user ? (
                <>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <button
                      onClick={() =>
                        setIsMobileProfileOpen(!isMobileProfileOpen)
                      }
                      className="flex items-center justify-between w-full px-4 py-3 text-left rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-2">
                        <img
                          src={localUserData.imageUrl || user?.imageUrl || ""}
                          alt="Profile"
                          className="w-8 h-8 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                          <span className="font-medium text-gray-700 block">
                            {localUserData.companyName || displayName}
                          </span>
                          <div className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full inline-block mt-1.5">
                            Business Account
                          </div>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                          isMobileProfileOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Collapsible Profile Menu */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isMobileProfileOpen ? "max-h-screen" : "max-h-0"
                      }`}
                    >
                      <div className="pl-4 space-y-1 mt-1">
                        <Link
                          to="/business/profile"
                          onClick={() => handleNavigation("/business/profile")}
                          className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
                        >
                          <Building2 className="w-5 h-5" />
                          <span className="font-medium">Company Profile</span>
                        </Link>

                        <button
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobileProfileOpen(false);
                            openUserProfile();
                          }}
                          className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:bg-gray-50 w-full text-left rounded-lg"
                        >
                          <Settings className="w-5 h-5" />
                          <span className="font-medium">Account Settings</span>
                        </button>

                        <Link
                          to="/business/help"
                          onClick={() => handleNavigation("/business/help")}
                          className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
                        >
                          <HelpCircle className="w-5 h-5" />
                          <span className="font-medium">Help Center</span>
                        </Link>

                        <Link
                          to="/business/switch-to-personal"
                          onClick={() =>
                            handleNavigation("/business/switch-to-personal")
                          }
                          className="flex items-center space-x-2 px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <User className="w-5 h-5" />
                          <span className="font-medium">
                            Switch to Personal
                          </span>
                        </Link>

                        <button
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobileProfileOpen(false);
                            handleLogout();
                          }}
                          className="flex items-center space-x-2 px-4 py-3 text-red-600 w-full text-left hover:bg-red-50 rounded-lg"
                        >
                          <LogOut className="w-5 h-5" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  to="/signin"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-3 border-t border-gray-200"
                >
                  <span className="font-medium text-gray-700">Sign In</span>
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

export default BusinessHeader;
