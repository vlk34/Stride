import React from "react";
import { MapPin, Clock, Users } from "lucide-react";

const CompanyJobs = ({ jobs }) => {
  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Open Positions</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
          >
            <h3 className="font-semibold text-lg">{job.title}</h3>

            <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{job.postedAt}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{job.applicants} applicants</span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span className="px-2 py-1 text-sm bg-blue-50 text-blue-600 rounded">
                {job.type}
              </span>
              <span className="px-2 py-1 text-sm bg-green-50 text-green-600 rounded">
                {job.workstyle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyJobs;
