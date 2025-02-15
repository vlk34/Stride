import React from "react";
import photo from "../../../assets/photo.jpg";

const PeopleCard = ({
  name,
  avatar,
  isPremium,
  mutualConnections,
  mutualConnectionNames,
}) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <img src={photo} alt={name} className="w-10 h-10 rounded-full" />

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-medium">{name}</span>
            {isPremium && (
              <span className="px-2 py-0.5 text-xs bg-orange-100 text-orange-700 rounded">
                Premium
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500 pr-2">
            {mutualConnectionNames.map((name, index) => (
              <React.Fragment key={index}>
                {index > 0 && index === mutualConnectionNames.length - 1 && (
                  <span className="mx-1">and</span>
                )}
                {index > 0 && index < mutualConnectionNames.length - 1 && (
                  <span>, </span>
                )}
                <span>{name}</span>
              </React.Fragment>
            ))}
            <span className="mx-1">also</span>
            <span>{mutualConnections} mutual connections</span>
          </div>
        </div>
      </div>

      <button className="px-2 py-1.5 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
        Follow
      </button>
    </div>
  );
};

function ProfileSidebar() {
  const people = [
    {
      name: "Christoper Nolan",
      avatar: "/api/placeholder/40/40",
      isPremium: true,
      mutualConnectionNames: ["Ally Van", "Jeniffer Chan"],
      mutualConnections: 23,
    },
    {
      name: "Jessica Milla",
      avatar: "/api/placeholder/40/40",
      isPremium: false,
      mutualConnectionNames: ["Ekin Ay"],
      mutualConnections: 23,
    },
    {
      name: "Cecilia Vangeline",
      avatar: "/api/placeholder/40/40",
      isPremium: false,
      mutualConnectionNames: ["Ally Van", "Jeniffer Chan", "Enes Malik"],
      mutualConnections: 23,
    },
  ];

  return (
    <div className="space-y-6">
      {/* People you may know section */}
      <div className="bg-white rounded-lg p-4 shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">People you may know</h3>
          <button className="text-gray-400">•••</button>
        </div>

        <div className="divide-y">
          {people.map((person, index) => (
            <PeopleCard key={index} {...person} />
          ))}
        </div>

        <button className="w-full text-blue-600 mt-4 text-sm font-medium">
          See more people
        </button>
      </div>

      {/* Opening job positions section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Opening job positions</h3>
        <ul className="space-y-3">
          <li className="text-sm">Product Designer @ Alibaba</li>
          <li className="text-sm">Interactions Designer @ Amplitude</li>
          <li className="text-sm">m/x Designer @ Adobe Corp</li>
        </ul>
      </div>

      {/* Company Info section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Company Info</h3>
        <p className="text-sm text-gray-600">
          Makara is an Indonesia's no.1 Software-as-a-Service (SaaS) company...
        </p>
      </div>
    </div>
  );
}

export default ProfileSidebar;
