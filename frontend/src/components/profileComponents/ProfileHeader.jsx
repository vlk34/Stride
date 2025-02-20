import React, { useRef } from "react";
import { Pencil, MoreHorizontal, Camera } from "lucide-react";
import { useUserQuery } from "../../hooks/useUserQuery";
import { useUserData } from "../../contexts/UserDataContext";

const ProfileHeader = ({ user, onEditProfile }) => {
  const { name, role, description, imageUrl } = user;
  const { updateImage } = useUserQuery();
  const { setLocalUserData } = useUserData();
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Optimistic update
      const tempUrl = URL.createObjectURL(file);
      setLocalUserData((prev) => ({
        ...prev,
        imageUrl: tempUrl,
      }));

      // Update image using TanStack Query mutation
      await updateImage(file);
    } catch (error) {
      console.error("Error updating profile image:", error);
      // The mutation will handle reverting the optimistic update
    }
  };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200">
      {/* Banner background */}
      <div className="relative h-32 overflow-hidden rounded-t-lg">
        <div className="absolute inset-0 bg-blue-600" />
      </div>

      {/* Profile content */}
      <div className="px-6 -mt-16 pb-6 relative">
        {/* Avatar with edit overlay */}
        <div className="inline-block relative group">
          <div
            className="w-24 h-24 rounded-full bg-white p-1 shadow cursor-pointer"
            onClick={handleImageClick}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            {/* Edit overlay */}
            <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div className="mt-4">
          {/* Header with name and actions */}
          <div className="flex justify-between items-start">
            <h1 className="text-xl font-semibold">{name}</h1>
            <div className="flex gap-2">
              <button
                onClick={onEditProfile}
                className="px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2"
              >
                <Pencil className="w-4 h-4" />
                Edit Profile
              </button>
              <button className="p-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Role and description */}
          <p className="text-gray-600 mt-1">{role}</p>
          <p className="text-gray-500 text-sm mt-3">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
