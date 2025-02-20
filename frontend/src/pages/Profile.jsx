import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useClerk, useUser } from "@clerk/clerk-react";
import ProfileHeader from "../components/profileComponents/ProfileHeader";
import ProfileDetails from "../components/profileComponents/ProfileDetails";
import ProfileSidebar from "../components/profileComponents/ProfileSidebar";
import ExperienceList from "../components/profileComponents/ExperienceList";
import EducationList from "../components/profileComponents/EducationList";
import EditProfileModal from "../components/modals/EditProfileModal";
import AddExperienceModal from "../components/modals/AddExperienceModal";
import AddEducationModal from "../components/modals/AddEducationModal";
import SkillsList from "../components/profileComponents/SkillsList";
import { useUserData } from "../contexts/UserDataContext";
import { useUserQuery } from "../hooks/useUserQuery";

const Profile = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const { localUserData, setLocalUserData } = useUserData();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddExperienceOpen, setIsAddExperienceOpen] = useState(false);
  const [isAddEducationOpen, setIsAddEducationOpen] = useState(false);
  const [isEditExperienceOpen, setIsEditExperienceOpen] = useState(false);
  const [isEditEducationOpen, setIsEditEducationOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedExperienceIndex, setSelectedExperienceIndex] = useState(null);
  const [selectedEducationIndex, setSelectedEducationIndex] = useState(null);
  const {
    userData,
    isLoading,
    updateProfile,
    updateExperiences,
    updateEducation,
  } = useUserQuery();

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  // Initialize local state with query data
  useEffect(() => {
    if (userData) {
      setLocalUserData(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  const handleUpdateProfile = async (updatedData) => {
    const originalData = { ...localUserData };

    try {
      // Optimistic update
      setLocalUserData((prev) => ({
        ...prev,
        name: updatedData.name,
        role: updatedData.role,
        description: updatedData.description,
        about: updatedData.about,
      }));

      setIsEditProfileOpen(false);

      // Update in background
      await updateProfile({
        updates: {
          role: updatedData.role,
          description: updatedData.description,
          about: updatedData.about,
        },
        nameUpdate:
          updatedData.name !== userData.name ? updatedData.name : null,
      });
    } catch (error) {
      setLocalUserData(originalData);
      console.error("Error updating profile:", error);
    }
  };

  const handleAddExperience = async (newExperience) => {
    try {
      // Optimistic update for local state
      setLocalUserData((prev) => ({
        ...prev,
        experiences: [...prev.experiences, newExperience],
      }));
      setIsAddExperienceOpen(false);

      // Update using TanStack Query mutation
      await updateExperiences([...userData.experiences, newExperience]);
    } catch (error) {
      // Revert local state on error
      setLocalUserData((prev) => ({
        ...prev,
        experiences: userData.experiences,
      }));
      console.error("Error adding experience:", error);
    }
  };

  const handleEditExperience = async (updatedExperience, index) => {
    try {
      // Optimistic update using context
      setLocalUserData((prev) => ({
        ...prev,
        experiences: prev.experiences.map((exp, i) =>
          i === index ? updatedExperience : exp
        ),
      }));
      setIsEditExperienceOpen(false);

      // Actual update
      const currentExperiences = [...(user.unsafeMetadata?.experiences || [])];
      currentExperiences[index] = updatedExperience;
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          experiences: currentExperiences,
        },
      });
    } catch (error) {
      // Revert on error
      setLocalUserData((prev) => ({
        ...prev,
        experiences: user.unsafeMetadata?.experiences || [],
      }));
      console.error("Error updating experience:", error);
    }
  };

  const handleAddEducation = async (newEducation) => {
    try {
      // Optimistic update for local state
      setLocalUserData((prev) => ({
        ...prev,
        education: [...prev.education, newEducation],
      }));
      setIsAddEducationOpen(false);

      // Update using TanStack Query mutation
      await updateEducation([...userData.education, newEducation]);
    } catch (error) {
      // Revert local state on error
      setLocalUserData((prev) => ({
        ...prev,
        education: userData.education,
      }));
      console.error("Error adding education:", error);
    }
  };

  const handleEditEducation = async (updatedEducation, index) => {
    try {
      // Optimistic update using context
      setLocalUserData((prev) => ({
        ...prev,
        education: prev.education.map((edu, i) =>
          i === index ? updatedEducation : edu
        ),
      }));
      setIsEditEducationOpen(false);

      // Actual update
      const currentEducation = [...(user.unsafeMetadata?.education || [])];
      currentEducation[index] = updatedEducation;
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          education: currentEducation,
        },
      });
    } catch (error) {
      // Revert on error
      setLocalUserData((prev) => ({
        ...prev,
        education: user.unsafeMetadata?.education || [],
      }));
      console.error("Error updating education:", error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/signin");
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ProfileHeader
            role={localUserData?.role}
            description={localUserData?.description}
            onEditProfile={() => setIsEditProfileOpen(true)}
          />
          <div className="space-y-6">
            <ProfileDetails about={localUserData?.about} />
            <ExperienceList
              experiences={localUserData?.experiences || []}
              onAddExperience={() => setIsAddExperienceOpen(true)}
              onEditExperience={(exp, index) => {
                setSelectedExperience(exp);
                setSelectedExperienceIndex(index);
                setIsEditExperienceOpen(true);
              }}
            />
            <EducationList
              education={localUserData?.education || []}
              onAddEducation={() => setIsAddEducationOpen(true)}
              onEditEducation={(edu, index) => {
                setSelectedEducation(edu);
                setSelectedEducationIndex(index);
                setIsEditEducationOpen(true);
              }}
            />
            <SkillsList skills={localUserData?.skills || []} />
          </div>
        </div>
        <div className="hidden lg:block">
          <ProfileSidebar />
        </div>
      </div>

      <button
        onClick={handleSignOut}
        className="mt-8 px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors w-full sm:w-auto"
      >
        Logout
      </button>

      {/* Modals */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onUpdate={handleUpdateProfile}
        userData={localUserData}
      />
      <AddExperienceModal
        isOpen={isAddExperienceOpen}
        onClose={() => setIsAddExperienceOpen(false)}
        onAdd={handleAddExperience}
      />
      <AddExperienceModal
        isOpen={isEditExperienceOpen}
        onClose={() => {
          setIsEditExperienceOpen(false);
          setSelectedExperience(null);
          setSelectedExperienceIndex(null);
        }}
        experience={selectedExperience}
        experienceIndex={selectedExperienceIndex}
        onEdit={handleEditExperience}
      />
      <AddEducationModal
        isOpen={isAddEducationOpen}
        onClose={() => setIsAddEducationOpen(false)}
        onAdd={handleAddEducation}
      />
      <AddEducationModal
        isOpen={isEditEducationOpen}
        onClose={() => {
          setIsEditEducationOpen(false);
          setSelectedEducation(null);
          setSelectedEducationIndex(null);
        }}
        education={selectedEducation}
        educationIndex={selectedEducationIndex}
        onEdit={handleEditEducation}
      />
    </div>
  );
};

export default Profile;
