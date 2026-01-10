import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EnquiryModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const openModal = () => setOpen(true);
    window.addEventListener("open-enquiry-form", openModal);
    return () => window.removeEventListener("open-enquiry-form", openModal);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const data = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      message: form.get("message"),
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxzU1x17yJEzyGhqKDdlbwSf81_eig3ZFLLxuyWDHNEKMie_J4C3yIeZC2psGJ3Tfgx/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data),
        }
      );

      e.target.reset();
      setOpen(false);
      navigate("/thank-you");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Get in Touch
          </h2>
          <p className="text-sm text-gray-500">
            Share your requirements and we’ll respond shortly.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-500">Full Name</label>
            <input
              name="name"
              required
              placeholder="Your full name"
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Email Address</label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Phone Number</label>
            <input
              name="phone"
              required
              placeholder="+91 XXXXX XXXXX"
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Your Message</label>
            <textarea
              name="message"
              required
              rows="3"
              placeholder="Tell us about your requirement..."
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white py-2.5 rounded-lg font-medium tracking-wide transition shadow-md"
          >
            {loading ? "Sending..." : "Submit Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;
