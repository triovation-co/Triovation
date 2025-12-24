import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const banners = [
  {
    id: 1,
    title: "Lamps",
    subtitle: "Best Gifts & Offers",
    image: "https://images.unsplash.com/photo-1475783006851-1d68dd683eff?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Keychains",
    subtitle: "Bulk Orders Available",
    image: "https://images.unsplash.com/photo-1670540805686-a73a025c0dd1?q=80&w=1167&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Home Decor",
    subtitle: "Upgrade Your Space",
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1600&q=80",
  },
  {
    id: 4,
    title: "Bottles",
    subtitle: "Stay Hydrated in Style",
    image: "https://images.unsplash.com/photo-1625708458528-802ec79b1ed8?q=80&w=880&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Caps",
    subtitle: "Trendy Collection",
    image: "https://images.unsplash.com/photo-1653704841996-c2ed854aedd8?q=80&w=1170&auto=format&fit=crop",
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % banners.length);
    }, 4000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const prevSlide = () => {
    setCurrent(prev => (prev === 0 ? banners.length - 1 : prev - 1));
    startTimer();
  };

  const nextSlide = () => {
    setCurrent(prev => (prev + 1) % banners.length);
    startTimer();
  };

  const handleBannerClick = title => {
    navigate(`/products?search=${encodeURIComponent(title)}`);
  };

  return (
    <div className="relative w-full h-[180px] xs:h-[220px] sm:h-[320px] md:h-[420px] lg:h-[520px] overflow-hidden mb-6">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          onClick={() => handleBannerClick(banner.title)}
          className={`absolute inset-0 cursor-pointer transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />

          {/* Centered Overlay */}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center">
            <div className="px-4 text-white max-w-[90%] sm:max-w-[60%]">
              <h1 className="text-lg xs:text-xl sm:text-4xl md:text-5xl font-bold leading-tight">
                {banner.title}
              </h1>
              <p className="text-sm xs:text-base sm:text-2xl mt-1 sm:mt-2">
                {banner.subtitle}
              </p>
              <span className="mt-2 inline-block text-xs sm:text-sm bg-white/20 px-3 py-1 rounded-full">
                Tap to explore →
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 sm:bottom-4 w-full flex justify-center gap-1.5 sm:gap-2 z-20">
        {banners.map((_, i) => (
          <div
            key={i}
            onClick={() => {
              setCurrent(i);
              startTimer();
            }}
            className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full cursor-pointer transition ${
              current === i ? "bg-white scale-110" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
