import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";
import useDocumentMeta from "../hooks/useDocumentMeta.js";

const BulkOrderConfirmation = () => {
  useDocumentMeta({
    title: "Bulk Order Enquiry Received | Triovation",
    description: "Thank you for your bulk order and corporate gifting enquiry. The Triovation team will review your specifications and get in touch with you shortly.",
    keywords: "bulk order confirmation, corporate gifting enquiry, Triovation",
    canonicalUrl: "https://www.triovation.com/bulk-order-confirmation",
    ogImage: "https://www.triovation.com/og-image.jpg",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 flex items-center justify-center px-4 py-16 sm:py-24">
      <div className="bg-white border border-gray-100 shadow-2xl rounded-3xl p-8 sm:p-12 max-w-xl w-full text-center relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#f47e82] via-[#e05a5e] to-[#fca5a5]" />

        {/* Icon Badge */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-[#e05a5e]">
            <Package className="w-10 h-10" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 text-white border-2 border-white shadow">
            <CheckCircle className="w-5 h-5 fill-current" />
          </div>
        </div>

        {/* Heading */}
        <span className="inline-block px-3.5 py-1 text-xs font-bold tracking-wider text-[#e05a5e] bg-red-50 rounded-full uppercase mb-3">
          Bulk Order & Corporate Gifting
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
          Enquiry Received Successfully!
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
          Thank you for reaching out to <span className="font-semibold text-gray-800">Triovation</span>. We have received your bulk order request. Our team is reviewing your requirements and will connect with volume pricing, catalogue options, and delivery timelines within 24 hours.
        </p>

        {/* Next Steps Box */}
        <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4 sm:p-5 text-left mb-8 space-y-2">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">What happens next?</h2>
          <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>Our team reviews product selection, quantity, and branding requirements.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>You receive a customized quote and sample mockups via Email/WhatsApp.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>Need urgent assistance? Reach us directly at <a href="mailto:triovation.co@gmail.com" className="text-[#e05a5e] font-semibold underline">triovation.co@gmail.com</a>.</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/bulkorder"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#f47e82] to-[#e05a5e] hover:opacity-95 text-white font-semibold px-6 py-3 rounded-xl transition shadow-lg shadow-red-500/20 text-sm"
          >
            <span>Back to Bulk Order</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-xl transition text-sm"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BulkOrderConfirmation;

