import React, { useState } from "react";
import bulkorder1 from "../assets/bulkorder1.png";
import bulkorder2 from "../assets/bulkorder2.png";

const ContactUs = () => {
 const [openModal, setOpenModal] = useState(false);
const [success, setSuccess] = useState(false);
const [loading, setLoading] = useState(false);


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
   await fetch("https://script.google.com/macros/s/AKfycbxzU1x17yJEzyGhqKDdlbwSf81_eig3ZFLLxuyWDHNEKMie_J4C3yIeZC2psGJ3Tfgx/exec", {
  method: "POST",
  mode: "no-cors",
  body: JSON.stringify(data),
});


    setOpenModal(false);
    setSuccess(true);
    e.target.reset();
  } catch {
    alert("Failed to send. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <div className="mt-20">
        <main className="container mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 2xl:px-12 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 xl:gap-40 2xl:gap-40 items-center">
            
            {/* Left Column: Images (UNCHANGED) */}
            <div className="relative flex items-center justify-center w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] 2xl:min-h-[600px]">
              <div className="absolute 
                left-1/3 sm:left-[35%] md:left-[40%] lg:left-[45%] 
                top-1/2 -translate-y-1/2 
                w-[200px] h-[260px] 
                sm:w-[275px] sm:h-[350px]  
                md:w-[275px] md:h-[350px]
                lg:w-[335px] lg:h-[370px] 
                xl:w-[425px] xl:h-[500px]
                overflow-hidden shadow-lg rounded-t-full">
                <img src={bulkorder1} className="w-full h-full object-cover" />
              </div>

              <div className="absolute
                left-[8%] md:left-[10%] lg:left-[12%]
                top-[55%] sm:top-[15%] md:top-[62.7%] lg:top-[57%] xl:top-[60.2%]
                top-1/2 -translate-y-1/2
                rounded-t-full overflow-hidden
                w-[180px] h-[230px]
                sm:w-[225px] sm:h-[250px]  
                md:w-[225px] md:h-[250px]
                lg:w-[275px] lg:h-[300px] 
                xl:w-[375px] xl:h-[400px]
                mx-auto">
                <img src={bulkorder2} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Right Column */}
            <div className="mt-10 lg:mt-20 text-center lg:text-left px-2">
              <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-gray-500 mb-4">
                Joining Kits, Event Giveaways & More
              </p>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-gray-700 mb-4">
                Corporate Bulk Gifting
              </h1>

              <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-gray-500 mb-6">
                Email at <span className="font-semibold">Triovation.co@gmail.com</span>
              </p>

              <button
                onClick={() => setOpenModal(true)}
                className="px-6 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition text-sm sm:text-base"
              >
                Contact Us
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Enquiry Popup */}
{openModal && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl animate-fadeIn">

      {/* Close */}
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        onClick={() => setOpenModal(false)}
      >
        ✕
      </button>

      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          Contact Our Team
        </h2>
        <p className="text-sm text-gray-500">
          Fill in your details and we’ll get back to you shortly.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs text-gray-500">Full Name</label>
          <input
            className="w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Your full name"
            name="name"
            required
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">Email Address</label>
          <input
          name="email"
            type="email"
            className="w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">Phone Number</label>
          <input
          name="phone"
            className="w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="+91 XXXXX XXXXX"
            required
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">Message</label>
          <textarea
          name="message"
            rows="3"
            className="w-full border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
            placeholder="Write your enquiry here..."
            required
          />
        </div>

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg font-medium tracking-wide transition shadow-md"
        >
          Submit Enquiry
        </button>
      </form>
    </div>
  </div>
)}
{success && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-xl shadow-xl text-center">
      <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
      <p>Your enquiry has been sent successfully.</p>
      <button
        onClick={() => setSuccess(false)}
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded"
      >
        Close
      </button>
    </div>
  </div>
)}

    </>
  );
};

export default ContactUs;
