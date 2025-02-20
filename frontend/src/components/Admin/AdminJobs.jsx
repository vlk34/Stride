import React from "react";

const ManageJobs = ({jobs}) => {
  // Define your mock or real data here

  return (
    <div className="bg-white rounded p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Manage Jobs</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Job ID</th>
            <th className="text-left p-3">Title</th>
            <th className="text-left p-3">company</th>
            <th className="text-left p-3">location</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{job.id}</td>
              <td className="p-3">{job.title}</td>
              <td className="p-3">{job.company}</td>
              <td className="p-3">{job.location}</td>
              <td className="p-3">
                <button className="text-blue-600 hover:underline mr-3">
                  Edit
                </button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageJobs;
