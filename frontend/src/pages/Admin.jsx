import React, { useState } from "react";
// import { useClerk, useUser } from "@clerk/clerk-react";
// import { useNavigate } from "react-router";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminDashboard from "../components/Admin/AdminDashboard";

const Admin = () => {
    // If you are using Clerk:
    // const navigate = useNavigate();
    // const { signOut } = useClerk();
    // const { user, isLoaded } = useUser();

    // const handleSignOut = async () => {
    //   await signOut();
    //   navigate("/signin");
    // };

    const [someState, setSomeState] = useState("");

    // if (!isLoaded) return null; // for Clerk-based loading

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Center everything in a container */}
            <div className="flex w-full mx-auto px-5 py-8 gap-4">
                {/* Sidebar on the left */}
                <div className="flex-shrink-0">
                    <AdminSidebar />
                </div>

                {/* Main content area */}
                <div className="flex-1 space-y-6">

                    <AdminDashboard />

                    {/* Example sign-out button if using Clerk */}
                    {/*
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-red-600 bg-red-50 rounded hover:bg-red-100"
          >
            Logout
          </button>
          */}
                </div>
            </div>
        </div>
    );
};

export default Admin;
