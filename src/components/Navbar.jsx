import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Earth, Search, Menu, X } from "lucide-react";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down → hide
        setShowNavbar(false);
      } else {
        // scrolling up → show
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`w-auto sticky top-0 z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top Bar */}
      <div className="w-full bg-[#8C91D1] text-white text-xs text-center py-4">
      </div>

      {/* Main Navbar */}
      <nav className="w-full bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left: Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer transition-transform hover:scale-105"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="Logo" className="h-14 w-auto" />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 ml-auto">
            {["Home", "About", "Products", "Service", "Work_Education", "ContactUs"].map((item, i) => (
              <Link
                key={i}
                to={`/${item === "Home" ? "" : item}`}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 font-medium hover:text-red-500 transition-all duration-300 text-[17px] relative group"
              >
                {item.replace("_", " ")}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {/* Search Box */}
            <div className="relative flex mr-10">
              <input
                type="text"
                placeholder="Search For Decor"
                className="pl-10 pr-4 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 text-[17px] transition-all duration-300 focus:shadow-md focus:border-red-300"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500 transition-colors duration-300" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 transition-all duration-500 hover:text-red-500 hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="relative">
              <Menu
                size={28}
                className={`transition-all duration-300 ${
                  isOpen
                    ? "opacity-0 rotate-180 scale-0"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                size={28}
                className={`absolute top-0 left-0 transition-all duration-500 ${
                  isOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 rotate-180 scale-0"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 pb-4 flex flex-col space-y-4 bg-white border-t">
            {["Home", "About", "Products", "Service", "Work_Education", "ContactUs"].map((item, i) => (
              <Link
                key={i}
                to={`/${item === "Home" ? "" : item}`}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 font-medium hover:text-red-500 transition-all duration-500 hover:translate-x-2 hover:bg-gray-50 py-2 px-2 rounded"
              >
                {item.replace("_", " ")}
              </Link>
            ))}

            {/* Search Box for Mobile */}
            <div className="relative flex">
              <input
                type="text"
                placeholder="Search For Decor"
                className="pl-10 pr-4 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 w-full transition-all duration-300 focus:shadow-md focus:border-red-300"
              />
              <Search className="absolute left-3 top-2 h-4 w-4 text-gray-500 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
