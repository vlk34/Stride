import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const AdminLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Keep your site-wide header at the top */}
      <Header />

      {/* Body area: flex container to hold sidebar + main content */}
      <div className="min-h-screen max-w-[96rem] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar on the left */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <AdminSidebar />
          </aside>

          {/* Main content area */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
