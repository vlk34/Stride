import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useUser } from "@clerk/clerk-react";
import LoadingScreen from "../LoadingScreen";
import Header from "../Header";
import AdminSidebar from "./AdminSidebar";

const AdminRoute = () => {
  const { user, isLoaded } = useUser();
  const role = user?.publicMetadata?.role;
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="min-h-screen max-w-[96rem] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64 flex-shrink-0">
            <AdminSidebar />
          </aside>
          <main className="flex-1">
            {!isLoaded ? (
              <LoadingScreen />
            ) : role !== "Admin" ? (
              <Navigate to="/admin-unauthorized" replace />
            ) : (
              <Outlet />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminRoute;
