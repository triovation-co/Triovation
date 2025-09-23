import Logo from "../assets/Logo.png";
import img from "../assets/image1.jpg";

const Footer = () => {
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
                sm:w-[250px] sm:h-[350px]  
                md:w-[250px] md:h-[350px]
                lg:w-[310px] lg:h-[370px] 
                xl:w-[400px] xl:h-[500px]
                overflow-hidden shadow-lg rounded-t-full"
              >
                <img src={img} alt="Gift Background Right" className="w-full h-full object-cover" />
              </div>

              {/* Left image (in front) */}
              <div
                className="absolute
                          left-[8%] md:left-[10%] lg:left-[12%]
                          top-[55%] sm:top-[15%] md:top-[62.7%] lg:top-[57%] xl:top-[60.2%]
                          top-1/2 -translate-y-1/2
                          rounded-t-full overflow-hidden
                          w-[180px] h-[230px] 
                          sm:w-[200px] sm:h-[250px]  
                          md:w-[200px] md:h-[250px]
                          lg:w-[250px] lg:h-[300px] 
                          xl:w-[350px] xl:h-[400px]
                          mx-auto"
              >
                <img src={img} alt="Gift Foreground Left" className="w-full h-full object-cover" />
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
                Email at <span className="font-semibold">Triovation@gmail.in</span> for any B2B gifting requirement!
              </p>
              <button className="px-6 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition text-sm sm:text-base">
                Contact Us
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-50 text-gray-700 mt-20">
        <div className="container mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 2xl:px-12 py-10 
                grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-20 lg:gap-30 2xl:gap-40">
          {/* Column 1 - Logo & Contact */}
          <div>
            <img src={Logo} alt="Logo" className="h-12 w-auto mb-4 -ml-1" />
            <p className="text-sm 2xl:text-base mb-6">
              An online gift shop offering unique, creative gifts for boys and girls. Explore distinctive gifts for any occasion.
            </p>
            <h2 className="font-bold text-base 2xl:text-lg mb-3">REACH OUT TO US</h2>
            <p className="text-sm 2xl:text-base">011-66763875</p>
            <p className="text-sm 2xl:text-base">support@Triovation.in</p>
            <p className="text-sm 2xl:text-base">India </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-pink-600 text-2xl"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-blue-700 text-2xl"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>

          {/* Column 2 - Helpful Links */}
          <div>
            <h2 className="font-bold text-base 2xl:text-lg mb-3">HELPFUL LINKS</h2>
            <ul className="space-y-2 text-sm 2xl:text-base">
              <li><a href="#" className="hover:text-blue-600">Contact us</a></li>
              <li><a href="#" className="hover:text-blue-600">Wholesale & Corporate enquiries</a></li>
              <li><a href="#" className="hover:text-blue-600">Cancellation & refund policy</a></li>
            </ul>
            <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm 2xl:text-base">
              Send Enquiry
            </button>
          </div>

          {/* Column 3 - Our Company */}
          <div>
            <h2 className="font-bold text-base 2xl:text-lg mb-3">Our Company</h2>
            <ul className="space-y-2 text-sm 2xl:text-base">
              <li><a href="#" className="hover:text-blue-600">Home</a></li>
              <li><a href="#" className="hover:text-blue-600">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 4 - Help */}
          <div>
            <h2 className="font-bold text-base 2xl:text-lg mb-3">Help</h2>
            <ul className="space-y-2 text-sm 2xl:text-base">
              <li><a href="#" className="hover:text-blue-600">Cancellation & Refund</a></li>
              <li><a href="#" className="hover:text-blue-600">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-blue-600">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-4 text-center text-sm 2xl:text-base text-gray-500">
          Â© 2025 <span className="font-semibold">Triovation</span> All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
