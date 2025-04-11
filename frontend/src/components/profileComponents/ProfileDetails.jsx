import React from "react";

const ProfileDetails = ({ about }) => {
  // Check if the about text is a placeholder
  const isPlaceholder = (value, placeholder) => {
    return !value || value === placeholder;
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">About</h2>
      <p className="text-gray-600 leading-relaxed">
        {isPlaceholder(about, "No about information set") ? (
          <span className="text-gray-400">No about information set</span>
        ) : (
          about
        )}
      </p>
    </div>
  );
};

export default ProfileDetails;
