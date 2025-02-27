import React from "react";
import { useUser } from "@clerk/clerk-react";
import BusinessHeader from "./Business/BusinessHeader";
import AdminHeader from "./Admin/AdminHeader";
import RegularHeader from "./RegularHeader";

const Header = () => {
  const { user } = useUser();

  // Determine user role from publicMetadata
  const userRole = user?.publicMetadata?.role || "user";

  // Render the appropriate header based on role
  if (userRole === "admin" || userRole === "Admin") {
    return <AdminHeader />;
  } else if (userRole === "business") {
    return <BusinessHeader />;
  } else {
    return <RegularHeader />;
  }
};

export default Header;
