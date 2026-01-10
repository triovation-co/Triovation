import React, { useState } from "react";
import bulkorder1 from "../assets/bulkorder1.png";
import bulkorder2 from "../assets/bulkorder2.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const ContactUs = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);


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
      setOpenModal(false);
      navigate("/thank-you"); // ✅ redirect

    } catch {
      alert("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const openForm = () => setOpenModal(true);

  window.addEventListener("open-enquiry-form", openForm);
  return () => window.removeEventListener("open-enquiry-form", openForm);
}, []);


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
  onClick={() => window.dispatchEvent(new Event("open-enquiry-form"))}
  className="group relative overflow-hidden px-7 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-400 text-white font-semibold tracking-wide shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.03]"
>
  <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition"></span>
  Contact Us
</button>



            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ContactUs;
