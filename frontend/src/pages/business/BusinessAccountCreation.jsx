import React, { useState, useRef } from "react";
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
  AlertCircle,
} from "lucide-react";
import { useUpgradeAccount } from "../../hooks/tanstack/useCompanyAccount";
import axios from "axios";

const BusinessAccountCreation = () => {
  const navigate = useNavigate();
  const upgradeAccount = useUpgradeAccount();
  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = useRef(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [formData, setFormData] = useState({
    // Company Basic Info
    companyName: "",
    industry: "",
    companySize: "",
    foundedYear: "",
    logo: null,

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

  // Add errors state
  const [errors, setErrors] = useState({});

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
          validation: (value) =>
            !value
              ? "Company name is required"
              : value.length < 2
              ? "Company name must be at least 2 characters"
              : value.length > 100
              ? "Company name must be less than 100 characters"
              : null,
        },
        {
          name: "logo",
          label: "Company Logo",
          type: "file",
          accept: "image/png, image/jpeg",
          description: "Upload your company logo (PNG or JPEG)",
          required: false,
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
          validation: (value) => (!value ? "Please select an industry" : null),
        },
        {
          name: "companySize",
          label: "Company Size",
          type: "select",
          options: ["1-10", "11-50", "51-200", "201-500", "500+"],
          icon: <Users className="w-5 h-5 text-gray-400" />,
          required: true,
          validation: (value) => (!value ? "Please select company size" : null),
        },
        {
          name: "foundedYear",
          label: "Founded Year",
          type: "number",
          placeholder: "YYYY",
          required: true,
          validation: (value) => {
            const currentYear = new Date().getFullYear();
            if (!value) return "Founded year is required";
            const year = parseInt(value);
            if (isNaN(year)) return "Please enter a valid year";
            if (year < 1800) return "Year must be 1800 or later";
            if (year > currentYear) return "Year cannot be in the future";
            return null;
          },
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
          validation: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return !value
              ? "Email is required"
              : !emailRegex.test(value)
              ? "Please enter a valid email address"
              : null;
          },
        },
        {
          name: "phone",
          label: "Business Phone",
          type: "tel",
          placeholder: "+1 (555) 000-0000",
          icon: <Phone className="w-5 h-5 text-gray-400" />,
          required: true,
          validation: (value) => {
            const phoneRegex = /^\+?[0-9\s\-\(\)]{8,20}$/;
            return !value
              ? "Phone number is required"
              : !phoneRegex.test(value)
              ? "Please enter a valid phone number"
              : null;
          },
        },
        {
          name: "website",
          label: "Company Website",
          type: "url",
          placeholder: "https://",
          icon: <Globe className="w-5 h-5 text-gray-400" />,
          validation: (value) => {
            if (!value) return null; // Not required
            const urlRegex =
              /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
            return !urlRegex.test(value) ? "Please enter a valid URL" : null;
          },
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
          validation: (value) =>
            !value
              ? "Street address is required"
              : value.length < 5
              ? "Please enter a complete address"
              : null,
        },
        {
          name: "city",
          label: "City",
          type: "text",
          required: true,
          validation: (value) =>
            !value
              ? "City is required"
              : value.length < 2
              ? "Please enter a valid city name"
              : null,
        },
        {
          name: "state",
          label: "State/Province",
          type: "text",
          required: true,
          validation: (value) => (!value ? "State/Province is required" : null),
        },
        {
          name: "country",
          label: "Country",
          type: "text",
          required: true,
          validation: (value) => (!value ? "Country is required" : null),
        },
        {
          name: "postalCode",
          label: "Postal Code",
          type: "text",
          required: true,
          validation: (value) =>
            !value
              ? "Postal code is required"
              : value.length < 3
              ? "Please enter a valid postal code"
              : null,
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
          validation: (value) =>
            !value
              ? "Company description is required"
              : value.length < 50
              ? "Description must be at least 50 characters"
              : value.length > 1000
              ? "Description must be less than 1000 characters"
              : null,
        },
        {
          name: "mission",
          label: "Company Mission",
          type: "textarea",
          placeholder: "What is your company's mission?",
          required: true,
          validation: (value) =>
            !value
              ? "Company mission is required"
              : value.length < 20
              ? "Mission statement must be at least 20 characters"
              : value.length > 500
              ? "Mission statement must be less than 500 characters"
              : null,
        },
        {
          name: "benefits",
          label: "Employee Benefits",
          type: "textarea",
          placeholder: "What benefits do you offer?",
          required: true,
          validation: (value) =>
            !value
              ? "Employee benefits are required"
              : value.length < 20
              ? "Benefits description must be at least 20 characters"
              : value.length > 500
              ? "Benefits description must be less than 500 characters"
              : null,
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

    // Validate field on change
    validateField(name, value);
  };

  // Validate a single field
  const validateField = (name, value) => {
    const field = steps
      .flatMap((step) => step.fields || [])
      .find((f) => f.name === name);

    if (field && field.validation) {
      const error = field.validation(value);
      setErrors((prev) => ({
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
    let newErrors = { ...errors };

    currentFields.forEach((field) => {
      if (field.validation) {
        const error = field.validation(formData[field.name]);
        newErrors[field.name] = error;
        if (error) isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep() && currentStep < steps.length) {
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

    setErrors(newErrors);

    if (!isValid) {
      alert("Please fix all errors before submitting");
      return;
    }

    // Format data according to the expected endpoint structure in endpoints.txt
    const formattedData = {
      company: formData.companyName,
      industry: formData.industry,
      size: formData.companySize,
      logo: formData.logo || null,
      founded: parseInt(formData.foundedYear),
      email: formData.email,
      phone: formData.phone,
      website: formData.website || "",
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      postal_code: formData.postalCode,
      description: formData.description,
      mission: formData.mission,
      benefits: formData.benefits,
    };

    try {
      await upgradeAccount.mutateAsync(formattedData);
      setCurrentStep(5);
    } catch (error) {
      console.error("Failed to create business account:", error);
      alert("Failed to create business account. Please try again.");
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is png or jpeg
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        logo: "Please upload a PNG or JPEG file",
      }));
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        logo: "File size must be less than 5MB",
      }));
      return;
    }

    // Clear any previous logo errors
    setErrors((prev) => ({
      ...prev,
      logo: null,
    }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload the file
    setUploadingLogo(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Store the image ID returned by the server
      setFormData((prev) => ({
        ...prev,
        logo: response.data.id,
      }));
      setUploadingLogo(false);
    } catch (error) {
      console.error("Error uploading logo:", error);
      setUploadingLogo(false);
      setErrors((prev) => ({
        ...prev,
        logo: "Failed to upload logo. Please try again.",
      }));
    }
  };

  const currentStepData = steps.find((step) => step.id === currentStep);

  // Check if all required fields in the current step are filled and valid
  const isNextDisabled = () => {
    if (!currentStepData.fields) return false;

    // Check if there are any validation errors in the current step
    const hasErrors = currentStepData.fields.some(
      (field) => errors[field.name]
    );

    // Check if required fields are filled
    const missingRequired = currentStepData.fields.some(
      (field) => field.required && !formData[field.name]
    );

    return hasErrors || missingRequired;
  };

  // Render success step content
  const renderSuccessStep = () => (
    <div className="text-center py-8">
      <div className="flex justify-center mb-6">
        <div className="bg-green-100 rounded-full p-3">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Business Account Application Submitted!
      </h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Thank you for your application. Our team will review your business
        information within 1-2 hours. You'll receive a notification once your
        account is approved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
      >
        Return to Homepage
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

                    {field.type === "file" ? (
                      <div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleLogoUpload}
                          accept={field.accept}
                          className="hidden"
                          id={field.name}
                        />

                        {logoPreview ? (
                          <div className="mb-3">
                            <div className="relative w-24 h-24 overflow-hidden rounded-md border border-gray-300">
                              <img
                                src={logoPreview}
                                alt="Logo preview"
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setLogoPreview(null);
                                  setFormData((prev) => ({
                                    ...prev,
                                    logo: null,
                                  }));
                                }}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        ) : null}

                        <button
                          type="button"
                          onClick={() => fileInputRef.current.click()}
                          disabled={uploadingLogo}
                          className={`flex items-center px-4 py-2 border border-gray-300 rounded-md ${
                            uploadingLogo ? "bg-gray-100" : "bg-white"
                          } hover:bg-gray-50`}
                        >
                          {uploadingLogo
                            ? "Uploading..."
                            : logoPreview
                            ? "Change Logo"
                            : "Upload Logo"}
                        </button>

                        {field.description && (
                          <p className="mt-1 text-sm text-gray-500">
                            {field.description}
                          </p>
                        )}

                        {errors[field.name] && (
                          <ErrorMessage message={errors[field.name]} />
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="relative">
                          {field.icon && (
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                                errors[field.name]
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } ${
                                field.icon ? "pl-10" : "pl-3"
                              } pr-3 py-2 focus:outline-none focus:ring-2 ${
                                errors[field.name]
                                  ? "focus:ring-red-500"
                                  : "focus:ring-blue-500"
                              } ${
                                errors[field.name]
                                  ? "focus:border-red-500"
                                  : "focus:border-blue-500"
                              }`}
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
                              id={field.name}
                              name={field.name}
                              value={formData[field.name]}
                              onChange={handleInputChange}
                              placeholder={field.placeholder}
                              rows={4}
                              className={`block w-full rounded-lg border ${
                                errors[field.name]
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } p-3 focus:outline-none focus:ring-2 ${
                                errors[field.name]
                                  ? "focus:ring-red-500"
                                  : "focus:ring-blue-500"
                              } ${
                                errors[field.name]
                                  ? "focus:border-red-500"
                                  : "focus:border-blue-500"
                              }`}
                              required={field.required}
                              onBlur={() =>
                                validateField(field.name, formData[field.name])
                              }
                            />
                          ) : (
                            <input
                              id={field.name}
                              type={field.type}
                              name={field.name}
                              value={formData[field.name]}
                              onChange={handleInputChange}
                              placeholder={field.placeholder}
                              className={`block w-full rounded-lg border ${
                                errors[field.name]
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } ${
                                field.icon ? "pl-10" : "pl-3"
                              } pr-3 py-2 focus:outline-none focus:ring-2 ${
                                errors[field.name]
                                  ? "focus:ring-red-500"
                                  : "focus:ring-blue-500"
                              } ${
                                errors[field.name]
                                  ? "focus:border-red-500"
                                  : "focus:border-blue-500"
                              }`}
                              required={field.required}
                              onBlur={() =>
                                validateField(field.name, formData[field.name])
                              }
                            />
                          )}
                        </div>

                        {errors[field.name] && (
                          <ErrorMessage message={errors[field.name]} />
                        )}
                      </>
                    )}
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
                    disabled={isNextDisabled()}
                    className={`flex items-center gap-2 px-6 py-2 ${
                      isNextDisabled()
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    } rounded-lg ml-auto`}
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
