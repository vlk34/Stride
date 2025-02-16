import React from "react";
import { Plus } from "lucide-react";

const ExperienceList = ({ experiences, onAdd }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Experience</h2>
        <button
          onClick={onAdd}
          className="text-blue-600 text-sm hover:text-blue-700 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      <ul className="space-y-6">
        {experiences.map((exp, index) => (
          <li key={index} className="relative pl-4 border-l-2 border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {exp.role} @ {exp.company}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {exp.type} • {exp.duration}
                </p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">•••</button>
            </div>
            <p className="text-gray-600 text-sm mt-2">{exp.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceList;
