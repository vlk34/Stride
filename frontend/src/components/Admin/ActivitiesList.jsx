import React, { useState } from "react";
import { Activity, Calendar, Search, Filter, ChevronDown, ChevronUp } from "lucide-react";

const ActivitiesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [expandedActivity, setExpandedActivity] = useState(null);

  // Dummy data for activities - keeping this unchanged
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

  // Filter activities based on search query, date filter, and type filter - keeping this unchanged
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

  const getTypeColor = (type) => {
    switch (type) {
      case "business":
        return "bg-blue-500";
      case "admin":
        return "bg-purple-500";
      case "system":
        return "bg-gray-500";
      default:
        return "bg-gray-400";
    }
  };

  const getTypeBadge = (type) => {
    let bgColor, textColor, label;
    
    switch (type) {
      case "business":
        bgColor = "bg-blue-100";
        textColor = "text-blue-800";
        label = "Business";
        break;
      case "admin":
        bgColor = "bg-purple-100";
        textColor = "text-purple-800";
        label = "Admin";
        break;
      case "system":
        bgColor = "bg-gray-100";
        textColor = "text-gray-800";
        label = "System";
        break;
      default:
        bgColor = "bg-gray-100";
        textColor = "text-gray-800";
        label = "Other";
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {label}
      </span>
    );
  };

  const toggleActivity = (id) => {
    setExpandedActivity(expandedActivity === id ? null : id);
  };

  return (
    <div className="bg-white p-3 sm:p-6 rounded-lg border border-gray-200">
      <div className="flex items-center mb-4 sm:mb-6">
        <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2" />
        <h1 className="text-lg sm:text-xl font-bold">Activity Log</h1>
      </div>

      {/* Filters and Search - More responsive */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-500 mr-2" />
            <select
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
            </select>
          </div>

          <div className="flex items-center">
            <Filter className="w-5 h-5 text-gray-500 mr-2" />
            <select
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="business">Business</option>
              <option value="admin">Admin</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>

        <div className="relative flex-1 sm:flex-none sm:w-64">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search activities..."
            className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Custom styles for breakpoints */}
      <style jsx>{`
        @media (min-width: 1200px) {
          .custom-lg-visible {
            display: block;
          }
          .custom-md-visible {
            display: none;
          }
        }
        @media (max-width: 1199px) and (min-width: 768px) {
          .custom-lg-visible {
            display: none;
          }
          .custom-md-visible {
            display: block;
          }
        }
      `}</style>

      {/* Activities with responsive layouts */}
      <div className="border rounded-lg overflow-hidden">
        {/* Large screen detailed table */}
        <div className="hidden lg:hidden custom-lg-visible">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                  Date
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className={`inline-block w-2 h-2 rounded-full ${getTypeColor(item.type)} mr-2`}></span>
                        <span>{item.activity}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {getTypeBadge(item.type)}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {item.date}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-500">
                      {item.time}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                    No activities found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Medium screen simplified table */}
        <div className="hidden md:block lg:block custom-md-visible">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/5">
                  Activity
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                  Type
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className={`inline-block w-2 h-2 rounded-full ${getTypeColor(item.type)} mr-2`}></span>
                        <span className="line-clamp-2">{item.activity}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {getTypeBadge(item.type)}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-500">
                      <div>{item.time}</div>
                      <div className="text-xs">{item.date}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-4 py-6 text-center text-gray-500">
                    No activities found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Small screen card layout */}
        <div className="md:hidden">
          <div className="divide-y divide-gray-200">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((item) => (
                <div 
                  key={item.id} 
                  className="p-4 bg-white hover:bg-gray-50"
                  onClick={() => toggleActivity(item.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-start">
                      <span className={`inline-block w-2 h-2 rounded-full ${getTypeColor(item.type)} mr-2 mt-2`}></span>
                      <div className="flex-1">
                        <p className={expandedActivity === item.id ? "" : "line-clamp-2"}>{item.activity}</p>
                        <div className="mt-1">
                          {getTypeBadge(item.type)}
                        </div>
                      </div>
                    </div>
                    <button className="ml-2 p-1">
                      {expandedActivity === item.id ? (
                        <ChevronUp className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                    <div>{item.date}</div>
                    <div>{item.time}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                No activities found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesList;
