import React, { useEffect } from "react";
import {
  Users,
  Briefcase,
  Building2,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import {
  useAdminStats,
  useBusinessApplications,
} from "../../hooks/tanstack/useAdminFunctions";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Fetch admin stats and business applications data
  const { data: statsData, isLoading: statsLoading } = useAdminStats();
  const { data: applicationsData, isLoading: applicationsLoading } =
    useBusinessApplications();

  // Map stats data to display format
  const stats = [
    {
      title: "Total Users",
      value: statsLoading ? "..." : statsData?.total_users || "0",
      icon: <Users className="w-5 h-5 text-blue-600" />,
    },
    {
      title: "Job Posts",
      value: statsLoading ? "..." : statsData?.total_jobs || "0",
      icon: <Briefcase className="w-5 h-5 text-blue-600" />,
    },
    {
      title: "Business Applications",
      value: statsLoading ? "..." : statsData?.business_applications || "0",
      icon: <Building2 className="w-5 h-5 text-blue-600" />,
    },
  ];

  // Format the date to "X days/hours ago" format
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    }
  };

  // Handle review click to navigate to the review page
  const handleReviewClick = (companyId, userId) => {
    navigate(`/admin/approvals/${companyId}`, {
      state: { userId, companyId },
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
        <h1 className="text-xl font-bold mb-4 sm:mb-6">Admin Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200 transition-all hover:shadow-md"
            >
              <div className="flex items-center mb-2">
                <div className="p-2 bg-blue-100 rounded-full">{stat.icon}</div>
                <span className="ml-2 text-gray-600">{stat.title}</span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Pending Approvals Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center mb-2 sm:mb-0">
              <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
              Pending Business Applications
            </h2>
            <Link
              to="/admin/approvals"
              className="text-blue-600 text-sm flex items-center self-end sm:self-auto"
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Responsive table container */}
          <div className="border rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="hidden sm:table-cell px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="hidden sm:table-cell px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applicationsLoading ? (
                  <tr>
                    <td colSpan="4" className="px-3 sm:px-4 py-3 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : applicationsData && applicationsData.length > 0 ? (
                  applicationsData.slice(0, 5).map((item) => (
                    <tr key={item.company_id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-4 py-3 font-medium">
                        {item.company}
                      </td>
                      <td className="hidden sm:table-cell px-3 sm:px-4 py-3">
                        {item.industry}
                      </td>
                      <td className="hidden sm:table-cell px-3 sm:px-4 py-3 text-gray-500">
                        {formatTimeAgo(item.applied_at)}
                      </td>
                      <td className="px-3 sm:px-4 py-3 text-right">
                        <button
                          onClick={() =>
                            handleReviewClick(item.company_id, item.user_id)
                          }
                          className="bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-800 px-3 py-1 rounded transition-colors"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-3 sm:px-4 py-3 text-center">
                      No pending applications
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile-only timestamp display */}
          <div className="sm:hidden mt-2">
            {!applicationsLoading &&
              applicationsData &&
              applicationsData.slice(0, 5).map((item) => (
                <div
                  key={`mobile-${item.company_id}`}
                  className="text-xs text-gray-500 pl-2 mb-1"
                >
                  {item.company}: {formatTimeAgo(item.applied_at)}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
