import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminSidebar from "../components/Admin/AdminSidebar"; // or wherever your sidebar lives

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div>
      {/* Keep your site-wide header at the top */}
      <Header />

      {/* Body area: flex container to hold sidebar + main content */}
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
          {/* Sidebar on the left */}
          <aside className="flex-shrink-0">
            <AdminSidebar />
          </aside>

          {/* Main content area */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Layout;
