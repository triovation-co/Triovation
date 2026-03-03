import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePhone, validateName } from "../utils/validators";

const EnquiryModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const openModal = () => setOpen(true);
    window.addEventListener("open-enquiry-form", openModal);
    return () => window.removeEventListener("open-enquiry-form", openModal);
  }, []);

  const validateField = (name, value) => {
    let result = { valid: true, error: "" };
    switch (name) {
      case "name":
        result = validateName(value);
        if (!result.valid) result.error = result.error.replace("Name", "Full name");
        break;
      case "email":
        result = validateEmail(value);
        break;
      case "phone":
        result = validatePhone(value);
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: result.error }));
    return result.valid;
  };

  const validateAll = (formData) => {
    let allValid = true;
    ["name", "email", "phone"].forEach((field) => {
      if (!validateField(field, formData[field])) allValid = false;
    });
    return allValid;
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const inputClass = (name) =>
    `w-full mt-1 border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-400 outline-none ${errors[name] ? "border-red-500" : "border-gray-300"
    }`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const data = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      message: form.get("message"),
    };

    if (!validateAll(data)) return;

    setLoading(true);

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
      setErrors({});
      setOpen(false);
      setLoading(false);

      setTimeout(() => {
        window.location.assign("/thank-you");
      }, 100);

    } catch (err) {
      setLoading(false);
    }
  };


  if (!open && !loading) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={() => { setOpen(false); setErrors({}); }}
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
            Share your requirements and we'll respond shortly.
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
              onBlur={handleBlur}
              className={inputClass("name")}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="text-xs text-gray-500">Email Address</label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              onBlur={handleBlur}
              className={inputClass("email")}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-xs text-gray-500">Phone Number</label>
            <input
              name="phone"
              required
              placeholder="+91 XXXXX XXXXX"
              onBlur={handleBlur}
              className={inputClass("phone")}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
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