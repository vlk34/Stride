import React, { useState } from "react";
import {
  Bell,
  FileText,
  Calendar,
  MessageSquare,
  Users,
  Briefcase,
  Star,
  CheckCircle,
  Filter,
  Trash2,
  MoreVertical,
  ChevronDown,
  X,
} from "lucide-react";
import { Link } from "react-router";

const BusinessNotifications = () => {
  const [filter, setFilter] = useState("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Dummy notifications data - replace with real data from your backend
  const notifications = [
    {
      id: 1,
      type: "application",
      message: "New application for Senior Frontend Developer",
      details: "Sarah Johnson applied for this position",
      time: "2 hours ago",
      read: false,
      jobId: 1,
      applicantId: 101,
    },
    {
      id: 2,
      type: "interview",
      message: "Interview scheduled with Michael Chen",
      details: "Tomorrow at 2:00 PM - Technical Interview",
      time: "Yesterday",
      read: false,
      jobId: 2,
      applicantId: 102,
    },
    {
      id: 3,
      type: "message",
      message: "Emily Davis sent you a message",
      details: "Regarding the Product Designer position",
      time: "2 days ago",
      read: true,
      jobId: 2,
      applicantId: 103,
    },
    {
      id: 4,
      type: "application",
      message: "5 new applications for Marketing Manager",
      details: "View all applicants",
      time: "3 days ago",
      read: true,
      jobId: 3,
    },
    {
      id: 5,
      type: "review",
      message: "Reminder: Review candidates for DevOps Engineer",
      details: "12 candidates awaiting review",
      time: "4 days ago",
      read: true,
      jobId: 4,
    },
    {
      id: 6,
      type: "job",
      message: "Your job post for UX Designer is expiring soon",
      details: "Expires in 2 days - Renew now",
      time: "5 days ago",
      read: true,
      jobId: 5,
    },
    {
      id: 7,
      type: "system",
      message: "Your subscription will renew in 7 days",
      details: "Premium Business Plan - $99/month",
      time: "1 week ago",
      read: true,
    },
  ];

  // Filter notifications based on selected filter
  const filteredNotifications =
    filter === "all"
      ? notifications
      : filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications.filter((n) => n.type === filter);

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "application":
        return <FileText className="w-5 h-5 text-blue-600" />;
      case "interview":
        return <Calendar className="w-5 h-5 text-purple-600" />;
      case "message":
        return <MessageSquare className="w-5 h-5 text-green-600" />;
      case "review":
        return <Star className="w-5 h-5 text-yellow-600" />;
      case "job":
        return <Briefcase className="w-5 h-5 text-indigo-600" />;
      case "system":
        return <Bell className="w-5 h-5 text-gray-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  // Get background color based on notification type
  const getNotificationBgColor = (type, read) => {
    if (!read) return "bg-blue-50";

    switch (type) {
      case "application":
        return "hover:bg-blue-50";
      case "interview":
        return "hover:bg-purple-50";
      case "message":
        return "hover:bg-green-50";
      case "review":
        return "hover:bg-yellow-50";
      case "job":
        return "hover:bg-indigo-50";
      case "system":
        return "hover:bg-gray-50";
      default:
        return "hover:bg-gray-50";
    }
  };

  // Mark all as read function
  const markAllAsRead = () => {
    // In a real app, you would call an API to update the read status
    console.log("Marking all notifications as read");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-lg mr-3">
            <Bell className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">
              Stay updated with applications, messages, and more
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={markAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Mark all as read
          </button>

          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
            >
              <Filter className="w-4 h-4" />
              Filter
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showFilterMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button
                  onClick={() => {
                    setFilter("all");
                    setShowFilterMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    filter === "all"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  All notifications
                </button>
                <button
                  onClick={() => {
                    setFilter("unread");
                    setShowFilterMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    filter === "unread"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Unread only
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={() => {
                    setFilter("application");
                    setShowFilterMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                    filter === "application"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <FileText className="w-4 h-4 mr-2 text-blue-600" />
                  Applications
                </button>
                <button
                  onClick={() => {
                    setFilter("interview");
                    setShowFilterMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                    filter === "interview"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                  Interviews
                </button>
                <button
                  onClick={() => {
                    setFilter("message");
                    setShowFilterMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                    filter === "message"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <MessageSquare className="w-4 h-4 mr-2 text-green-600" />
                  Messages
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 transition-colors ${getNotificationBgColor(
                  notification.type,
                  notification.read
                )}`}
              >
                <div className="flex items-start">
                  <div
                    className={`p-2 rounded-full ${
                      notification.read ? "bg-gray-100" : "bg-blue-100"
                    } mr-3`}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p
                          className={`text-gray-900 ${
                            !notification.read && "font-medium"
                          }`}
                        >
                          {notification.message}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.details}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {notification.time}
                        </p>
                      </div>

                      <div className="flex items-center">
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        )}
                        <div className="relative">
                          <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons based on notification type */}
                    <div className="mt-3 flex gap-2">
                      {notification.type === "application" && (
                        <>
                          <Link
                            to={`/applicants/${notification.applicantId}`}
                            className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                          >
                            View Profile
                          </Link>
                          <Link
                            to={`/job-applicants/${notification.jobId}`}
                            className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                          >
                            View Job
                          </Link>
                        </>
                      )}

                      {notification.type === "interview" && (
                        <>
                          <Link
                            to="/interviews"
                            className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
                          >
                            View Schedule
                          </Link>
                        </>
                      )}

                      {notification.type === "message" && (
                        <>
                          <Link
                            to="/business-messages"
                            className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                          >
                            Reply
                          </Link>
                        </>
                      )}

                      {notification.type === "job" && (
                        <>
                          <Link
                            to={`/edit-job/${notification.jobId}`}
                            className="text-sm px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
                          >
                            Renew Job
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 p-3 rounded-full inline-flex mb-4">
              <Bell className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notifications
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              When you receive notifications about applications, interviews, or
              messages, they'll appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessNotifications;
