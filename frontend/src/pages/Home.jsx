import React from "react";
import Result from "./Result";
import twitter from "../../assets/twitter.png";
import facebook from "../../assets/Facebook_logo.png";
const jobs = [
  {
    id: 1,
    title: "Product Designer",
    company: "Twitter",
    companyLogo: twitter,
    location: "Berlin",
    type: "Full-time",
    rating: 3.3,
    applicants: 23,
    isVerified: true,
    overview: "Twitter is looking for a Product Designer...",
    responsibilities: [
      "Design and iterate intuitive digital products",
      "Collaborate with cross-functional teams",
      // ...more responsibilities
    ],
    about: "Twitter is a social media platform...",
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "Facebook",
    companyLogo: facebook,
    location: "USA",
    type: "Full-time",
    rating: 4.6,
    applicants: 105,
    isVerified: true,
    overview: "Facebook is looking for a Software Engineer...",
    responsibilities: [
      "Design and iterate intuitive digital products",
      "Collaborate with cross-functional teams",
      // ...more responsibilities
    ],
    about: "Facebook is a social media platform...",
  },
  {
    id: 3,
    title: "Software Tester",
    company: "Instagram",
    companyLogo: twitter,
    location: "Turkey",
    type: "Part-time",
    rating: 4.1,
    applicants: 36,
    isVerified: true,
    overview: "Facebook is looking for a Software Engineer...",
    responsibilities: [
      "Design and iterate intuitive digital products",
      "Collaborate with cross-functional teams",
      // ...more responsibilities
    ],
    about: "Facebook is a social media platform...",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Kadir Has",
    companyLogo: facebook,
    location: "Turkey",
    type: "Intern",
    rating: 1.2,
    applicants: 51,
    isVerified: true,
    overview: "Kadir Has is looking for a Software Engineer...",
    responsibilities: [
      "Design and iterate intuitive digital products",
      "Collaborate with cross-functional teams",
      // ...more responsibilities
    ],
    about: "Facebook is a social media platform...",
  },
  // ...more jobs
];

const Home = () => {
  return (
    <div className="space-y-4">
      <Result jobs={jobs} />
    </div>
  );
};

export default Home;
