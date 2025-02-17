import React, { useState } from "react";
import { useNavigate } from "react-router";
import ProfileHeader from "../components/profileComponents/ProfileHeader";
import ProfileDetails from "../components/profileComponents/ProfileDetails";
import ProfileSidebar from "../components/profileComponents/ProfileSidebar";
import ExperienceList from "../components/profileComponents/ExperienceList";
import EducationList from "../components/profileComponents/EducationList";
import EditProfileModal from "../components/modals/EditProfileModal";
import AddExperienceModal from "../components/modals/AddExperienceModal";
import AddEducationModal from "../components/modals/AddEducationModal";
import twitter from "../../assets/twitter.png";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddExperienceOpen, setIsAddExperienceOpen] = useState(false);
  const [isAddEducationOpen, setIsAddEducationOpen] = useState(false);

  // This would typically come from your API or state management
  const [userData, setUserData] = useState({
    name: "Volkan Erdoğan",
    role: "Frontend Builder",
    description: "Frontend Builder with a passion for design innovation...",
    about: "I am a dynamic and results-driven professional...",
    experiences: [
      {
        role: "Lead Product Designer",
        company: "Airbnb",
        type: "Full-time",
        duration: "Jan 2020 - Present • 4 years 3 months",
        description: "Led the design team in creating innovative solutions...",
        imageUrl: twitter,
      },
      {
        role: "Product Designer",
        company: "Google",
        type: "Full-time",
        duration: "Aug 2019 - Jan 2020 • 6 months",
        description: "Designed user interfaces for Google's core products...",
        imageUrl: twitter,
      }
    ],
    education: [
      {
        school: "University of Pennsylvania",
        degree: "Bachelor of Computer Science",
        duration: "Sep 2015 - Jul 2019",
        description: "Focused on Human-Computer Interaction and UI/UX Design",
      },
    ],
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const calculateDuration = (startDate, endDate, isCurrent) => {
    const start = new Date(startDate);
    const end = isCurrent ? new Date() : new Date(endDate);

    const yearDiff = end.getFullYear() - start.getFullYear();
    const monthDiff = end.getMonth() - start.getMonth();

    let totalMonths = yearDiff * 12 + monthDiff;
    if (end.getDate() < start.getDate()) {
      totalMonths--;
    }

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    let durationText = "";
    if (years > 0) {
      durationText += `${years} ${years === 1 ? "year" : "years"}`;
      if (months > 0) {
        durationText += ` ${months} ${months === 1 ? "month" : "months"}`;
      }
    } else if (months > 0) {
      durationText += `${months} ${months === 1 ? "month" : "months"}`;
    } else {
      durationText = "Less than a month";
    }

    return durationText;
  };

  const handleProfileUpdate = (updatedData) => {
    setUserData({ ...userData, ...updatedData });
  };

  const handleAddExperience = (newExperience) => {
    const duration = calculateDuration(
      newExperience.startDate,
      newExperience.endDate,
      newExperience.current
    );

    const formattedExperience = {
      ...newExperience,
      duration: newExperience.current
        ? `${formatDate(newExperience.startDate)} - Present • ${duration}`
        : `${formatDate(newExperience.startDate)} - ${formatDate(
            newExperience.endDate
          )} • ${duration}`,
    };

    setUserData({
      ...userData,
      experiences: [...userData.experiences, formattedExperience],
    });
  };

  const handleAddEducation = (newEducation) => {
    const formattedEducation = {
      ...newEducation,
      duration: newEducation.current
        ? `${formatDate(newEducation.startDate)} - Present`
        : `${formatDate(newEducation.startDate)} - ${formatDate(
            newEducation.endDate
          )}`,
    };

    setUserData({
      ...userData,
      education: [...userData.education, formattedEducation],
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ProfileHeader
            user={userData}
            onEdit={() => setIsEditProfileOpen(true)}
          />
          <ProfileDetails about={userData.about} />
          <ExperienceList
            experiences={userData.experiences}
            onAdd={() => setIsAddExperienceOpen(true)}
          />
          <EducationList
            education={userData.education}
            onAdd={() => setIsAddEducationOpen(true)}
          />
        </div>
        <ProfileSidebar />
      </div>

      <button
        onClick={() => navigate("/signin")}
        className="mt-8 px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
      >
        Logout
      </button>

      {/* Modals */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        userData={userData}
        onSave={handleProfileUpdate}
      />
      <AddExperienceModal
        isOpen={isAddExperienceOpen}
        onClose={() => setIsAddExperienceOpen(false)}
        onSave={handleAddExperience}
      />
      <AddEducationModal
        isOpen={isAddEducationOpen}
        onClose={() => setIsAddEducationOpen(false)}
        onSave={handleAddEducation}
      />
    </div>
  );
};

export default Profile;
