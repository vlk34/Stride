import React from "react";
import { Pencil, MoreHorizontal } from "lucide-react";

const ProfileHeader = ({ user, onEditProfile }) => {
  const { name, role, description, imageUrl } = user;

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200">
      {/* Banner background */}
      <div className="relative h-32 overflow-hidden rounded-t-lg">
        <div className="absolute inset-0 bg-blue-600" />
      </div>

      {/* Profile content */}
      <div className="px-6 -mt-16 pb-6 relative">
        {/* Avatar */}
        <div className="inline-block">
          <div className="w-24 h-24 rounded-full bg-white p-1 shadow">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>{" "}
                {/* Placeholder text */}
              </div>
            )}
          </div>
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
