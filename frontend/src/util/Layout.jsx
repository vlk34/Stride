import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
