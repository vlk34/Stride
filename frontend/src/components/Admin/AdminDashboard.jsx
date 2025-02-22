import React from "react";
import { Users, Briefcase, Building2, ChevronRight } from "lucide-react";
import { Link } from "react-router";

const AdminDashboard = () => {
  // Dummy data for stats and recent activities; replace with API data as needed.
  const stats = [
    {
      title: "Total Users",
      value: "123",
      icon: <Users className="w-6 h-6 text-indigo-600" />,
      bg: "bg-indigo-50",
    },
    {
      title: "Job Posts",
      value: "45",
      icon: <Briefcase className="w-6 h-6 text-green-600" />,
      bg: "bg-green-50",
    },
    {
      title: "Business Applications",
      value: "12",
      icon: <Building2 className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-50",
    },
  ];

  const recentActivities = [
    { activity: 'User "Alice" registered', time: "2 hours ago" },
    { activity: 'Job post #101 approved', time: "3 hours ago" },
    { activity: 'Business application from "XYZ Inc." submitted', time: "5 hours ago" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-3">
      {/* Header with Navigation Links */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of system activities and key metrics</p>
        </div>
        
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`flex items-center p-6 rounded-lg shadow ${stat.bg}`}>
            <div className="p-3 rounded-full bg-white mr-4">
              {stat.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Recent Activities</h2>
          <Link
            to="/activities"
            className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm"
          >
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <ul className="divide-y divide-gray-200">
          {recentActivities.map((item, idx) => (
            <li key={idx} className="py-3 flex justify-between text-sm">
              <span>{item.activity}</span>
              <span className="text-gray-500">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
