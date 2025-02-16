import React from "react";
import twitter from "../../../assets/twitter.png";

const CompanyHeader = ({ company }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow">
      {/* Banner background */}
      <div className="relative h-32 overflow-hidden rounded-t-lg">
        <div className="absolute inset-0 bg-blue-600" />
      </div>

      {/* Company content */}
      <div className="px-6 -mt-16 pb-6 relative">
        {/* Logo */}
        <div className="inline-block">
          <div className="w-24 h-24 rounded-lg bg-white p-2 shadow">
            <img
              src={twitter}
              alt={company.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold">{company.name}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span>{company.industry}</span>
                <span>•</span>
                <span>{company.size}</span>
                <span>•</span>
                <span>{company.headquarters}</span>
              </div>
            </div>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Follow Company
            </button>
          </div>

          <p className="text-gray-600 mt-4">{company.description}</p>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {company.openPositions.length}
              </span>
              <span className="text-sm text-gray-500">Open positions</span>
            </div>
            <span className="text-gray-300">|</span>
            <a
              href={`https://${company.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              {company.website}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;
