import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Building2,
  Clock,
  Calendar,
  Users,
  Save,
  Trash2,
  AlertCircle,
  Home,
  GraduationCap,
  CheckCircle,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router";

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    // Basic Info
    title: "",
    company: "",
    department: "",
    location: "",
    locationType: "", // remote, hybrid, on-site
    employmentType: "", // full-time, part-time, contract

    // Requirements
    experience: "",
    education: "",
    skills: [],
    languages: [],

    // Description
    description: "",
    responsibilities: "",
    qualifications: "",

    // Additional Info
    applicationDeadline: "",
    startDate: "",
    numberOfOpenings: "",

    // Status
    status: "Active",

    // For display only
    applicants: 0,
    posted: "",
  });

  // Dummy data - in a real app, you would fetch this from your API
  useEffect(() => {
    // Simulate API call to get job details
    setTimeout(() => {
      // This would be replaced with actual API call
      const jobData = {
        id: jobId,
        title: "Senior Frontend Developer",
        company: "Acme Corporation",
        department: "Engineering",
        location: "San Francisco, CA",
        locationType: "Remote",
        employmentType: "Full-time",

        experience: "3-5 years",
        education: "Bachelor's Degree",
        skills: ["React", "TypeScript", "CSS", "HTML"],
        languages: ["English", "Spanish"],

        description:
          "We are looking for an experienced Frontend Developer to join our team. You will be responsible for building user interfaces, implementing features, and ensuring the overall quality of our web applications.",
        responsibilities:
          "- Develop new user-facing features\n- Build reusable components\n- Optimize applications for maximum speed and scalability\n- Collaborate with back-end developers and designers",
        qualifications:
          "- Strong understanding of web fundamentals\n- Experience with responsive design\n- Knowledge of browser rendering behavior and performance",

        applicationDeadline: "2023-12-31",
        startDate: "2024-01-15",
        numberOfOpenings: "2",

        status: "Active",
        applicants: 24,
        posted: "2023-10-15",
      };

      setFormData(jobData);
      setIsLoading(false);
    }, 500);
  }, [jobId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagsChange = (e) => {
    const { name, value } = e.target;
    // Convert comma-separated string to array
    setFormData((prev) => ({
      ...prev,
      [name]: value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your API
    console.log("Submitting updated job:", formData);

    // Show success message and redirect
    alert("Job updated successfully!");
    navigate("/manage-jobs");
  };

  const handleDelete = () => {
    // In a real app, you would send a delete request to your API
    console.log("Deleting job:", jobId);

    // Show success message and redirect
    alert("Job deleted successfully!");
    navigate("/manage-jobs");
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-500">
          Loading job details...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/manage-jobs"
          className="flex items-center text-gray-600 hover:text-blue-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Manage Jobs
        </Link>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Edit Job Listing</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Job
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Job Status Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start">
        <div className="bg-blue-100 p-2 rounded-full mr-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-blue-800">
            Job Status: {formData.status}
          </h3>
          <p className="text-blue-600 text-sm">
            This job was posted on {formData.posted} and has received{" "}
            {formData.applicants} applications so far.
          </p>
        </div>
      </div>

      {/* Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      >
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Job Title
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Company
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Department
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Job Type and Work Arrangement */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Job Type & Arrangement
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="employmentType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Employment Type
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    id="employmentType"
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Select Employment Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="locationType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location Type
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    id="locationType"
                    name="locationType"
                    value={formData.locationType}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Select Location Type</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Requirements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Years of Experience
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Select Experience Level</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5-7 years">5-7 years</option>
                    <option value="7+ years">7+ years</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="education"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Education Level
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Select Education Level</option>
                    <option value="High School">High School</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="PhD">PhD</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="skills"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Required Skills
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills.join(", ")}
                  onChange={handleTagsChange}
                  placeholder="Add skills (comma separated)"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter skills separated by commas (e.g., React, JavaScript,
                  CSS)
                </p>
              </div>

              <div>
                <label
                  htmlFor="languages"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Required Languages
                </label>
                <input
                  type="text"
                  id="languages"
                  name="languages"
                  value={formData.languages.join(", ")}
                  onChange={handleTagsChange}
                  placeholder="Add languages (comma separated)"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Job Details
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Job Description
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the role and its impact..."
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="responsibilities"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Key Responsibilities
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  id="responsibilities"
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="List the main responsibilities..."
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="qualifications"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Additional Qualifications
                </label>
                <textarea
                  id="qualifications"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any additional qualifications..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Additional Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="applicationDeadline"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Application Deadline
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    id="applicationDeadline"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Expected Start Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="numberOfOpenings"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Number of Openings
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    id="numberOfOpenings"
                    name="numberOfOpenings"
                    value={formData.numberOfOpenings}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Publication Settings */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Publication Settings
            </h2>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <div className="relative">
                <AlertCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <Link
            to="/manage-jobs"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Delete Job Listing
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this job listing? This action
              cannot be undone and will remove all associated applicant data.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditJob;
