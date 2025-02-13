import React from "react";

function ProfileSidebar() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">People you may know</h3>
        <ul className="space-y-2">
          <li>Christopher Nolan - Premium</li>
          <li>Jessica Milla</li>
          <li>Cecilia Vangeline</li>
        </ul>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Opening job positions</h3>
        <ul className="space-y-2">
          <li>Product Designer @ Alibaba</li>
          <li>Interactions Designer @ Amplitude</li>
          <li>m/x Designer @ Adobe Corp</li>
        </ul>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Company Info</h3>
        <p>
          Makara is an Indonesia’s no.1 Software-as-a-Service (SaaS) company...
        </p>
      </div>
    </div>
  );
}

export default ProfileSidebar;
