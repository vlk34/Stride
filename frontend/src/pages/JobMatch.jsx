import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react"; // Import Clerk hook
import {
  Sparkles,
  ArrowRight,
  Briefcase,
  Code,
  GraduationCap,
  Clock,
  Upload,
  AlertCircle,
  LogIn,
  UserPlus,
} from "lucide-react";

// API functions
const uploadText = async (description) => {
  const response = await fetch("http://localhost:8000/upload-text", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });

  if (!response.ok) {
    // Handle 500 errors specifically with a custom message
    if (response.status === 500) {
      throw new Error(
        "Please enter a more detailed and professional description of your skills, experience, and job preferences"
      );
    }
    throw new Error(
      "We couldn't find any job listings matching your profile. Please try with more details about your skills and experience."
    );
  }

  return response.json();
};

const uploadPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:8000/upload-pdf", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.detail ||
        "We couldn't find any job listings matching your CV. Please ensure your resume includes detailed skills and experience."
    );
  }

  return response.json();
};

const JobMatch = () => {
  const { isSignedIn, isLoaded } = useUser(); // Check if user is signed in
  const [userDescription, setUserDescription] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [textError, setTextError] = useState(""); // Separate error state for the text input
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Text upload mutation
  const textMutation = useMutation({
    mutationFn: uploadText,
    onSuccess: (data) => {
      // Store results in localStorage for persistence
      localStorage.setItem("recommendedJobs", JSON.stringify(data.results));
      navigate("/recommended-jobs");
    },
    onError: (error) => {
      console.error("Error uploading text:", error);
      // Display custom error message regardless of actual error
      setTextError(
        "We couldn't find any available job listings matching your particular skills and experience. Please try adjusting your description or check back later for new opportunities."
      );
    },
  });

  // PDF upload mutation
  const pdfMutation = useMutation({
    mutationFn: uploadPdf,
    onSuccess: (data) => {
      // Store results in localStorage for persistence
      localStorage.setItem("recommendedJobs", JSON.stringify(data.results));
      navigate("/recommended-jobs");
    },
    onError: (error) => {
      console.error("Error uploading PDF:", error);
      // Display custom error message regardless of actual error
      setUploadError(
        "We couldn't find any available job listings matching your particular skills and experience. Please try adjusting your resume or check back later for new opportunities."
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSignedIn) {
      setTextError("Please sign in to use this feature");
      return;
    }

    if (!userDescription.trim()) {
      setTextError("Please enter a description or upload your CV");
      return;
    }

    // Clear any previous error
    setTextError("");

    // Submit to API and let the backend handle validation
    textMutation.mutate(userDescription);
  };

  const handleFileChange = async (e) => {
    if (!isSignedIn) {
      setUploadError("Please sign in to use this feature");
      return;
    }

    const file = e.target.files[0];
    if (!file) {
      setUploadedFileName("");
      return;
    }

    // Validate file type - only PDF
    if (file.type !== "application/pdf") {
      setUploadError("Please upload a PDF file only");
      setUploadedFileName("");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size should be less than 5MB");
      setUploadedFileName("");
      return;
    }

    setUploadError("");
    setUploadedFileName(file.name);

    pdfMutation.mutate(file);
  };

  const triggerFileInput = () => {
    if (!isSignedIn) {
      setUploadError("Please sign in to use this feature");
      return;
    }
    fileInputRef.current.click();
  };

  // Authentication CTA component
  const AuthCTA = () => (
    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <LogIn className="w-5 h-5 text-blue-600 mr-2" />
          <p className="text-blue-800 font-medium">
            Please sign in or create an account to use this feature
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate("/signin")}
            className="flex items-center px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Create Account
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-full mb-4">
          <Sparkles className="w-6 h-6 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Find Your Perfect Job Match
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Tell us about your skills, experience, and what you're looking for.
          Our AI will find the best job matches for you.
        </p>
      </div>

      {/* Example cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Code className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Describe Your Skills
          </h3>
          <p className="text-gray-600 text-sm">
            Share your technical skills, tools you're familiar with, and your
            level of expertise.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
            <GraduationCap className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Mention Your Background
          </h3>
          <p className="text-gray-600 text-sm">
            Include your education, past roles, and any relevant experience or
            projects.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-4">
            <Briefcase className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Specify Your Goals
          </h3>
          <p className="text-gray-600 text-sm">
            Tell us what type of role, industry, or work environment you're
            looking for.
          </p>
        </div>
      </div>

      {/* Input form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
      >
        <div className="p-6">
          {!isLoaded ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : !isSignedIn ? (
            <AuthCTA />
          ) : (
            <>
              {/* CV Upload Section */}
              <div className="mb-6 p-4 border border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-full mb-3">
                    <Upload className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Upload your CV/Resume
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">
                    PDF files only (max 5MB)
                  </p>

                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />

                  <button
                    type="button"
                    onClick={triggerFileInput}
                    disabled={pdfMutation.isPending}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      pdfMutation.isPending
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "text-blue-600 bg-blue-50 hover:bg-blue-100"
                    }`}
                  >
                    {pdfMutation.isPending ? "Uploading..." : "Choose PDF"}
                  </button>

                  {uploadedFileName && (
                    <div className="mt-3 text-sm text-green-600 flex items-center justify-center gap-1">
                      <span>Uploaded: {uploadedFileName}</span>
                    </div>
                  )}

                  {uploadError && (
                    <div className="mt-2 text-sm text-red-600 flex items-center justify-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{uploadError}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center mb-4 text-sm text-gray-500">
                <p>- OR -</p>
              </div>

              <label
                htmlFor="user-description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Describe yourself and what you're looking for
              </label>

              <div className="relative">
                <textarea
                  id="user-description"
                  rows={6}
                  className={`w-full p-4 border ${
                    textError
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  } rounded-lg focus:ring-2`}
                  placeholder="Example: I'm a recent computer science graduate looking for an entry-level software engineering role. I have experience with Java, Python, and React from my coursework and internship. I'm interested in fintech or healthtech companies where I can work on meaningful projects..."
                  value={userDescription}
                  onChange={(e) => {
                    setUserDescription(e.target.value);
                    // Clear error when user types
                    if (textError) setTextError("");
                  }}
                />

                {/* Text error message displayed directly below the textarea */}
                {textError && (
                  <div className="mt-2 text-sm text-red-600 flex items-start gap-1">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{textError}</span>
                  </div>
                )}
              </div>

              <div className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>For best results, provide at least 2-3 sentences.</span>
              </div>
            </>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          {!isLoaded ? (
            <button
              disabled
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-white bg-blue-400 cursor-not-allowed"
            >
              <span>Loading...</span>
            </button>
          ) : !isSignedIn ? (
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <span>Sign in to Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={
                textMutation.isPending ||
                pdfMutation.isPending ||
                !userDescription.trim()
              }
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-white ${
                textMutation.isPending ||
                pdfMutation.isPending ||
                !userDescription.trim()
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {textMutation.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Finding matches...</span>
                </>
              ) : (
                <>
                  <span>Find My Matches</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default JobMatch;
