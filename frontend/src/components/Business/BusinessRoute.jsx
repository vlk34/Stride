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

  return (
    <div>
      <Header />
      <div className="min-h-screen">
        <main>
          {!isLoaded ? (
            <LoadingScreen />
          ) : role !== "business" ? (
            <Navigate to="/unauthorized" replace />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default BusinessRoute;
