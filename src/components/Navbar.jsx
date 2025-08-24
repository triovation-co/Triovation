import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Earth, Search, Menu, X } from "lucide-react"; // Added Menu + X icons
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="w-full bg-[#8C91D1] text-white text-xs text-center py-4">
        {/* Put offers / announcements here */}
      </div>

      {/* Main Navbar */}
      <nav className="w-full bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left: Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="Logo" className="h-12 w-auto" />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 ml-auto">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium hover:text-red-500 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/About"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium hover:text-red-500 transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/Products"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium hover:text-red-500 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/Service"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium hover:text-red-500 transition-colors"
            >
              Service
            </Link>
            <Link
              to="/Work_Education"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium hover:text-red-500 transition-colors"
            >
              Work & Education
            </Link>
            <Link
              to="/ContactUs"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium hover:text-red-500 transition-colors"
            >
              Contact Us
            </Link>

            {/* Search Box */}
            <div className="relative flex">
              <input
                type="text"
                placeholder="Search For Decor"
                className="pl-10 pr-4 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <Search className="absolute left-3 top-2 h-4 w-4 text-gray-500" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col space-y-4 bg-white border-t">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium hover:text-red-500"
            >
              Home
            </Link>
            <Link
              to="/About"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium hover:text-red-500"
            >
              About Us
            </Link>
            <Link
              to="/Products"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium hover:text-red-500"
            >
              Products
            </Link>
            <Link
              to="/Service"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium hover:text-red-500"
            >
              Service
            </Link>
            <Link
              to="/Work_Education"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium hover:text-red-500"
            >
              Work & Education
            </Link>
            <Link
              to="/ContactUs"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-medium hover:text-red-500"
            >
              Contact Us
            </Link>

            {/* Search Box for Mobile */}
            <div className="relative flex">
              <input
                type="text"
                placeholder="Search For Decor"
                className="pl-10 pr-4 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 w-full"
              />
              <Search className="absolute left-3 top-2 h-4 w-4 text-gray-500" />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
