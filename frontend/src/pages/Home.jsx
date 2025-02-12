import React from "react";
import Result from "../components/searchResult/Result";
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
  // ...more jobs
];

const Home = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Home Page</h1>
      <p>Welcome to our application!</p>
      <Result jobs={jobs} />;
    </div>
  );
};

export default Home;
