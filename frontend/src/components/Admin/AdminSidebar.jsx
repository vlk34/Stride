// src/pages/admin/AdminSidebar.jsx
import React from "react";
import { NavLink } from "react-router";

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4">
      {/* Logo / Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/admin/dashboard"
          end
          className={({ isActive }) =>
            isActive
              ? "block p-2 rounded bg-blue-100 text-blue-700"
              : "block p-2 rounded hover:bg-gray-100"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "block p-2 rounded bg-blue-100 text-blue-700"
              : "block p-2 rounded hover:bg-gray-100"
          }
        >
          Manage Users
        </NavLink>

        <NavLink
          to="/admin/jobs"
          className={({ isActive }) =>
            isActive
              ? "block p-2 rounded bg-blue-100 text-blue-700"
              : "block p-2 rounded hover:bg-gray-100"
          }
        >
          Manage Jobs
        </NavLink>

        <NavLink
          to="/admin/business"
          className={({ isActive }) =>
            isActive
              ? "block p-2 rounded bg-blue-100 text-blue-700"
              : "block p-2 rounded hover:bg-gray-100"
          }
        >
          Business Applications
        </NavLink>


      </nav>
    </aside>
  );
};

export default AdminSidebar;
