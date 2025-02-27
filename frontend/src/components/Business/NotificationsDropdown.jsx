import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  FileText,
  Calendar,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router";

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Dummy notifications data - replace with real data from your backend
  // Only showing the latest 3 notifications
  const notifications = [
    {
      id: 1,
      type: "application",
      message: "New application for Senior Frontend Developer",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "interview",
      message: "Interview scheduled with Michael Chen",
      time: "Yesterday",
      read: false,
    },
    {
      id: 3,
      type: "message",
      message: "Emily Davis sent you a message",
      time: "2 days ago",
      read: true,
    },
  ];

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "application":
        return <FileText className="w-4 h-4 text-blue-600" />;
      case "interview":
        return <Calendar className="w-4 h-4 text-purple-600" />;
      case "message":
        return <MessageSquare className="w-4 h-4 text-green-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-900 relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-3 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-medium text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 ${
                      !notification.read ? "bg-blue-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start">
                      <div
                        className={`p-1.5 rounded-full ${
                          notification.read ? "bg-gray-100" : "bg-blue-100"
                        } mr-2`}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1">
                        <p
                          className={`text-sm text-gray-900 ${
                            !notification.read && "font-medium"
                          }`}
                        >
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>

                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Bell className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No notifications</p>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-100 text-center">
            <Link
              to="/business-notifications"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center"
              onClick={() => setIsOpen(false)}
            >
              View all notifications
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
