import React from "react";
import { useNavigate } from "react-router";
import ProfileHeader from "../components/profileComponents/ProfileHeader";
import ProfileDetails from "../components/profileComponents/ProfileDetails";
import ProfileSidebar from "../components/profileComponents/ProfileSidebar";
import ExperienceList from "../components/profileComponents/ExperienceList";
import EducationList from "../components/profileComponents/EducationList";



function Profile() {
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Two-column layout on large screens; single-column on smaller ones */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left (main) column */}
          <div className="lg:col-span-2 space-y-6">
            <ProfileHeader />
            <ProfileDetails />
            <ExperienceList />
            <EducationList />
          </div>

          {/* Right (sidebar) column */}
          <ProfileSidebar />
        </div>

        {/* Example logout button at bottom */}
        <button
          onClick={() => navigate("/signin")}
          className="mt-4 bg-red-200 px-4 py-1 rounded-md hover:bg-red-300 transition-all"
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default Profile;
