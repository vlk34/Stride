import React, { useState } from "react";
import {
  CreditCard,
  Check,
  Download,
  Calendar,
  Clock,
  AlertCircle,
  ChevronRight,
  Users,
  FileText,
  BarChart3,
  Zap,
  Shield,
  Star,
} from "lucide-react";
import { Link } from "react-router";

const BusinessBilling = () => {
  const [activeTab, setActiveTab] = useState("plans");

  // Dummy data - replace with real data
  const currentPlan = {
    name: "Growth",
    price: 49,
    billingCycle: "monthly",
    nextBilling: "Oct 15, 2023",
    status: "Active",
  };

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: 0,
      description: "Perfect for small businesses just getting started",
      features: [
        "Up to 3 active job postings",
        "Basic applicant tracking",
        "Email support",
        "Standard job listing visibility",
        "Basic analytics",
      ],
      recommended: false,
    },
    {
      id: "growth",
      name: "Growth",
      price: 49,
      description: "Ideal for growing companies with regular hiring needs",
      features: [
        "Up to 10 active job postings",
        "Advanced applicant tracking",
        "AI-powered candidate matching",
        "Priority job listing placement",
        "Comprehensive analytics dashboard",
        "Email and chat support",
      ],
      recommended: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 99,
      description: "For organizations with high-volume recruiting needs",
      features: [
        "Unlimited job postings",
        "Advanced AI candidate screening",
        "Custom hiring workflows",
        "Dedicated account manager",
        "API access",
        "Premium analytics and reporting",
        "Team collaboration tools",
        "24/7 priority support",
      ],
      recommended: false,
    },
  ];

  const invoices = [
    {
      id: "INV-2023-001",
      date: "Sep 15, 2023",
      amount: "$49.00",
      status: "Paid",
      plan: "Growth Plan (Monthly)",
    },
    {
      id: "INV-2023-002",
      date: "Aug 15, 2023",
      amount: "$49.00",
      status: "Paid",
      plan: "Growth Plan (Monthly)",
    },
    {
      id: "INV-2023-003",
      date: "Jul 15, 2023",
      amount: "$49.00",
      status: "Paid",
      plan: "Growth Plan (Monthly)",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Plans</h1>
          <p className="text-gray-600">Manage your subscription and payments</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-8">
          {["plans", "payment", "invoices"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-1 font-medium capitalize ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Current Plan Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-gray-900">
                Current Plan: {currentPlan.name}
              </h2>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                {currentPlan.status}
              </span>
            </div>
            <p className="text-gray-600 mt-1">
              ${currentPlan.price}/month • Next billing on{" "}
              {currentPlan.nextBilling}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel Plan
            </button>
            {activeTab === "plans" && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Upgrade Plan
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "plans" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl border ${
                plan.recommended
                  ? "border-blue-500 ring-2 ring-blue-100"
                  : "border-gray-200"
              } p-6 relative flex flex-col`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Recommended
                </div>
              )}
              <h3 className="text-xl font-semibold text-gray-900 mt-2">
                {plan.name}
              </h3>
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-gray-600">
                  {plan.price > 0 ? "/month" : " Free"}
                </span>
              </div>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              <div className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto text-center">
                <button
                  className={`w-full px-6 py-2 rounded-lg transition-colors ${
                    currentPlan.name === plan.name
                      ? "bg-gray-100 text-gray-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {currentPlan.name === plan.name
                    ? "Current Plan"
                    : "Select Plan"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "payment" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Payment Methods
          </h2>

          {/* Current Payment Method */}
          <div className="border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                  Visa
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Visa ending in 4242
                  </p>
                  <p className="text-sm text-gray-600">Expires 12/2024</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  Default
                </span>
                <button className="text-gray-600 hover:text-gray-900">
                  Edit
                </button>
              </div>
            </div>
          </div>

          {/* Add New Payment Method */}
          <button className="w-full border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors">
            <CreditCard className="w-5 h-5" />
            <span>Add New Payment Method</span>
          </button>

          {/* Billing Address */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Billing Address
            </h3>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-gray-700">Acme Corporation</p>
              <p className="text-gray-700">123 Business Ave, Suite 100</p>
              <p className="text-gray-700">San Francisco, CA 94107</p>
              <p className="text-gray-700">United States</p>
              <button className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
                Edit Address
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "invoices" && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Billing History
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>Download All</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {invoice.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {invoice.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {invoice.plan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          invoice.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Usage Stats */}
      {activeTab === "plans" && (
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Current Usage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-700">Active Job Posts</h3>
                <span className="text-sm text-blue-600">3 of 10 used</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full w-[30%]"></div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-700">
                  AI Candidate Matches
                </h3>
                <span className="text-sm text-blue-600">45 of 100 used</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full w-[45%]"></div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-700">Team Members</h3>
                <span className="text-sm text-blue-600">2 of 5 used</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full w-[40%]"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plan Features */}
      {activeTab === "plans" && (
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            All Plan Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Job Postings</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Create and manage job listings with customizable templates and
                  distribution to multiple job boards.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Applicant Tracking
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Organize candidates through your hiring pipeline with
                  collaborative tools for your team.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  AI-Powered Matching
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Automatically identify the best candidates for your roles with
                  our advanced AI matching algorithm.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Analytics & Reporting
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Gain insights into your hiring process with detailed metrics
                  and customizable reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessBilling;
