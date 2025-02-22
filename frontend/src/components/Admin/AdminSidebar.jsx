import React from "react";
import { NavLink } from "react-router";

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 my-3 rounded">
      {/* Logo / Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/admin/dashboard"
          end
          className={({ isActive }) =>
            isActive
              ? "block p-2 rounded bg-blue-100 text-blue-700 font-medium"
              : "block p-2 rounded hover:bg-gray-100 text-gray-700 transition-colors"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "block p-2 rounded bg-blue-100 text-blue-700 font-medium"
              : "block p-2 rounded hover:bg-gray-100 text-gray-700 transition-colors"
          }
        >
          Manage Users
        </NavLink>

        <NavLink
          to="/admin/jobs"
          className={({ isActive }) =>
            isActive
              ? "block p-2 rounded bg-blue-100 text-blue-700 font-medium"
              : "block p-2 rounded hover:bg-gray-100 text-gray-700 transition-colors"
          }
        >
          Manage Jobs
        </NavLink>

        <NavLink
          to="/admin/business"
          className={({ isActive }) =>
            isActive
              ? "block p-2 rounded bg-blue-100 text-blue-700 font-medium"
              : "block p-2 rounded hover:bg-gray-100 text-gray-700 transition-colors"
          }
        >
          Business Applications
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
