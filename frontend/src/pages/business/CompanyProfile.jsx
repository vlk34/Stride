import React from "react";
import CompanyHeader from "../../components/companyComponents/CompanyHeader";
import CompanyAbout from "../../components/companyComponents/CompanyAbout";
import CompanyJobs from "../../components/companyComponents/CompanyJobs";
import CompanySidebar from "../../components/companyComponents/CompanySidebar";

const CompanyProfile = () => {
  // Example company data
  const companyData = {
    name: "Twitter",
    industry: "Technology",
    size: "1000-5000 employees",
    founded: "2006",
    headquarters: "San Francisco, CA",
    website: "twitter.com",
    description:
      "What's happening in the world and what people are talking about right now.",
    about:
      "Twitter is what's happening and what people are talking about right now. When it happens in the world, it happens on Twitter first. Whether it's breaking news, entertainment, sports, or everyday topics, only Twitter lets you connect with people anywhere in the world in real-time.",
    culture:
      "At Twitter, we believe in open communication, diversity, inclusion, and providing a safe and engaging platform for global conversation.",
    benefits: [
      "Comprehensive health insurance",
      "Flexible work arrangements",
      "Competitive salary and equity",
      "Professional development",
      "Generous parental leave",
      "Wellness programs",
    ],
    openPositions: [
      {
        id: 1,
        title: "Senior Product Designer",
        location: "Remote",
        type: "Full-time",
        workstyle: "Remote",
        postedAt: "2 days ago",
        applicants: 123,
      },
      {
        id: 2,
        title: "Frontend Engineer",
        location: "San Francisco",
        type: "Full-time",
        workstyle: "Hybrid",
        postedAt: "1 week ago",
        applicants: 89,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <CompanyHeader company={companyData} />
          <CompanyAbout
            about={companyData.about}
            culture={companyData.culture}
            benefits={companyData.benefits}
          />
          <CompanyJobs jobs={companyData.openPositions} />
        </div>
        <CompanySidebar company={companyData} />
      </div>
    </div>
  );
};

export default CompanyProfile;
