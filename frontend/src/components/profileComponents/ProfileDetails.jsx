import React from "react";

const ProfileDetails = ({ about }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">About</h2>
      <p className="text-gray-600 leading-relaxed">{about}</p>
    </div>
  );
};

export default ProfileDetails;
