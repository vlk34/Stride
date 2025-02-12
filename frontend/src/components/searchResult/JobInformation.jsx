import React from "react";

const JobInformation = ({ job }) => {
  if (!job)
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Detayları görüntülemek için bir ilan seçin
      </div>
    );

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
          <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
            Kaydet
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Şimdi Başvur
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-3">Genel Bakış</h3>
          <p className="text-gray-600">{job.overview}</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">Ne Yapacaksın?</h3>
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
          <h3 className="text-lg font-semibold mb-3">{job.company} Hakkında</h3>
          <p className="text-gray-600">{job.about}</p>
        </section>
      </div>
    </div>
  );
};

export default JobInformation;
