import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 my-8">
      <h1 className="text-3xl font-bold mb-4 flex justify-center">Privacy Policy</h1>
      <p className="text-sm text-gray-600 mb-6">
        At <strong>TRIOVATION</strong>, we respect your privacy and are committed to protecting any
        personal information you share with us. We do not require any login, signup, or account
        creation to browse our website.
      </p>

      <section className="mb-6">
        <p className="text-gray-700">
          The only information we may receive is when you connect with us directly through email,
          WhatsApp, Instagram, LinkedIn, or other communication channels. This may include your
          name, contact details, or business requirements, which will be used solely to respond to
          your inquiry and provide our services.
        </p>

        <p className="mt-3 text-gray-700">
          We may also collect other information relevant to customer surveys and/or offers in order
          to improve your experience with us.
        </p>

        <p className="mt-3 text-gray-700">
          We require this information to understand your needs and provide you with a better
          service, and in particular for the following reasons:
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
          <li>Internal record keeping.</li>
          <li>To improve our products and services.</li>
          <li>
            To periodically send promotional emails about new products, special offers, or other
            updates which we think you may find interesting using the email address you have
            provided.
          </li>
          <li>
            To contact you from time to time for market research purposes via email, phone, or other
            communication channels.
          </li>
          <li>To customize our website and services according to your preferences and interests.</li>
        </ul>

        <p className="mt-3 text-gray-700">
          If you believe that any information we are holding on you is incorrect or incomplete,
          please email us at <a href="mailto:support@triovation.in" className="text-blue-600">support@triovation.in</a> and we will promptly correct any errors.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold flex justify-center mb-2">Data Security</h2>
        <p className="text-gray-700">
          For payments, all transactions are handled securely through trusted payment gateways.
          TRIOVATION does not store any financial details such as credit/debit card numbers or
          banking credentials.
        </p>

        <p className="mt-3 text-gray-700">
          We do not sell, rent, or share your information with third parties. Any data you provide
          is kept secure and used strictly for communication and service purposes.
        </p>
      </section>
    </div>
  );
}