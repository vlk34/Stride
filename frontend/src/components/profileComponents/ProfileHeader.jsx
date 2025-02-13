import React from 'react';
import photo from "../../../assets/photo.jpg";

function ProfileHeader() {
  return (
    <div className="w-full bg-white">
      {/* Abstract geometric background */}
      <div className="relative h-32 overflow-hidden">
        <div className="absolute inset-0 bg-blue-500">
          
        </div>
      </div>

      {/* Profile section */}
      <div className="px-4 -mt-16 relative">
        {/* Avatar */}
        <div className="inline-block">
          <div className="w-24 h-24 rounded-full bg-white p-1">
            <img
              src={photo}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* Content container */}
        <div className="mt-4">
          {/* Header row with name and buttons */}
          <div className="flex justify-between items-start">
            <h1 className="text-xl font-semibold flex items-center gap-1">
              Volkan Erdoğan
            </h1>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg text-blue-600">
                Change Profile
              </button>
              <button className="p-2 text-gray-600 border border-gray-200 rounded-lg">
                •••
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-sm mt-2">
            Frontend Builder with a passion for design innovation and a proven record of success in increasing user engagement for a variety of projects.
          </p>

          {/* Stats row */}
          <div className="flex gap-6 mt-4 mb-4 text-sm">
            <div className="flex items-center">
              <span className="text-orange-400 mr-1">★</span>
              <span>4.3 Trusted</span>
            </div>
            <div className="text-gray-600">
              23 Applicants
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;