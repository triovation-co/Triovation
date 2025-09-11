import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

import { 
  sections, 
  whatsNewItems, 
  bestSellerItems, 
  FestiveSeason,
  corporateGiftingProducts,
  customisationProducts,
  homeDecorProducts,
  mechanicalProducts,
  designConsultancyProducts,
  educationWorkshopsProducts,
} from "../assets/data.jsx";

// ⭐ Helper function to scroll to a ref with offset
const scrollToRef = (ref) => {
  if (ref.current) {
    const yOffset = -150;
    const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

// Helper function to get URL parameters
const useQuery = () => {
  return new URLSearchParams(window.location.search);
};

const Products = () => {
  const [showAllFestive, setShowAllFestive] = useState(false);
  const [showAllCorporate, setShowAllCorporate] = useState(false);
  const [showAllCustomisation, setShowAllCustomisation] = useState(false);
  const [showAllHomeDecor, setShowAllHomeDecor] = useState(false);
  const [showAllMechanical, setShowAllMechanical] = useState(false);
  const [showAllDesign, setShowAllDesign] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);
  
  // Add new state for highlighted product
  const [highlightedProduct, setHighlightedProduct] = useState(null);

  const festiveRef = useRef(null);
  const corporateRef = useRef(null);
  const customisationRef = useRef(null);
  const homeDecorRef = useRef(null);
  const mechanicalRef = useRef(null);
  const designRef = useRef(null);
  const educationRef = useRef(null);

  // Add function to find product in sections
  const findProductInSections = (productName) => {
    const sections = [
      { name: 'festive', products: FestiveSeason },
      { name: 'corporate', products: corporateGiftingProducts },
      { name: 'customisation', products: customisationProducts },
      { name: 'homeDecor', products: homeDecorProducts },
      { name: 'mechanical', products: mechanicalProducts },
      { name: 'design', products: designConsultancyProducts },
      { name: 'education', products: educationWorkshopsProducts }
    ];

    for (const section of sections) {
      const found = section.products.find(product => 
        product.name.toLowerCase().includes(productName.toLowerCase()) ||
        productName.toLowerCase().includes(product.name.toLowerCase())
      );
      if (found) {
        return { section: section.name, product: found };
      }
    }
    return null;
  };

  // Add function to expand relevant section
  const expandRelevantSection = (sectionName) => {
    switch(sectionName) {
      case 'festive':
        setShowAllFestive(true);
        break;
      case 'corporate':
        setShowAllCorporate(true);
        break;
      case 'customisation':
        setShowAllCustomisation(true);
        break;
      case 'homeDecor':
        setShowAllHomeDecor(true);
        break;
      case 'mechanical':
        setShowAllMechanical(true);
        break;
      case 'design':
        setShowAllDesign(true);
        break;
      case 'education':
        setShowAllEducation(true);
        break;
    }
  };

  // Add function to get section ref
  const getSectionRef = (sectionName) => {
    switch(sectionName) {
      case 'festive': return festiveRef;
      case 'corporate': return corporateRef;
      case 'customisation': return customisationRef;
      case 'homeDecor': return homeDecorRef;
      case 'mechanical': return mechanicalRef;
      case 'design': return designRef;
      case 'education': return educationRef;
      default: return null;
    }
  };

  // Add function to scroll to product
  const scrollToProduct = (productName) => {
    // Find the product in all sections and scroll to appropriate section
    const productFound = findProductInSections(productName);
    if (productFound) {
      // Show all products in the relevant section first
      expandRelevantSection(productFound.section);
      
      // Scroll to the section
      setTimeout(() => {
        const sectionRef = getSectionRef(productFound.section);
        if (sectionRef) {
          scrollToRef(sectionRef);
        }
      }, 200);
    }
  };

  // Add useEffect to handle highlighting
  useEffect(() => {
    const query = useQuery();
    const highlightParam = query.get('highlight');
    if (highlightParam) {
      setHighlightedProduct(highlightParam);
      
      // Scroll to the product after a short delay to ensure page is loaded
      setTimeout(() => {
        scrollToProduct(highlightParam);
      }, 500);
      
      // Remove highlight after 5 seconds
      setTimeout(() => {
        setHighlightedProduct(null);
        // Remove the query parameter from URL without refreshing
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }, 5000);
    }
  }, []);

  // Helper function to check if product should be highlighted
  const shouldHighlight = (product) => {
    return highlightedProduct && 
           (product.name.toLowerCase().includes(highlightedProduct.toLowerCase()) ||
            highlightedProduct.toLowerCase().includes(product.name.toLowerCase()));
  };

  const displayedFestiveProducts = showAllFestive ? FestiveSeason : FestiveSeason.slice(0, 8);
  const displayedCorporateProducts = showAllCorporate ? corporateGiftingProducts : corporateGiftingProducts.slice(0, 8);
  const displayedCustomisationProducts = showAllCustomisation ? customisationProducts : customisationProducts.slice(0, 8);
  const displayedHomeDecorProducts = showAllHomeDecor ? homeDecorProducts : homeDecorProducts.slice(0, 8);
  const displayedMechanicalProducts = showAllMechanical ? mechanicalProducts : mechanicalProducts.slice(0, 8);
  const displayedDesignProducts = showAllDesign ? designConsultancyProducts : designConsultancyProducts.slice(0, 8);
  const displayedEducationProducts = showAllEducation ? educationWorkshopsProducts : educationWorkshopsProducts.slice(0, 8);

  return (
    <main className="mx-auto px-15 py-12">
      <div className="flex justify-end">
         <button className="border p-1 px-4">Sort by</button>
      </div>
      
      <div>
        <h1 className="text-center text-xl font-semibold text-gray-900 mb-8">WHAT'S NEW</h1>
        
        {/* What's New Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-15 mb-20">
          {whatsNewItems.map((item, index) => (
            <div key={index}>
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-50 object-cover group-hover:scale-105 rounded-2xl transition-transform duration-300 mb-2"
              />
              <p className="text-xl text-center font-semibold text-gray-600">{item.title}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center my-10">
          <div className="flex-grow border-t-2 border-gray-300"></div>
          <span className="mx-4 text-gray-800 font-semibold text-xl"> BEST SELLER </span>
          <div className="flex-grow border-t-2 border-gray-300"></div>
        </div>

        {/* Best Seller Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-15 mb-20">
          {bestSellerItems.map((item, index) => (
            <div key={index}>
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-90 object-cover group-hover:scale-105 rounded-2xl transition-transform duration-300 mb-2"
              />
              <p className="text-xl text-center font-semibold text-gray-600">{item.title}</p>
            </div>
          ))}
        </div>

        {/* Festive Season Section */}
        <div ref={festiveRef} className="flex items-center my-10">
          <div className="flex-grow border-t-2 border-gray-300"></div>
          <span className="mx-4 text-gray-800 font-semibold text-xl"> FESTIVE SEASON </span>
          <div className="flex-grow border-t-2 border-gray-300"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 mb-20">
          {displayedFestiveProducts.map((product) => (
            <div 
              key={product.id} 
              className="rounded-2xl overflow-hidden bg-white flex flex-col h-full"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={`rounded-2xl w-full h-48 sm:h-56 md:h-64 object-cover transition-all duration-500 ${
                    shouldHighlight(product)
                      ? 'brightness-110 contrast-105 shadow-lg' 
                      : ''
                  }`}
                />
                {product.savePercent && (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    Save {product.savePercent}
                  </div>
                )}
              </div>
              
              <div className="p-4 flex flex-col flex-grow text-center">
                <h2 className="text-base sm:text-lg text-gray-700 font-semibold mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed flex-grow">
                  {product.description || `A unique and quirky way to preserve your memories — gift your loved ones this ${product.name}.`}
                </p>

                <div className="flex justify-center items-center text-xs sm:text-sm mb-2">
                  {product.rating ? (
                    <>⭐ <span className="ml-1">{product.rating} ({product.reviews} reviews)</span></>
                  ) : (
                    <>⭐ <span className="ml-1">5.0 (2 reviews)</span></>
                  )}
                </div>

                <p className="font-medium text-gray-800 mb-4 text-sm sm:text-base">
                  {product.originalPrice ? (
                    <>
                      <span className="line-through text-gray-500 mr-2">₹{product.originalPrice}</span>
                      from ₹{product.price}
                    </>
                  ) : (
                    `from ₹${product.price}`
                  )}
                </p>

                <div className="w-full flex justify-center mt-auto">
                  <button className="bg-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-md rounded-md hover:bg-blue-600 w-auto">
                    {product.buyNowText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button for Festive Season */}
        {FestiveSeason.length > 8 && (
          <div className="flex justify-center mb-20 -mt-10">
            <button
              onClick={() => {
                if (showAllFestive) {
                  setShowAllFestive(false);
                  setTimeout(() => scrollToRef(festiveRef), 100);
                } else {
                  setShowAllFestive(true);
                }
              }}
              className="group flex items-center gap-2 rounded-xl px-12 py-1.5 font-medium text-lg bg-blue-400 text-white"
            >
              {showAllFestive ? (
                <span className="font-medium tracking-wide transition-transform duration-300 group-hover:scale-105">
                  View Less
                </span>
              ) : (
                <span className="font-medium tracking-wide transition-transform duration-300 group-hover:scale-105">
                  View All
                </span>
              )}
            </button>
          </div>
        )}

        {/* Corporate Gifting Section */}
        <div ref={corporateRef} className="flex items-center my-10">
          <div className="flex-grow border-t-2 border-gray-300"></div>
          <span className="mx-4 text-gray-800 font-semibold text-xl"> CORPORATE GIFTING </span>
          <div className="flex-grow border-t-2 border-gray-300"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 mb-20">
          {displayedCorporateProducts.map((product) => (
            <div 
              key={product.id} 
              className="rounded-2xl overflow-hidden bg-white flex flex-col h-full"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={`rounded-2xl w-full h-48 sm:h-56 md:h-64 object-cover transition-all duration-500 ${
                    shouldHighlight(product)
                      ? 'brightness-110 contrast-105 shadow-lg' 
                      : ''
                  }`}
                />
                {product.savePercent && (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    Save {product.savePercent}
                  </div>
                )}
              </div>
              
              <div className="p-4 flex flex-col flex-grow text-center">
                <h2 className="text-base sm:text-lg text-gray-700 font-semibold mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed flex-grow">
                  {product.description || `Perfect for corporate gifting - ${product.name}.`}
                </p>

                <div className="flex justify-center items-center text-xs sm:text-sm mb-2">
                  {product.rating ? (
                    <>⭐ <span className="ml-1">{product.rating} ({product.reviews} reviews)</span></>
                  ) : (
                    <>⭐ <span className="ml-1">4.5 (5 reviews)</span></>
                  )}
                </div>

                <p className="font-medium text-gray-800 mb-4 text-sm sm:text-base">
                  {product.originalPrice ? (
                    <>
                      <span className="line-through text-gray-500 mr-2">₹{product.originalPrice}</span>
                      from ₹{product.price}
                    </>
                  ) : (
                    `from ₹${product.price}`
                  )}
                </p>

                <div className="w-full flex justify-center mt-auto">
                  <button className="bg-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-md rounded-md hover:bg-blue-600 w-auto">
                    {product.buyNowText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button for Corporate Gifting */}
        {corporateGiftingProducts.length > 8 && (
          <div className="flex justify-center mb-20 -mt-10">
            <button
              onClick={() => {
                if (showAllCorporate) {
                  setShowAllCorporate(false);
                  setTimeout(() => scrollToRef(corporateRef), 100);
                } else {
                  setShowAllCorporate(true);
                }
              }}
              className="group flex items-center gap-2 rounded-xl px-12 py-1.5 font-medium text-lg bg-blue-400 text-white"
            >
              {showAllCorporate ? (
                <span className="font-medium tracking-wide transition-transform duration-300 group-hover:scale-105">
                  View Less
                </span>
              ) : (
                <span className="font-medium tracking-wide transition-transform duration-300 group-hover:scale-105">
                  View All
                </span>
              )}
            </button>
          </div>
        )}

        {/* Customisation & Merchandising Section */}
        <div ref={customisationRef} className="flex items-center my-10">
          <div className="flex-grow border-t-2 border-gray-300"></div>
          <span className="mx-4 text-gray-800 font-semibold text-xl"> CUSTOMISATION & MERCHANDISING </span>
          <div className="flex-grow border-t-2 border-gray-300"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 mb-20">
          {displayedCustomisationProducts.map((product) => (
            <div 
              key={product.id} 
              className="rounded-2xl overflow-hidden bg-white flex flex-col h-full"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={`rounded-2xl w-full h-48 sm:h-56 md:h-64 object-cover transition-all duration-500 ${
                    shouldHighlight(product)
                      ? 'brightness-110 contrast-105 shadow-lg' 
                      : ''
                  }`}
                />
                {product.savePercent && (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    Save {product.savePercent}
                  </div>
                )}
              </div>
              
              <div className="p-4 flex flex-col flex-grow text-center">
                <h2 className="text-base sm:text-lg text-gray-700 font-semibold mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed flex-grow">
                  {product.description || `Personalized ${product.name} for unique gifting.`}
                </p>

                <div className="flex justify-center items-center text-xs sm:text-sm mb-2">
                  {product.rating ? (
                    <>⭐ <span className="ml-1">{product.rating} ({product.reviews} reviews)</span></>
                  ) : (
                    <>⭐ <span className="ml-1">4.5 (10 reviews)</span></>
                  )}
                </div>

                <p className="font-medium text-gray-800 mb-4 text-sm sm:text-base">
                  {product.originalPrice ? (
                    <>
                      <span className="line-through text-gray-500 mr-2">₹{product.originalPrice}</span>
                      from ₹{product.price}
                    </>
                  ) : (
                    `from ₹${product.price}`
                  )}
                </p>

                <div className="w-full flex justify-center mt-auto">
                  <button className="bg-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-md rounded-md hover:bg-blue-600 w-auto">
                    {product.buyNowText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button for Customisation & Merchandising */}
        {customisationProducts.length > 8 && (
          <div className="flex justify-center mb-20 -mt-10">
            <button
              onClick={() => {
                if (showAllCustomisation) {
                  setShowAllCustomisation(false);
                  setTimeout(() => scrollToRef(customisationRef), 100);
                } else {
                  setShowAllCustomisation(true);
                }
              }}
              className="group flex items-center gap-2 rounded-xl px-12 py-1.5 font-medium text-lg bg-blue-400 text-white"
            >
              {showAllCustomisation ? (
                <span className="font-medium tracking-wide transition-transform duration-300 group-hover:scale-105">
                  View Less
                </span>
              ) : (
                <span className="font-medium tracking-wide transition-transform duration-300 group-hover:scale-105">
                  View All
                </span>
              )}
            </button>
          </div>
        )}

        {/* Home & Decor Section */}
        <div ref={homeDecorRef} className="flex items-center my-10">
          <div className="flex-grow border-t-2 border-gray-300"></div>
          <span className="mx-4 text-gray-800 font-semibold text-xl"> HOME & DECOR </span>
          <div className="flex-grow border-t-2 border-gray-300"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 mb-20">
          {displayedHomeDecorProducts.map((product) => (
            <div 
              key={product.id} 
              className="rounded-2xl overflow-hidden bg-white flex flex-col h-full"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={`rounded-2xl w-full h-48 sm:h-56 md:h-64 object-cover transition-all duration-500 ${
                    shouldHighlight(product)
                      ? 'brightness-110 contrast-105 shadow-lg' 
                      : ''
                  }`}
                />
                {product.savePercent && (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    Save {product.savePercent}
                  </div>
                )}
              </div>
              
              <div className="p-4 flex flex-col flex-grow text-center">
                <h2 className="text-base sm:text-lg text-gray-700 font-semibold mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed flex-grow">
                  {product.description || `Beautiful ${product.name} for home decoration.`}
                </p>

                <div className="flex justify-center items-center text-xs sm:text-sm mb-2">
                  {product.rating ? (
                    <>⭐ <span className="ml-1">{product.rating} ({product.reviews} reviews)</span></>
                  ) : (
                    <>⭐ <span className="ml-1">4.5 (10 reviews)</span></>
                  )}
                </div>

                <p className="font-medium text-gray-800 mb-4 text-sm sm:text-base">
                  {product.originalPrice ? (
                    <>
                      <span className="line-through text-gray-500 mr-2">₹{product.originalPrice}</span>
                      from ₹{product.price}
                    </>
                  ) : (
                    `from ₹${product.price}`
                  )}
                </p>

                <div className="w-full flex justify-center mt-auto">
                  <button className="bg-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-md rounded-md hover:bg-blue-600 w-auto">
                    {product.buyNowText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button for Home & Decor */}
        {homeDecorProducts.length > 8 && (
          <div className="flex justify-center mb-20 -mt-10">
            <button
              onClick={() => {
                if (showAllHomeDecor) {
                  setShowAllHomeDecor(false);
                  setTimeout(() => scrollToRef(homeDecorRef), 100);
                } else {
                  setShowAllHomeDecor(true);
                }
              }}
              className="group flex items-center gap-2 rounded-xl px-12 py-1.5 font-medium text-lg bg-blue-400 text-white"
            >
              {showAllHomeDecor ? (
                <span className="font-medium tracking-wide transition-transform duration-300 group-hover:scale-105">
                  View Less
                </span>
              ) : (
                <span className="font-medium tracking-wide transition-transform duration-300 group-hover:scale-105">
                  View All
                </span>
              )}
            </button>
          </div>
        )}

        {/* Mechanical Products Section */}
        <div ref={mechanicalRef} className="flex items-center my-10">
          <div className="flex-grow border-t-2 border-gray-300"></div>
          <span className="mx-4 text-gray-800 font-semibold text-xl"> MECHANICAL PRODUCTS </span>
          <div className="flex-grow border-t-2 border-gray-300"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 mb-20">
          {displayedMechanicalProducts.map((product) => (
            <div 
              key={product.id} 
              className="rounded-2xl overflow-hidden bg-white flex flex-col h-full"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={`rounded-2xl w-full h-48 sm:h-56 md:h-64 object-cover transition-all duration-500 ${
                    shouldHighlight(product)
                      ? 'brightness-110 contrast-105 shadow-lg' 
                      : ''
                  }`}
                />
                {product.savePercent && (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    Save {product.savePercent}
                  </div>
                )}
              </div>
              
              <div className="p-4 flex flex-col flex-grow text-center">
                <h2 className="text-base sm:text-lg text-gray-700 font-semibold mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed flex-grow">
                  {product.description || `Innovative ${product.name} with mechanical precision.`}
                </p>

                <div className="flex justify-center items-center text-xs sm:text-sm mb-2">
                  {product.rating ? (
                    <>⭐ <span className="ml-1">{product.rating} ({product.reviews} reviews)</span></>
                  ) : (
                    <>⭐ <span className="ml-1">4.5 (10 reviews)</span></>
                  )}
                </div>

                <p className="font-medium text-gray-800 mb-4 text-sm sm:text-base">
                  {product.originalPrice ? (
                    <>
                      <span className="line-through text-gray-500 mr-2">₹{product.originalPrice}</span>
                      from ₹{product.price}
                    </>
                  ) : (
                    `from ₹${product.price}`
                  )}
                </p>

                <div className="w-full flex justify-center mt-auto">
                  <button className="bg-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-md rounded-md hover:bg-blue-600 w-auto">
                    {product.buyNowText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button for Mechanical Products */}
        {mechanicalProducts.length > 8 && (
          <div className="flex justify-center mb-20 -mt-10">
            <button
              onClick={() => {
                if (showAllMechanical) {
                  setShowAllMechanical(false);
                  setTimeout(() => scrollToRef(mechanicalRef), 100);
                } else {
                  setShowAllMechanical(true);
                }
              }}
              className="group flex items-center gap-2 rounded-xl px-12 py-1.5 font-medium text-lg bg-blue-400 text-white"
            >
              {showAllMechanical ? (
                <span className="font-medium tracking-wide transition-transform duration-300 group-hover:scale-105">
                  View Less
                </span>
              ) : (
                <span className="font-medium tracking-wide transition-transform duration-300 group-hover:scale-105">
                  View All
                </span>
              )}
            </button>
          </div>
        )}

        {/* Design, Prototyping & Consultancy Section */}
        <div ref={designRef} className="flex items-center my-10">
          <div className="flex-grow border-t-2 border-gray-300"></div>
          <span className="mx-4 text-gray-800 font-semibold text-xl"> DESIGN, PROTOTYPING & CONSULTANCY </span>
          <div className="flex-grow border-t-2 border-gray-300"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 mb-20">
          {displayedDesignProducts.map((product) => (
            <div 
              key={product.id} 
              className="rounded-2xl overflow-hidden bg-white flex flex-col h-full"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={`rounded-2xl w-full h-48 sm:h-56 md:h-64 object-cover transition-all duration-500 ${
                    shouldHighlight(product)
                      ? 'brightness-110 contrast-105 shadow-lg' 
                      : ''
                  }`}
                />
                {product.savePercent && (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    Save {product.savePercent}
                  </div>
                )}
              </div>
              
              <div className="p-4 flex flex-col flex-grow text-center">
                <h2 className="text-base sm:text-lg text-gray-700 font-semibold mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed flex-grow">
                  {product.description || `Professional ${product.name} service for your business.`}
                </p>

                <div className="flex justify-center items-center text-xs sm:text-sm mb-2">
                  {product.rating ? (
                    <>⭐ <span className="ml-1">{product.rating} ({product.reviews} reviews)</span></>
                  ) : (
                    <>⭐ <span className="ml-1">4.5 (10 reviews)</span></>
                  )}
                </div>

                <p className="font-medium text-gray-800 mb-4 text-sm sm:text-base">
                  {product.originalPrice ? (
                    <>
                      <span className="line-through text-gray-500 mr-2">₹{product.originalPrice}</span>
                      from ₹{product.price}
                    </>
                  ) : (
                    `from ₹${product.price}`
                  )}
                </p>

                <div className="w-full flex justify-center mt-auto">
                  <button className="bg-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-md rounded-md hover:bg-blue-600 w-auto">
                    {product.buyNowText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button for Design, Prototyping & Consultancy */}
        {designConsultancyProducts.length > 8 && (
          <div className="flex justify-center mb-20 -mt-10">
            <button
              onClick={() => {
                if (showAllDesign) {
                  setShowAllDesign(false);
                  setTimeout(() => scrollToRef(designRef), 100);
                } else {
                  setShowAllDesign(true);
                }
              }}
              className="group flex items-center gap-2 rounded-xl px-12 py-1.5 font-medium text-lg bg-blue-400 text-white"
            >
              {showAllDesign ? (
                <span className="font-medium tracking-wide transition-transform duration-300 group-hover:scale-105">
                  View Less
                </span>
              ) : (
                <span className="font-medium tracking-wide transition-transform duration-300 group-hover:scale-105">
                  View All
                </span>
              )}
            </button>
          </div>
        )}

        {/* Education & Workshops Section */}
        <div ref={educationRef} className="flex items-center my-10">
          <div className="flex-grow border-t-2 border-gray-300"></div>
          <span className="mx-4 text-gray-800 font-semibold text-xl"> EDUCATION & WORKSHOPS </span>
          <div className="flex-grow border-t-2 border-gray-300"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 mb-20">
          {displayedEducationProducts.map((product) => (
            <div 
              key={product.id} 
              className="rounded-2xl overflow-hidden bg-white flex flex-col h-full"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={`rounded-2xl w-full h-48 sm:h-56 md:h-64 object-cover transition-all duration-500 ${
                    shouldHighlight(product)
                      ? 'brightness-110 contrast-105 shadow-lg' 
                      : ''
                  }`}
                />
                {product.savePercent && (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    Save {product.savePercent}
                  </div>
                )}
              </div>
              
              <div className="p-4 flex flex-col flex-grow text-center">
                <h2 className="text-base sm:text-lg text-gray-700 font-semibold mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed flex-grow">
                  {product.description || `Educational ${product.name} to enhance your skills.`}
                </p>

                <div className="flex justify-center items-center text-xs sm:text-sm mb-2">
                  {product.rating ? (
                    <>⭐ <span className="ml-1">{product.rating} ({product.reviews} reviews)</span></>
                  ) : (
                    <>⭐ <span className="ml-1">4.5 (10 reviews)</span></>
                  )}
                </div>

                <p className="font-medium text-gray-800 mb-4 text-sm sm:text-base">
                  {product.originalPrice ? (
                    <>
                      <span className="line-through text-gray-500 mr-2">₹{product.originalPrice}</span>
                      from ₹{product.price}
                    </>
                  ) : (
                    `from ₹${product.price}`
                  )}
                </p>

                <div className="w-full flex justify-center mt-auto">
                  <button className="bg-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-md rounded-md hover:bg-blue-600 w-auto">
                    {product.buyNowText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button for Education & Workshops */}
        {educationWorkshopsProducts.length > 8 && (
          <div className="flex justify-center mb-20 -mt-10">
            <button
              onClick={() => {
                if (showAllEducation) {
                  setShowAllEducation(false);
                  setTimeout(() => scrollToRef(educationRef), 100);
                } else {
                  setShowAllEducation(true);
                }
              }}
              className="group flex items-center gap-2 rounded-xl px-12 py-1.5 font-medium text-lg bg-blue-400 text-white"
            >
              {showAllEducation ? (
                <span className="font-medium tracking-wide transition-transform duration-300 group-hover:scale-105">
                  View Less
                </span>
              ) : (
                <span className="font-medium tracking-wide transition-transform duration-300 group-hover:scale-105">
                  View All
                </span>
              )}
            </button>
          </div>
        )}

      </div>

      <h1 className="text-center text-4xl font-medium text-gray-900 mb-8">
        All Product Categories
      </h1>

      {sections.map((section, idx) => (
        <div key={idx} className="mb-16">
          {idx !== 0 && (
            <div className="flex items-center my-10">
              <div className="flex-grow border-t-2 border-gray-300"></div>
              <span className="mx-4 text-gray-700 font-semibold text-2xl">
                {section.title}
              </span>
              <div className="flex-grow border-t-2 border-gray-300"></div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-15">
            {section.items.map((item, i) => (
              <Link 
                key={i} 
                to={`/Category_page/${encodeURIComponent(item.title)}`}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-md group cursor-pointer">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-90 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-center text-lg font-semibold px-2">
                      {item.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
};

export default Products;
