import Logo from "../assets/logo_bg.png";
import img from "../assets/image1.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [openCatalogueForm, setOpenCatalogueForm] = useState(false);
const [form, setForm] = useState({
  name: "",
  phone: "",
  email: "",
});

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
From custom gifts to creative solutions! let’s build<br></br> something extraordinary together.
            </p>
            <h2 className="font-bold text-base 2xl:text-lg mb-3">REACH OUT TO US</h2>
            <a 
  href="tel:+918828293426"
  className="text-sm 2xl:text-base hover:text-blue-600"
>  +91-8828293426</a>
<br/>
            <a 
  href="mailto:triovation.co@gmail.com"
  className="text-sm 2xl:text-base text-blue-600 hover:underline"
>
  triovation.co@gmail.com
</a>

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
<li>
<button
  onClick={() => setOpenCatalogueForm(true)}
  className="hover:text-blue-600 text-left"
>
  Product Catalogue
</button>

</li>



              <li><a href="#" className="hover:text-blue-600">Wholesale & Corporate enquiries</a></li>
              <li>
  <Link
    to="/cancellation-refund"
    className="hover:text-blue-600"
  >
    Cancellation & Refund Policy
  </Link>
</li>

            </ul>
<button
  onClick={() => window.dispatchEvent(new Event("open-enquiry-form"))}
  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-500 text-sm font-medium hover:bg-blue-100 hover:text-blue-600 transition"
>
  Send Enquiry →
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
              <li>
  <Link
    to="/cancellation-refund"
    className="hover:text-blue-600"
  >
    Cancellation & Refund
  </Link>
</li>

              <li><a href="/shipping-delivery" className="hover:text-blue-600">Shipping & Delivery</a></li>
              <li><a href="/terms-condition" className="hover:text-blue-600">Terms & Conditions</a></li>
              <li><a href="/privacy-policies" className="hover:text-blue-600">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-4 text-center text-sm 2xl:text-base text-gray-500">
          Â© 2026 <span className="font-semibold">Triovation</span> All Rights Reserved.
        </div>
        {openCatalogueForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
      <h2 className="text-xl font-bold mb-4">Get Product Catalogue</h2>

      <form
 onSubmit={(e) => {
  e.preventDefault();

  console.log("Catalogue Form Data:", form); // optional

  setOpenCatalogueForm(false);

  window.open("/catalogue.pdf", "_blank", "noopener,noreferrer");
}}

  className="px-6 py-6 space-y-5"
>
  {/* Full Name */}
  <div>
    <label className="block text-xs font-medium text-gray-500 mb-1">
      FULL NAME
    </label>
    <input
      type="text"
      placeholder="John Doe"
      required
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
                 focus:border-[#ff7a7a] focus:ring-2 focus:ring-[#ff7a7a]/20
                 outline-none transition"
    />
  </div>

  {/* Phone */}
  <div>
    <label className="block text-xs font-medium text-gray-500 mb-1">
      PHONE NUMBER
    </label>
    <input
      type="tel"
      placeholder="+91 XXXXX XXXXX"
      required
      value={form.phone}
      onChange={(e) => setForm({ ...form, phone: e.target.value })}
      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
                 focus:border-[#ff7a7a] focus:ring-2 focus:ring-[#ff7a7a]/20
                 outline-none transition"
    />
  </div>

  {/* Email */}
  <div>
    <label className="block text-xs font-medium text-gray-500 mb-1">
      EMAIL (OPTIONAL)
    </label>
    <input
      type="email"
      placeholder="you@example.com"
      value={form.email}
      onChange={(e) => setForm({ ...form, email: e.target.value })}
      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
                 focus:border-[#ff7a7a] focus:ring-2 focus:ring-[#ff7a7a]/20
                 outline-none transition"
    />
  </div>

  {/* Actions */}
  <div className="flex items-center justify-between pt-4 border-t">
    <button
      type="button"
      onClick={() => setOpenCatalogueForm(false)}
      className="text-sm font-medium text-gray-500 hover:text-gray-700 transition"
    >
      Cancel
    </button>

    <button
      type="submit"
      className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white
                 bg-gradient-to-r from-[#ff7a7a] to-[#ff9a9a]
                 hover:opacity-90 active:scale-95 transition"
    >
      Submit
    </button>
  </div>
</form>

    </div>
  </div>
)}

      </footer>
    </>
  );
};

export default Footer;
