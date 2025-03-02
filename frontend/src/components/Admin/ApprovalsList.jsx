import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Building2, Calendar, ArrowRight, Search, Filter, MoreVertical } from "lucide-react";

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
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeActionMenu, setActiveActionMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleReviewClick = (id) => {
    // Find the application data
    const application = sampleApplications.find((app) => app.id === id);
    
    // Close any open action menu
    setActiveActionMenu(null);

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

  const toggleActionMenu = (appId) => {
    setActiveActionMenu(activeActionMenu === appId ? null : appId);
  };

  const filteredApplications = sampleApplications.filter(
    (app) =>
      (app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       app.industry.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "All" || app.status === statusFilter)
  );

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-lg sm:text-xl font-bold mb-4 sm:mb-0">
          Business Account Applications
        </h1>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search applications..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <Filter className="text-gray-400 w-5 h-5 mr-2" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Declined">Declined</option>
            </select>
          </div>
        </div>
      </div>

      {/* Custom styles for breakpoints */}
      <style jsx>{`
        @media (min-width: 1200px) {
          .custom-lg-visible {
            display: block;
          }
          .custom-md-visible {
            display: none;
          }
        }
        @media (max-width: 1199px) and (min-width: 768px) {
          .custom-lg-visible {
            display: none;
          }
          .custom-md-visible {
            display: block;
          }
        }
      `}</style>

      {/* No applications message */}
      {filteredApplications.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No applications found
          </h3>
          <p className="text-gray-600">
            {searchTerm || statusFilter !== "All"
              ? "No applications match your search criteria."
              : "There are no business applications to review at this time."}
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          {/* Large screen full table */}
          <div className="hidden lg:hidden custom-lg-visible">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{application.companyName}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {application.industry}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-gray-900">{application.applicantName}</div>
                      <div className="text-sm text-gray-500">{application.email}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {application.date}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleReviewClick(application.id)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Review"
                      >
                        Review
    
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Medium screen simplified table */}
          <div className="hidden md:block lg:block custom-md-visible">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                    Business
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    Applicant
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    Status
                  </th>
                  <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium truncate">{application.companyName}</div>
                        <div className="text-sm text-gray-500">{application.industry}</div>
                      </div>
                    </td>
                    <td className="px-2 py-3">
                      <div className="truncate">{application.applicantName}</div>
                    </td>
                    <td className="px-2 py-3">
                      <div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            application.status
                          )}`}
                        >
                          {application.status}
                        </span>
                        <div className="text-xs text-gray-500 mt-1 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {application.date}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3 text-right">
                      <button
                        onClick={() => handleReviewClick(application.id)}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 p-1"
                      >
                        Review
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Small screen card layout */}
          <div className="md:hidden">
            <div className="divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <div key={application.id} className="p-4 bg-white relative hover:bg-gray-50">
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => toggleActionMenu(application.id)}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>
                    
                    {/* Mobile Action Menu */}
                    {activeActionMenu === application.id && (
                      <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-lg py-1 w-32 z-10">
                        <button
                          onClick={() => handleReviewClick(application.id)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center text-blue-600"
                        >
                          <ArrowRight className="w-4 h-4 mr-2" /> Review
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-3 pr-8">
                    <h3 className="font-medium text-lg">{application.companyName}</h3>
                    <p className="text-gray-600 text-sm">{application.industry}</p>
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm">
                      <div>{application.applicantName}</div>
                      <div className="text-gray-500 text-xs">{application.email}</div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" /> {application.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalsList;
