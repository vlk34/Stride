import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useUser } from "@clerk/clerk-react";
import LoadingScreen from "../LoadingScreen";
import Header from "../Header";

const BusinessRoute = () => {
  const { user, isLoaded } = useUser();
  const role = user?.publicMetadata?.role;
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  if (!isLoaded) {
    return (
      <div>
        <Header />
        <div className="min-h-screen">
          <LoadingScreen />
        </div>
      </div>
    );
  }

  // Redirect admins to the admin business section
  if (role === "Admin") {
    return <Navigate to="/admin/business-unauthorized" replace />;
  }

  // Redirect unauthorized users
  if (role !== "business") {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BusinessRoute;
