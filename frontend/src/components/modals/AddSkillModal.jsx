import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const AddSkillModal = ({ isOpen, onClose, onAdd }) => {
  const { user } = useUser();
  const modalRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestedSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "TypeScript",
    "HTML",
    "CSS",
    "SQL",
    "MongoDB",
    "AWS",
    "Docker",
  ].filter(
    (skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
      searchTerm.length > 0
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();
    if (searchTerm.trim()) {
      await onAdd(searchTerm.trim());
      setSearchTerm("");
      setShowSuggestions(false);
    }
  };

  const handleSkillSelect = (skill) => {
    setSearchTerm(skill);
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleInputFocus = () => {
    if (searchTerm.length > 0) {
      setShowSuggestions(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl font-semibold">Add Skill</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                placeholder="Type a skill..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                autoFocus
              />

              {/* Suggestions dropdown */}
              {showSuggestions && suggestedSkills.length > 0 && (
                <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
                  {suggestedSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillSelect(skill)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Add Skill
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSkillModal;
