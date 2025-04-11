import React from "react";
import { Briefcase, BookOpen, Award, UserCircle, FileText } from "lucide-react";
import { useNavigate } from "react-router";
import { useUserData } from "../../contexts/UserDataContext";

function ProfileSidebar() {
  const navigate = useNavigate();
  const { localUserData } = useUserData();

  // Helper function to check if a field has real data
  const hasRealData = (value, placeholderTexts = []) => {
    if (!value) return false;
    if (typeof value !== "string") return true;

    // List of common placeholder texts
    const allPlaceholders = [
      "No role set",
      "No description set",
      "No about information set",
      ...placeholderTexts,
    ];

    // Check if the value matches any placeholder
    return !allPlaceholders.some(
      (placeholder) =>
        value.toLowerCase().trim() === placeholder.toLowerCase().trim()
    );
  };

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    // Define required fields with specific criteria
    const requiredFields = [
      // Role - must be set and not a placeholder
      {
        name: "role",
        check: () => hasRealData(localUserData?.role),
      },

      // Description - must be set and not a placeholder
      {
        name: "description",
        check: () => hasRealData(localUserData?.description),
      },

      // About - must be set and not a placeholder
      {
        name: "about",
        check: () => hasRealData(localUserData?.about),
      },

      // Experiences - must have at least one valid experience
      {
        name: "experiences",
        check: () =>
          Array.isArray(localUserData?.experiences) &&
          localUserData.experiences.length > 0,
      },

      // Education - must have at least one valid education
      {
        name: "education",
        check: () =>
          Array.isArray(localUserData?.education) &&
          localUserData.education.length > 0,
      },

      // Skills - must have at least one skill
      {
        name: "skills",
        check: () =>
          Array.isArray(localUserData?.skills) &&
          localUserData.skills.length > 0,
      },
    ];

    // Get completed items count
    const completedItems = requiredFields.filter((field) =>
      field.check()
    ).length;

    // Calculate percentage
    return Math.round((completedItems / requiredFields.length) * 100);
  };

  const completionPercentage = calculateProfileCompletion();

  // Check each section specifically excluding placeholders
  const hasRole = hasRealData(localUserData?.role);
  const hasDescription = hasRealData(localUserData?.description);
  const hasAbout = hasRealData(localUserData?.about);
  const hasExperiences =
    Array.isArray(localUserData?.experiences) &&
    localUserData.experiences.length > 0;
  const hasEducation =
    Array.isArray(localUserData?.education) &&
    localUserData.education.length > 0;
  const hasSkills =
    Array.isArray(localUserData?.skills) && localUserData.skills.length > 0;

  // Log the actual data and checks for debugging
  console.log("Profile completion data:", {
    role: localUserData?.role,
    hasRole,
    description: localUserData?.description,
    hasDescription,
    about: localUserData?.about,
    hasAbout,
    experiences: localUserData?.experiences?.length || 0,
    hasExperiences,
    education: localUserData?.education?.length || 0,
    hasEducation,
    skills: localUserData?.skills?.length || 0,
    hasSkills,
    completionPercentage,
  });

  // Sample job recommendations
  const recommendedJobs = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      postedDays: 2,
    },
    {
      title: "UX Designer",
      company: "DesignHub",
      location: "San Francisco",
      postedDays: 3,
    },
    {
      title: "Product Manager",
      company: "InnovateTech",
      location: "New York",
      postedDays: 1,
    },
    {
      title: "Full Stack Engineer",
      company: "CodeWorks",
      location: "Austin",
      postedDays: 5,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Completion */}
      <div className="bg-white rounded-lg p-5 border border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Profile Completion</h3>
          <span
            className={`font-semibold ${
              completionPercentage === 100 ? "text-green-600" : "text-blue-600"
            }`}
          >
            {completionPercentage}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className={`h-2.5 rounded-full ${
              completionPercentage === 100 ? "bg-green-600" : "bg-blue-600"
            }`}
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <UserCircle
              className={`w-4 h-4 ${
                hasRole ? "text-green-500" : "text-gray-400"
              }`}
            />
            <span className="text-gray-600">
              {hasRole ? "Role added" : "Add your professional role"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <UserCircle
              className={`w-4 h-4 ${
                hasDescription ? "text-green-500" : "text-gray-400"
              }`}
            />
            <span className="text-gray-600">
              {hasDescription ? "Description added" : "Add a short description"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <FileText
              className={`w-4 h-4 ${
                hasAbout ? "text-green-500" : "text-gray-400"
              }`}
            />
            <span className="text-gray-600">
              {hasAbout ? "About section completed" : "Add about section"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Briefcase
              className={`w-4 h-4 ${
                hasExperiences ? "text-green-500" : "text-gray-400"
              }`}
            />
            <span className="text-gray-600">
              {hasExperiences ? "Work experience added" : "Add work experience"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <BookOpen
              className={`w-4 h-4 ${
                hasEducation ? "text-green-500" : "text-gray-400"
              }`}
            />
            <span className="text-gray-600">
              {hasEducation
                ? "Education details completed"
                : "Add education details"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Award
              className={`w-4 h-4 ${
                hasSkills ? "text-green-500" : "text-gray-400"
              }`}
            />
            <span className="text-gray-600">
              {hasSkills ? "Skills added" : "Add your skills"}
            </span>
          </div>
        </div>
      </div>

      {/* Job Recommendations */}
      <div className="bg-white rounded-lg p-5 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Recommended Jobs</h3>
          <button
            onClick={() => navigate("/recommended-jobs")}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            View all
          </button>
        </div>

        <div className="space-y-4">
          {recommendedJobs.map((job, index) => (
            <div
              key={index}
              className="border-b border-gray-100 pb-3 last:border-0 last:pb-0 hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
              onClick={() => navigate("/result")}
            >
              <h4 className="font-medium text-gray-900">{job.title}</h4>
              <div className="text-sm text-gray-600 mt-1">
                {job.company} • {job.location}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Posted {job.postedDays} days ago
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileSidebar;
