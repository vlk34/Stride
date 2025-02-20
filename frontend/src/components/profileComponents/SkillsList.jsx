import React, { useState, useEffect, useRef } from "react";
import { Plus, MoreVertical } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useUserData } from "../../contexts/UserDataContext";
import { useUserQuery } from "../../hooks/useUserQuery";
import AddSkillModal from "../modals/AddSkillModal";

const SkillsList = ({ skills }) => {
  const { user } = useUser();
  const { setLocalUserData } = useUserData();
  const { updateSkills, userData } = useUserQuery();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
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
      // Optimistic update using context
      setLocalUserData((prev) => ({
        ...prev,
        skills: prev.skills.filter((_, i) => i !== index),
      }));
      setActiveDropdown(null);

      // Update using TanStack Query mutation
      const newSkills = userData.skills.filter((_, i) => i !== index);
      await updateSkills(newSkills);
    } catch (error) {
      // Revert on error
      setLocalUserData((prev) => ({
        ...prev,
        skills: userData.skills,
      }));
      console.error("Error deleting skill:", error);
    }
  };

  const handleAddSkill = async (newSkill) => {
    try {
      // Optimistic update using context
      setLocalUserData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));

      // Update using TanStack Query mutation
      await updateSkills([...userData.skills, newSkill]);
    } catch (error) {
      // Revert on error
      setLocalUserData((prev) => ({
        ...prev,
        skills: userData.skills,
      }));
      console.error("Error adding skill:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        <button
          onClick={() => setIsAddSkillModalOpen(true)}
          className="text-blue-600 text-sm hover:text-blue-700 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      {skills.length === 0 ? (
        <div className="pl-4 py-3 text-gray-500 border-l-2 border-gray-200">
          <p>No skills added yet.</p>
        </div>
      ) : (
        <ul className="space-y-6">
          {skills.map((skill, index) => (
            <li
              key={index}
              className="relative pl-4 border-l-2 border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{skill}</h3>
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
                        onClick={() => handleDelete(index)}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <AddSkillModal
        isOpen={isAddSkillModalOpen}
        onClose={() => setIsAddSkillModalOpen(false)}
        onAdd={handleAddSkill}
      />
    </div>
  );
};

export default SkillsList;
