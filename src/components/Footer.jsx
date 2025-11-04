import Logo from "../assets/logo_bg.png";
import img from "../assets/image1.jpg";

const Footer = () => {
  return (
    <>
    {/* grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-20 lg:gap-30 2xl:gap-40 */}
      {/* Footer Section */}
      <footer className="bg-gray-50 text-gray-700 mt-20">
        <div className="
            container mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 2xl:px-12 py-10
            grid grid-cols-2 gap-10
            lg:flex lg:flex-row lg:justify-evenly lg:gap-25 2xl:gap-40
          ">

          {/* Column 1 - Logo & Contact */}
          <div>
            <img src={Logo} alt="Logo" className="h-12 w-auto mb-4 -ml-1" />
            <p className="text-sm 2xl:text-base mb-6">
              Turn your imagination into reality with Triovation.<br></br>
From custom gifts to creative solutions! let’s build<br></br> somethingextraordinary together.
            </p>
            <h2 className="font-bold text-base 2xl:text-lg mb-3">REACH OUT TO US</h2>
            <p className="text-sm 2xl:text-base">+91-8828293426</p>
            <p className="text-sm 2xl:text-base">triovation.co@gmail.com</p>
            <p className="text-sm 2xl:text-base">India </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-pink-600 text-2xl"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-blue-700 text-2xl"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>

          {/* Column 2 - Helpful Links */}
          <div className="mt-15">
            <h2 className="font-bold text-base 2xl:text-lg mb-3">HELPFUL LINKS</h2>
            <ul className="space-y-2 text-sm 2xl:text-base">
              <li><a href="/ContactUs" className="hover:text-blue-600">Contact us</a></li>
              <li><a href="#" className="hover:text-blue-600">Wholesale & Corporate enquiries</a></li>
              <li><a href="#" className="hover:text-blue-600">Cancellation & refund policy</a></li>
            </ul>
            <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm 2xl:text-base">
              Send Enquiry
            </button>
          </div>

          {/* Column 3 - Our Company */}
          <div className="mt-1 lg:mt-15">
            <h2 className="font-bold text-base 2xl:text-lg mb-3">Our Company</h2>
            <ul className="space-y-2 text-sm 2xl:text-base">
              <li><a href="/" className="hover:text-blue-600">Home</a></li>
              <li><a href="/About" className="hover:text-blue-600">About Us</a></li>
              <li><a href="/ContactUs" className="hover:text-blue-600">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 4 - Help */}
          <div className="mt-1 lg:mt-15">
            <h2 className="font-bold text-base 2xl:text-lg mb-3">Help</h2>
            <ul className="space-y-2 text-sm 2xl:text-base">
              <li><a href="/cancellation-refund" className="hover:text-blue-600">Cancellation & Refund</a></li>
              <li><a href="/shipping-delivery" className="hover:text-blue-600">Shipping & Delivery</a></li>
              <li><a href="/terms-condition" className="hover:text-blue-600">Terms & Conditions</a></li>
              <li><a href="/privacy-policies" className="hover:text-blue-600">Privacy Policy</a></li>
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
