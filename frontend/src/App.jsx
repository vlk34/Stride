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
import ForgotPassword from "./pages/auth/ForgotPassword";
import AddJob from "./pages/business/AddJob";
import Home from "./pages/Home";
import CompanyProfile from "./pages/CompanyProfile";
import TermsOfService from "./pages/footer/TermsOfService";
import PrivacyPolicy from "./pages/footer/PrivacyPolicy";
import CookiePolicy from "./pages/footer/CookiePolicy";
import Accessibility from "./pages/footer/Accessibility";
import Admin from "./pages/Admin";
/* import AdminJobs from "./pages/AdminJobs";
import AdminUsers from "./pages/AdminUsers"; */
import AdminLayout from "./util/AdminLayout";
import AdminDashboard from "./components/Admin/AdminDashboard";

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
    ],
    about:
      "Twitter is where the world comes to share ideas and stay informed. Our purpose is to serve the public conversation – it's essential to connecting the world. We're committed to protecting the health of the public conversation while respecting fundamental human rights. Our team of passionate individuals works together to create products that have real-world impact. Join us in building the future of public discourse.",
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
];

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/signin/*" element={<CustomSignIn />} />
      <Route path="/signup/*" element={<CustomSignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Result jobs={jobs} />} />
          <Route path="/jobs" element={<SavedJobs />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/company/:id" element={<CompanyProfile />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/accessibility" element={<Accessibility />} />
          
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          {/* <Route path="/admin/jobs" element={<AdminJobs />} />
          <Route path="/admin/users" element={<AdminUsers />} /> */}
        </Route>




      </Route>
    </Routes>
  );
};

export default App;
