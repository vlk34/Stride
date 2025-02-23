import React from "react";
import { Routes, Route } from "react-router";
import Layout from "./util/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomSignIn from "./pages/auth/CustomSignIn";
import CustomSignUp from "./pages/auth/CustomSignUp";
import Profile from "./pages/Profile";
import SavedJobs from "./pages/SavedJobs";
import Result from "./pages/Result";
import twitter from "../assets/twitter.png";
import facebook from "../assets/Facebook_logo.png";
import AddJob from "./pages/business/AddJob";
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

const jobs = [
  {
    id: 1,
    title: "Senior Product Designer",
    company: "Twitter",
    companyLogo: twitter,
    location: "Berlin",
    workstyle: "Remote",
    type: "Full-time",
    industry: "Technology",
    experience: "5+ years",
    rating: 4.3,
    applicants: 123,
    isVerified: true,
    overview:
      "Twitter is looking for a Senior Product Designer to join our growing design team in Berlin. In this role, you'll be responsible for leading the design of key features that millions of people use daily. You'll work closely with product managers, engineers, and researchers to create intuitive and impactful user experiences that shape the future of public conversation.",
    responsibilities: [
      "Lead the end-to-end design process for major product initiatives",
      "Create user flows, wireframes, and high-fidelity prototypes",
      "Conduct and participate in design critiques to ensure high-quality solutions",
      "Mentor junior designers and contribute to our design system",
      "Collaborate with research teams to gather and incorporate user feedback",
      "Present design solutions to senior stakeholders and executive team",
      "Partner with engineering to ensure pixel-perfect implementation",
      "Contribute to strategic product decisions and roadmap planning",
      "Lead the end-to-end design process for major product initiatives",
      "Create user flows, wireframes, and high-fidelity prototypes",
      "Conduct and participate in design critiques to ensure high-quality solutions",
      "Mentor junior designers and contribute to our design system",
      "Collaborate with research teams to gather and incorporate user feedback",
      "Present design solutions to senior stakeholders and executive team",
      "Partner with engineering to ensure pixel-perfect implementation",
      "Contribute to strategic product decisions and roadmap planning",
      "Lead the end-to-end design process for major product initiatives",
      "Create user flows, wireframes, and high-fidelity prototypes",
      "Conduct and participate in design critiques to ensure high-quality solutions",
      "Mentor junior designers and contribute to our design system",
      "Collaborate with research teams to gather and incorporate user feedback",
      "Present design solutions to senior stakeholders and executive team",
      "Partner with engineering to ensure pixel-perfect implementation",
      "Contribute to strategic product decisions and roadmap planning",
      "Lead the end-to-end design process for major product initiatives",
      "Create user flows, wireframes, and high-fidelity prototypes",
      "Conduct and participate in design critiques to ensure high-quality solutions",
      "Mentor junior designers and contribute to our design system",
      "Collaborate with research teams to gather and incorporate user feedback",
      "Present design solutions to senior stakeholders and executive team",
      "Partner with engineering to ensure pixel-perfect implementation",
      "Contribute to strategic product decisions and roadmap planning",
      "Lead the end-to-end design process for major product initiatives",
      "Create user flows, wireframes, and high-fidelity prototypes",
      "Conduct and participate in design critiques to ensure high-quality solutions",
      "Mentor junior designers and contribute to our design system",
      "Collaborate with research teams to gather and incorporate user feedback",
      "Present design solutions to senior stakeholders and executive team",
      "Partner with engineering to ensure pixel-perfect implementation",
      "Contribute to strategic product decisions and roadmap planning",
    ],
    about:
      "Lorem Ipsum Twitter is where the world comes to share ideas and stay informed. Our purpose is to serve the public conversation – it's essential to connecting the world. We're committed to protecting the health of the public conversation while respecting fundamental human rights. Our team of passionate individuals works together to create products that have real-world impact.  Twitter is where the world comes to sha  Twitter is where the world comes to sha  Twitter is where the world comes to sha  Twitter is where the world comes to sha  Twitter is where the world comes to sha Twitter is where the world comes to sha Twitter is where the world comes to sha Twitter is where the world comes to sha Twitter is where the world comes to sha Twitter is where the world comes to sha Twitter is where the world comes to shaJoin us in building the future of public discourse.",
  },
  {
    id: 2,
    title: "Senior Software Engineer, Frontend",
    company: "Facebook",
    companyLogo: facebook,
    location: "Menlo Park",
    workstyle: "Hybrid",
    type: "Full-time",
    industry: "Technology",
    experience: "5+ years",
    rating: 4.6,
    applicants: 305,
    isVerified: true,
    overview:
      "Meta is seeking an experienced Frontend Engineer to join our News Feed team. You'll be working on features that billions of people use every day, building high-performance user interfaces and contributing to our next-generation web application framework. This is an opportunity to shape the future of how people connect and share online.",
    responsibilities: [
      "Architect and implement complex frontend features using React and modern JavaScript",
      "Optimize application performance and ensure cross-browser compatibility",
      "Write clean, maintainable code with comprehensive test coverage",
      "Collaborate with designers to implement pixel-perfect, responsive interfaces",
      "Mentor junior engineers and conduct code reviews",
      "Contribute to technical design discussions and architecture decisions",
      "Work with product managers to define technical requirements",
      "Participate in our engineering on-call rotation",
      "Drive best practices and technical innovations across the team",
    ],
    about:
      "Meta builds technologies that help people connect, find communities, and grow businesses. When Facebook launched in 2004, it changed the way people connect. Apps like Messenger, Instagram and WhatsApp further empowered billions around the world. Now, Meta is moving beyond 2D screens toward immersive experiences like augmented and virtual reality to help build the next evolution in social technology.",
  },
  {
    id: 3,
    title: "QA Automation Engineer",
    company: "Instagram",
    companyLogo: twitter,
    location: "San Francisco",
    workstyle: "On-site",
    type: "Contract",
    industry: "Technology",
    experience: "3-5 years",
    rating: 4.1,
    applicants: 186,
    isVerified: true,
    overview:
      "Instagram is looking for a QA Automation Engineer to join our Stories team. You'll be responsible for building and maintaining our automated testing framework, ensuring the quality and reliability of our features that reach millions of users. This role combines technical expertise with a keen eye for user experience.",
    responsibilities: [
      "Develop and maintain automated test suites using Python and JavaScript",
      "Design and implement test frameworks for web and mobile applications",
      "Create comprehensive test plans and test cases for new features",
      "Perform exploratory testing and identify potential issues",
      "Work with developers to debug and resolve product issues",
      "Monitor and analyze test results to identify patterns and areas for improvement",
      "Implement performance testing and monitoring solutions",
      "Document testing procedures and maintain test documentation",
      "Collaborate with cross-functional teams to ensure quality standards",
    ],
    about:
      "Instagram is the world's leading photo-sharing platform, home to more than a billion users worldwide. Our mission is to bring you closer to the people and things you love. We're committed to fostering a positive, diverse, and safe community where people can express themselves freely and creatively.",
  },
  {
    id: 4,
    title: "Junior UI/UX Designer",
    company: "Kadir Has University",
    companyLogo: facebook,
    location: "Istanbul",
    workstyle: "On-site",
    type: "Internship",
    industry: "Education",
    experience: "0-1 years",
    rating: 4.2,
    applicants: 51,
    isVerified: true,
    overview:
      "Kadir Has University is seeking a talented Junior UI/UX Designer to join our digital transformation team. This role offers an excellent opportunity for someone starting their design career to work on meaningful projects that impact thousands of students and faculty members. You'll be involved in redesigning our digital platforms and creating new tools for education.",
    responsibilities: [
      "Create user-centered designs for web and mobile applications",
      "Develop wireframes and prototypes for new features and improvements",
      "Conduct user research and usability testing",
      "Create and maintain design documentation and style guides",
      "Collaborate with developers to ensure design feasibility",
      "Participate in design sprints and brainstorming sessions",
      "Help maintain consistency across all university digital platforms",
      "Gather and analyze user feedback to improve designs",
    ],
    about:
      "Kadir Has University is one of Turkey's leading private universities, committed to providing world-class education and research opportunities. Founded in 1997, we have grown to become a center of academic excellence, combining traditional educational values with innovative approaches to learning and technology. Our campus in the heart of Istanbul serves as a hub for intellectual and cultural exchange.",
  },
  {
    id: 5,
    title: "Junior UI/UX Designer",
    company: "Kadir Has University",
    companyLogo: facebook,
    location: "Istanbul",
    workstyle: "On-site",
    type: "Internship",
    industry: "Education",
    experience: "0-1 years",
    rating: 4.2,
    applicants: 51,
    isVerified: true,
    overview:
      "Kadir Has University is seeking a talented Junior UI/UX Designer to join our digital transformation team. This role offers an excellent opportunity for someone starting their design career to work on meaningful projects that impact thousands of students and faculty members. You'll be involved in redesigning our digital platforms and creating new tools for education.",
    responsibilities: [
      "Create user-centered designs for web and mobile applications",
      "Develop wireframes and prototypes for new features and improvements",
      "Conduct user research and usability testing",
      "Create and maintain design documentation and style guides",
      "Collaborate with developers to ensure design feasibility",
      "Participate in design sprints and brainstorming sessions",
      "Help maintain consistency across all university digital platforms",
      "Gather and analyze user feedback to improve designs",
    ],
    about:
      "Kadir Has University is one of Turkey's leading private universities, committed to providing world-class education and research opportunities. Founded in 1997, we have grown to become a center of academic excellence, combining traditional educational values with innovative approaches to learning and technology. Our campus in the heart of Istanbul serves as a hub for intellectual and cultural exchange.",
  },
  {
    id: 6,
    title: "Junior UI/UX Designer",
    company: "Kadir Has University",
    companyLogo: facebook,
    location: "Istanbul",
    workstyle: "On-site",
    type: "Internship",
    industry: "Education",
    experience: "0-1 years",
    rating: 4.2,
    applicants: 51,
    isVerified: true,
    overview:
      "Kadir Has University is seeking a talented Junior UI/UX Designer to join our digital transformation team. This role offers an excellent opportunity for someone starting their design career to work on meaningful projects that impact thousands of students and faculty members. You'll be involved in redesigning our digital platforms and creating new tools for education.",
    responsibilities: [
      "Create user-centered designs for web and mobile applications",
      "Develop wireframes and prototypes for new features and improvements",
      "Conduct user research and usability testing",
      "Create and maintain design documentation and style guides",
      "Collaborate with developers to ensure design feasibility",
      "Participate in design sprints and brainstorming sessions",
      "Help maintain consistency across all university digital platforms",
      "Gather and analyze user feedback to improve designs",
    ],
    about:
      "Kadir Has University is one of Turkey's leading private universities, committed to providing world-class education and research opportunities. Founded in 1997, we have grown to become a center of academic excellence, combining traditional educational values with innovative approaches to learning and technology. Our campus in the heart of Istanbul serves as a hub for intellectual and cultural exchange.",
  },
];

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
            <Route path="/business-upgrade" element={<BusinessUpgrade />} />
            <Route
              path="/business-account-creation"
              element={<BusinessAccountCreation />}
            />
          </Route>
        </Route>

        {/* Business routes */}
        <Route element={<BusinessRoute />}>
          <Route element={<Layout />}>
            <Route path="/business-dashboard" element={<BusinessDashboard />} />
            <Route path="/create-job-listing" element={<CreateJobListing />} />
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
