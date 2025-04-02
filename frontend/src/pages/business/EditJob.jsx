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
  Loader,
  X,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router";
import {
  useJobDetails,
  useUpdateJob,
  useDeleteJob,
  getRelativeTime,
} from "../../hooks/tanstack/useBusinessDashboard";

const EditJob = () => {
  const { jobId } = useParams();
  console.log("JobId from params:", jobId);
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [formData, setFormData] = useState({
    job_id: "",
    title: "",
    department: "",
    location: "",
    workstyle: "", // remote, hybrid, on-site
    job_type: "", // full-time, part-time, contract
    experience: "",
    education: "",
    skills: [],
    languages: [],
    description: "",
    responsibilities: "",
    qualifications: "",
    deadline: "",
    openings: "",
  });

  // Fetch job details
  const { data: jobDetails, isLoading, isError, error } = useJobDetails(jobId);
  console.log("Job details:", jobDetails);

  // Update job mutation
  const updateJobMutation = useUpdateJob();

  // Delete job mutation
  const deleteJobMutation = useDeleteJob();

  // Helper function to show notifications
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 5000);
  };

  // When job details are loaded, update form data
  useEffect(() => {
    if (jobDetails) {
      // Initialize form data with job details
      // Convert any undefined values to empty strings or arrays
      setFormData({
        job_id: jobDetails.job_id || "",
        title: jobDetails.title || "",
        department: jobDetails.department || "",
        location: jobDetails.location || "",
        workstyle: jobDetails.workstyle || "",
        job_type: jobDetails.job_type || "",
        experience: jobDetails.experience || "",
        education: jobDetails.education || "",
        skills: jobDetails.skills || [],
        languages: jobDetails.languages || [],
        description: jobDetails.description || "",
        responsibilities: jobDetails.responsibilities || "",
        qualifications: jobDetails.qualifications || "",
        deadline: formatDateForInput(jobDetails.deadline) || "",
        openings: jobDetails.openings || "",
      });
    }
  }, [jobDetails]);

  // Helper function to format date for input field (yyyy-MM-dd)
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  };

  // Helper function to format date for API
  const formatDateForAPI = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;

    // Format as ISO string which is more universally accepted
    // This will produce something like: "2023-01-15T23:59:59.000Z"
    return date.toISOString();

    // Alternative formats depending on what your backend expects:
    // Option 1: "2023-01-15T23:59:59"
    // return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T23:59:59`;

    // Option 2: "2023-01-15 23:59:59" with proper timezone handling
    // return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} 23:59:59`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "openings" ? parseInt(value, 10) || "" : value,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      // Format the deadline date for the API
      const formattedDeadline = formatDateForAPI(formData.deadline);
      console.log("Original deadline:", formData.deadline);
      console.log("Formatted deadline for API:", formattedDeadline);

      if (!formData.deadline || !formattedDeadline) {
        showNotification("error", "Invalid deadline date format");
        setFormSubmitting(false);
        return;
      }

      // Prepare data for API
      const jobData = {
        job_id: parseInt(jobId, 10),
        title: formData.title,
        department: formData.department,
        location: formData.location,
        workstyle: formData.workstyle.toLowerCase(),
        job_type: formData.job_type.toLowerCase(),
        experience: formData.experience,
        education: formData.education,
        skills: formData.skills,
        languages: formData.languages,
        description: formData.description,
        responsibilities: formData.responsibilities,
        qualifications: formData.qualifications || "",
        deadline: formattedDeadline,
        openings: parseInt(formData.openings, 10) || 1,
      };

      console.log("Sending update job data:", jobData);

      // Update job
      await updateJobMutation.mutateAsync(jobData);

      showNotification("success", "Job updated successfully!");
      setTimeout(() => {
        navigate("/business/manage/jobs");
      }, 1500);
    } catch (error) {
      console.error("Error updating job:", error);
      showNotification(
        "error",
        error.response?.data?.message ||
          (error.message.includes("DateTimeParseException")
            ? "Invalid date format. Please check the deadline date."
            : "Failed to update job")
      );
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteJobMutation.mutateAsync(parseInt(jobId, 10));

      // Close the modal after successful deletion
      setShowDeleteConfirm(false);

      // Show success notification
      showNotification("success", "Job deleted successfully!");

      // Navigate back to the jobs list after a brief delay
      setTimeout(() => {
        navigate("/business/manage/jobs");
      }, 1500);
    } catch (error) {
      console.error("Error deleting job:", error);
      showNotification(
        "error",
        error.response?.data?.message || "Failed to delete job"
      );

      // Keep the modal open on error so they can try again
      // Or close it if you prefer
      // setShowDeleteConfirm(false);
    }
  };

  // Add this check to handle invalid jobId
  if (!jobId) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/business/manage/jobs"
          className="flex items-center text-gray-600 hover:text-blue-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Manage Jobs
        </Link>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            Missing Job ID
          </h2>
          <p className="text-red-600 mb-4">
            No job ID was provided. Please select a job from the manage jobs
            page.
          </p>
          <Link
            to="/business/manage/jobs"
            className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Return to Jobs
          </Link>
        </div>
      </div>
    );
  }

  // Case where job doesn't exist or error fetching
  if (isError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/business/manage/jobs"
          className="flex items-center text-gray-600 hover:text-blue-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Manage Jobs
        </Link>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            Error Loading Job
          </h2>
          <p className="text-red-600 mb-4">
            {error?.message || "We couldn't find the job you're looking for."}
          </p>
          <Link
            to="/business/manage/jobs"
            className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Return to Jobs
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/business/manage/jobs"
          className="flex items-center text-gray-600 hover:text-blue-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Manage Jobs
        </Link>

        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-3" />
            <p className="text-gray-600">Loading job details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Custom Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-md flex items-center ${
            notification.type === "success"
              ? "bg-green-100 border border-green-200"
              : notification.type === "error"
              ? "bg-red-100 border border-red-200"
              : "bg-blue-100 border border-blue-200"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className={`w-5 h-5 mr-2 text-green-600`} />
          ) : notification.type === "error" ? (
            <XCircle className={`w-5 h-5 mr-2 text-red-600`} />
          ) : (
            <AlertCircle className={`w-5 h-5 mr-2 text-blue-600`} />
          )}
          <span
            className={`${
              notification.type === "success"
                ? "text-green-800"
                : notification.type === "error"
                ? "text-red-800"
                : "text-blue-800"
            }`}
          >
            {notification.message}
          </span>
          <button
            className="ml-4 text-gray-500 hover:text-gray-700"
            onClick={() =>
              setNotification({ show: false, type: "", message: "" })
            }
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <Link
          to="/business/manage/jobs"
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
              disabled={formSubmitting}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Job
            </button>
            <button
              onClick={handleSubmit}
              disabled={formSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:bg-blue-400"
            >
              {formSubmitting ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Job Status Banner */}
      {jobDetails && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <AlertCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-blue-800">
              Job Status:{" "}
              {new Date(jobDetails.deadline) > new Date()
                ? "Active"
                : "Expired"}
            </h3>
            <p className="text-blue-600 text-sm">
              This job was posted {getRelativeTime(jobDetails.created_at)}
              {jobDetails.applicant_count !== undefined &&
                ` and has received ${jobDetails.applicant_count} applications so far.`}
            </p>
          </div>
        </div>
      )}

      {/* Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      >
        {/* Form content remains the same as before */}
        {/* ... (all your form fields) */}
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
                  htmlFor="job_type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Employment Type
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    id="job_type"
                    name="job_type"
                    value={formData.job_type}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Select Employment Type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="workstyle"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location Type
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    id="workstyle"
                    name="workstyle"
                    value={formData.workstyle}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Select Location Type</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="on-site">On-site</option>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Application Deadline
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="openings"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Number of Openings
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    id="openings"
                    name="openings"
                    value={formData.openings}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <Link
            to="/business/manage/jobs"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={formSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:bg-blue-400"
          >
            {formSubmitting ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>

      {/* Custom Delete Confirmation Modal - Updated to match ManageJobs */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-red-50 px-4 sm:px-6 py-4 border-b border-red-100 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-red-800">
                  Delete Job Listing
                </h3>
              </div>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                disabled={deleteJobMutation.isPending}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-4 sm:px-6 py-5">
              <p className="text-gray-700 mb-4">
                You are about to delete the job listing:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <p className="font-medium text-gray-900">{formData.title}</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-yellow-800 font-medium">Warning</p>
                  <p className="text-yellow-700 text-sm">
                    This action cannot be undone. This will permanently delete
                    the job listing and remove all associated applicant data.
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Please confirm that you want to proceed with this action.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium order-2 sm:order-1"
                disabled={deleteJobMutation.isPending}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteJobMutation.isPending}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center order-1 sm:order-2 disabled:bg-red-400"
              >
                {deleteJobMutation.isPending ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Job
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditJob;
