import React, { useState } from "react";
import { Search, Clock, Activity, Filter } from "lucide-react";
import { useActivities } from "../../hooks/tanstack/useAdminFunctions";
import { format, formatDistanceToNow } from "date-fns";

const AdminActivities = () => {
  const { data: activities = [], isLoading, error } = useActivities();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  // Function to get activity type color
  const getActivityTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "user":
        return "bg-blue-100 text-blue-800";
      case "job":
        return "bg-green-100 text-green-800";
      case "business":
        return "bg-purple-100 text-purple-800";
      case "application":
        return "bg-yellow-100 text-yellow-800";
      case "admin":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter activities based on search query and type filter
  const filteredActivities = activities.filter(
    (activity) =>
      activity.activity?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (typeFilter === "All" ||
        activity.type?.toLowerCase() === typeFilter.toLowerCase())
  );

  // Get unique activity types for filter dropdown
  const activityTypes = [
    "All",
    ...new Set(activities.map((item) => item.type || "Other")),
  ];

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle type filter change
  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMM d, yyyy h:mm a");
    } catch (error) {
      return dateString || "Unknown date";
    }
  };

  // Get relative time (e.g., "2 hours ago")
  const getRelativeTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "Unknown time";
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-6 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading activity logs...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-6">
        <div className="bg-red-50 p-4 rounded-md">
          <h3 className="text-red-800 font-medium">Error loading activities</h3>
          <p className="text-red-700 mt-1">
            {error.message ||
              "Failed to load activity logs. Please try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 bg-red-100 text-red-800 px-4 py-2 rounded-md hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-6">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold">Activity Logs</h2>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center">
          <Filter className="text-gray-400 w-5 h-5 mr-2" />
          <select
            value={typeFilter}
            onChange={handleTypeFilterChange}
            className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
          >
            {activityTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* No activities message */}
      {filteredActivities.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No activities found
          </h3>
          <p className="text-gray-600">
            {searchQuery || typeFilter !== "All"
              ? "No activities match your search criteria."
              : "There are no activities recorded in the system."}
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          {/* Timeline list */}
          <div className="divide-y divide-gray-200">
            {filteredActivities.map((activity, index) => (
              <div key={index} className="p-4 hover:bg-gray-50">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Activity className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between flex-wrap gap-2">
                      <div>
                        <span className="font-medium">{activity.activity}</span>
                        <span
                          className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${getActivityTypeColor(
                            activity.type
                          )}`}
                        >
                          {activity.type || "Other"}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span title={formatDate(activity.event_time)}>
                          {getRelativeTime(activity.event_time)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatDate(activity.event_time)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminActivities;
