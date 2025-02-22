import React from "react";
import { Link } from "react-router";
import Marquee from "react-fast-marquee";
import facebook from "../../assets/marphotos/facebook_logo_(2023).svg.png";
import boeing from "../../assets/marphotos/boeing.3037b0a6.png";
import dell from "../../assets/marphotos/dell.09332c44.png";
import ibm from "../../assets/marphotos/ibm.bcec6b9a.png";
import cicso from "../../assets/marphotos/download.png";
import microsoft from "../../assets/marphotos/microsoft.4a9a93f0.png";
import {
  Building2,
  Users,
  ClipboardList,
  BarChart3,
  Shield,
  CheckCircle,
} from "lucide-react";

const BusinessUpgrade = () => {
  const features = [
    {
      icon: <Building2 className="w-6 h-6 text-blue-600" />,
      title: "Company Verification",
      description:
        "Get your company officially verified on our platform, building trust with potential candidates.",
    },
    {
      icon: <ClipboardList className="w-6 h-6 text-blue-600" />,
      title: "Post Job Listings",
      description:
        "Create and manage job listings directly. Reach qualified candidates efficiently.",
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Applicant Management",
      description:
        "Access a comprehensive dashboard to review and manage job applications.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
      title: "Analytics & Insights",
      description:
        "Get detailed insights about your job postings and applicant engagement.",
    },
  ];

  const benefits = [
    "Unlimited job postings",
    "Advanced candidate filtering",
    "Company profile customization",
    "Priority support",
    "Applicant tracking system",
    "Team collaboration tools",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Upgrade to Business Account
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transform your hiring process with powerful tools and features
          designed for businesses.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">{feature.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white mb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            Everything You Need to Hire
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-200" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


      
        <div className=" mx-auto my-7">
          <Marquee autoFill gradient={true} gradientWidth={75}>
            <img
              src={facebook}
              alt="Facebook logo"
              className="w-20 sm:w-32 md:w-[10rem] mx-4 md:mx-12"
            />
            <img
              src={boeing}
              alt="Boeing logo"
              className="w-20 sm:w-32 md:w-[10rem] mx-4 md:mx-12"
            />
            <img
              src={dell}
              alt="Dell logo"
              className="w-20 sm:w-32 md:w-[10rem] mx-4 md:mx-12"
            />
            <img
              src={ibm}
              alt="IBM logo"
              className="w-20 sm:w-32 md:w-[10rem] mx-4 md:mx-12"
            />
            <img
              src={cicso}
              alt="Cicso logo"
              className="w-20 sm:w-32 md:w-[10rem] mx-4 md:mx-12"
            />
            <img
              src={microsoft}
              alt="Microsoft logo"
              className="w-20 sm:w-32 md:w-[10rem] mx-4 md:mx-12"
            />
          </Marquee>
        </div>
      



      {/* Trust Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
          <Shield className="w-5 h-5 text-blue-600" />
          <span className="text-blue-600 font-medium">
            Trusted by Companies
          </span>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join thousands of companies who trust our platform for their hiring
          needs
        </p>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <Link
          to="/business-account-creation"
          className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          Get Started with Business Account
        </Link>
        <p className="mt-4 text-sm text-gray-500">
          Have questions?{" "}
          <Link to="/contact" className="text-blue-600 hover:text-blue-700">
            Contact our sales team
          </Link>
        </p>
      </div>
    </div>
  );
};

export default BusinessUpgrade;
