import React from "react";
import {
  Users,
  Briefcase,
  Building2,
  ChevronRight,
  AlertTriangle,
  Menu,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

// Import the sample applications data to share between components
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

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Dummy data for stats and recent activities
  const stats = [
    {
      title: "Total Users",
      value: "123",
      icon: <Users className="w-5 h-5 text-blue-600" />,
    },
    {
      title: "Job Posts",
      value: "45",
      icon: <Briefcase className="w-5 h-5 text-blue-600" />,
    },
    {
      title: "Business Applications",
      value: "12",
      icon: <Building2 className="w-5 h-5 text-blue-600" />,
    },
  ];

  // Map the sample applications to the pendingApprovals format
  const pendingApprovals = [
    {
      id: 1,
      type: "Business Application",
      name: "TechCorp Solutions",
      submitted: "2 days ago",
    },
    {
      id: 2,
      type: "Business Application",
      name: "Green Earth Landscaping",
      submitted: "1 day ago",
    },
    {
      id: 3,
      type: "Business Application",
      name: "Bright Futures Education",
      submitted: "5 hours ago",
    },
  ];

  const recentActivities = [
    { id: 1, activity: "User 'Alice Smith' registered", time: "2 hours ago" },
    { id: 2, activity: "Job post #101 approved", time: "3 hours ago" },
    {
      id: 3,
      activity: "Business application from 'XYZ Inc.' submitted",
      time: "5 hours ago",
    },
  ];

  // Handle review click with data passing
  const handleReviewClick = (id) => {
    // Find the application data
    const application = sampleApplications.find((app) => app.id === id);

    // Navigate to the review page with the application data
    navigate(`/admin/review/business/${id}`, {
      state: { applicationData: application },
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
        <h1 className="text-xl font-bold mb-4 sm:mb-6">Admin Dashboard</h1>

        {/* Stats Section - Already responsive but with improved spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200 transition-all hover:shadow-md"
            >
              <div className="flex items-center mb-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  {stat.icon}
                </div>
                <span className="ml-2 text-gray-600">{stat.title}</span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Pending Approvals Section - Now more responsive */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center mb-2 sm:mb-0">
              <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
              Pending Business Applications
            </h2>
            <Link
              to="/admin/approvals"
              className="text-blue-600 text-sm flex items-center self-end sm:self-auto"
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {/* Responsive table container */}
          <div className="border rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="hidden sm:table-cell px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingApprovals.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-4 py-3">{item.type}</td>
                    <td className="px-3 sm:px-4 py-3 font-medium">{item.name}</td>
                    <td className="hidden sm:table-cell px-3 sm:px-4 py-3 text-gray-500">
                      {item.submitted}
                    </td>
                    <td className="px-3 sm:px-4 py-3 text-right">
                      <button
                        onClick={() => handleReviewClick(item.id)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-800 px-3 py-1 rounded transition-colors"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mobile-only timestamp display */}
          <div className="sm:hidden mt-2">
            {pendingApprovals.map((item) => (
              <div key={`mobile-${item.id}`} className="text-xs text-gray-500 pl-2 mb-1">
                {item.name}: {item.submitted}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities Section - Now more responsive */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-lg font-semibold mb-2 sm:mb-0">Recent Activities</h2>
            <Link
              to="/admin/activities"
              className="text-blue-600 text-sm flex items-center self-end sm:self-auto"
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {/* Activities for larger screens */}
          <div className="hidden sm:block border rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentActivities.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{item.activity}</td>
                    <td className="px-4 py-3 text-right text-gray-500">
                      {item.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Activities for mobile screens */}
          <div className="sm:hidden space-y-3">
            {recentActivities.map((item) => (
              <div key={item.id} className="border p-3 rounded-lg bg-gray-50">
                <div className="font-medium mb-1">{item.activity}</div>
                <div className="text-xs text-gray-500">{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
