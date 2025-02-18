import React, { useState, useEffect, useRef } from "react";
import { Plus, MoreVertical } from "lucide-react";
import formatDate from "../../util/formatDate";
import { useUser } from "@clerk/clerk-react";

const ExperienceList = ({ experiences, onAddExperience, onEditExperience }) => {
  const { user } = useUser();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = async (index) => {
    try {
      const currentExperiences = [...(user.unsafeMetadata?.experiences || [])];
      currentExperiences.splice(index, 1);

      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          experiences: currentExperiences,
        },
      });
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
    setActiveDropdown(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Experience</h2>
        <button
          onClick={() => onAddExperience()}
          className="text-blue-600 text-sm hover:text-blue-700 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="pl-4 py-3 text-gray-500 border-l-2 border-gray-200">
          <p>No experience added yet.</p>
        </div>
      ) : (
        <ul className="space-y-6">
          {experiences.map((exp, index) => (
            <li
              key={index}
              className="relative pl-4 border-l-2 border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {exp.role} @ {exp.company}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {exp.type} • {formatDate(exp.startDate)} -{" "}
                    {exp.current ? "Present" : formatDate(exp.endDate)}
                  </p>
                </div>
                <div
                  className="relative"
                  ref={activeDropdown === index ? dropdownRef : null}
                >
                  <button
                    onClick={() =>
                      setActiveDropdown(activeDropdown === index ? null : index)
                    }
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  {activeDropdown === index && (
                    <div className="absolute right-0 mt-1 py-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <button
                        onClick={() => {
                          onEditExperience(exp, index);
                          setActiveDropdown(null);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-2">{exp.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExperienceList;
