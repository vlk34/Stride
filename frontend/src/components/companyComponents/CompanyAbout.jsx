import React from "react";

const CompanyAbout = ({ about, culture, benefits }) => {
  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-gray-600 leading-relaxed">{about}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Company Culture</h2>
          <p className="text-gray-600 leading-relaxed">{culture}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-600"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                {benefit}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CompanyAbout;
