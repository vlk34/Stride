import React, { useState, useEffect, useRef } from "react";
import { Plus, MoreVertical } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import formatDate from "../../util/formatDate";

const EducationList = ({ education, onAddEducation, onEditEducation }) => {
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
      const currentEducation = [...(user.unsafeMetadata?.education || [])];
      currentEducation.splice(index, 1);

      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          education: currentEducation,
        },
      });
    } catch (error) {
      console.error("Error deleting education:", error);
    }
    setActiveDropdown(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Education</h2>
        <button
          onClick={() => onAddEducation()}
          className="text-blue-600 text-sm hover:text-blue-700 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="pl-4 py-3 text-gray-500 border-l-2 border-gray-200">
          <p>No education added yet.</p>
        </div>
      ) : (
        <ul className="space-y-6">
          {education.map((edu, index) => (
            <li
              key={index}
              className="relative pl-4 border-l-2 border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {edu.degree} in {edu.field} • {formatDate(edu.startDate)} -{" "}
                    {edu.current ? "Present" : formatDate(edu.endDate)}
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
                          onEditEducation(edu, index);
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
              {edu.description && (
                <p className="text-gray-600 text-sm mt-2">{edu.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EducationList;
