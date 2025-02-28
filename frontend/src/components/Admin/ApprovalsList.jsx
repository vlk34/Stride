import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Building2, Calendar, ArrowRight, Search } from "lucide-react";

// Sample data directly in the component with all fields from BusinessAccountCreation
const sampleApplications = [
  {
    id: 1,
    companyName: "TechCorp Solutions",
    industry: "Technology",
    companySize: "51-200",
    foundedYear: "2015",
    email: "contact@techcorp.com",
    phone: "555-123-4567",
    website: "https://techcorp.example.com",
    address: "123 Tech Lane",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    postalCode: "94105",
    description:
      "We build enterprise software solutions for businesses of all sizes. Our focus is on creating intuitive, scalable applications that solve real-world problems.",
    mission:
      "To transform how businesses operate through innovative technology solutions that empower teams and drive growth.",
    benefits:
      "Competitive salary, health insurance, 401(k) matching, flexible work hours, remote work options, professional development budget, and team building events.",
    linkedin: "https://linkedin.com/company/techcorp",
    twitter: "https://twitter.com/techcorp",
    applicantName: "John Smith",
    date: "2023-11-15",
    status: "Pending",
  },
  {
    id: 2,
    companyName: "Green Earth Landscaping",
    industry: "Other",
    companySize: "11-50",
    foundedYear: "2010",
    email: "info@greenearth.com",
    phone: "555-987-6543",
    website: "https://greenearth.example.com",
    address: "456 Garden Road",
    city: "Portland",
    state: "OR",
    country: "USA",
    postalCode: "97201",
    description:
      "Green Earth Landscaping provides sustainable landscaping and garden design services for residential and commercial properties. We specialize in eco-friendly solutions that conserve water and promote biodiversity.",
    mission:
      "To create beautiful outdoor spaces that are environmentally responsible and sustainable for generations to come.",
    benefits:
      "Health insurance, paid time off, seasonal bonuses, employee discounts on plants and materials, and ongoing training in sustainable landscaping practices.",
    linkedin: "https://linkedin.com/company/greenearth",
    twitter: "https://twitter.com/greenearth",
    applicantName: "Sarah Johnson",
    date: "2023-11-18",
    status: "Pending",
  },
  {
    id: 3,
    companyName: "Bright Futures Education",
    industry: "Education",
    companySize: "11-50",
    foundedYear: "2018",
    email: "hello@brightfutures.edu",
    phone: "555-456-7890",
    website: "https://brightfutures.example.edu",
    address: "789 Learning Avenue",
    city: "Boston",
    state: "MA",
    country: "USA",
    postalCode: "02108",
    description:
      "Bright Futures Education is an innovative online learning platform designed for K-12 students. We combine cutting-edge technology with proven educational methodologies to deliver personalized learning experiences.",
    mission:
      "To make quality education accessible to all students, regardless of location or background, through technology-enabled personalized learning.",
    benefits:
      "Competitive salary, comprehensive health benefits, flexible work schedule, remote work options, education stipend, and parental leave.",
    linkedin: "https://linkedin.com/company/brightfutures",
    twitter: "https://twitter.com/brightfutures",
    applicantName: "Michael Brown",
    date: "2023-11-20",
    status: "Pending",
  },
];

const ApprovalsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleReviewClick = (id) => {
    // Find the application data
    const application = sampleApplications.find((app) => app.id === id);

    // Navigate to the review page with the application data
    navigate(`/admin/review/business/${id}`, {
      state: { applicationData: application },
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const filteredApplications = sampleApplications.filter(
    (app) =>
      app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-xl font-bold mb-4 md:mb-0">
          Business Account Applications
        </h1>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search applications..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No applications found
          </h3>
          <p className="text-gray-600">
            {searchTerm
              ? "No applications match your search criteria."
              : "There are no business applications to review at this time."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <tr
                  key={application.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Building2 className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {application.companyName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.industry}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {application.applicantName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {application.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {application.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleReviewClick(application.id)}
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                      >
                        Review
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApprovalsList;
