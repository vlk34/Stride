import React, { useState } from "react";
import { X, Upload } from "lucide-react";
import { useUploadResume } from "../../hooks/tanstack/useImageAndCompany";

const ApplicationModal = ({ isOpen, onClose, onSubmit, job, isSubmitting }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cv: null,
  });
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Use the resume upload mutation
  const resumeUpload = useUploadResume();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({
        ...prev,
        cv: file,
      }));
      setError("");
    } else {
      setError("Please upload a PDF file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (hasAttemptedSubmit) {
      return;
    }

    // Mark that we've attempted to submit
    setHasAttemptedSubmit(true);

    if (!formData.cv) {
      setError("Please upload your CV");
      setHasAttemptedSubmit(false); // Reset if there's an error
      return;
    }

    try {
      setUploading(true);

      // Upload the CV file first
      const uploadResult = await resumeUpload.mutateAsync(formData.cv);

      // Get the CV ID from the response (matches the API response format)
      const cvId = uploadResult.id;

      // Now submit the application with the job_id and cv
      onSubmit({
        job_id: job.job_id,
        cv: cvId,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      });
    } catch (err) {
      console.error("Error uploading CV:", err);
      setError("Failed to upload CV. Please try again.");
      setHasAttemptedSubmit(false); // Reset if there's an error so they can retry
    } finally {
      setUploading(false);
    }
  };

  // When the modal is closed, reset the hasAttemptedSubmit state
  const handleClose = () => {
    setHasAttemptedSubmit(false);
    onClose();
  };

  if (!isOpen) return null;

  // Determine if the form is in a processing state
  const isProcessing =
    isSubmitting || uploading || resumeUpload.isLoading || hasAttemptedSubmit;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-4 sm:p-6 relative">
        <button
          onClick={handleClose}
          disabled={isProcessing && !hasAttemptedSubmit}
          className="absolute right-3 sm:right-4 top-3 sm:top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-1 pr-6">
          Apply for {job.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4">{job.company}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
              value={formData.fullName}
              onChange={handleChange}
              disabled={isProcessing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
              value={formData.email}
              onChange={handleChange}
              disabled={isProcessing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
              value={formData.phone}
              onChange={handleChange}
              disabled={isProcessing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CV (PDF)
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="cv-upload"
                disabled={isProcessing}
              />
              <label
                htmlFor="cv-upload"
                className={`flex items-center justify-center w-full px-3 py-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 text-sm ${
                  isProcessing ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Upload className="w-4 h-4 mr-2" />
                {formData.cv ? formData.cv.name : "Upload your CV"}
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium ${
              isProcessing ? "opacity-70 cursor-wait" : ""
            }`}
          >
            {uploading
              ? "Uploading CV..."
              : isSubmitting || hasAttemptedSubmit
              ? "Submitting Application..."
              : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;
