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
