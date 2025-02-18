import React, { useState } from "react";
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

const Profile = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddExperienceOpen, setIsAddExperienceOpen] = useState(false);
  const [isAddEducationOpen, setIsAddEducationOpen] = useState(false);
  const [isEditExperienceOpen, setIsEditExperienceOpen] = useState(false);
  const [isEditEducationOpen, setIsEditEducationOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedExperienceIndex, setSelectedExperienceIndex] = useState(null);
  const [selectedEducationIndex, setSelectedEducationIndex] = useState(null);

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  // Extract user data from Clerk
  const userData = {
    name: user.fullName,
    role: user.unsafeMetadata?.role || "No role set",
    description: user.unsafeMetadata?.description || "No description set",
    about: user.unsafeMetadata?.about || "No about information set",
    experiences: user.unsafeMetadata?.experiences || [],
    education: user.unsafeMetadata?.education || [],
    imageUrl: user.imageUrl,
    email: user.primaryEmailAddress?.emailAddress,
  };

  const handleUpdateProfile = async (updatedData) => {
    try {
      await user.update({
        publicMetadata: {
          ...user.publicMetadata,
          role: updatedData.role,
          description: updatedData.description,
          about: updatedData.about,
        },
      });
      setIsEditProfileOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleAddExperience = async (newExperience) => {
    try {
      const currentExperiences = [...(user.unsafeMetadata?.experiences || [])];
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          experiences: [...currentExperiences, newExperience],
        },
      });
    } catch (error) {
      console.error("Error adding experience:", error);
    }
  };

  const handleEditExperience = async (updatedExperience, index) => {
    try {
      const currentExperiences = [...(user.unsafeMetadata?.experiences || [])];
      currentExperiences[index] = updatedExperience;
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          experiences: currentExperiences,
        },
      });
    } catch (error) {
      console.error("Error updating experience:", error);
    }
  };

  const handleAddEducation = async (newEducation) => {
    try {
      const currentEducation = [...(user.unsafeMetadata?.education || [])];
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          education: [...currentEducation, newEducation],
        },
      });
    } catch (error) {
      console.error("Error adding education:", error);
    }
  };

  const handleEditEducation = async (updatedEducation, index) => {
    try {
      const currentEducation = [...(user.unsafeMetadata?.education || [])];
      currentEducation[index] = updatedEducation;
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          education: currentEducation,
        },
      });
    } catch (error) {
      console.error("Error updating education:", error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/signin");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ProfileHeader
            user={userData}
            onEditProfile={() => setIsEditProfileOpen(true)}
          />
          <ProfileDetails about={userData.about} />
          <ExperienceList
            experiences={userData.experiences}
            onAddExperience={() => setIsAddExperienceOpen(true)}
            onEditExperience={(exp, index) => {
              setSelectedExperience(exp);
              setSelectedExperienceIndex(index);
              setIsEditExperienceOpen(true);
            }}
          />
          <EducationList
            education={userData.education}
            onAddEducation={() => setIsAddEducationOpen(true)}
            onEditEducation={(edu, index) => {
              setSelectedEducation(edu);
              setSelectedEducationIndex(index);
              setIsEditEducationOpen(true);
            }}
          />
        </div>
        <ProfileSidebar />
      </div>

      <button
        onClick={handleSignOut}
        className="mt-8 px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
      >
        Logout
      </button>

      {/* Modals */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onSave={handleUpdateProfile}
        userData={userData}
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
