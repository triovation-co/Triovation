import React, { useState, useEffect, useRef } from "react";
import { Search, Menu, X, ShoppingCart } from "lucide-react";
import Logo from "../assets/logo_bg.png";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProductManager } from "../hooks/useProductManager";

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
  const [currentPage, setCurrentPage] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const timeoutRef = useRef(null);

  // Get products from Google Sheets
  const { products: sheetProducts, loading: productsLoading } = useProductManager();

  // Extract all product items for search suggestions - NOW INCLUDING SHEET PRODUCTS
  useEffect(() => {
    const staticItems = [];
    
    // Get static items from menuData
    menuData.Products.categories.forEach(category => {
      category.allItems.forEach(item => {
        if (!staticItems.includes(item)) {
          staticItems.push(item);
        }
      });
    });

    // Add products from Google Sheets
    if (sheetProducts && sheetProducts.length > 0) {
      const dynamicItems = sheetProducts.map(product => product.name);
      // Combine and remove duplicates
      const allItems = [...staticItems, ...dynamicItems];
      const uniqueItems = [...new Set(allItems)];
      setSuggestions(uniqueItems);
    } else {
      setSuggestions(staticItems);
    }
  }, [sheetProducts]);

  useEffect(() => {
    const pathname = window.location.pathname;
    const page = pathname === "/" ? "Home" : pathname.substring(1);
    setCurrentPage(page);
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuHover = (item) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (item === "Products" && currentPage !== "Products") {
      timeoutRef.current = setTimeout(() => {
        setActiveDropdown(item);
      }, 600);
    } else {
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
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      newSet.has(categoryTitle) ? newSet.delete(categoryTitle) : newSet.add(categoryTitle);
      return newSet;
    });
  };

  useEffect(() => {
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    setMobileSearchOpen(false);
    window.location.href = `/Products?search=${encodeURIComponent(suggestion)}`;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowSuggestions(false);
      setMobileSearchOpen(false);
      window.location.href = `/Products?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  const filteredSuggestions = searchTerm 
    ? suggestions.filter(item => 
        item.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 8)
    : [];

  const clearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
  };

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top Bar */}
      <div className="w-full bg-[#f47e82] text-white text-xs sm:text-sm md:text-base text-center py-2 md:py-4"></div>

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
            {["Home", "About", "Products", "Consultancy", "Education", "ContactUs"].map(
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

                  {/* Dropdown */}
                  {item === "Products" && activeDropdown === item && (
                    <div
                      className="fixed top-full left-0 right-0 bg-white shadow-2xl rounded-lg border border-gray-100 opacity-0 animate-fadeIn z-50"
                      style={{ animation: "fadeIn 0.3s ease-out forwards" }}
                      onMouseEnter={() =>
                        timeoutRef.current && clearTimeout(timeoutRef.current)
                      }
                      onMouseLeave={handleMenuLeave}
                    >
                      <div className="p-8 sm:p-10 flex justify-center">
                        <div className="w-full max-w-7xl px-4">
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-10">
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
                                          href={`/Products?highlight=${encodeURIComponent(
                                            subItem
                                          )}`}
                                          className="text-gray-600 hover:text-red-500 duration-200 text-xs sm:text-sm block w-full text-left hover:translate-x-1 transform transition-transform"
                                          onClick={() => {
                                            setActiveDropdown(null);
                                            setExpandedCategories(new Set());
                                          }}
                                        >
                                          {subItem}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                  {category.allItems.length >
                                    category.defaultItems.length && (
                                    <button
                                      onClick={() =>
                                        toggleCategoryExpansion(category.title)
                                      }
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
                    </div>
                  )}
                </div>
              )
            )}

            {/* Desktop Search */}
            <div className="relative flex mr-6 lg:mr-10" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search For Decor"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => searchTerm && setShowSuggestions(true)}
                  className="pl-10 pr-10 py-1.5 border rounded-md text-sm lg:text-[17px] w-full max-w-xs focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-300 focus:shadow-md focus:border-red-300"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </form>

              {/* Suggestions Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  {productsLoading && (
                    <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-b">
                      Loading more products...
                    </div>
                  )}
                  <ul className="py-2">
                    {filteredSuggestions.map((suggestion, index) => (
                      <li key={index}>
                        <button
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 transition-colors flex items-center"
                        >
                          <Search size={14} className="mr-3 text-gray-400" />
                          {suggestion}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* No results message */}
              {showSuggestions && filteredSuggestions.length === 0 && searchTerm && !productsLoading && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div className="px-4 py-3 text-sm text-gray-500">
                    No results found for "{searchTerm}"
                  </div>
                </div>
              )}

              {/* Loading state */}
              {showSuggestions && searchTerm && productsLoading && filteredSuggestions.length === 0 && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div className="px-4 py-3 text-sm text-gray-500 flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2"></div>
                    Searching products...
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Cart */}
            <Link
              to="/cart"
              className="relative text-gray-600 hover:text-orange-500 transition-colors duration-200"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Mobile Search Icon */}
            {!mobileSearchOpen && (
              <button
                onClick={() => setMobileSearchOpen(true)}
                className="text-gray-700 hover:text-red-500 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            )}

            {/* Mobile Cart */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-orange-500 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="text-gray-700 transition-all duration-500 hover:text-red-500 hover:scale-110"
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
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden px-4 py-2 bg-white border-t animate-fadeIn relative">
            <div className="flex items-center space-x-2">
              <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center relative">
                <Search className="h-5 w-5 text-gray-500 absolute left-2" />
                <input
                  type="text"
                  placeholder="Search For Decor"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => searchTerm && setShowSuggestions(true)}
                  autoFocus
                  className="flex-1 border rounded-md pl-9 pr-8 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-red-300 w-full transition-all"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="text-gray-400 hover:text-gray-600 absolute right-2"
                  >
                    <X size={16} />
                  </button>
                )}
              </form>
              <button
                onClick={() => {
                  setMobileSearchOpen(false);
                  setSearchTerm('');
                  setShowSuggestions(false);
                }}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Suggestions Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute left-4 right-4 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                {productsLoading && (
                  <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-b">
                    Loading more products...
                  </div>
                )}
                <ul className="py-2">
                  {filteredSuggestions.map((suggestion, index) => (
                    <li key={index}>
                      <button
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 transition-colors flex items-center"
                      >
                        <Search size={14} className="mr-3 text-gray-400" />
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Mobile No results message */}
            {showSuggestions && filteredSuggestions.length === 0 && searchTerm && !productsLoading && (
              <div className="absolute left-4 right-4 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div className="px-4 py-3 text-sm text-gray-500">
                  No results found for "{searchTerm}"
                </div>
              </div>
            )}

            {/* Mobile Loading state */}
            {showSuggestions && searchTerm && productsLoading && filteredSuggestions.length === 0 && (
              <div className="absolute left-4 right-4 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div className="px-4 py-3 text-sm text-gray-500 flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2"></div>
                  Searching products...
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 sm:px-6 pb-4 flex flex-col space-y-3 sm:space-y-4 bg-white border-t">
            {["Home", "About", "Products", "Consultancy", "Education", "ContactUs"].map(
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
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Navbar;