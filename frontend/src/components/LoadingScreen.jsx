import React from "react";

const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh]">
    <div className="mb-4">
      <div className="w-16 h-16 relative">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
    <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
    <p className="text-gray-500 mt-2">Please wait a moment</p>
  </div>
);

export default LoadingScreen;
