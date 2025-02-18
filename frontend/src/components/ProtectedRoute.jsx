import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {}, [isSignedIn]);

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
