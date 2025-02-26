import React from "react";
import {
  Users,
  Briefcase,
  Building2,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router";

const AdminDashboard = () => {
  // Dummy data for stats and recent activities
  const stats = [
    {
      title: "Total Users",
      value: "123",
      icon: <Users className="w-5 h-5 text-blue-600" />,
    },
    {
      title: "Job Posts",
      value: "45",
      icon: <Briefcase className="w-5 h-5 text-blue-600" />,
    },
    {
      title: "Business Applications",
      value: "12",
      icon: <Building2 className="w-5 h-5 text-blue-600" />,
    },
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: "Business Application",
      name: "Tech Solutions",
      submitted: "2 days ago",
    },
    {
      id: 2,
      type: "Job Post",
      name: "Senior Developer at XYZ Corp",
      submitted: "1 day ago",
    },
    {
      id: 3,
      type: "User Report",
      name: "Inappropriate content report",
      submitted: "5 hours ago",
    },
  ];

  const recentActivities = [
    { id: 1, activity: "User 'Alice Smith' registered", time: "2 hours ago" },
    { id: 2, activity: "Job post #101 approved", time: "3 hours ago" },
    {
      id: 3,
      activity: "Business application from 'XYZ Inc.' submitted",
      time: "5 hours ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
              <div className="flex items-center mb-2">
                {stat.icon}
                <span className="ml-2 text-gray-600">{stat.title}</span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Pending Approvals Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
              Pending Approvals
            </h2>
            <Link
              to="/admin/approvals"
              className="text-blue-600 text-sm flex items-center"
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingApprovals.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 whitespace-nowrap">{item.type}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {item.submitted}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <Link
                        to={`/admin/review/${item.type
                          .toLowerCase()
                          .replace(" ", "-")}/${item.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Activities</h2>
            <Link
              to="/admin/activities"
              className="text-blue-600 text-sm flex items-center"
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
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
                {recentActivities.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3">{item.activity}</td>
                    <td className="px-4 py-3 text-right text-gray-500">
                      {item.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
