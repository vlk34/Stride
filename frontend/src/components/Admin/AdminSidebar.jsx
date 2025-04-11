import React from "react";
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Building2,
  ShieldAlert,
  Activity,
} from "lucide-react";

const AdminSidebar = () => {
  return (
    <aside className="bg-white rounded-lg border border-gray-200 shadow-sm w-full">
      {/* Logo / Title */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800 flex items-center">
          <ShieldAlert className="w-5 h-5 mr-2 text-blue-600" />
          Admin Panel
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="p-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
          Main
        </div>
        <div className="space-y-1">
          <NavLink
            to="/admin/dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? "flex items-center px-3 py-2 rounded bg-blue-50 text-blue-700 font-medium"
                : "flex items-center px-3 py-2 rounded hover:bg-gray-100 text-gray-700 transition-colors"
            }
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive
                ? "flex items-center px-3 py-2 rounded bg-blue-50 text-blue-700 font-medium"
                : "flex items-center px-3 py-2 rounded hover:bg-gray-100 text-gray-700 transition-colors"
            }
          >
            <Users className="w-5 h-5 mr-3" />
            Users
          </NavLink>

          <NavLink
            to="/admin/jobs"
            className={({ isActive }) =>
              isActive
                ? "flex items-center px-3 py-2 rounded bg-blue-50 text-blue-700 font-medium"
                : "flex items-center px-3 py-2 rounded hover:bg-gray-100 text-gray-700 transition-colors"
            }
          >
            <Briefcase className="w-5 h-5 mr-3" />
            Jobs
          </NavLink>

          <NavLink
            to="/admin/approvals"
            className={({ isActive }) =>
              isActive
                ? "flex items-center px-3 py-2 rounded bg-blue-50 text-blue-700 font-medium"
                : "flex items-center px-3 py-2 rounded hover:bg-gray-100 text-gray-700 transition-colors"
            }
          >
            <Building2 className="w-5 h-5 mr-3" />
            Business Applications
          </NavLink>

          <NavLink
            to="/admin/activities"
            className={({ isActive }) =>
              isActive
                ? "flex items-center px-3 py-2 rounded bg-blue-50 text-blue-700 font-medium"
                : "flex items-center px-3 py-2 rounded hover:bg-gray-100 text-gray-700 transition-colors"
            }
          >
            <Activity className="w-5 h-5 mr-3" />
            Activity Logs
          </NavLink>
        </div>
      </nav>

      {/* Admin Info */}
      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm font-medium">Admin Mode</div>
          <div className="text-xs text-gray-500">Full system access</div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
