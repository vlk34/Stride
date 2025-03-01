import React from "react";
import { Routes, Route, Navigate } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomSignIn from "./pages/auth/CustomSignIn";
import CustomSignUp from "./pages/auth/CustomSignUp";
import Profile from "./pages/Profile";
import SavedJobs from "./pages/SavedJobs";
import Result from "./pages/Result";
import Home from "./pages/Home";
import CompanyProfile from "./pages/business/CompanyProfile";
import TermsOfService from "./pages/footer/TermsOfService";
import PrivacyPolicy from "./pages/footer/PrivacyPolicy";
import CookiePolicy from "./pages/footer/CookiePolicy";
import Accessibility from "./pages/footer/Accessibility";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminJobs from "./components/Admin/AdminJobs";
import { UserDataProvider } from "./contexts/UserDataContext";
import Help from "./pages/Help";
import BusinessUpgrade from "./pages/business/BusinessUpgrade";
import BusinessAccountCreation from "./pages/business/BusinessAccountCreation";
import BusinessDashboard from "./pages/business/BusinessDashboard";
import CreateJobListing from "./pages/business/CreateJobListing";
import BusinessRoute from "./components/Business/BusinessRoute";
import UnauthorizedAccess from "./pages/business/UnauthorizedAccess";
import AdminRoute from "./components/Admin/AdminRoute";
import AdminUnathorized from "./pages/admin/AdminUnathorized";
import Messages from "./pages/Messages";
import jobs from "./jobs";
import ManageJobs from "./pages/business/ManageJobs";
import Applicants from "./pages/business/Applicants";
import ReviewApplicant from "./pages/business/ReviewApplicant";
import BusinessProfile from "./pages/business/BusinessProfile";
import BusinessHelp from "./pages/business/BusinessHelp";
import SwitchToPersonal from "./pages/business/SwitchToPersonal";
import JobApplicants from "./pages/business/JobApplicants";
import EditJob from "./pages/business/EditJob";
import AllApplicants from "./pages/business/AllApplicants";
import { useUser } from "@clerk/clerk-react";
import PublicRoute from "./components/PublicRoute";
import ApprovalsList from "./components/Admin/ApprovalsList";
import ActivitiesList from "./components/Admin/ActivitiesList";
import BusinessApplicationReview from "./components/Admin/BusinessApplicationReview";
import EditCompany from "./pages/business/EditCompany";
import JobRecommendations from "./pages/JobRecommendations";
import BusinessMessages from "./pages/BusinessMessages";
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
        workstyle: "Remote",
        isVerified: true,
        postedAt: "2 days ago",
        companyLogo: "https://logo.clearbit.com/techcorp.com",
      },
      {
        id: 2,
        title: "Product Designer",
        company: "Design Studio",
        location: "Remote",
        salary: "$90k - $120k",
        type: "Full-time",
        workstyle: "Remote",
        isVerified: true,
        postedAt: "1 day ago",
        companyLogo: "https://logo.clearbit.com/designstudio.com",
      },
      {
        id: 3,
        title: "Backend Engineer",
        company: "Cloud Systems",
        location: "Austin, TX",
        salary: "$110k - $140k",
        type: "Full-time",
        workstyle: "Hybrid",
        isVerified: false,
        postedAt: "3 days ago",
        companyLogo: "https://logo.clearbit.com/cloudsystems.com",
      },
    ],
    trendingJobs: [
      {
        id: 5,
        title: "AI Engineer",
        company: "AI Solutions Ltd",
        location: "New York, NY",
        salary: "$130k - $160k",
        type: "Full-time",
        workstyle: "Hybrid",
        isVerified: true,
        postedAt: "3 days ago",
        companyLogo: "https://logo.clearbit.com/aisolutions.com",
      },
      {
        id: 6,
        title: "DevOps Specialist",
        company: "Infrastructure Inc",
        location: "Seattle, WA",
        salary: "$125k - $155k",
        type: "Full-time",
        workstyle: "Remote",
        isVerified: true,
        postedAt: "1 week ago",
        companyLogo: "https://logo.clearbit.com/infrastructureinc.com",
      },
    ],
    recentSearches: [
      {
        id: 1,
        query: "Frontend Developer",
        location: "San Francisco",
        timestamp: "Today",
        results: "24 jobs found",
      },
      {
        id: 2,
        query: "UX Designer",
        location: "Remote",
        timestamp: "Yesterday",
        results: "18 jobs found",
      },
      {
        id: 3,
        query: "Data Scientist",
        location: "New York",
        timestamp: "2 days ago",
        results: "32 jobs found",
      },
      {
        id: 4,
        query: "Product Manager",
        location: "Austin",
        timestamp: "3 days ago",
        results: "15 jobs found",
      },
    ],
    matchingCompanies: [
      {
        id: 1,
        name: "TechCorp Inc.",
        industry: "Technology",
        openPositions: 5,
        companyLogo: "https://logo.clearbit.com/techcorp.com",
      },
      // Add more companies...
    ],
  };

  const { user, isLoaded } = useUser();
  const role = user?.publicMetadata?.role;

  return (
    <UserDataProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/signin/*" element={<CustomSignIn />} />
        <Route path="/signup/*" element={<CustomSignUp />} />

        <Route element={<PublicRoute />}>
          <Route
            path="/"
            element={
              role === "business" ? (
                <Navigate to="/business/dashboard" replace />
              ) : role === "Admin" ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Home />
              )
            }
          />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/unauthorized" element={<UnauthorizedAccess />} />
          <Route path="/admin-unauthorized" element={<AdminUnathorized />} />
        </Route>

        <Route element={<PublicRoute hasFooter={false} />}>
          <Route
            path="/search"
            element={<JobRecommendations dummyData={dummyData} />}
          />
          <Route path="/result" element={<Result jobs={jobs} />} />
          <Route path="/help" element={<Help faqData={faqData} />} />
          <Route path="/jobs" element={<SavedJobs />} />
          <Route path="/company/:id" element={<CompanyProfile />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/business/upgrade" element={<BusinessUpgrade />} />
          <Route
            path="/business/account-creation"
            element={<BusinessAccountCreation />}
          />
        </Route>

        {/* Business routes */}
        <Route element={<BusinessRoute />}>
          <Route path="/business/dashboard" element={<BusinessDashboard />} />
          <Route path="/business/messages" element={<BusinessMessages />} />
          <Route
            path="/business/create-job-listing"
            element={<CreateJobListing />}
          />
          <Route
            path="/business/review-applicant/:id"
            element={<ReviewApplicant />}
          />
          <Route path="/business/profile" element={<BusinessProfile />} />
          <Route path="/business/help" element={<BusinessHelp />} />
          <Route
            path="/business/switch-to-personal"
            element={<SwitchToPersonal />}
          />
          <Route path="/business/manage/jobs" element={<ManageJobs />} />
          <Route path="/business/applicants" element={<Applicants />} />
          <Route
            path="/business/job-applicants/:id"
            element={<JobApplicants />}
          />
          <Route path="/business/edit-job/:id" element={<EditJob />} />
          <Route path="/business/all-applicants" element={<AllApplicants />} />
          <Route path="/business/edit-company" element={<EditCompany />} />
        </Route>

        {/* Admin routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/jobs" element={<AdminJobs jobs={jobs} />} />
          <Route path="/admin/approvals" element={<ApprovalsList />} />
          <Route path="/admin/activities" element={<ActivitiesList />} />
          <Route
            path="/admin/review/business/:id"
            element={<BusinessApplicationReview />}
          />
        </Route>
      </Routes>
    </UserDataProvider>
  );
};

export default App;
