import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react"; // add at top with other imports

import { 
  sections, 
  whatsNewItems, 
  bestSellerItems, 
  FestiveSeason,
  corporateGiftingProducts
} from "../assets/data.jsx";

// ⭐ Helper function to scroll to a ref with offset (so title isn’t hidden under navbar)
const scrollToRef = (ref) => {
  if (ref.current) {
    const yOffset = -150; // adjust this based on your sticky navbar height
    const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const Products = () => {
  const [showAllFestive, setShowAllFestive] = useState(false);
  const [showAllCorporate, setShowAllCorporate] = useState(false);

  const festiveRef = useRef(null);
  const corporateRef = useRef(null);

  const displayedFestiveProducts = showAllFestive ? FestiveSeason : FestiveSeason.slice(0, 8);
  const displayedCorporateProducts = showAllCorporate ? corporateGiftingProducts : corporateGiftingProducts.slice(0, 8);

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
            <div key={product.id} className="rounded-2xl overflow-hidden bg-white flex flex-col h-full">
              {/* Product Image */}
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="rounded-2xl w-full h-48 sm:h-56 md:h-64 object-cover"
                />
                {product.savePercent && (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    Save {product.savePercent}
                  </div>
                )}
              </div>
              
              {/* Details */}
              <div className="p-4 flex flex-col flex-grow text-center">
                <h2 className="text-base sm:text-lg text-gray-700 font-semibold mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed flex-grow">
                  {product.description || `A unique and quirky way to preserve your memories — gift your loved ones this ${product.name}.`}
                </p>

                {/* Rating */}
                <div className="flex justify-center items-center text-xs sm:text-sm mb-2">
                  {product.rating ? (
                    <>⭐ <span className="ml-1">{product.rating} ({product.reviews} reviews)</span></>
                  ) : (
                    <>⭐ <span className="ml-1">5.0 (2 reviews)</span></>
                  )}
                </div>

                {/* Price */}
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

                {/* Buy Now Button */}
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
  <div className="flex justify-center mb-20">
    <button
      onClick={() => {
        if (showAllFestive) {
          setShowAllFestive(false);
          setTimeout(() => scrollToRef(festiveRef), 100); // scroll only on View Less
        } else {
          setShowAllFestive(true); // just expand, no scroll
        }
      }}
     className="group flex items-center gap-2 text-gray-900 font-medium text-lg hover:text-red-500 transition-colors duration-300"
    >
      {showAllFestive ? (
        <>
          <ChevronUp
            size={20}
            className="transform group-hover:-translate-y-1 transition-transform duration-300"
          />
          <span className="font-medium tracking-wide">View Less</span>
        </>
      ) : (
        <>
          <ChevronDown
            size={20}
            className="transform group-hover:translate-y-1 transition-transform duration-300"
          />
          <span className="font-medium tracking-wide">View All</span>
        </>
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
            <div key={product.id} className="rounded-2xl overflow-hidden bg-white flex flex-col h-full">
              {/* Product Image */}
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="rounded-2xl w-full h-48 sm:h-56 md:h-64 object-cover"
                />
                {product.savePercent && (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    Save {product.savePercent}
                  </div>
                )}
              </div>
              
              {/* Details */}
              <div className="p-4 flex flex-col flex-grow text-center">
                <h2 className="text-base sm:text-lg text-gray-700 font-semibold mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed flex-grow">
                  {product.description || `Perfect for corporate gifting - ${product.name}.`}
                </p>

                {/* Rating */}
                <div className="flex justify-center items-center text-xs sm:text-sm mb-2">
                  {product.rating ? (
                    <>⭐ <span className="ml-1">{product.rating} ({product.reviews} reviews)</span></>
                  ) : (
                    <>⭐ <span className="ml-1">4.5 (5 reviews)</span></>
                  )}
                </div>

                {/* Price */}
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

                {/* Buy Now Button */}
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
  <div className="flex justify-center mb-20">
    <button
      onClick={() => {
        if (showAllCorporate) {
          setShowAllCorporate(false);
          setTimeout(() => scrollToRef(corporateRef), 100); // scroll only on View Less
        } else {
          setShowAllCorporate(true); // just expand, no scroll
        }
      }}
     className="group flex items-center gap-2 text-gray-900 font-medium text-lg hover:text-red-500 transition-colors duration-300"
    >
      {showAllCorporate ? (
        <>
          <ChevronUp
            size={20}
            className="transform group-hover:-translate-y-1 transition-transform duration-300"
          />
          <span className="font-medium tracking-wide">View Less</span>
        </>
      ) : (
        <>
          <ChevronDown
            size={20}
            className="transform group-hover:translate-y-1 transition-transform duration-300"
          />
          <span className="font-medium tracking-wide">View All</span>
        </>
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
          {/* Divider + Title */}
          {idx !== 0 && (
            <div className="flex items-center my-10">
              <div className="flex-grow border-t-2 border-gray-300"></div>
              <span className="mx-4 text-gray-700 font-semibold text-2xl">
                {section.title}
              </span>
              <div className="flex-grow border-t-2 border-gray-300"></div>
            </div>
          )}

          {/* Grid of Items */}
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
                  {/* Hover Overlay */}
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
