import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Users,
  GraduationCap,
  Calendar,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Building2,
} from "lucide-react";

const CreateJobListing = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    title: "",
    department: "",
    location: "",
    locationType: "", // remote, hybrid, on-site
    employmentType: "", // full-time, part-time, contract

    // Compensation
    salaryMin: "",
    salaryMax: "",
    salaryType: "", // yearly, monthly, hourly
    benefits: [],

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
        },
        {
          name: "department",
          label: "Department",
          type: "text",
          placeholder: "e.g., Engineering",
          icon: <Building2 className="w-5 h-5 text-gray-400" />,
          required: true,
        },
        {
          name: "location",
          label: "Location",
          type: "text",
          placeholder: "e.g., New York, NY",
          icon: <MapPin className="w-5 h-5 text-gray-400" />,
          required: true,
        },
        {
          name: "locationType",
          label: "Location Type",
          type: "select",
          options: ["Remote", "Hybrid", "On-site"],
          required: true,
        },
        {
          name: "employmentType",
          label: "Employment Type",
          type: "select",
          options: ["Full-time", "Part-time", "Contract", "Internship"],
          required: true,
        },
      ],
    },
    {
      id: 2,
      title: "Compensation",
      description: "Define the compensation package",
      fields: [
        {
          name: "salaryType",
          label: "Salary Type",
          type: "select",
          options: ["Yearly", "Monthly", "Hourly"],
          icon: <DollarSign className="w-5 h-5 text-gray-400" />,
          required: true,
        },
        {
          name: "salaryMin",
          label: "Minimum Salary",
          type: "number",
          placeholder: "e.g., 50000",
          required: true,
        },
        {
          name: "salaryMax",
          label: "Maximum Salary",
          type: "number",
          placeholder: "e.g., 80000",
          required: true,
        },
        {
          name: "benefits",
          label: "Benefits",
          type: "checkbox-grid",
          options: [
            { id: "health", label: "Health Insurance", icon: "🏥" },
            { id: "dental", label: "Dental Insurance", icon: "🦷" },
            { id: "vision", label: "Vision Insurance", icon: "👁" },
            { id: "401k", label: "401(k)", icon: "💰" },
            { id: "remote", label: "Remote Work", icon: "🏠" },
            { id: "flexible", label: "Flexible Hours", icon: "⏰" },
            { id: "pto", label: "Paid Time Off", icon: "✈️" },
            {
              id: "development",
              label: "Professional Development",
              icon: "📚",
            },
            { id: "stock", label: "Stock Options", icon: "📈" },
            { id: "gym", label: "Gym Membership", icon: "💪" },
            { id: "meals", label: "Free Meals", icon: "🍽" },
            { id: "childcare", label: "Childcare", icon: "👶" },
          ],
          required: true,
        },
      ],
    },
    {
      id: 3,
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
        },
        {
          name: "skills",
          label: "Required Skills",
          type: "tags",
          placeholder: "Add skills",
          required: true,
        },
        {
          name: "languages",
          label: "Required Languages",
          type: "tags",
          placeholder: "Add languages",
          required: false,
        },
      ],
    },
    {
      id: 4,
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
        },
        {
          name: "responsibilities",
          label: "Key Responsibilities",
          type: "textarea",
          placeholder: "List the main responsibilities...",
          required: true,
          rows: 4,
        },
        {
          name: "qualifications",
          label: "Additional Qualifications",
          type: "textarea",
          placeholder: "Any additional qualifications...",
          required: false,
          rows: 4,
        },
      ],
    },
    {
      id: 5,
      title: "Additional Details",
      description: "Final details about the position",
      fields: [
        {
          name: "applicationDeadline",
          label: "Application Deadline",
          type: "date",
          icon: <Calendar className="w-5 h-5 text-gray-400" />,
          required: true,
        },
        {
          name: "startDate",
          label: "Expected Start Date",
          type: "date",
          icon: <Calendar className="w-5 h-5 text-gray-400" />,
          required: true,
        },
        {
          name: "numberOfOpenings",
          label: "Number of Openings",
          type: "number",
          icon: <Users className="w-5 h-5 text-gray-400" />,
          required: true,
        },
      ],
    },
    {
      id: 6,
      title: "Success!",
      description: "Your job listing has been created",
      isSuccess: true,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const benefit = e.target.value;
      setFormData((prev) => ({
        ...prev,
        benefits: checked
          ? [...(prev.benefits || []), benefit]
          : (prev.benefits || []).filter((b) => b !== benefit),
      }));
    } else if (type === "select-multiple") {
      const selectedOptions = Array.from(e.target.selectedOptions).map(
        (option) => option.value
      );
      setFormData((prev) => ({ ...prev, [name]: selectedOptions }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    setCurrentStep(6);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentStepData = steps.find((step) => step.id === currentStep);

  // Check if all required fields in the current step are filled
  const isNextDisabled = currentStepData.fields
    ? currentStepData.fields.some(
        (field) => field.required && !formData[field.name]
      )
    : false;

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
        onClick={() => navigate("/business-dashboard")}
        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
      >
        View Dashboard
        <ChevronRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );

  const renderField = (field) => {
    if (field.type === "checkbox-grid") {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {field.options.map((option) => (
            <label
              key={option.id}
              className="flex items-center p-3 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                name={field.name}
                value={option.label}
                checked={formData[field.name]?.includes(option.label) || false}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 flex items-center">
                <span className="mr-2">{option.icon}</span>
                {option.label}
              </span>
            </label>
          ))}
        </div>
      );
    }

    return (
      <div className="relative">
        {field.icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {field.icon}
          </div>
        )}
        {field.type === "select" ? (
          <select
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            className={`block w-full rounded-lg border border-gray-300 ${
              field.icon ? "pl-10" : "pl-3"
            } pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            required={field.required}
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
            name={field.name}
            value={formData[field.name] || []}
            onChange={handleInputChange}
            className="block w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required={field.required}
          >
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : field.type === "textarea" ? (
          <textarea
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            placeholder={field.placeholder}
            rows={field.rows || 4}
            className="block w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required={field.required}
          />
        ) : field.type === "tags" ? (
          <input
            type="text"
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            placeholder={field.placeholder}
            className={`block w-full rounded-lg border border-gray-300 ${
              field.icon ? "pl-10" : "pl-3"
            } pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            required={field.required}
          />
        ) : (
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            placeholder={field.placeholder}
            className={`block w-full rounded-lg border border-gray-300 ${
              field.icon ? "pl-10" : "pl-3"
            } pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            required={field.required}
          />
        )}
      </div>
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
                    disabled={isNextDisabled}
                    className={`flex items-center gap-2 px-6 py-2 ${
                      isNextDisabled
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
                    className="flex items-center gap-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-auto px-6 py-2"
                  >
                    Publish Job
                    <ChevronRight className="w-4 h-4" />
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
