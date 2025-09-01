import Logo from "../assets/Logo.png";
import img from "../assets/image1.jpg"; // The image of the people
import flower from "../assets/flower.png"; // The flower graphic

const Footer = () => {
  return (
    <>
      <div className="mt-30">
        <main className="container mx-auto max-w-[1440px] mt-5 bg-white min-h-screen px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-60 xl:gap-60">
            
            {/* Left Column: Two Overlapping Images - Responsive sm-xl only */}
            <div className="relative flex items-center justify-center w-full min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[500px] xl:min-h-[500px]">

              {/* Right image with arched top (behind, LARGER) */}
              <div className="absolute 
                left-[35%] sm:left-[40%] md:left-[40%] lg:left-[45%] xl:left-[45%] 
                top-1/2 -translate-y-1/2 
                w-[200px] h-[260px] 
                sm:w-[250px] sm:h-[320px] 
                md:w-[280px] md:h-[360px] 
                lg:w-[430px] lg:h-[550px] 
                xl:w-[430px] xl:h-[550px] 
                overflow-hidden shadow-lg rounded-t-full">
                <img
                  src={img}
                  alt="Gift Background Right"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Left image with arched top (in front) */}
              <div className="absolute 
                left-[8%] sm:left-[8%] md:left-[10%] lg:left-[10%] xl:left-[10%] 
                top-1/2 -translate-y-1/2 
                w-[180px] h-[230px] 
                sm:w-[220px] sm:h-[280px]  
                md:w-[240px] md:h-[310px]
                lg:w-[400px] lg:h-[470px] 
                xl:w-[400px] xl:h-[470px] 
                overflow-hidden shadow-xl z-10 rounded-t-full 
                2xl:mt-10 2xl:-ml-20">
                <img
                  src={img}
                  alt="Gift Foreground Left"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column: Text Description - Responsive sm-xl only */}
            <div className="mt-6 sm:mt-8 md:mt-8 lg:mt-28 xl:mt-32 
              text-center sm:text-center md:text-center lg:text-left xl:text-left 
              lg:mr-20 xl:mr-28 2xl:text-center">
              
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 
                mb-4 sm:mb-5 md:mb-6 lg:mb-5 xl:mb-5 2xl:text-[17px]
                text-gray-500">
                Joining Kits, Event Giveaways & More
              </p>
              
              <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 
                font-bold mb-3 sm:mb-4 md:mb-4 lg:mb-4 xl:mb-4 
                text-gray-700">
                Corporate Bulk Gifting
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg 
                mb-6 sm:mb-6 md:mb-8 lg:mb-8 xl:mb-8 2xl:text-[16px] 
                text-gray-500">
                Email at Triovation@gmail.in for any B2B gifting requirement !
              </p>
              
              <button className="border text-sm sm:text-md md:text-md lg:text-md xl:text-md 
                px-6 sm:px-7 md:px-8 lg:px-8 xl:px-8 
                py-1.5 sm:py-1.5 md:py-1.5 lg:py-1.5 xl:py-1.5 
                2xl:py-2.5 2xl:px-9 
                rounded-[10px] bg-blue-400 hover:bg-blue-500 transition-colors duration-200 
                text-white">
                Contact Us
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Footer Section - Responsive sm-xl only */}
      <footer className="bg-gray-50 text-gray-700 -mt-70">
        <div className="container mx-auto 
          px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8 
          py-8 sm:py-10 md:py-12 lg:py-12 xl:py-12 
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 
          gap-6 sm:gap-8 md:gap-12 lg:gap-12 xl:gap-12">
          
          {/* Column 1 - Logo & Contact - Responsive sm-xl only */}
          <div className="sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1">
            <img src={Logo} alt="Logo" className="h-10 sm:h-12 md:h-14 lg:h-14 xl:h-14 w-auto mb-3 sm:mb-4 md:mb-4 lg:mb-4 xl:mb-4" />
            <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 
              mb-4 sm:mb-5 md:mb-6 lg:mb-6 xl:mb-6">
              An online gift shop offering unique, and creative gifts for boys and girls. 
              Explore distinctive gifts for any person or occasion.
            </p>
            
            <h2 className="font-bold mb-2 sm:mb-3 md:mb-3 lg:mb-3 xl:mb-3 
              text-sm sm:text-base md:text-base lg:text-base xl:text-base">
              REACH OUT TO US
            </h2>
            
            <div className="space-y-1 sm:space-y-1.5 md:space-y-2 lg:space-y-2 xl:space-y-2">
              <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm">011-66763875</p>
              <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm">support@Triovation.in</p>
              <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm">
                D-89, 100-Ft Road, Chhatarpur, Delhi, India - 110074
              </p>
            </div>

            {/* Social Icons - Responsive sm-xl only */}
            <div className="flex gap-2 sm:gap-3 md:gap-3 lg:gap-3 xl:gap-3 
              mt-3 sm:mt-4 md:mt-4 lg:mt-4 xl:mt-4">
              <a href="#" className="text-pink-600 
                text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-blue-700 
                text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Column 2 - Helpful Links - Responsive sm-xl only */}
          <div>
            <h2 className="font-bold mb-3 sm:mb-4 md:mb-4 lg:mb-4 xl:mb-4 
              text-sm sm:text-base md:text-base lg:text-base xl:text-base">
              HELPFUL LINKS
            </h2>
            <ul className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-4 xl:space-y-4 
              text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm">
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Contact us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Wholesale & Corporate enquiries</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Cancellation & refund policy</a></li>
            </ul>
            <button className="mt-3 sm:mt-4 md:mt-4 lg:mt-4 xl:mt-4 
              bg-blue-500 hover:bg-blue-600 text-white 
              px-3 sm:px-4 md:px-4 lg:px-4 xl:px-4 
              py-1.5 sm:py-2 md:py-2 lg:py-2 xl:py-2 
              rounded text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 
              transition-colors duration-200">
              Send Enquiry
            </button>
          </div>

          {/* Column 3 - Our Company - Responsive sm-xl only */}
          <div>
            <h2 className="font-bold mb-3 sm:mb-4 md:mb-4 lg:mb-4 xl:mb-4 
              text-sm sm:text-base md:text-base lg:text-base xl:text-base">
              Our Company
            </h2>
            <ul className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-4 xl:space-y-4 
              text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm">
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Home</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 4 - Help - Responsive sm-xl only */}
          <div>
            <h2 className="font-bold mb-3 sm:mb-4 md:mb-4 lg:mb-4 xl:mb-4 
              text-sm sm:text-base md:text-base lg:text-base xl:text-base">
              Help
            </h2>
            <ul className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-4 xl:space-y-4 
              text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm">
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Cancellation & Refund</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Shipping & Delivery policy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Terms & Condition</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Responsive sm-xl only */}
        <div className="border-t text-center 
          py-3 sm:py-4 md:py-4 lg:py-4 xl:py-4 
          text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 
          text-gray-500">
          © Copyright 2025 <span className="font-semibold">Triovation</span> All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;