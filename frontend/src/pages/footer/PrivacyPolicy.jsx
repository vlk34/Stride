import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">
            1. Information We Collect
          </h2>
          <p className="text-gray-600 mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Personal information (name, email, phone number)</li>
            <li>Professional information (work history, education)</li>
            <li>Account credentials</li>
            <li>Application data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-600 mb-4">
            We use the collected information to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Provide and improve our services</li>
            <li>Match you with job opportunities</li>
            <li>Communicate with you about our services</li>
            <li>Ensure platform security</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
          <p className="text-gray-600 mb-4">
            We share your information only with:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Employers you apply to</li>
            <li>Service providers who assist our operations</li>
            <li>When required by law</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
          <p className="text-gray-600 mb-4">
            We implement appropriate security measures to protect your personal
            information from unauthorized access, alteration, or disclosure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
          <p className="text-gray-600 mb-4">You have the right to:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
