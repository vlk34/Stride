import React, { useState } from "react";
import { Activity, Calendar, Search, Filter } from "lucide-react";

const ActivitiesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Dummy data for activities
  const allActivities = [
    {
      id: 1,
      activity: "Business application from 'Tech Solutions' approved",
      type: "business",
      time: "2 hours ago",
      date: "2023-06-15",
    },
    {
      id: 2,
      activity: "Business application from 'Global Innovations' submitted",
      type: "business",
      time: "3 hours ago",
      date: "2023-06-15",
    },
    {
      id: 3,
      activity: "Business application from 'Healthcare Plus' rejected",
      type: "business",
      time: "5 hours ago",
      date: "2023-06-15",
    },
    {
      id: 4,
      activity: "Business application from 'EduTech Systems' under review",
      type: "business",
      time: "1 day ago",
      date: "2023-06-14",
    },
    {
      id: 5,
      activity: "Business application from 'Financial Partners' submitted",
      type: "business",
      time: "1 day ago",
      date: "2023-06-14",
    },
    {
      id: 6,
      activity: "Admin 'Sarah' logged in",
      type: "admin",
      time: "2 days ago",
      date: "2023-06-13",
    },
    {
      id: 7,
      activity: "System maintenance performed",
      type: "system",
      time: "3 days ago",
      date: "2023-06-12",
    },
    {
      id: 8,
      activity: "Business verification process updated",
      type: "system",
      time: "4 days ago",
      date: "2023-06-11",
    },
    {
      id: 9,
      activity: "Admin 'John' updated business approval guidelines",
      type: "admin",
      time: "5 days ago",
      date: "2023-06-10",
    },
  ];

  // Filter activities based on search query, date filter, and type filter
  const filteredActivities = allActivities.filter(
    (activity) =>
      (searchQuery === "" ||
        activity.activity.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (dateFilter === "all" ||
        (dateFilter === "today" && activity.time.includes("hours")) ||
        (dateFilter === "yesterday" && activity.time.includes("1 day")) ||
        (dateFilter === "week" &&
          (activity.time.includes("days") ||
            activity.time.includes("day") ||
            activity.time.includes("hours")))) &&
      (typeFilter === "all" || activity.type === typeFilter)
  );

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center mb-6">
        <Activity className="w-6 h-6 text-blue-500 mr-2" />
        <h1 className="text-xl font-bold">Activity Log</h1>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="business">Business Applications</option>
              <option value="admin">Admin Actions</option>
              <option value="system">System Events</option>
            </select>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search activities..."
            className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Activities Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Activity
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      {item.type === "business" && (
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                      )}
                      {item.type === "admin" && (
                        <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                      )}
                      {item.type === "system" && (
                        <span className="inline-block w-2 h-2 rounded-full bg-gray-500 mr-2"></span>
                      )}
                      {item.activity}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-500">
                    {item.time}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="px-4 py-6 text-center text-gray-500">
                  No activities found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivitiesList;
