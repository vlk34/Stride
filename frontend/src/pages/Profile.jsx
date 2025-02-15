import React from "react";
import { useNavigate } from "react-router";
import ProfileHeader from "../components/profileComponents/ProfileHeader";
import ProfileDetails from "../components/profileComponents/ProfileDetails";
import ProfileSidebar from "../components/profileComponents/ProfileSidebar";
import ExperienceList from "../components/profileComponents/ExperienceList";
import EducationList from "../components/profileComponents/EducationList";

const Profile = () => {
  const navigate = useNavigate();

  // This would typically come from your API or state management
  const userData = {
    name: "Volkan Erdoğan",
    role: "Frontend Builder",
    rating: 4.3,
    applicants: 23,
    description:
      "Frontend Builder with a passion for design innovation and a proven record of success in increasing user engagement for a variety of projects.",
    about:
      "I am a dynamic and results-driven professional with a passion for design innovation...",
    experiences: [
      {
        role: "Lead Product Designer",
        company: "Airbnb",
        type: "Full-time",
        duration: "2020 - Present",
        description: "Led the design team in creating innovative solutions...",
      },
      // ... more experiences
    ],
    education: [
      {
        school: "University of Pennsylvania",
        degree: "Bachelor of Computer Science",
        duration: "Jun 2015 - Jul 2019",
        description: "Focused on Human-Computer Interaction and UI/UX Design",
      },
      // ... more education
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ProfileHeader user={userData} />
          <ProfileDetails about={userData.about} />
          <ExperienceList experiences={userData.experiences} />
          <EducationList education={userData.education} />
        </div>
        <ProfileSidebar />
      </div>

      <button
        onClick={() => navigate("/signin")}
        className="mt-8 px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
