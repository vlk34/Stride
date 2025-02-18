import React from "react";

const CookiePolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">1. What Are Cookies</h2>
          <p className="text-gray-600 mb-4">
            Cookies are small text files stored on your device that help us
            provide and improve our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">2. How We Use Cookies</h2>
          <p className="text-gray-600 mb-4">We use cookies for:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Essential website functionality</li>
            <li>Authentication and security</li>
            <li>Performance and analytics</li>
            <li>User preferences</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. Types of Cookies</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Essential Cookies</h3>
              <p className="text-gray-600">
                Required for basic website functionality
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Functional Cookies</h3>
              <p className="text-gray-600">
                Remember your preferences and settings
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Analytics Cookies</h3>
              <p className="text-gray-600">
                Help us understand how visitors use our website
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">4. Managing Cookies</h2>
          <p className="text-gray-600 mb-4">
            You can control cookies through your browser settings. Note that
            disabling certain cookies may limit your ability to use some
            features of our platform.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;
