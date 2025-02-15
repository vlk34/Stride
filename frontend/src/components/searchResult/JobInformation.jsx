import React, { useState } from "react";
import { Bookmark, BookmarkX } from "lucide-react";
import useSavedJobs from "../../hooks/useSavedJobs";
import useAppliedJobs from "../../hooks/useAppliedJobs";
import ApplicationModal from "../modals/ApplicationModal";

const JobInformation = ({ job }) => {
  const { saveJob, removeJob, isJobSaved } = useSavedJobs();
  const { applyJob, hasApplied } = useAppliedJobs();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!job)
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a job to view details
      </div>
    );

  const isSaved = isJobSaved(job.id);
  const isApplied = hasApplied(job.id);

  const handleSaveToggle = () => {
    if (isSaved) {
      removeJob(job.id);
    } else {
      saveJob(job);
    }
  };

  const handleApplicationSubmit = (applicationData) => {
    applyJob(job.id, { ...applicationData, job });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <img
              src={job.companyLogo}
              alt={`${job.company} logo`}
              className="w-10 h-10 object-contain"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSaveToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              isSaved
                ? "border-red-600 text-red-600 hover:bg-red-50"
                : "border-blue-600 text-blue-600 hover:bg-blue-50"
            }`}
          >
            {isSaved ? (
              <>
                <BookmarkX className="w-4 h-4" />
                Remove
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                Save
              </>
            )}
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={isApplied}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              isApplied
                ? "bg-green-600 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-3">Overview</h3>
          <p className="text-gray-600">{job.overview}</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">What You'll Do</h3>
          <ul className="space-y-2">
            {job.responsibilities.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">About {job.company}</h3>
          <p className="text-gray-600">{job.about}</p>
        </section>
      </div>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleApplicationSubmit}
        job={job}
      />
    </div>
  );
};

export default JobInformation;
