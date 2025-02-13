import React from "react";

function ExperienceList() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Experience</h2>
      <ul className="space-y-4">
        <li>
          <strong>Lead Product Designer @ Airbnb</strong> (Full-time)
          <p className="text-sm text-gray-600">
            ...did amazing stuff...
          </p>
        </li>
        <li>
          <strong>Senior Interactions Designer @ Afterpay</strong> (Contract)
          <p className="text-sm text-gray-600">
            ...worked on user behavior, interface patterns...
          </p>
        </li>
        <li>
          <strong>Product Designer @ Amplitude</strong> (Internship)
          <p className="text-sm text-gray-600">
            ...assisted in user research, prototyping...
          </p>
        </li>
      </ul>
    </div>
  );
}

export default ExperienceList;
