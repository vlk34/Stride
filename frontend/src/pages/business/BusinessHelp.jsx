import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search, Filter } from "lucide-react";

const BusinessHelp = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openQuestions, setOpenQuestions] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Business-specific FAQ data
  const faqData = {
    categories: [
      {
        id: "jobs",
        name: "Job Postings & Management",
        questions: [
          {
            id: "jobs-1",
            question: "How do I create a new job posting?",
            answer:
              "To create a new job posting, navigate to the Manage Jobs page and click 'Create New Job'. Fill out the job details form including title, description, requirements, and benefits. You can save it as a draft or publish it immediately. Once published, it will be visible to potential candidates.",
          },
          {
            id: "jobs-2",
            question: "Can I edit a job posting after it's published?",
            answer:
              "Yes, you can edit a job posting after it's published. Go to the Manage Jobs page, find the job listing you want to modify, and click the Edit button. Make your changes and save them. The updated listing will be immediately visible to candidates.",
          },
          {
            id: "jobs-3",
            question: "How long do job postings remain active?",
            answer:
              "By default, job postings remain active for 30 days. You can manually extend or shorten this period from the Manage Jobs page. Jobs that reach their closing date will automatically be marked as 'Expired' but can be reactivated at any time.",
          },
          {
            id: "jobs-4",
            question:
              "What's the difference between Active, Draft, and Closed job statuses?",
            answer:
              "Active jobs are currently published and visible to candidates. Draft jobs are saved but not yet published. Closed jobs are no longer accepting applications but remain visible in your dashboard for reference. Expired jobs have reached their closing date.",
          },
          {
            id: "jobs-5",
            question: "How can I promote my job posting for more visibility?",
            answer:
              "You can promote your job posting by clicking the 'Boost' option on the Manage Jobs page. This will give your listing priority placement in search results and candidate recommendations. Boosting options vary by subscription plan.",
          },
        ],
      },
      {
        id: "applicants",
        name: "Applicant Tracking & Screening",
        questions: [
          {
            id: "applicants-1",
            question: "How does the AI matching technology work?",
            answer:
              "Our AI matching technology analyzes candidate resumes and profiles against your job requirements to identify the best matches. It considers skills, experience, education, and career trajectory to generate a match score. Candidates with higher scores are more likely to be a good fit for your position.",
          },
          {
            id: "applicants-2",
            question: "How can I review applicants for my job postings?",
            answer:
              "To review applicants, go to the Applicants page where you'll see all candidates organized by job posting. You can filter by status, match score, or search for specific candidates. Click on a candidate to view their full profile, resume, and application details.",
          },
          {
            id: "applicants-3",
            question: "Can I add notes or ratings to applicants?",
            answer:
              "Yes, you can add private notes and ratings to applicants. When viewing a candidate's profile, use the Notes section to add comments that are visible only to your team. You can also rate candidates on a 5-star scale to help with your evaluation process.",
          },
          {
            id: "applicants-4",
            question: "How do I move candidates through the hiring pipeline?",
            answer:
              "To move candidates through your hiring pipeline, view their profile and select 'Change Status' to update their stage (e.g., New, Reviewed, Interviewing, Offered, Rejected). You can also bulk update candidates from the Applicants page by selecting multiple profiles.",
          },
          {
            id: "applicants-5",
            question: "Can I export applicant data to other systems?",
            answer:
              "Yes, you can export applicant data in CSV or PDF format. From the Applicants page, select the candidates you wish to export and click the 'Export' button. You can choose which data fields to include in your export. For integration with ATS systems, check our API documentation.",
          },
        ],
      },
      {
        id: "analytics",
        name: "Analytics & Reporting",
        questions: [
          {
            id: "analytics-1",
            question: "What analytics are available for my job postings?",
            answer:
              "Our analytics dashboard provides insights on views, applications, and conversion rates for each job posting. You can see where candidates are coming from, how long they spend on your listings, and which positions are attracting the most qualified applicants.",
          },
          {
            id: "analytics-2",
            question: "How can I track the performance of my hiring process?",
            answer:
              "The Hiring Pipeline Analytics shows how candidates move through your recruitment stages, including time spent in each stage and drop-off rates. This helps identify bottlenecks in your process and opportunities for improvement.",
          },
          {
            id: "analytics-3",
            question: "Can I generate custom reports?",
            answer:
              "Yes, you can create custom reports by selecting specific metrics and date ranges in the Analytics section. Reports can be saved for future reference, scheduled for regular delivery to your email, or exported in CSV, PDF, or Excel formats.",
          },
        ],
      },
    ],
  };

  const toggleQuestion = (id) => {
    const newOpenQuestions = new Set(openQuestions);
    if (newOpenQuestions.has(id)) {
      newOpenQuestions.delete(id);
    } else {
      newOpenQuestions.add(id);
    }
    setOpenQuestions(newOpenQuestions);
  };

  // Filter questions based on selected category and search term
  const filteredQuestions = faqData.categories
    .filter(
      (category) =>
        selectedCategory === null || category.id === selectedCategory
    )
    .flatMap((category) => category.questions)
    .filter((question) =>
      question.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Welcome Section */}
      <div className="py-16 text-center bg-white rounded-b-lg mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          How can we help you?
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Search our help center for quick answers to your questions
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative px-4">
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
          />
          <Search className="w-5 h-5 absolute left-8 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Search Results with smooth height transition */}
        <div className="max-w-2xl mx-auto px-4">
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              searchTerm
                ? "mt-4 max-h-[200px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((question) => (
                  <button
                    key={question.id}
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory(question.categoryId);
                      toggleQuestion(question.id);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b last:border-b-0 transition-colors"
                  >
                    <p className="font-medium">{question.question}</p>
                    <p className="text-sm text-gray-500">
                      {question.categoryName}
                    </p>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500">
                  No results found for "{searchTerm}"
                </div>
              )}
            </div>
          </div>
          <div
            className={`mt-2 text-gray-500 text-sm transition-all duration-300 ${
              searchTerm ? "opacity-0 h-0" : "opacity-100 h-auto"
            }`}
          >
            Start typing to search through our frequently asked questions
          </div>
        </div>
      </div>

      {/* Mobile Category Menu Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <span className="font-medium text-gray-900">
            {selectedCategory
              ? faqData.categories.find((c) => c.id === selectedCategory)?.name
              : "All Categories"}
          </span>
          <Filter className="w-5 h-5 text-gray-500" />
        </button>

        {/* Mobile Category Menu */}
        {isMobileMenuOpen && (
          <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 transition-colors ${
                !selectedCategory
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50"
              }`}
            >
              All Categories
            </button>
            {faqData.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 transition-colors border-t ${
                  selectedCategory === category.id
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-8 pb-12">
        {/* Categories Sidebar - Desktop */}
        <div className="w-1/4 hidden lg:block">
          <div className="sticky top-20 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  !selectedCategory
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                All Categories
              </button>
              {faqData.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="flex-1">
          {(selectedCategory
            ? faqData.categories.filter((c) => c.id === selectedCategory)
            : faqData.categories
          ).map((category) => (
            <div key={category.id} className="mb-12 last:mb-0">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                {category.name}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:border-blue-200 transition-colors"
                  >
                    <button
                      onClick={() => toggleQuestion(faq.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-blue-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">
                        {faq.question}
                      </span>
                      {openQuestions.has(faq.id) ? (
                        <ChevronUp className="w-5 h-5 text-blue-500 flex-shrink-0 ml-4" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-blue-500 flex-shrink-0 ml-4" />
                      )}
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        openQuestions.has(faq.id)
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="px-4 pb-4 text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessHelp;
