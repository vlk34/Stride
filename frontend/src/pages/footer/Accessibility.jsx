import React from "react";

const Accessibility = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Accessibility Statement</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Our Commitment</h2>
          <p className="text-gray-600 mb-4">
            Stride is committed to ensuring digital accessibility for people
            with disabilities. We continually improve the user experience for
            everyone and apply the relevant accessibility standards.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Accessibility Features</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Screen reader compatibility</li>
            <li>Keyboard navigation</li>
            <li>Clear heading structure</li>
            <li>Alt text for images</li>
            <li>Sufficient color contrast</li>
            <li>Resizable text</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Conformance Status</h2>
          <p className="text-gray-600 mb-4">
            We strive to conform to the Web Content Accessibility Guidelines
            (WCAG) 2.1 level AA standards.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Feedback</h2>
          <p className="text-gray-600 mb-4">
            We welcome your feedback on the accessibility of our platform.
            Please contact us at accessibility@stride.com with any concerns or
            suggestions.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Accessibility;
