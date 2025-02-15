import React from "react";
import photo from "../../../assets/photo.jpg";

const ProfileHeader = ({ user }) => {
  const { name, role, rating, applicants, description } = user;

  return (
    <div className="w-full bg-white rounded-lg shadow">
      {/* Banner background */}
      <div className="relative h-32 overflow-hidden rounded-t-lg">
        <div className="absolute inset-0 bg-blue-600" />
      </div>

      {/* Profile content */}
      <div className="px-6 -mt-16 pb-6 relative">
        {/* Avatar */}
        <div className="inline-block">
          <div className="w-24 h-24 rounded-full bg-white p-1 shadow">
            <img
              src={photo}
              alt={name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        <div className="mt-4">
          {/* Header with name and actions */}
          <div className="flex justify-between items-start">
            <h1 className="text-xl font-semibold">{name}</h1>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                Edit Profile
              </button>
              <button className="p-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
                •••
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
