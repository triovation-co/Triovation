import React from 'react';
import bulkorder1 from "../assets/bulkorder1.png";
import bulkorder2 from "../assets/bulkorder2.png";

const phoneNumber = "+918828293426";
const message = "";
const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
const ContactUs = () => {
  return (
   <>
    <div className="mt-20">
            <main className="container mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 2xl:px-12 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 xl:gap-40 2xl:gap-40 items-center">
                
                {/* Left Column: Images */}
                <div className="relative flex items-center justify-center w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] 2xl:min-h-[600px]">
                  {/* Right image (behind) */}
                  <div
                    className="absolute 
                    left-1/3 sm:left-[35%] md:left-[40%] lg:left-[45%] 
                    top-1/2 -translate-y-1/2 
                    w-[200px] h-[260px] 
                    sm:w-[275px] sm:h-[350px]  
                    md:w-[275px] md:h-[350px]
                    lg:w-[335px] lg:h-[370px] 
                    xl:w-[425px] xl:h-[500px]
                    overflow-hidden shadow-lg rounded-t-full"
                  >
                    <img src={bulkorder1} alt="Gift Background Right" className="w-full h-full object-cover" />
                  </div>
    
                  {/* Left image (in front) */}
                  <div
                    className="absolute
                              left-[8%] md:left-[10%] lg:left-[12%]
                              top-[55%] sm:top-[15%] md:top-[62.7%] lg:top-[57%] xl:top-[60.2%]
                              top-1/2 -translate-y-1/2
                              rounded-t-full overflow-hidden
                              w-[180px] h-[230px]
                              sm:w-[225px] sm:h-[250px]  
                              md:w-[225px] md:h-[250px]
                              lg:w-[275px] lg:h-[300px] 
                              xl:w-[375px] xl:h-[400px]
                              mx-auto"
                  >
                    <img src={bulkorder2} alt="Gift Foreground Left" className="w-full h-full object-cover" />
                  </div>
                </div>
    
                {/* Right Column: Text */}
                <div className="mt-10 lg:mt-20 text-center lg:text-left px-2">
                  <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-gray-500 mb-4">
                    Joining Kits, Event Giveaways & More
                  </p>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-gray-700 mb-4">
                    Corporate Bulk Gifting
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-gray-500 mb-6">
                    Email at <span className="font-semibold">Triovation.co@gmail.com</span> for any B2B gifting requirement!
                  </p>
                  <button onClick={handleClick} className="px-6 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition text-sm sm:text-base">
                    Contact Us
                  </button>
                </div>
              </div>
            </main>
          </div>
   </>
  )
}

export default ContactUs;