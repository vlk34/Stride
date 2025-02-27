import React from "react";
import { Building2, Users, Calendar } from "lucide-react";

const CompanySidebar = ({ company }) => {
  return (
    <div className="space-y-6">
      {/* Company Stats */}
      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Company Overview</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium">Founded</p>
              <p className="text-sm text-gray-600">{company.founded}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium">Company size</p>
              <p className="text-sm text-gray-600">{company.size}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium">Average hiring time</p>
              <p className="text-sm text-gray-600">2 weeks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Companies */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Similar Companies</h3>
        <div className="space-y-4">
          {["Meta", "Google", "LinkedIn"].map((name) => (
            <div key={name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg" />
                <div>
                  <p className="text-sm font-medium">{name}</p>
                  <p className="text-xs text-gray-500">Technology</p>
                </div>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanySidebar;
