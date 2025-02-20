import React from "react";

const ProfileDetails = ({ about }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">About</h2>
      <p className="text-gray-600 leading-relaxed">{about}</p>
    </div>
  );
};

export default ProfileDetails;
