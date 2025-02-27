import React, { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Outlet, useLocation } from "react-router";

const BusinessLayout = () => {
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
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BusinessLayout;
