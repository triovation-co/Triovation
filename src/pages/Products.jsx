import React from "react";
import { Link } from "react-router-dom";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";

// Sample Data
const sections = [
  {
    title: "All Product Categories",
    items: [
      { title: "Corporate Gifts Online", image: image1 },
      { title: "Unique Rakhi Gifts for Raksha Bandhan", image: image1 },
      { title: "Bigsmall Originals", image: image1 },
      { title: "Best Sellers", image: image1 },
      { title: "Unique Gadget Gifts", image: image1 },
      { title: "Unique Gifts for Her", image: image1 },
      { title: "Unique Gifts for Men", image: image1 },
      { title: "All of It - Gift Ideas", image: image1 },
    ],
  },
  {
    title: "Rakhi Gifts",
    items: [
      { title: "Unique Rakhi Gifts for Sister", image: image1 },
      { title: "Special Raksha Bandhan Gifts for Brother", image: image1 },
      { title: "Rakhi Gifts for Kids", image: image1 },
      { title: "Rakhi Gifts for Bhaiya and Bhabhi", image: image1 },
    ],
  },
  {
    title: "Raksha Bandhan Gifts",
    items: [
      { title: "Gift 1", image: image1 },
      { title: "Gift 2", image: image1 },
      { title: "Gift 3", image: image1 },
      { title: "Gift 4", image: image1 },
    ],
  },
];

// New data for the Raksha Bandhan Gifts layout
const rakhiBandhanGifts = [
  {
    id: 1,
    name: "Personalized Caricature Wooden Print With Easel",
    description: "COD Not Available",
    price: 1999,
    originalPrice: null,
    discount: null,
    rating: null,
    reviews: null,
    image: image2,
    buyNowText: "BUY NOW"
  },
  {
    id: 2,
    name: "Digital Photo & Video Frame",
    description: "daughter to daughter, now you get love from",
    price: 2016,
    originalPrice: null,
    discount: null,
    rating: 5.0,
    reviews: 16,
    image: image2,
    buyNowText: "BUY NOW",
    savePercent: "40%"
  },
  {
    id: 3,
    name: "Reel Bro Rakhi",
    description: "",
    price: 299,
    originalPrice: null,
    discount: null,
    rating: 5.0,
    reviews: 5,
    image: image2,
    buyNowText: "BUY NOW"
  },
  {
    id: 4,
    name: "Little Man Cave Hanging Board",
    description: "",
    price: 299,
    originalPrice: null,
    discount: null,
    rating: null,
    reviews: null,
    image: image2,
    buyNowText: "BUY NOW",
    savePercent: "25%"
  },
  {
    id: 5,
    name: "Blend of Elegance Gift Set",
    description: "Every's body smoothing balm and smooth Lime Moisturising luxury on the go!",
    price: 2499,
    originalPrice: null,
    discount: null,
    rating: null,
    reviews: null,
    image: image2,
    buyNowText: "BUY NOW"
  },
  {
    id: 6,
    name: "Fabulous Boy Badge With Magnet",
    description: "",
    price: 99,
    originalPrice: null,
    discount: null,
    rating: null,
    reviews: null,
    image: image2,
    buyNowText: "BUY NOW"
  },
  {
    id: 7,
    name: "Netflix Bro Unique Rakhi",
    description: "",
    price: 299,
    originalPrice: 399,
    discount: null,
    rating: 5.0,
    reviews: 5,
    image: image2,
    buyNowText: "BUY NOW"
  },
  {
    id: 8,
    name: "Desi Bhai Latest Rakhi",
    description: "",
    price: 299,
    originalPrice: 399,
    discount: null,
    rating: 5.0,
    reviews: 1,
    image: image2,
    buyNowText: "BUY NOW"
  }
];

// Star Rating Component
const StarRating = ({ rating, reviews }) => {
  if (!rating) return null;
  
  return (
    <div className="flex items-center gap-1 mb-2">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-sm">
            ★
          </span>
        ))}
      </div>
      <span className="text-sm text-gray-600">
        {rating} ({reviews} reviews)
      </span>
    </div>
  );
};

const Products = () => {
  return (
    <main className="mx-auto px-15 py-12">
      <div className="flex justify-end">
         <button className="border p-1 px-4">Sort by</button>
      </div>
      
<div>
  <h1 className="text-center text-2xl font-medium text-gray-900 mb-8">WHAT'S NEW</h1>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-15 mb-20">
    <div>
      <img src={image2} alt="" className="w-full h-50 object-cover group-hover:scale-105 transition-transform duration-300"/>
      <p className="text-xl text-center font-semibold text-gray-600">Corporate Gifts</p>
    </div>
    <div>
      <img src={image2} alt="" className="w-full h-50 object-cover group-hover:scale-105 transition-transform duration-300"/>
      <p className="text-xl text-center font-semibold text-gray-600">Bigsmall Originals</p>
    </div>
    <div>
      <img src={image2} alt="" className="w-full h-50 object-cover group-hover:scale-105 transition-transform duration-300"/>
      <p className="text-xl text-center font-semibold text-gray-600">Best Sellers</p>
    </div>
    <div>
      <img src={image2} alt="" className="w-full h-50 object-cover group-hover:scale-105 transition-transform duration-300"/>
      <p className="text-xl text-center font-semibold text-gray-600">Gifts For Women</p>
    </div>
    <div>
      <img src={image2} alt="" className="w-full h-50 object-cover group-hover:scale-105 transition-transform duration-300"/>
      <p className="text-xl text-center font-semibold text-gray-600">Gifts For Men</p>
    </div>
    <div>
      <img src={image2} alt="" className="w-full h-50 object-cover group-hover:scale-105 transition-transform duration-300"/>
      <p className="text-xl text-center font-semibold text-gray-600">All Products</p>
    </div>
  </div>
   {/* ||Image|| */}

              <div className="flex items-center my-10">
              <div className="flex-grow border-t-2 border-gray-300"></div>
              <span className="mx-4 text-gray-800 font-semibold text-xl"> BEST SELLER </span>
              <div className="flex-grow border-t-2 border-gray-300"></div>
            </div>

     {/* ||BEST SELLER|| */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-15 mb-20">
    <div>
      <img src={image2} alt="" className="w-90 h-90 object-cover group-hover:scale-105 transition-transform duration-300"/>
      <p className="text-xl text-center font-semibold text-gray-600">Corporate Gifts</p>
    </div>
    <div>
      <img src={image2} alt="" className="w-90 h-90 object-cover group-hover:scale-105 transition-transform duration-300"/>
      <p className="text-xl text-center font-semibold text-gray-600">Bigsmall Originals</p>
    </div>
    <div>
      <img src={image2} alt="" className="w-90 h-90 object-cover group-hover:scale-105 transition-transform duration-300"/>
      <p className="text-xl text-center font-semibold text-gray-600">Best Sellers</p>
    </div>
    <div>
      <img src={image2} alt="" className="w-90 h-90 object-cover group-hover:scale-105 transition-transform duration-300"/>
      <p className="text-xl text-center font-semibold text-gray-600">Gifts For Women</p>
    </div>
  </div>

  {/* NEW RAKSHA BANDHAN GIFTS LAYOUT */}
  <div className="flex items-center my-10">
    <div className="flex-grow border-t-2 border-gray-300"></div>
    <span className="mx-4 text-gray-800 font-semibold text-xl"> Raksha Bandhan Gifts </span>
    <div className="flex-grow border-t-2 border-gray-300"></div>
  </div>

  {/* Raksha Bandhan Products Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 mb-20">
    {rakhiBandhanGifts.map((product) => (
      <div key={product.id} className="rounded-2xl overflow-hidden bg-white flex flex-col">
        {/* Product Image with Save Badge */}
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
          <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">
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

          {/* Add to Cart */}
          <div className="w-full flex justify-center">
            <button className="bg-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-md rounded-md hover:bg-blue-600 w-auto">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
   
</div>


      <h1 className="text-center text-4xl font-medium text-gray-900 mb-8">
        All Product Categories
      </h1>
{sections.map((section, idx) => (
  <div key={idx} className="mb-16">
    {/* Show divider line + section title ONLY if not the first */}
    {idx !== 0 && (
      <div className="flex items-center my-10">
        <div className="flex-grow border-t-2 border-gray-300"></div>
        <span className="mx-4 text-gray-700 font-semibold text-2xl">
          {section.title}
        </span>
        <div className="flex-grow border-t-2 border-gray-300"></div>
      </div>
    )}

    {/* Grid of Images (4 per row) */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-15">
      {section.items.map((item, i) => (
        <Link 
          key={i} 
          to={`/Category_page/${encodeURIComponent(item.title)}`}  // 👈 dynamic route
        >
          <div className="relative rounded-2xl overflow-hidden shadow-md group cursor-pointer">
            {/* Image */}
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