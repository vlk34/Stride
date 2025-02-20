// src/components/Admin/AdminDashboard.jsx
import React from "react";

const AdminDashboard = () => {
  // Example data (in a real app, you'd fetch this from an API)
  const totalUsers = 123;
  const openJobs = 45;
  const WaitingJobs = 12;

  const recentActivities = [
    { activity: 'User "Alice" created a new job listing', time: "2 hours ago" },
    { activity: 'New user "JohnDoe" signed up', time: "3 hours ago" },
    { activity: 'User "Bob" edited job #101', time: "5 hours ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardStatCard label="Total Users" value={totalUsers} bg="bg-blue-50" textColor="text-blue-700" />
        <DashboardStatCard label="Open Jobs" value={openJobs} bg="bg-green-50" textColor="text-green-700" />
        <DashboardStatCard label="Waiting Confirmations" value={WaitingJobs} bg="bg-red-50" textColor="text-red-700" />
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
        <ul className="space-y-2">
          {recentActivities.map((item, idx) => (
            <li key={idx} className="flex justify-between text-sm">
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

/* --------------------------------------
   STATS CARD SUBCOMPONENT
-------------------------------------- */
const DashboardStatCard = ({ label, value, bg, textColor }) => {
  return (
    <div className={`rounded-lg shadow p-6 flex flex-col items-center ${bg}`}>
      <h4 className="text-sm text-gray-600 uppercase tracking-wide">{label}</h4>
      <p className={`text-3xl font-bold mt-2 ${textColor}`}>{value}</p>
    </div>
  );
};
