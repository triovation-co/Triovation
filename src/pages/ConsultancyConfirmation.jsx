import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Palette, ArrowRight, Home, Sparkles } from "lucide-react";
import useDocumentMeta from "../hooks/useDocumentMeta.js";

const ConsultancyConfirmation = () => {
  useDocumentMeta({
    title: "Consultation Request Received | Triovation Design Consultancy",
    description: "Thank you for booking a design consultation with Triovation. Our creative team will review your brief and connect with you shortly to schedule our session.",
    keywords: "design consultancy confirmation, brand design consultation, Triovation",
    canonicalUrl: "https://www.triovation.com/consultancy-confirmation",
    ogImage: "https://www.triovation.com/og-image.jpg",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 flex items-center justify-center px-4 py-16 sm:py-24">
      <div className="bg-white border border-gray-100 shadow-2xl rounded-3xl p-8 sm:p-12 max-w-xl w-full text-center relative overflow-hidden">
        {/* Decorative Top Accent — Triovation Signature Gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#f47e82] via-[#e05a5e] to-[#fca5a5]" />

        {/* Icon Badge */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-[#e05a5e] shadow-inner">
            <Palette className="w-10 h-10" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 text-white border-2 border-white shadow">
            <CheckCircle className="w-5 h-5 fill-current" />
          </div>
        </div>

        {/* Category Pill */}
        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold tracking-wider text-[#e05a5e] bg-red-50 border border-red-100 rounded-full uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Triovation Design Consultancy
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
          Consultation Request Confirmed!
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
          Thank you for trusting <span className="font-semibold text-gray-900">Triovation</span> with your creative vision. We have received your project details. Our creative design team is reviewing your brief and will connect with you within 24 hours to schedule our consultation.
        </p>

        {/* Next Steps Box */}
        <div className="bg-[#fff8f8] border border-[#fecaca]/80 rounded-2xl p-4 sm:p-5 text-left mb-8 space-y-2.5">
          <h2 className="text-xs font-bold text-[#b91c1c] uppercase tracking-wider">What happens next?</h2>
          <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2.5">
              <span className="text-[#e05a5e] font-bold text-sm">1.</span>
              <span><strong>Discovery & Review:</strong> We analyze your brand objectives, design requirements, and references.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#e05a5e] font-bold text-sm">2.</span>
              <span><strong>1-on-1 Consultation:</strong> Our creative lead will reach out via WhatsApp/Email to schedule your session.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#e05a5e] font-bold text-sm">3.</span>
              <span><strong>Design Roadmap:</strong> We provide tailored concepts, stylescapes, timelines, and proposal.</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/design-consultancy"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#f47e82] to-[#e05a5e] hover:opacity-95 text-white font-semibold px-6 py-3 rounded-xl transition shadow-lg shadow-red-500/25 text-sm"
          >
            <span>Back to Design Consultancy</span>
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

export default ConsultancyConfirmation;
