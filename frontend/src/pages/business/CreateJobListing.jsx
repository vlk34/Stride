import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  GraduationCap,
  Calendar,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Building2,
  AlertCircle,
} from "lucide-react";
import { useCreateJob } from "../../hooks/tanstack/useJobManagement";

const CreateJobListing = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const createJobMutation = useCreateJob();
  const [formData, setFormData] = useState({
    // Basic Info
    title: "",
    department: "",
    location: "",
    locationType: "", // remote, hybrid, on-site
    employmentType: "", // full-time, part-time, contract

    // Requirements
    experience: "",
    education: "",
    skills: "",
    languages: "",

    // Description
    description: "",
    responsibilities: "",
    qualifications: "",

    // Additional Info
    applicationDeadline: "",
    startDate: "",
    numberOfOpenings: "",
  });

  const steps = [
    {
      id: 1,
      title: "Basic Information",
      description: "Let's start with the fundamental details",
      fields: [
        {
          name: "title",
          label: "Job Title",
          type: "text",
          placeholder: "e.g., Senior Software Engineer",
          icon: <Briefcase className="w-5 h-5 text-gray-400" />,
          required: true,
          validation: (value) =>
            !value
              ? "Job title is required"
              : value.length < 3
              ? "Job title must be at least 3 characters"
              : value.length > 100
              ? "Job title must be less than 100 characters"
              : null,
        },
        {
          name: "department",
          label: "Department",
          type: "text",
          placeholder: "e.g., Engineering",
          icon: <Building2 className="w-5 h-5 text-gray-400" />,
          required: true,
          validation: (value) =>
            !value
              ? "Department is required"
              : value.length < 2
              ? "Department must be at least 2 characters"
              : null,
        },
        {
          name: "location",
          label: "Location",
          type: "text",
          placeholder: "e.g., New York, NY",
          icon: <MapPin className="w-5 h-5 text-gray-400" />,
          required: true,
          validation: (value) =>
            !value
              ? "Location is required"
              : value.length < 2
              ? "Please enter a valid location"
              : null,
        },
        {
          name: "locationType",
          label: "Location Type",
          type: "select",
          options: ["Remote", "Hybrid", "On-site"],
          required: true,
          validation: (value) => (!value ? "Location type is required" : null),
        },
        {
          name: "employmentType",
          label: "Employment Type",
          type: "select",
          options: ["Full-time", "Part-time", "Contract", "Internship"],
          required: true,
          validation: (value) =>
            !value ? "Employment type is required" : null,
        },
      ],
    },
    {
      id: 2,
      title: "Requirements",
      description: "Specify candidate requirements",
      fields: [
        {
          name: "experience",
          label: "Years of Experience",
          type: "select",
          options: [
            "Entry Level",
            "1-3 years",
            "3-5 years",
            "5-7 years",
            "7+ years",
          ],
          icon: <Clock className="w-5 h-5 text-gray-400" />,
          required: true,
          validation: (value) =>
            !value ? "Experience level is required" : null,
        },
        {
          name: "education",
          label: "Education Level",
          type: "select",
          options: [
            "High School",
            "Bachelor's Degree",
            "Master's Degree",
            "PhD",
            "Other",
          ],
          icon: <GraduationCap className="w-5 h-5 text-gray-400" />,
          required: true,
          validation: (value) =>
            !value ? "Education level is required" : null,
        },
        {
          name: "skills",
          label: "Required Skills",
          type: "tags",
          placeholder: "Add skills",
          required: true,
          validation: (value) => {
            if (!value) return "At least one skill is required";
            const skills = value
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s);
            return skills.length === 0
              ? "At least one skill is required"
              : null;
          },
        },
        {
          name: "languages",
          label: "Required Languages",
          type: "tags",
          placeholder: "Add languages",
          required: false,
          validation: (value) => null, // Optional field
        },
      ],
    },
    {
      id: 3,
      title: "Job Description",
      description: "Provide detailed information about the role",
      fields: [
        {
          name: "description",
          label: "Job Description",
          type: "textarea",
          placeholder: "Describe the role and its impact...",
          required: true,
          rows: 4,
          validation: (value) =>
            !value
              ? "Job description is required"
              : value.length < 50
              ? "Description must be at least 50 characters"
              : value.length > 2000
              ? "Description must be less than 2000 characters"
              : null,
        },
        {
          name: "responsibilities",
          label: "Key Responsibilities",
          type: "textarea",
          placeholder: "List the main responsibilities...",
          required: true,
          rows: 4,
          validation: (value) =>
            !value
              ? "Responsibilities are required"
              : value.length < 50
              ? "Responsibilities must be at least 50 characters"
              : value.length > 1000
              ? "Responsibilities must be less than 1000 characters"
              : null,
        },
        {
          name: "qualifications",
          label: "Additional Qualifications",
          type: "textarea",
          placeholder: "Any additional qualifications...",
          required: false,
          rows: 4,
          validation: (value) => {
            if (!value) return null; // Optional field
            return value.length > 1000
              ? "Qualifications must be less than 1000 characters"
              : null;
          },
        },
      ],
    },
    {
      id: 4,
      title: "Additional Details",
      description: "Final details about the position",
      fields: [
        {
          name: "applicationDeadline",
          label: "Application Deadline",
          type: "date",
          icon: <Calendar className="w-5 h-5 text-gray-400" />,
          required: true,
          validation: (value) => {
            if (!value) return "Application deadline is required";

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const deadline = new Date(value);
            if (isNaN(deadline.getTime())) return "Invalid date format";

            // Deadline must be in the future
            if (deadline < today) return "Deadline cannot be in the past";

            // Deadline should not be more than 6 months in the future
            const sixMonthsFromNow = new Date();
            sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
            if (deadline > sixMonthsFromNow) {
              return "Deadline should not be more than 6 months in the future";
            }

            return null;
          },
        },
        {
          name: "startDate",
          label: "Expected Start Date",
          type: "date",
          icon: <Calendar className="w-5 h-5 text-gray-400" />,
          required: true,
          validation: (value) => {
            if (!value) return "Start date is required";

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const startDate = new Date(value);
            if (isNaN(startDate.getTime())) return "Invalid date format";

            // Start date should not be in the past
            if (startDate < today) return "Start date cannot be in the past";

            // Start date should be after application deadline
            const deadline = new Date(formData.applicationDeadline);
            if (!isNaN(deadline.getTime()) && startDate < deadline) {
              return "Start date must be after application deadline";
            }

            // Start date should be within reasonable range (1 year from now)
            const oneYearFromNow = new Date();
            oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
            if (startDate > oneYearFromNow) {
              return "Start date should be within one year from now";
            }

            // Start date should be at least 1 week after deadline to allow for review
            if (!isNaN(deadline.getTime())) {
              const minStartDate = new Date(deadline);
              minStartDate.setDate(minStartDate.getDate() + 7);

              if (startDate < minStartDate) {
                return "Start date should be at least 1 week after application deadline";
              }
            }

            return null;
          },
        },
        {
          name: "numberOfOpenings",
          label: "Number of Openings",
          type: "number",
          icon: <Users className="w-5 h-5 text-gray-400" />,
          required: true,
          validation: (value) => {
            if (!value) return "Number of openings is required";
            const num = parseInt(value);
            if (isNaN(num)) return "Please enter a valid number";
            if (num <= 0) return "Number must be greater than 0";
            if (num > 100) return "Number must be less than 100";
            return null;
          },
        },
      ],
    },
    {
      id: 5,
      title: "Success!",
      description: "Your job listing has been created",
      isSuccess: true,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "select-multiple") {
      const selectedOptions = Array.from(e.target.selectedOptions).map(
        (option) => option.value
      );
      setFormData((prev) => ({ ...prev, [name]: selectedOptions }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Validate the field on change
    validateField(name, value);
  };

  // Validate a single field
  const validateField = (name, value) => {
    const field = steps
      .flatMap((step) => step.fields || [])
      .find((f) => f.name === name);

    if (field && field.validation) {
      const error = field.validation(value);
      setValidationErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
      return !error;
    }
    return true;
  };

  // Validate all fields in current step
  const validateStep = () => {
    const currentFields = currentStepData.fields || [];
    let isValid = true;
    let newErrors = { ...validationErrors };

    currentFields.forEach((field) => {
      if (field.validation) {
        const error = field.validation(formData[field.name]);
        newErrors[field.name] = error;
        if (error) isValid = false;
      }
    });

    setValidationErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Format date for Timestamp (yyyy-MM-dd HH:mm:ss)
  const formatDateForTimestamp = (dateString) => {
    if (!dateString) return null;

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    // Set time to end of day (23:59:59) for application deadline
    return `${year}-${month}-${day} 23:59:59`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields in the form
    let isValid = true;
    let newErrors = {};

    steps.forEach((step) => {
      if (step.fields) {
        step.fields.forEach((field) => {
          if (field.validation) {
            const error = field.validation(formData[field.name]);
            newErrors[field.name] = error;
            if (error) isValid = false;
          }
        });
      }
    });

    setValidationErrors(newErrors);

    if (!isValid) {
      alert("Please fix all errors before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      // Format skills and languages
      let skillsArray = formData.skills;
      if (typeof formData.skills === "string") {
        skillsArray = formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill);
      }

      let languagesArray = formData.languages;
      if (typeof formData.languages === "string") {
        languagesArray = formData.languages
          .split(",")
          .map((lang) => lang.trim())
          .filter((lang) => lang);
      } else if (!formData.languages || formData.languages.length === 0) {
        languagesArray = []; // Ensure it's at least an empty array
      }

      // Format the deadline for Timestamp
      const formattedDeadline = formatDateForTimestamp(
        formData.applicationDeadline
      );
      if (!formattedDeadline) {
        throw new Error("Invalid application deadline format");
      }

      // Transform form data to match the expected API format
      const jobData = {
        title: formData.title,
        department: formData.department,
        location: formData.location,
        job_type: formData.employmentType.toLowerCase(),
        workstyle: formData.locationType.toLowerCase(),
        skills: skillsArray,
        languages: languagesArray,
        experience: formData.experience,
        education: formData.education,
        responsibilities: formData.responsibilities,
        qualifications: formData.qualifications || "", // Ensure not null
        description: formData.description,
        deadline: formattedDeadline, // Formatted for Timestamp
        openings: parseInt(formData.numberOfOpenings, 10),
      };

      console.log("Sending job data:", jobData);

      // Send the job data to the API
      await createJobMutation.mutateAsync(jobData);

      // Move to success step
      setCurrentStep(5);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error creating job:", error);
      alert(`Failed to create job: ${error.message || "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepData = steps.find((step) => step.id === currentStep);

  // Check if all required fields in the current step are filled and valid
  const isNextDisabled = () => {
    if (!currentStepData.fields) return false;

    // Check if there are any validation errors in the current step
    const hasErrors = currentStepData.fields.some(
      (field) => validationErrors[field.name]
    );

    // Check if required fields are filled
    const missingRequired = currentStepData.fields.some(
      (field) => field.required && !formData[field.name]
    );

    return hasErrors || missingRequired;
  };

  const renderSuccessStep = () => (
    <div className="text-center py-8">
      <div className="flex justify-center mb-6">
        <div className="bg-green-100 rounded-full p-3">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Job Listing Created Successfully!
      </h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Your job listing has been published and is now visible to potential
        candidates.
      </p>
      <button
        onClick={() => navigate("/business/dashboard")}
        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
      >
        View Dashboard
        <ChevronRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );

  // Error message component
  const ErrorMessage = ({ message }) => (
    <div className="text-sm text-red-500 mt-1 flex items-center gap-1">
      <AlertCircle className="w-3 h-3" />
      <span>{message}</span>
    </div>
  );

  const renderField = (field) => {
    const hasError = validationErrors[field.name];

    return (
      <>
        <div className="relative">
          {field.icon && (
            <div className="absolute top-0 left-0 pl-3 h-[38px] flex items-center pointer-events-none">
              {field.icon}
            </div>
          )}
          {field.type === "select" ? (
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              className={`block w-full rounded-lg border ${
                hasError ? "border-red-500" : "border-gray-300"
              } ${
                field.icon ? "pl-10" : "pl-3"
              } pr-3 py-2 focus:outline-none focus:ring-2 ${
                hasError ? "focus:ring-red-500" : "focus:ring-blue-500"
              } ${hasError ? "focus:border-red-500" : "focus:border-blue-500"}`}
              required={field.required}
              onBlur={() => validateField(field.name, formData[field.name])}
            >
              <option value="">Select {field.label}</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === "multiselect" ? (
            <select
              multiple
              id={field.name}
              name={field.name}
              value={formData[field.name] || []}
              onChange={handleInputChange}
              className={`block w-full rounded-lg border ${
                hasError ? "border-red-500" : "border-gray-300"
              } p-3 focus:outline-none focus:ring-2 ${
                hasError ? "focus:ring-red-500" : "focus:ring-blue-500"
              } ${hasError ? "focus:border-red-500" : "focus:border-blue-500"}`}
              required={field.required}
              onBlur={() => validateField(field.name, formData[field.name])}
            >
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              rows={field.rows || 4}
              className={`block w-full rounded-lg border ${
                hasError ? "border-red-500" : "border-gray-300"
              } p-3 focus:outline-none focus:ring-2 ${
                hasError ? "focus:ring-red-500" : "focus:ring-blue-500"
              } ${hasError ? "focus:border-red-500" : "focus:border-blue-500"}`}
              required={field.required}
              onBlur={() => validateField(field.name, formData[field.name])}
            />
          ) : field.type === "tags" ? (
            <input
              type="text"
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              className={`block w-full rounded-lg border ${
                hasError ? "border-red-500" : "border-gray-300"
              } ${
                field.icon ? "pl-10" : "pl-3"
              } pr-3 py-2 focus:outline-none focus:ring-2 ${
                hasError ? "focus:ring-red-500" : "focus:ring-blue-500"
              } ${hasError ? "focus:border-red-500" : "focus:border-blue-500"}`}
              required={field.required}
              onBlur={() => validateField(field.name, formData[field.name])}
            />
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              className={`block w-full rounded-lg border ${
                hasError ? "border-red-500" : "border-gray-300"
              } ${
                field.icon ? "pl-10" : "pl-3"
              } pr-3 py-2 focus:outline-none focus:ring-2 ${
                hasError ? "focus:ring-red-500" : "focus:ring-blue-500"
              } ${hasError ? "focus:border-red-500" : "focus:border-blue-500"}`}
              required={field.required}
              onBlur={() => validateField(field.name, formData[field.name])}
              min={field.type === "number" ? "1" : undefined}
            />
          )}
        </div>

        {field.type === "tags" && (
          <small className="text-gray-500 block mt-1">
            Enter values separated by commas
          </small>
        )}

        {hasError && <ErrorMessage message={validationErrors[field.name]} />}
      </>
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Progress Bar */}
      <div
        className={`mb-8 transition-all duration-500 ${
          currentStepData.isSuccess ? "opacity-0 h-0 mb-0" : "opacity-100 h-12"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          {steps.slice(0, -1).map((step) => (
            <div
              key={step.id}
              className={`flex-1 h-2 rounded-full mx-2 transition-all duration-300 ${
                step.id <= currentStep ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Start</span>
          <span>Finish</span>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        {currentStepData.isSuccess ? (
          <div
            className="transform transition-all duration-500 translate-y-0 opacity-100"
            style={{
              animation: "slideUp 0.5s ease-out forwards",
            }}
          >
            {renderSuccessStep()}
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {currentStepData.title}
              </h2>
              <p className="text-gray-600">{currentStepData.description}</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {currentStepData.fields.map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {field.label}
                      {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-between">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                )}
                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={isNextDisabled()}
                    className={`flex items-center gap-2 px-6 py-2 ${
                      isNextDisabled()
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    } rounded-lg ml-auto`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || isNextDisabled()}
                    className="flex items-center gap-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-auto px-6 py-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                        Publishing...
                      </>
                    ) : (
                      <>
                        Publish Job
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateJobListing;
