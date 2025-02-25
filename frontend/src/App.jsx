import React from "react";
import { Routes, Route } from "react-router";
import Layout from "./util/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomSignIn from "./pages/auth/CustomSignIn";
import CustomSignUp from "./pages/auth/CustomSignUp";
import Profile from "./pages/Profile";
import SavedJobs from "./pages/SavedJobs";
import Result from "./pages/Result";
import Home from "./pages/Home";
import CompanyProfile from "./pages/CompanyProfile";
import TermsOfService from "./pages/footer/TermsOfService";
import PrivacyPolicy from "./pages/footer/PrivacyPolicy";
import CookiePolicy from "./pages/footer/CookiePolicy";
import Accessibility from "./pages/footer/Accessibility";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminLayout from "./util/AdminLayout";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminJobs from "./components/Admin/AdminJobs";
import AdminBusiness from "./components/Admin/AdminBusiness";
import { UserDataProvider } from "./contexts/UserDataContext";
import Help from "./pages/Help";
import Search from "./pages/Search";
import BusinessUpgrade from "./pages/BusinessUpgrade";
import BusinessAccountCreation from "./pages/BusinessAccountCreation";
import BusinessDashboard from "./pages/BusinessDashboard";
import CreateJobListing from "./pages/CreateJobListing";
import BusinessRoute from "./components/BusinessRoute";
import UnauthorizedAccess from "./pages/UnauthorizedAccess";
import AdminRoute from "./components/AdminRoute";
import AdminUnathorized from "./pages/AdminUnathorized";
import Messages from "./pages/Messages";
import jobs from "./jobs";
import ManageJobs from "./pages/ManageJobs";
import Applicants from "./pages/Applicants";
import ReviewApplicant from "./pages/ReviewApplicant";
import BusinessProfile from "./pages/BusinessProfile";
import BusinessBilling from "./pages/BusinessBilling";
import BusinessHelp from "./pages/BusinessHelp";
const faqData = {
  categories: [
    {
      id: "account",
      name: "Account & Profile",
      questions: [
        {
          id: 1,
          question: "How do I create an account?",
          answer:
            "You can create an account by clicking the 'Sign Up' button in the top right corner. You'll need to provide your email address and create a password. You can also sign up using your Google or GitHub account for faster access.",
        },
        {
          id: 2,
          question: "How can I change my profile picture?",
          answer:
            "To change your profile picture, go to your profile page and hover over your current profile image. Click on the camera icon that appears, and you'll be directed to the profile settings where you can upload a new photo.",
        },
        {
          id: 3,
          question: "How do I update my personal information?",
          answer:
            "You can update your personal information by going to your profile page and clicking the 'Edit Profile' button. From there, you can modify your role, description, and about section.",
        },
        {
          id: 4,
          question: "Can I delete my account?",
          answer:
            "Yes, you can delete your account by going to your profile settings. Please note that this action is permanent and will remove all your data, including saved jobs and applications.",
        },
      ],
    },
    {
      id: "applications",
      name: "Job Applications",
      questions: [
        {
          id: 5,
          question: "How do I apply for a job?",
          answer:
            "To apply for a job, click on the job listing you're interested in and click the 'Apply Now' button. You'll need to fill out the application form and attach your resume. Make sure your profile is complete before applying.",
        },
        {
          id: 6,
          question: "Can I track my job applications?",
          answer:
            "Yes, you can track all your job applications in the 'My Applications' section of your profile. There you can see the status of each application and any messages from employers.",
        },
        {
          id: 7,
          question: "How do I withdraw my application?",
          answer:
            "You can withdraw your application by going to 'My Applications' and clicking the 'Withdraw' button next to the relevant application. Note that you cannot reapply for the same position after withdrawing.",
        },
      ],
    },
    {
      id: "jobs",
      name: "Finding Jobs",
      questions: [
        {
          id: 8,
          question: "How do I save a job for later?",
          answer:
            "To save a job, click the bookmark icon next to the job listing. You can find all your saved jobs in the 'Saved Jobs' section of your profile.",
        },
        {
          id: 9,
          question: "What do the different job tags mean?",
          answer:
            "Jobs are tagged with various indicators: 'Remote' means you can work from anywhere, 'Hybrid' means a mix of office and remote work, and 'On-site' means you need to work at the office. 'Verified' means the employer has been verified by our team.",
        },
        {
          id: 10,
          question: "How do I filter job searches?",
          answer:
            "You can filter jobs using the search bar and filter options at the top of the job listings page. Filter by location, job type, industry, and experience level to find the most relevant positions.",
        },
      ],
    },
    {
      id: "technical",
      name: "Technical Support",
      questions: [
        {
          id: 11,
          question: "What browsers are supported?",
          answer:
            "Our platform supports the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, we recommend keeping your browser updated to the latest version.",
        },
        {
          id: 12,
          question: "The site isn't loading properly. What should I do?",
          answer:
            "First, try clearing your browser cache and cookies. If the problem persists, try using a different browser or device. If you're still experiencing issues, please contact our support team.",
        },
      ],
    },
  ],
};

const App = () => {
  const dummyData = {
    recommendedJobs: [
      {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        salary: "$120k - $150k",
        type: "Full-time",
        postedAt: "2 days ago",
        logo: "https://logo.clearbit.com/techcorp.com",
      },
      {
        id: 2,
        title: "Product Designer",
        company: "Design Studio",
        location: "Remote",
        salary: "$90k - $120k",
        type: "Full-time",
        postedAt: "1 day ago",
        logo: "https://logo.clearbit.com/designstudio.com",
      },
      // Add more recommended jobs...
    ],
    trendingJobs: [
      {
        id: 3,
        title: "AI Engineer",
        company: "AI Solutions Ltd",
        location: "New York, NY",
        salary: "$130k - $160k",
        type: "Full-time",
        postedAt: "3 days ago",
        logo: "https://logo.clearbit.com/aisolutions.com",
      },
      // Add more trending jobs...
    ],
    recentSearches: [
      {
        id: 1,
        query: "Frontend Developer",
        location: "San Francisco",
        timestamp: "2024-03-10T10:00:00Z",
      },
      // Add more recent searches...
    ],
    matchingCompanies: [
      {
        id: 1,
        name: "TechCorp Inc.",
        industry: "Technology",
        openPositions: 5,
        logo: "https://logo.clearbit.com/techcorp.com",
      },
      // Add more companies...
    ],
  };

  return (
    <UserDataProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/signin/*" element={<CustomSignIn />} />
        <Route path="/signup/*" element={<CustomSignUp />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Result jobs={jobs} />} />
          <Route path="/help" element={<Help faqData={faqData} />} />
          <Route path="/jobs" element={<SavedJobs />} />
          <Route path="/company/:id" element={<CompanyProfile />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/search" element={<Search dummyData={dummyData} />} />
          <Route path="/unauthorized" element={<UnauthorizedAccess />} />
          <Route path="/admin-unauthorized" element={<AdminUnathorized />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/business-upgrade" element={<BusinessUpgrade />} />
            <Route path="/business-upgrade" element={<BusinessUpgrade />} />
            <Route
              path="/business-account-creation"
              element={<BusinessAccountCreation />}
            />
            <Route path="/manage-jobs" element={<ManageJobs />} />
            <Route path="/applicants" element={<Applicants />} />
          </Route>
        </Route>

        {/* Business routes */}
        <Route element={<BusinessRoute />}>
          <Route element={<Layout />}>
            <Route path="/business-dashboard" element={<BusinessDashboard />} />
            <Route path="/create-job-listing" element={<CreateJobListing />} />
            <Route path="/review-applicant/:id" element={<ReviewApplicant />} />
            <Route path="/business-profile" element={<BusinessProfile />} />
            <Route path="/business-billing" element={<BusinessBilling />} />
            <Route path="/business-help" element={<BusinessHelp />} />
          </Route>
        </Route>

        {/* Admin routes */}

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/jobs" element={<AdminJobs jobs={jobs} />} />
            <Route path="/admin/business" element={<AdminBusiness />} />
          </Route>
        </Route>
      </Routes>
    </UserDataProvider>
  );
};

export default App;
