import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Building2,
  MapPin,
  Globe,
  Phone,
  Mail,
  Users,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
} from "lucide-react";

const BusinessAccountCreation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Company Basic Info
    companyName: "",
    industry: "",
    companySize: "",
    foundedYear: "",

    // Contact Info
    email: "",
    phone: "",
    website: "",

    // Location
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",

    // Company Details
    description: "",
    mission: "",
    benefits: "",

    // Social Media
    linkedin: "",
    twitter: "",
  });

  const steps = [
    {
      id: 1,
      title: "Company Information",
      description: "Tell us about your company",
      fields: [
        {
          name: "companyName",
          label: "Company Name",
          type: "text",
          placeholder: "Enter your company name",
          icon: <Building2 className="w-5 h-5 text-gray-400" />,
          required: true,
        },
        {
          name: "industry",
          label: "Industry",
          type: "select",
          options: [
            "Technology",
            "Healthcare",
            "Finance",
            "Education",
            "Other",
          ],
          icon: <Briefcase className="w-5 h-5 text-gray-400" />,
          required: true,
        },
        {
          name: "companySize",
          label: "Company Size",
          type: "select",
          options: ["1-10", "11-50", "51-200", "201-500", "500+"],
          icon: <Users className="w-5 h-5 text-gray-400" />,
          required: true,
        },
        {
          name: "foundedYear",
          label: "Founded Year",
          type: "number",
          placeholder: "YYYY",
          required: true,
        },
      ],
    },
    {
      id: 2,
      title: "Contact Information",
      description: "How can candidates reach you?",
      fields: [
        {
          name: "email",
          label: "Business Email",
          type: "email",
          placeholder: "contact@company.com",
          icon: <Mail className="w-5 h-5 text-gray-400" />,
          required: true,
        },
        {
          name: "phone",
          label: "Business Phone",
          type: "tel",
          placeholder: "+1 (555) 000-0000",
          icon: <Phone className="w-5 h-5 text-gray-400" />,
          required: true,
        },
        {
          name: "website",
          label: "Company Website",
          type: "url",
          placeholder: "https://",
          icon: <Globe className="w-5 h-5 text-gray-400" />,
        },
      ],
    },
    {
      id: 3,
      title: "Location",
      description: "Where is your company located?",
      fields: [
        {
          name: "address",
          label: "Street Address",
          type: "text",
          placeholder: "Enter street address",
          icon: <MapPin className="w-5 h-5 text-gray-400" />,
          required: true,
        },
        {
          name: "city",
          label: "City",
          type: "text",
          required: true,
        },
        {
          name: "state",
          label: "State/Province",
          type: "text",
          required: true,
        },
        {
          name: "country",
          label: "Country",
          type: "text",
          required: true,
        },
        {
          name: "postalCode",
          label: "Postal Code",
          type: "text",
          required: true,
        },
      ],
    },
    {
      id: 4,
      title: "Company Details",
      description: "Tell potential candidates about your company",
      fields: [
        {
          name: "description",
          label: "Company Description",
          type: "textarea",
          placeholder: "Tell us about your company...",
          required: true,
        },
        {
          name: "mission",
          label: "Company Mission",
          type: "textarea",
          placeholder: "What is your company's mission?",
          required: true,
        },
        {
          name: "benefits",
          label: "Employee Benefits",
          type: "textarea",
          placeholder: "What benefits do you offer?",
          required: true,
        },
      ],
    },
    {
      id: 5,
      title: "Success!",
      description: "Your business account has been created",
      isSuccess: true,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    // Move to success step instead of navigating immediately
    setCurrentStep(5);
  };

  const currentStepData = steps.find((step) => step.id === currentStep);

  // Check if all required fields in the current step are filled
  const isNextDisabled = currentStepData.fields
    ? currentStepData.fields.some(
        (field) => field.required && !formData[field.name]
      )
    : false;

  // Render success step content
  const renderSuccessStep = () => (
    <div className="text-center py-8">
      <div className="flex justify-center mb-6">
        <div className="bg-green-100 rounded-full p-3">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Welcome to the Business Community!
      </h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Your business account has been successfully created. You can now start
        posting jobs and connecting with potential candidates.
      </p>
      <button
        onClick={() => navigate("/business-dashboard")}
        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
      >
        Go to Dashboard
        <ChevronRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Progress Bar - Add fade out animation */}
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
                      ) : field.type === "textarea" ? (
                        <textarea
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          placeholder={field.placeholder}
                          rows={4}
                          className="block w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    Complete Setup
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

// Add keyframe animation for slide up effect
const styles = `
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default BusinessAccountCreation;
