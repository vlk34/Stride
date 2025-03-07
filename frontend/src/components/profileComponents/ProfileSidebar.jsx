import React from "react";
import { Briefcase, BookOpen, Award } from "lucide-react";
import { useNavigate } from "react-router";

function ProfileSidebar() {
  const navigate = useNavigate();

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
          <span className="text-blue-600 font-semibold">75%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div className="bg-blue-600 h-2.5 rounded-full w-3/4"></div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Award className="w-4 h-4 text-green-500" />
            <span className="text-gray-600">Add your skills</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="w-4 h-4 text-green-500" />
            <span className="text-gray-600">Complete education details</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Add work experience</span>
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
