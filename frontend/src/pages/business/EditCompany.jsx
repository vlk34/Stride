import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserData } from "../../contexts/UserDataContext";
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
  Image,
  Save,
  X,
  Heart,
  Award,
  Coffee,
  Calendar,
} from "lucide-react";

const EditCompany = () => {
  const navigate = useNavigate();
  const { localUserData, updateUserData } = useUserData();
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    // Basic Info
    companyName: "",
    tagline: "",
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
    about: "",
    culture: "",
    mission: "",

    // Benefits & Values
    benefits: [],
    values: [],

    // Social Media
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
  });

  // Initialize form with existing data
  useEffect(() => {
    // Populate form with existing company data
    if (localUserData) {
      setFormData({
        companyName: localUserData.companyName || "",
        tagline: localUserData.tagline || "",
        industry: localUserData.industry || "",
        companySize: localUserData.companySize || "",
        foundedYear: localUserData.foundedYear || "",
        email: localUserData.email || "",
        phone: localUserData.phone || "",
        website: localUserData.website || "",
        address: localUserData.address || "",
        city: localUserData.city || "",
        state: localUserData.state || "",
        country: localUserData.country || "",
        postalCode: localUserData.postalCode || "",
        description: localUserData.description || "",
        about: localUserData.about || "",
        culture: localUserData.culture || "",
        mission: localUserData.mission || "",
        benefits: localUserData.benefits || [],
        values: localUserData.values || [],
        linkedin: localUserData.linkedin || "",
        twitter: localUserData.twitter || "",
        facebook: localUserData.facebook || "",
        instagram: localUserData.instagram || "",
      });

      if (localUserData.imageUrl) {
        setLogoPreview(localUserData.imageUrl);
      }
    }
  }, [localUserData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        logo: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArrayItemChange = (type, index, value) => {
    const newArray = [...formData[type]];
    newArray[index] = value;

    setFormData((prev) => ({
      ...prev,
      [type]: newArray,
    }));
  };

  const addArrayItem = (type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], ""],
    }));
  };

  const removeArrayItem = (type, index) => {
    const newArray = [...formData[type]];
    newArray.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      [type]: newArray,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSuccessMessage("Company profile updated successfully!");
      setIsSubmitting(false);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Edit Company Profile
        </h1>
        <p className="text-gray-600">
          Update your company information and profile details
        </p>
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700">
          <CheckCircle className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-8">
          {[
            { id: "basic", label: "Basic Info" },
            { id: "contact", label: "Contact & Location" },
            { id: "details", label: "Company Details" },
            { id: "culture", label: "Culture & Benefits" },
            { id: "social", label: "Social Media" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-1 font-medium ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          {/* Basic Info Tab */}
          {activeTab === "basic" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

              {/* Company Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Logo
                </label>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Company logo preview"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Image className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <label className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors inline-block">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoChange}
                      />
                      Upload Logo
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      Recommended: Square image, at least 200x200px
                    </p>
                  </div>
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Company Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label
                  htmlFor="tagline"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tagline
                </label>
                <input
                  type="text"
                  id="tagline"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleInputChange}
                  placeholder="A short slogan for your company"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Industry */}
              <div>
                <label
                  htmlFor="industry"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Industry <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                  </div>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Media">Media</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Company Size */}
              <div>
                <label
                  htmlFor="companySize"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Company Size <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                  <select
                    id="companySize"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Company Size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>
              </div>

              {/* Founded Year */}
              <div>
                <label
                  htmlFor="foundedYear"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Founded Year
                </label>
                <input
                  type="number"
                  id="foundedYear"
                  name="foundedYear"
                  value={formData.foundedYear}
                  onChange={handleInputChange}
                  placeholder="YYYY"
                  min="1800"
                  max={new Date().getFullYear()}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* Contact & Location Tab */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">
                Contact Information
              </h2>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Business Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Business Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Website */}
              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Company Website
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://"
                    className="block w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4 mt-8">Location</h2>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Street Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* City, State, Country */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Postal Code */}
              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* Company Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Company Details</h2>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Short Description <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  A brief description of your company (shown in search results)
                </p>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={2}
                  maxLength={150}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {formData.description.length}/150 characters
                </p>
              </div>

              {/* About */}
              <div>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  About Us <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Detailed information about your company, history, and what you
                  do
                </p>
                <textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  rows={5}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Mission */}
              <div>
                <label
                  htmlFor="mission"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Company Mission
                </label>
                <textarea
                  id="mission"
                  name="mission"
                  value={formData.mission}
                  onChange={handleInputChange}
                  rows={3}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Culture */}
              <div>
                <label
                  htmlFor="culture"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Company Culture
                </label>
                <textarea
                  id="culture"
                  name="culture"
                  value={formData.culture}
                  onChange={handleInputChange}
                  rows={3}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* Culture & Benefits Tab */}
          {activeTab === "culture" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Company Values</h2>
              <p className="text-sm text-gray-600 mb-4">
                Add the core values that define your company culture
              </p>

              {/* Values */}
              <div className="space-y-3">
                {formData.values.map((value, index) => (
                  <div
                    key={`value-${index}`}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        handleArrayItemChange("values", index, e.target.value)
                      }
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Innovation, Teamwork, Excellence"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("values", index)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addArrayItem("values")}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  <span>+ Add Value</span>
                </button>
              </div>

              <h2 className="text-xl font-semibold mb-4 mt-8">
                Benefits & Perks
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                List the benefits and perks you offer to employees
              </p>

              {/* Benefits */}
              <div className="space-y-3">
                {formData.benefits.map((benefit, index) => (
                  <div
                    key={`benefit-${index}`}
                    className="flex items-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      {index % 4 === 0 && (
                        <Heart className="w-4 h-4 text-blue-600" />
                      )}
                      {index % 4 === 1 && (
                        <Award className="w-4 h-4 text-blue-600" />
                      )}
                      {index % 4 === 2 && (
                        <Coffee className="w-4 h-4 text-blue-600" />
                      )}
                      {index % 4 === 3 && (
                        <Calendar className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) =>
                        handleArrayItemChange("benefits", index, e.target.value)
                      }
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Health insurance, Remote work, Professional development"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("benefits", index)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addArrayItem("benefits")}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  <span>+ Add Benefit</span>
                </button>
              </div>
            </div>
          )}

          {/* Social Media Tab */}
          {activeTab === "social" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">
                Social Media Profiles
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Connect your social media accounts to enhance your company
                profile
              </p>

              {/* LinkedIn */}
              <div>
                <label
                  htmlFor="linkedin"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  LinkedIn
                </label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/company/yourcompany"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Twitter */}
              <div>
                <label
                  htmlFor="twitter"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Twitter
                </label>
                <input
                  type="url"
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/yourcompany"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Facebook */}
              <div>
                <label
                  htmlFor="facebook"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Facebook
                </label>
                <input
                  type="url"
                  id="facebook"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  placeholder="https://facebook.com/yourcompany"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Instagram */}
              <div>
                <label
                  htmlFor="instagram"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Instagram
                </label>
                <input
                  type="url"
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/yourcompany"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation and Submit Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            {activeTab !== "basic" && (
              <button
                type="button"
                onClick={() => {
                  const tabs = [
                    "basic",
                    "contact",
                    "details",
                    "culture",
                    "social",
                  ];
                  const currentIndex = tabs.indexOf(activeTab);
                  setActiveTab(tabs[currentIndex - 1]);
                }}
                className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            )}

            {activeTab !== "social" && (
              <button
                type="button"
                onClick={() => {
                  const tabs = [
                    "basic",
                    "contact",
                    "details",
                    "culture",
                    "social",
                  ];
                  const currentIndex = tabs.indexOf(activeTab);
                  setActiveTab(tabs[currentIndex + 1]);
                }}
                className="flex items-center gap-1 px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg text-blue-600 hover:bg-blue-100"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-white ${
              isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <Save className="w-5 h-5" />
            <span>{isSubmitting ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </form>

      {/* Cancel Button */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => navigate("/business/profile")}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          Cancel and return to profile
        </button>
      </div>
    </div>
  );
};

export default EditCompany;
