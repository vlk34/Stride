import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";

const BusinessRoute = () => {
  const { user, isLoaded } = useUser();
  console.log(user?.publicMetadata?.role);
  if (!isLoaded) {
    return null;
  }

  if (user?.publicMetadata?.role !== "business") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default BusinessRoute;
