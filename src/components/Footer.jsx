import Logo from "../assets/Logo.png"

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700">
      <div className="container mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-50">
        
        {/* Column 1 - Logo & Contact */}
        <div>
          <img src={Logo} alt="Logo" className="h-13 w-auto" />
          <p className="text-sm mb-6">
            An online gift shop offering unique, and creative gifts for boys and girls. 
            Explore distinctive gifts for any person or occasion.
          </p>
          <h2 className="font-bold mb-3">REACH OUT TO US</h2>
          <p className="text-sm">011-66763875</p>
          <p className="text-sm">support@bigsmall.in</p>
          <p className="text-sm">D-89, 100-Ft Road, Chhatarpur, Delhi, India - 110074</p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-4">
            <a href="#" className="text-pink-600 text-2xl"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-blue-700 text-2xl"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>

        {/* Column 2 - Helpful Links */}
        <div>
          <h2 className="font-bold mb-4">HELPFUL LINKS</h2>
          <ul className="space-y-4 text-sm">
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Wholesale & Corporate enquiries</a></li>
            <li><a href="#">Cancellation & refund policy</a></li>
          </ul>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded text-sm">
            Send Enquiry
          </button>
        </div>

        {/* Column 3 - Our Company */}
        <div>
          <h2 className="font-bold mb-4">Our Company</h2>
          <ul className="space-y-4 text-sm">
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 4 - Help */}
        <div>
          <h2 className="font-bold mb-4">Help</h2>
          <ul className="space-y-4 text-sm">
            <li><a href="#">Cancellation & Refund</a></li>
            <li><a href="#">Shipping & Delivery policy</a></li>
            <li><a href="#">Terms & Condition</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t text-center py-4 text-sm text-gray-500">
        © Copyright 2025 <span className="font-semibold">Triovation</span> All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
