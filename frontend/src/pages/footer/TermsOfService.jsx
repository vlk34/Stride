import React from "react";

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p className="text-gray-600 mb-4">
            By accessing and using Stride's services, you agree to be bound by
            these Terms of Service. If you do not agree to these terms, please
            do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            2. Description of Services
          </h2>
          <p className="text-gray-600 mb-4">
            Stride provides an online platform connecting job seekers with
            employment opportunities. Our services include job listings,
            application management, and career resources.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. User Accounts</h2>
          <p className="text-gray-600 mb-4">
            Users must provide accurate and complete information when creating
            an account. You are responsible for maintaining the confidentiality
            of your account credentials.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>You must be at least 18 years old to use our services</li>
            <li>One account per individual</li>
            <li>You are responsible for all activities under your account</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">4. User Conduct</h2>
          <p className="text-gray-600 mb-4">
            Users agree not to engage in any activity that:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Violates any applicable laws or regulations</li>
            <li>Infringes on intellectual property rights</li>
            <li>Involves false or misleading information</li>
            <li>Interferes with the platform's functionality</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">5. Termination</h2>
          <p className="text-gray-600 mb-4">
            We reserve the right to terminate or suspend accounts that violate
            these terms or for any other reason at our discretion.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">6. Changes to Terms</h2>
          <p className="text-gray-600 mb-4">
            We may modify these terms at any time. Continued use of our services
            after changes constitutes acceptance of the modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">7. Contact Information</h2>
          <p className="text-gray-600">
            For questions about these terms, please contact us at
            legal@stride.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
