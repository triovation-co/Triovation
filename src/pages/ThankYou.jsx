import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import useDocumentMeta from "../hooks/useDocumentMeta.js";

const ThankYou = () => {
  // ──────────── Page-level SEO ────────────
  useDocumentMeta({
    title: 'Thank You for Your Enquiry | Triovation',
    description: 'Thank you for contacting Triovation. Our team has received your message and will get back to you shortly.',
    keywords: 'thank you, enquiry received, Triovation',
    canonicalUrl: 'https://www.triovation.com/thank-you',
    ogImage: 'https://www.triovation.com/og-image.jpg',
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Thank You for Your Enquiry!
        </h1>

        <p className="text-gray-500 mb-6">
          Our team has received your message and will contact you shortly.
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;

