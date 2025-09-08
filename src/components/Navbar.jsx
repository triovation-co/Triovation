import React, { useState, useEffect, useRef } from "react";
import { Search, Menu, X } from "lucide-react";
import Logo from "../assets/Logo.png";

const menuData = {
  Products: {
    categories: [
      {
        title: "Corporate Gifting",
        defaultItems: ["Acrylic lamps", "Lithophane", "Water Bottle", "Organising Desk"],
        allItems: [
          "Acrylic lamps", "Lithophane", "Water Bottle", "Organising Desk", "Coasters",
          "Trophy", "Keychain", "Phone stand holder", "Flower pot", "Notebooks",
          "Pen stands", "Badges", "Pop sockets", "Scented Candles"
        ]
      },
      {
        title: "Customisation & <br />Merchandising",
        defaultItems: ["Ceramic Cups", "Keychains", "Lithophane Frame", "T-shirts"],
        allItems: [
          "Ceramic Cups", "Keychains", "Lithophane Frame", "T-shirts", "Bottle engraving",
          "Characters", "Cap", "Tote bags", "Phone cover", "Name Plates", "Stickers",
          "Spotify playlist on product", "Airpod engraving", "Silver coin printing", "Fabric Printing"
        ]
      },
      {
        title: "Home & Decor",
        defaultItems: ["Clocks", "Characters", "Mandala/Abstract Boards", "Puzzle frame"],
        allItems: [
          "Clocks", "Characters", "Mandala/Abstract Boards", "Puzzle frame",
          "Gods Frame/idol", "Ac/Charger Stand"
        ]
      },
      {
        title: "Mechanical Products",
        defaultItems: ["Kinetic Clock", "Sanitiser Dispenser"],
        allItems: ["Kinetic Clock", "Sanitiser Dispenser", "Small Furniture", "Touch Lamps"]
      },
      {
        title: "Design, Prototyping <br />& Consultancy",
        defaultItems: ["Design Consultancy", "Branding", "UI/UX", "Zine"],
        allItems: [
          "Design Consultancy", "Branding", "UI/UX", "Zine", "Books", "Poster & Infographics",
          "Social media posts", "Illustration", "Mockups", "Business Cards"
        ]
      },
      {
        title: "Education &<br />  Workshops",
        defaultItems: ["Design Consultancy", "Branding", "UI/UX", "Zine"],
        allItems: ["Design Consultancy", "Branding", "UI/UX", "Zine", "Books", "Poster & Graphics"]
      }
    ]
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [currentPage, setCurrentPage] = useState('');
  const timeoutRef = useRef(null);

  // Get current page from URL and Debug
  useEffect(() => {
    const pathname = window.location.pathname;
    const page = pathname === '/' ? 'Home' : pathname.substring(1);
    setCurrentPage(page);
    console.log("Current page:", page);
  }, []);

  // Hover handler with 600ms delay for Products dropdown on non-Products pages
  const handleMenuHover = (item) => {
    console.log(`Hover on: ${item}, currentPage: ${currentPage}`);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (item === "Products" && currentPage !== "Products") {
      // 600ms delay on non-Products pages
      timeoutRef.current = setTimeout(() => {
        setActiveDropdown(item);
      }, 600);
    } else {
      // Immediate open on Products page
      setActiveDropdown(item);
    }
  };

  const handleMenuLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setExpandedCategories(new Set());
    }, 300);
  };

  const toggleCategoryExpansion = (categoryTitle) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      newSet.has(categoryTitle) ? newSet.delete(categoryTitle) : newSet.add(categoryTitle);
      return newSet;
    });
  };

  useEffect(() => {
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* Top Bar */}
      <div className="w-full bg-[#8C91D1] text-white text-xs sm:text-sm md:text-base text-center py-2 md:py-4"></div>

      {/* Main Navbar */}
      <nav className="w-full bg-white shadow-sm relative">
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-2 md:py-3">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer transition-transform hover:scale-105"
            onClick={() => (window.location.href = "/")}
          >
            <img src={Logo} alt="Logo" className="h-10 sm:h-12 md:h-14 w-auto" />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 ml-auto">
            {["Home", "About", "Products", "Service", "Work_Education", "Contact Us"].map(
              (item, i) => (
                <div
                  key={i}
                  className="relative"
                  onMouseEnter={() => handleMenuHover(item)}
                  onMouseLeave={handleMenuLeave}
                >
                  <a
                    href={`/${item === "Home" ? "" : item}`}
                    onClick={() => {
                      setIsOpen(false);
                      setCurrentPage(item === "Home" ? "Home" : item);
                    }}
                    className="text-gray-700 font-medium hover:text-red-500 transition-all duration-300 text-sm lg:text-[17px] relative group"
                  >
                    {item.replace("_", " ")}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>

                  {/* FIXED: Removed currentPage === "Products" condition */}
                  {item === "Products" && activeDropdown === item && (
                    <div
                      className="fixed top-full left-0 right-0 bg-white shadow-2xl rounded-lg border border-gray-100 opacity-0 animate-fadeIn z-50"
                      style={{ animation: "fadeIn 0.3s ease-out forwards" }}
                      onMouseEnter={() => timeoutRef.current && clearTimeout(timeoutRef.current)}
                      onMouseLeave={handleMenuLeave}
                    >
                      <div className="p-6 sm:p-8">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
                          {menuData.Products.categories.map((category, idx) => {
                            const isExpanded = expandedCategories.has(category.title);
                            const itemsToShow = isExpanded
                              ? category.allItems
                              : category.defaultItems;

                            return (
                              <div key={idx} className="space-y-4">
                                <h3
                                  className="font-semibold text-gray-900 text-xs sm:text-sm uppercase tracking-wide text-left leading-tight whitespace-normal min-h-[48px] flex items-start"
                                  dangerouslySetInnerHTML={{ __html: category.title }}
                                />
                                <ul className="space-y-2">
                                  {itemsToShow.map((subItem, subIdx) => (
                                    <li key={subIdx}>
                                      <a
                                        href={`/category/${encodeURIComponent(subItem)}`}
                                        className="text-gray-600 hover:text-red-500 duration-200 text-xs sm:text-sm block w-full text-left hover:translate-x-1 transform transition-transform"
                                      >
                                        {subItem}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                                {category.allItems.length > category.defaultItems.length && (
                                  <button
                                    onClick={() => toggleCategoryExpansion(category.title)}
                                    className="text-red-500 text-xs sm:text-sm font-medium hover:text-red-600 transition-colors"
                                  >
                                    {isExpanded ? "View Less ↑" : "View All →"}
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            )}

            <div className="relative flex mr-6 lg:mr-10">
              <input
                type="text"
                placeholder="Search For Decor"
                className="pl-10 pr-4 py-1.5 border rounded-md text-sm lg:text-[17px] w-full max-w-xs focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-300 focus:shadow-md focus:border-red-300"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
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
                className={`transition-all duration-300 ${isOpen ? "opacity-0 rotate-180 scale-0" : "opacity-100 rotate-0 scale-100"}`}
              />
              <X
                size={28}
                className={`absolute top-0 left-0 transition-all duration-500 ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-180 scale-0"}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="px-4 sm:px-6 pb-4 flex flex-col space-y-3 sm:space-y-4 bg-white border-t">
            {["Home", "About", "Products", "Service", "Work_Education", "Contact Us"].map(
              (item, i) => (
                <a
                  key={i}
                  href={`/${item === "Home" ? "" : item}`}
                  onClick={() => {
                    setIsOpen(false);
                    setCurrentPage(item === "Home" ? "Home" : item);
                  }}
                  className="text-gray-700 font-medium hover:text-red-500 transition-all duration-500 hover:translate-x-2 hover:bg-gray-50 py-2 px-2 rounded"
                >
                  {item.replace("_", " ")}
                </a>
              )
            )}

            <div className="relative flex">
              <input
                type="text"
                placeholder="Search For Decor"
                className="pl-10 pr-4 py-1.5 border rounded-md text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-300 focus:shadow-md focus:border-red-300"
              />
              <Search className="absolute left-3 top-2 h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
