import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search, Menu, Filter } from "lucide-react";

const Help = ({ faqData }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openQuestions, setOpenQuestions] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleQuestion = (questionId) => {
    setOpenQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const filteredQuestions = !searchTerm
    ? []
    : faqData.categories
        .flatMap((category) =>
          category.questions
            .filter(
              (question) =>
                question.question
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                question.answer.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((question) => ({
              ...question,
              categoryName: category.name,
            }))
        )
        .slice(0, 2);

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

        {/* Search Results */}
        <div className="max-w-2xl mx-auto h-[96px] px-4">
          {searchTerm ? (
            <div className="mt-4">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((question) => (
                    <button
                      key={question.id}
                      onClick={() => setSearchTerm("")}
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
          ) : (
            <div className="mt-4 text-gray-500 text-sm">
              Start typing to search through our frequently asked questions
            </div>
          )}
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

export default Help;
