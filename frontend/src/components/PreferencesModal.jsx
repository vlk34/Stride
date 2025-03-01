import React, { useState } from "react";
import { X, Save, Briefcase, MapPin, Award, Building2 } from "lucide-react";

const PreferencesModal = ({ onClose }) => {
  const [preferences, setPreferences] = useState({
    jobTypes: ["Full-time"],
    locations: ["Remote", "Hybrid"],
    experienceLevels: ["Entry Level", "Mid Level"],
    industries: [],
    skills: [],
  });

  const handleJobTypeToggle = (type) => {
    setPreferences((prev) => {
      const updated = [...prev.jobTypes];
      const index = updated.indexOf(type);

      if (index === -1) {
        updated.push(type);
      } else {
        updated.splice(index, 1);
      }

      return { ...prev, jobTypes: updated };
    });
  };

  const handleLocationToggle = (location) => {
    setPreferences((prev) => {
      const updated = [...prev.locations];
      const index = updated.indexOf(location);

      if (index === -1) {
        updated.push(location);
      } else {
        updated.splice(index, 1);
      }

      return { ...prev, locations: updated };
    });
  };

  const handleExperienceToggle = (level) => {
    setPreferences((prev) => {
      const updated = [...prev.experienceLevels];
      const index = updated.indexOf(level);

      if (index === -1) {
        updated.push(level);
      } else {
        updated.splice(index, 1);
      }

      return { ...prev, experienceLevels: updated };
    });
  };

  const handleSkillAdd = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setPreferences((prev) => ({
        ...prev,
        skills: [...prev.skills, e.target.value.trim()],
      }));
      e.target.value = "";
    }
  };

  const handleSkillRemove = (skill) => {
    setPreferences((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleIndustryToggle = (industry) => {
    setPreferences((prev) => {
      const updated = [...prev.industries];
      const index = updated.indexOf(industry);

      if (index === -1) {
        updated.push(industry);
      } else {
        updated.splice(index, 1);
      }

      return { ...prev, industries: updated };
    });
  };

  const handleSave = () => {
    // In a real app, this would save to user profile or API
    console.log("Saving preferences:", preferences);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Job Preferences</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Job Types */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Job Types</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                "Full-time",
                "Part-time",
                "Contract",
                "Internship",
                "Remote",
              ].map((type) => (
                <button
                  key={type}
                  onClick={() => handleJobTypeToggle(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    preferences.jobTypes.includes(type)
                      ? "bg-blue-100 text-blue-700 border border-blue-300"
                      : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Locations</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Remote", "Hybrid", "On-site"].map((location) => (
                <button
                  key={location}
                  onClick={() => handleLocationToggle(location)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    preferences.locations.includes(location)
                      ? "bg-blue-100 text-blue-700 border border-blue-300"
                      : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Add specific location (city, state, country)"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Experience Level
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Entry Level", "Mid Level", "Senior", "Executive"].map(
                (level) => (
                  <button
                    key={level}
                    onClick={() => handleExperienceToggle(level)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      preferences.experienceLevels.includes(level)
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    {level}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Industries */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Industries
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                "Technology",
                "Healthcare",
                "Finance",
                "Education",
                "Manufacturing",
                "Retail",
              ].map((industry) => (
                <button
                  key={industry}
                  onClick={() => handleIndustryToggle(industry)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    preferences.industries.includes(industry)
                      ? "bg-blue-100 text-blue-700 border border-blue-300"
                      : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Add a skill and press Enter"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={handleSkillAdd}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {preferences.skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                >
                  {skill}
                  <button
                    onClick={() => handleSkillRemove(skill)}
                    className="text-blue-700 hover:text-blue-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white p-6 border-t border-gray-200 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesModal;
