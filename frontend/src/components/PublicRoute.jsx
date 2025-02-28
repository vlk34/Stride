import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { useUser } from "@clerk/clerk-react";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";
import Footer from "./Footer";

const PublicRoute = ({ hasFooter = true }) => {
  const { isLoaded } = useUser();
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
        <main>{!isLoaded ? <LoadingScreen /> : <Outlet />}</main>
      </div>
      {hasFooter && <Footer />}
    </div>
  );
};

export default PublicRoute;
