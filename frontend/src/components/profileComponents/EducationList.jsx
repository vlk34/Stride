import React from "react";
import { Plus } from "lucide-react";

const EducationList = ({ education, onAdd }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Education</h2>
        <button
          onClick={onAdd}
          className="text-blue-600 text-sm hover:text-blue-700 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      <ul className="space-y-6">
        {education.map((edu, index) => (
          <li key={index} className="relative pl-4 border-l-2 border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {edu.degree}, {edu.duration}
                </p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">•••</button>
            </div>
            {edu.description && (
              <p className="text-gray-600 text-sm mt-2">{edu.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducationList;
