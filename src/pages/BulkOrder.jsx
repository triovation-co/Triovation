import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useProductManager } from "../hooks/useProductManager.jsx";
import { validateName, validatePhone, validateEmailOptional, validateEmail, validatePhoneOptional, validateRequired } from "../utils/validators";
import precisionCraftingImg from "../assets/precision-crafting.png";
import talkToUsImg from "../assets/talk to us.png";
import deliveryImg from "../assets/delivery.png";
import precisionImg from "../assets/precision.png";
import placeholderImg from "../assets/Logo.png";
import consultNowImg from "../assets/Consult now.png";
import productCatalogueImg from "../assets/Product catalogue.png";
import qualityImg from "../assets/quality.png";
import banner1 from "../assets/bulkorder-page/Banner/b1.jpg";
import banner2 from "../assets/bulkorder-page/Banner/b2.1.png";
import banner3 from "../assets/bulkorder-page/Banner/b3.png";
import banner4 from "../assets/bulkorder-page/Banner/b4.png";
import banner5 from "../assets/bulkorder-page/Banner/b5.png";
import banner6 from "../assets/bulkorder-page/Banner/b6.png";
import storyImg1 from "../assets/bulkorder-page/Story/15.jpg";
import storyImg2 from "../assets/bulkorder-page/Story/Frame 6.png";
import storyImg3 from "../assets/bulkorder-page/Story/Gemini_Generated_Image_cap0omcap0omcap0.png";
import storyImg4 from "../assets/bulkorder-page/Story/3d-prototype.jpg";

/* ────────────────── image optimiser ────────────────── */
const optimizeImage = (url, width = 600) => {
  if (!url) return url;
  const match = url.match(/\/d\/([^/]+)/);
  if (match) return `https://lh3.googleusercontent.com/d/${match[1]}=w${width}`;
  return url;
};

/* ────────────────── hero banner images ────────────────── */
const heroImages = [
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
  banner6,
];

const successStories = [
  { img: storyImg3, title: "Drix × Marti Supreme Packaging", desc: "Bulk-manufactured boxes for a Stellarrati collaboration with PVR Pictures, translating brand identity into scalable, high-quality packaging", stat: "200+ Boxes Produced and delivered" },
  { img: storyImg2, title: "Tango Takeoffs, Brand Identity design and Bulk Brand Collateral Merchandising", desc: "Bulk-designed and produced a cohesive range of brand collaterals and merchandise, ensuring consistency and quality across apparels, stationery, and corporate touchpoints at scale", stat: "Large-Scale Brand Execution" },
  { img: storyImg1, title: "Tote Illustration Series Bulk Merch Production", desc: "Designed and produced a series of geometric, art-inspired tote bag illustrations, executed at scale for an art event", stat: "100+ Custom Illustrated Pieces" },
  { img: storyImg4, title: "3D Prototype Development", desc: "Designed and 3D printed a high-precision prototype for rapid product validation and functional testing.", stat: "50+ 3D Printed Prototypes" },
];

/* ────────────────── SVG Icon Components ────────────────── */

// Icon 1 — Sofa + gift box + picture frame (Gifting Solutions)
const GiftingSolutionsIcon = () => (
  <svg viewBox="0 0 100 80" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Sofa base */}
    <rect x="4" y="42" width="52" height="18" rx="4" fill="#4b5563" />
    {/* Sofa cushion */}
    <rect x="8" y="36" width="44" height="10" rx="3" fill="#6b7280" />
    {/* Sofa armrest left */}
    <rect x="2" y="34" width="10" height="28" rx="4" fill="#4b5563" />
    {/* Sofa armrest right */}
    <rect x="48" y="34" width="10" height="28" rx="4" fill="#4b5563" />
    {/* Sofa legs */}
    <rect x="8" y="60" width="4" height="6" rx="1" fill="#374151" />
    <rect x="48" y="60" width="4" height="6" rx="1" fill="#374151" />
    {/* Cushion lines */}
    <line x1="22" y1="38" x2="22" y2="44" stroke="#9ca3af" strokeWidth="1" />
    <line x1="38" y1="38" x2="38" y2="44" stroke="#9ca3af" strokeWidth="1" />

    {/* Picture frame on wall */}
    <rect x="12" y="8" width="18" height="22" rx="2" fill="#6b7280" />
    <rect x="14" y="10" width="14" height="18" rx="1" fill="#d1d5db" />
    {/* Mountain in frame */}
    <path d="M14 24L21 16L28 24z" fill="#9ca3af" />
    <circle cx="24" cy="14" r="2" fill="#fbbf24" />

    {/* Gift box */}
    <rect x="66" y="34" width="26" height="22" rx="3" fill="#f47e82" />
    <rect x="66" y="30" width="26" height="6" rx="2" fill="#fca5a5" />
    {/* Ribbon */}
    <rect x="77" y="30" width="4" height="26" rx="0.5" fill="#fecaca" />
    <rect x="66" y="40" width="26" height="3" rx="0.5" fill="#fecaca" />
    {/* Bow */}
    <ellipse cx="79" cy="28" rx="5" ry="3" fill="#fca5a5" />
    {/* Gift box legs */}
    <rect x="68" y="56" width="3" height="5" rx="1" fill="#e05a5e" />
    <rect x="87" y="56" width="3" height="5" rx="1" fill="#e05a5e" />

    {/* Small heart above gift */}
    <path d="M79 18c-1.5-2-4-2-5 0s1 4 5 7c4-3 6.5-5 5-7s-3.5-2-5 0z" fill="#f47e82" opacity="0.7" />
  </svg>
);

// Icon 2 — Factory/construction crane with gear (Personalized Solutions)
const PersonalizedIcon = () => (
  <svg viewBox="0 0 100 80" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Smoke cloud */}
    <circle cx="22" cy="10" r="6" fill="#9ca3af" opacity="0.5" />
    <circle cx="30" cy="7" r="8" fill="#9ca3af" opacity="0.5" />
    <circle cx="38" cy="11" r="5" fill="#9ca3af" opacity="0.4" />

    {/* Building/House */}
    <rect x="10" y="24" width="34" height="38" rx="2" fill="#4b5563" />
    {/* Roof */}
    <path d="M6 24L27 10L48 24z" fill="#6b7280" />
    {/* Windows */}
    <rect x="15" y="30" width="8" height="8" rx="1" fill="#fbbf24" opacity="0.8" />
    <rect x="31" y="30" width="8" height="8" rx="1" fill="#fbbf24" opacity="0.8" />
    {/* Door */}
    <rect x="22" y="46" width="10" height="16" rx="2" fill="#374151" />
    <circle cx="30" cy="55" r="1" fill="#9ca3af" />

    {/* Crane arm */}
    <rect x="52" y="14" width="4" height="48" rx="1" fill="#6b7280" />
    {/* Crane top */}
    <rect x="44" y="12" width="36" height="4" rx="1" fill="#4b5563" />
    {/* Crane cable */}
    <line x1="74" y1="16" x2="74" y2="38" stroke="#4b5563" strokeWidth="1.5" />
    {/* Hook */}
    <path d="M72 38 Q74 44 76 38" stroke="#4b5563" strokeWidth="2" fill="none" />

    {/* Gear */}
    <circle cx="80" cy="58" r="10" fill="#f47e82" opacity="0.2" />
    <circle cx="80" cy="58" r="7" stroke="#f47e82" strokeWidth="2" fill="none" />
    <circle cx="80" cy="58" r="3" fill="#f47e82" />
    {/* Gear teeth */}
    <rect x="78" y="47" width="4" height="4" rx="0.5" fill="#f47e82" />
    <rect x="78" y="65" width="4" height="4" rx="0.5" fill="#f47e82" />
    <rect x="69" y="56" width="4" height="4" rx="0.5" fill="#f47e82" />
    <rect x="87" y="56" width="4" height="4" rx="0.5" fill="#f47e82" />

    {/* Crane base */}
    <rect x="48" y="60" width="12" height="4" rx="1" fill="#4b5563" />
  </svg>
);

// Icon 3 — Diamond (Superior Quality)
const QualityIcon = () => (
  <svg viewBox="0 0 80 80" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Diamond shape */}
    <path d="M40 8L16 28H64L40 8Z" fill="#6b7280" />
    <path d="M16 28L40 68L64 28H16Z" fill="#4b5563" />
    {/* Diamond facets */}
    <path d="M40 8L32 28H48L40 8Z" fill="#9ca3af" />
    <path d="M32 28L40 68L48 28H32Z" fill="#6b7280" />
    {/* Highlight lines */}
    <path d="M22 28L40 60" stroke="#9ca3af" strokeWidth="0.5" opacity="0.6" />
    <path d="M58 28L40 60" stroke="#9ca3af" strokeWidth="0.5" opacity="0.6" />
    {/* Top shine */}
    <path d="M40 8L36 16" stroke="white" strokeWidth="1" opacity="0.5" />
    {/* Sparkles */}
    <path d="M12 14L14 18L16 14L14 10Z" fill="#f47e82" opacity="0.6" />
    <path d="M66 12L68 16L70 12L68 8Z" fill="#f47e82" opacity="0.6" />
    <path d="M72 36L74 40L76 36L74 32Z" fill="#f47e82" opacity="0.5" />
    <path d="M4 32L6 36L8 32L6 28Z" fill="#f47e82" opacity="0.4" />
    {/* Star sparkle top-right */}
    <circle cx="68" cy="18" r="1" fill="#f47e82" opacity="0.4" />
    <circle cx="10" cy="22" r="1" fill="#f47e82" opacity="0.3" />
  </svg>
);

/* ────────────────── Main Component ────────────────── */

const bulkCategoryNames = [
  { label: "Acrylic lamp", terms: ["acrylic lamp", "lamp", "acrylic"] },
  { label: "Lithophane", terms: ["lithophane"] },
  { label: "Sword/ Katana", terms: ["sword", "katana"] },
  { label: "Character", terms: ["character", "action figure", "figurine"] },
  { label: "Wooden Frames", terms: ["frame", "wooden"] },
  { label: "Keychain", terms: ["keychain", "key chain"] },
  { label: "Notebooks", terms: ["notebook", "book", "diary", "journal"] },
  { label: "Caps", terms: ["cap", "hat"] },
  { label: "Tote Bags", terms: ["tote", "bag"] },
  { label: "Trophy", terms: ["trophy", "award", "medal"] },
  { label: "Mugs", terms: ["mug", "cup"] },
  { label: "Pop Sockets", terms: ["pop socket", "socket", "grip"] },
  { label: "Bottle", terms: ["bottle", "flask", "sipper"] }
];

const BulkOrder = () => {
  const { products: sheetProducts, loading } = useProductManager();

  const bulkProductCategories = useMemo(() => {
    const categories = bulkCategoryNames.map(category => {
      let matchedProduct = null;
      if (Array.isArray(sheetProducts)) {
        matchedProduct = sheetProducts.find(p => {
          if (!p || !p.name) return false;
          const pName = p.name.toLowerCase();

          if (category.terms.some(term => pName.includes(term))) return true;
          if (p.category && category.terms.some(term => p.category.toLowerCase().includes(term))) return true;

          return false;
        });
      }

      return {
        name: category.label,
        image: (matchedProduct && matchedProduct.image) ? matchedProduct.image : placeholderImg
      };
    });
    
    categories.push({
      name: "View More",
      isViewMore: true
    });
    
    return categories;
  }, [sheetProducts]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 8;
  const totalSlides = Math.max(1, Math.ceil(bulkProductCategories.length / itemsPerSlide));

  const prevSlide = () => setCurrentSlide(p => (p === 0 ? totalSlides - 1 : p - 1));
  const nextSlide = () => setCurrentSlide(p => (p + 1) % totalSlides);

  /* ── Catalogue form modal ── */
  const [openCatalogueForm, setOpenCatalogueForm] = useState(false);
  const [catalogueForm, setCatalogueForm] = useState({ name: "", phone: "", email: "" });
  const [catalogueErrors, setCatalogueErrors] = useState({});

  /* ── Quote form modal ── */
  const [openQuoteForm, setOpenQuoteForm] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ name: "", email: "", phone: "", location: "", message: "" });
  const [quoteErrors, setQuoteErrors] = useState({});

  /* ── Hero auto-fade ── */
  const [heroIndex, setHeroIndex] = useState(0);
  const heroTimer = useRef(null);

  useEffect(() => {
    heroTimer.current = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(heroTimer.current);
  }, []);

  /* ── Success stories timeline ── */
  const timelineScrollRef = useRef(null);

  const scrollTimeline = (dir) => {
    if (timelineScrollRef.current) {
      const scrollAmount = 400; // Scroll amount per click
      timelineScrollRef.current.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white overflow-x-hidden -mt-20 md:-mt-24">

      {/* ═══════════════ HERO — auto‑fading images ═══════════════ */}
      <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[750px] overflow-hidden">
        {/* Stacked images with fade */}
        {heroImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Corporate gifting ${idx + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
            style={{ opacity: idx === heroIndex ? 1 : 0 }}
          />
        ))}

        {/* Sleek modern gradient overlay for contrast and depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 flex flex-col items-center justify-center text-center px-6 z-10">
          <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 drop-shadow-xl">
            Bulk Order
          </h1>

          <p className="text-gray-200 text-lg sm:text-xl md:text-2xl max-w-3xl font-normal leading-relaxed tracking-wide drop-shadow-md">
            Custom-designed gifting solutions with seamless production, competitive pricing, and scalable delivery for corporate and marketing needs.
          </p>
        </div>
      </section>

      {/* ═══════════════ THREE FEATURES — flat, no cards ═══════════════ */}
      <section className="w-full bg-gray-50 border-t border-b border-gray-200">
        <div className="w-full px-6 sm:px-10 lg:px-20 xl:px-32 py-8 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 lg:gap-16">

            {/* Feature 1 */}
            <div className="text-center flex flex-col items-center">
              <img src={productCatalogueImg} alt="Need Gifting Solutions" className="w-48 h-48 sm:w-[280px] sm:h-[280px] mx-auto -mb-4 sm:-mb-10 object-contain relative z-10" />
              <h3 className="font-bold text-gray-800 text-base sm:text-lg mt-6 mb-2">
                Need Gifting Solutions?
              </h3>
              <p className="text-gray-800 text-sm font-semibold leading-relaxed mb-4 sm:mb-6 max-w-[260px] mx-auto flex-grow">
                Refer to our Product Catalogue for gifting options.
              </p>
              <button
                onClick={() => setOpenCatalogueForm(true)}
                className="mt-auto bg-gradient-to-r from-[#f47e82] to-[#fca5a5] hover:from-[#e05a5e] hover:to-[#f47e82] text-white text-sm font-medium px-8 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg"
              >
                Product Catalogue
              </button>
            </div>

            {/* Feature 2 */}
            <div className="text-center flex flex-col items-center">
              <img src={consultNowImg} alt="Personalized Solutions" className="w-48 h-48 sm:w-[280px] sm:h-[280px] mx-auto -mb-4 mt-0 sm:mt-8 sm:-mb-10 object-contain relative z-10" />
              <h3 className="font-bold text-gray-800 text-base sm:text-lg -mt-2 -pt-2 mb-2">
                Personalized Solutions
              </h3>
              <p className="text-gray-800 text-sm font-semibold leading-relaxed mb-4 sm:mb-6 max-w-[280px] mx-auto flex-grow">
                Need something unique? We're not limited to the catalogue. For customized gifting solutions
              </p>
              <Link
                to="/ContactUs"
                className="mt-auto inline-block bg-gradient-to-r from-[#f47e82] to-[#fca5a5] hover:from-[#e05a5e] hover:to-[#f47e82] text-white text-sm font-medium px-8 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg"
              >
                Consult Now
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="text-center flex flex-col items-center">
              <img src={qualityImg} alt="Superior Quality" className="w-48 h-48 sm:w-[280px] sm:h-[280px] mx-auto -mb-4 mt-0 sm:mt-10 sm:-mb-15 object-contain relative z-10" />
              <h3 className="font-bold text-gray-800 text-base sm:text-lg mt-4 mb-2">
                Superior Quality
              </h3>
              <p className="text-gray-800 text-sm font-semibold leading-relaxed mb-4 sm:mb-6 max-w-[280px] mx-auto flex-grow">
                From small MOQs to large-scale production, we maintain uncompromising quality
              </p>
              <button
                onClick={() => {
                  const el = document.getElementById('success-stories');
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 160;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                className="mt-auto bg-gradient-to-r from-[#f47e82] to-[#fca5a5] hover:from-[#e05a5e] hover:to-[#f47e82] text-white text-sm font-medium px-8 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg"
              >
                Learn more
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════ OUR PRODUCTS — Carousel (Real Products) ═══════════════ */}
      <section className="mt-16 sm:mt-20 w-full px-6 sm:px-10 lg:px-20 xl:px-32">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-10 relative">
          Our Products
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#f47e82] to-[#fca5a5] rounded-full"></span>
        </h2>

        {loading ? (
          <div className="flex flex-col items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#f47e82] mb-4"></div>
            <p className="text-gray-500 text-sm">Loading products from catalogue…</p>
          </div>
        ) : bulkProductCategories.length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <p className="text-gray-500 text-sm">No matching categories found in catalogue.</p>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={prevSlide}
              className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIdx) => (
                  <div key={slideIdx} className="min-w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {bulkProductCategories
                      .slice(slideIdx * itemsPerSlide, (slideIdx + 1) * itemsPerSlide)
                      .map((product) => {
                        if (product.isViewMore) {
                          // Get the first available product image for the blurred background
                          const bgImage = bulkProductCategories.find(p => !p.isViewMore && p.image && p.image !== placeholderImg)?.image || bulkProductCategories[0]?.image;
                          return (
                            <Link
                              to="/products"
                              key="view-more"
                              className="group rounded-lg overflow-hidden bg-white hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-200 hover:border-[#f47e82]/40"
                            >
                              <div className="aspect-square overflow-hidden flex flex-col items-center justify-center relative">
                                {/* Blurred background image */}
                                {bgImage && (
                                  <img
                                    src={optimizeImage(bgImage)}
                                    alt=""
                                    aria-hidden="true"
                                    className="absolute inset-0 w-full h-full object-cover scale-110 transition-transform duration-500 group-hover:scale-125"
                                    style={{ filter: 'blur(3px)' }}
                                  />
                                )}
                                {/* Semi-transparent overlay */}
                                <div className="absolute inset-0 bg-white/50 group-hover:bg-white/40 transition-all duration-500"></div>
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#f47e82]/10 to-[#fca5a5]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                {/* Plus icon */}
                                <div className="relative z-10 w-16 h-16 rounded-full border-2 border-gray-400 group-hover:border-[#f47e82] bg-white/70 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#f47e82]/20">
                                  <svg className="w-8 h-8 text-gray-500 group-hover:text-[#f47e82] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                  </svg>
                                </div>
                              </div>
                              <div className="p-3 text-center">
                                <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-[#f47e82] transition-colors truncate">
                                  View More
                                </h3>
                              </div>
                            </Link>
                          );
                        }
                        
                        return (
                          <div
                            key={product.name}
                            className="rounded-lg overflow-hidden bg-gray-50 flex flex-col"
                          >
                            <div className="aspect-square overflow-hidden bg-gray-100">
                              <img
                                src={optimizeImage(product.image)}
                                alt={product.name}
                                loading="lazy"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-3 text-center">
                              <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                                {product.name}
                              </h3>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition ${currentSlide === i ? "bg-gray-800 scale-110" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ═══════════════ OUR DESIGN PROCESS ═══════════════ */}
      <section className="mt-16 sm:mt-20 w-full px-6 sm:px-10 lg:px-20 xl:px-32">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-12 relative">
          Our Design Process
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#f47e82] to-[#fca5a5] rounded-full"></span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 lg:gap-14">
          {[
            {
              step: "1",
              title: "Consultation",
              desc: "Understand project needs & aesthetics.",
              icon: (
                <img
                  src={talkToUsImg}
                  alt="Consultation"
                  className="w-48 h-48 sm:w-[280px] sm:h-[280px] mx-auto -mb-4 sm:-mb-10 object-contain relative z-10"
                />
              ),
            },
            {
              step: "2",
              title: "Design Customization",
              desc: "Choose colors, finishes, and materials.",
              icon: (
                <img
                  src={precisionImg}
                  alt="Design Customization"
                  className="w-48 h-48 sm:w-[280px] sm:h-[280px] mx-auto -mb-4 sm:-mb-10 object-contain relative z-10"
                />
              ),
            },
            {
              step: "3",
              title: "Precision Crafting",
              desc: "Machine made and Handmade products with attention to detail.",
              icon: (
                <img
                  src={precisionCraftingImg}
                  alt="Precision Crafting"
                  className="w-48 h-48 sm:w-[280px] sm:h-[280px] mx-auto -mb-4 sm:-mb-10 object-contain relative z-10"
                />
              ),
            },
            {
              step: "4",
              title: "Delivery & Installation",
              desc: "Hassle-free fulfillment.",
              icon: (
                <img
                  src={deliveryImg}
                  alt="Delivery & Installation"
                  className="w-48 h-48 sm:w-[280px] sm:h-[280px] mx-auto -mb-4 sm:-mb-10 object-contain relative z-10"
                />
              ),
            },
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <div className="relative inline-block">
                {item.icon}
                <span className="absolute -top-1 -right-3 w-8 h-8 rounded-full border-2 border-[#f47e82] bg-white flex items-center justify-center text-[#f47e82] text-sm font-semibold">
                  {item.step}
                </span>
              </div>
              <h4 className="font-bold text-gray-800 text-sm sm:text-base mb-1 group-hover:text-[#f47e82] transition">
                {item.title}
              </h4>
              <p className="text-gray-800 text-xs sm:text-sm font-semibold leading-relaxed max-w-[200px] mx-auto">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ OUR SUCCESS STORIES ═══════════════ */}
      <section id="success-stories" className="mt-16 sm:mt-20 w-full overflow-hidden">
        <style>{`
          #story-timeline-scroll::-webkit-scrollbar { display: none; }
          #story-timeline-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        `}</style>

        <div className="px-6 sm:px-10 lg:px-20 xl:px-32 mb-10">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 relative">
            Our Success Stories
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#f47e82] to-[#fca5a5] rounded-full"></span>
          </h2>
          <p className="text-center text-gray-600 text-sm font-semibold mt-4">Scroll to explore our journey →</p>
        </div>

        {/* ── Desktop: Horizontal storytelling timeline ── */}
        <div className="hidden md:block relative">
          {/* Edge fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

          {/* Navigation arrows */}
          <button
            onClick={() => scrollTimeline(-1)}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center hover:bg-white border border-gray-100 transition-all duration-300 hover:scale-110"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <button
            onClick={() => scrollTimeline(1)}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center hover:bg-white border border-gray-100 transition-all duration-300 hover:scale-110"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          <div
            id="story-timeline-scroll"
            ref={timelineScrollRef}
            className="overflow-x-auto pb-8 scroll-smooth"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* Timeline container */}
            <div className="relative" style={{ width: `${successStories.length * 450 + 350}px`, height: "1200px" }}>

              {/* Horizontal line */}
              <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[4px] bg-gradient-to-r from-transparent via-[#f47e82] to-transparent rounded-full shadow-[0_0_15px_rgba(244,126,130,0.5)]"></div>

              {/* Story nodes */}
              {successStories.map((story, idx) => {
                const isAbove = idx % 2 === 0;
                const leftPos = 250 + idx * 450;

                return (
                  <div key={idx} className="absolute" style={{ left: `${leftPos}px`, top: "50%", transform: "translateY(-50%)" }}>

                    {/* Dot on the line */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="w-12 h-12 rounded-full bg-white border-[4px] border-[#f47e82] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                        <span className="text-[#f47e82] text-sm font-black">0{idx + 1}</span>
                      </div>
                    </div>

                    {/* Vertical connector stem */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-[#fca5a5] to-[#f47e82]"
                      style={{
                        top: isAbove ? "-60px" : "25px",
                        height: "60px",
                        opacity: 0.7
                      }}
                    ></div>

                    {/* Card */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 w-[340px] group cursor-pointer"
                      style={{ top: isAbove ? "-520px" : "85px" }}
                    >
                      <div className="rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-gray-100 bg-black relative">
                        <div className="w-full h-[460px] overflow-hidden">
                          <img
                            src={story.img}
                            alt={story.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-6 rounded-[2rem]">
                          <h3 className="text-white text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-300 drop-shadow-md">
                            {story.title}
                          </h3>
                          <p className="text-white text-sm sm:text-base leading-snug mb-3 font-medium drop-shadow-md">{story.desc}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-[#fca5a5] text-xl font-extrabold">{story.stat}</span>
                            <span className="text-white/70 text-xs uppercase tracking-widest font-bold">Delivered</span>
                          </div>
                          <div className="w-12 h-1 bg-[#f47e82] rounded-full mt-3 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                        </div>
                      </div>

                      {/* Arrow pointing to stem */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-[#f47e82] rotate-45 shadow-sm ${
                          isAbove
                            ? "bottom-[-8px] border-r-[3px] border-b-[3px]"
                            : "top-[-8px] border-l-[3px] border-t-[3px]"
                        }`}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Mobile: vertical timeline ── */}
        <div className="md:hidden relative py-6 px-6 sm:px-10">
          <div className="absolute left-9 sm:left-14 top-4 bottom-4 w-[3px] bg-gradient-to-b from-transparent via-[#f47e82] to-transparent rounded-full"></div>

          <div className="space-y-6">
            {successStories.map((story, idx) => (
              <div key={idx} className="relative flex items-start gap-4">
                <div className="relative z-10 flex-shrink-0 mt-8">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    idx % 2 === 0
                      ? "bg-gradient-to-br from-[#f47e82] to-[#e05a5e] border-2 border-white"
                      : "bg-white border-[3px] border-[#f47e82]"
                  }`}>
                    <span className={`text-[8px] font-bold ${
                      idx % 2 === 0 ? "text-white" : "text-[#f47e82]"
                    }`}>0{idx + 1}</span>
                  </div>
                </div>

                <div className="flex-grow relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 bg-black">
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <img src={story.img} alt={story.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white text-base font-bold mb-0.5">{story.title}</h3>
                    <p className="text-white text-sm leading-snug mb-2 font-medium drop-shadow-md">{story.desc}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[#fca5a5] text-sm font-extrabold">{story.stat}</span>
                      <span className="text-white/70 text-[10px] uppercase tracking-wider font-bold">Delivered</span>
                    </div>
                    <div className="w-8 h-0.5 bg-[#f47e82] rounded-full mt-2 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>





      {/* ═══════════════ CTA ═══════════════ */}
      <div className="pb-20 sm:pb-32"></div>
      <div className="fixed bottom-0 left-0 w-full z-50 py-1.5 sm:py-3 bg-white/60 backdrop-blur-lg border-t border-gray-200/50 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] flex justify-center gap-2 sm:gap-6 px-3 sm:px-4">
        <button 
          onClick={() => setOpenQuoteForm(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-[8px] sm:text-sm md:text-base px-4 sm:px-10 py-2 sm:py-4 rounded-full shadow-[0_10px_25px_rgba(220,38,38,0.5)] hover:shadow-[0_15px_30px_rgba(220,38,38,0.7)] transition-all duration-300 hover:scale-105 tracking-wide whitespace-nowrap border-2 border-white/20">
          GET A QUOTE
        </button>
        <Link 
          to="/products"
          className="bg-gray-900 hover:bg-black text-white font-bold text-[8px] sm:text-sm md:text-base px-4 sm:px-10 py-2 sm:py-4 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-105 tracking-wide whitespace-nowrap border border-white/10">
          VIEW PRODUCTS
        </Link>
      </div>

      {/* ═══════════════ CATALOGUE FORM MODAL ═══════════════ */}
      {openCatalogueForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal header */}
            <div className="bg-gradient-to-r from-[#f47e82] to-[#fca5a5] px-6 py-5 flex items-center justify-between">
              <h2 className="text-white text-lg font-bold">Get Product Catalogue</h2>
              <button
                onClick={() => { setOpenCatalogueForm(false); setCatalogueForm({ name: "", phone: "", email: "" }); setCatalogueErrors({}); }}
                className="text-white/80 hover:text-white transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const nameResult = validateName(catalogueForm.name);
                const phoneResult = validatePhone(catalogueForm.phone);
                const emailResult = validateEmailOptional(catalogueForm.email);
                const newErrors = { name: nameResult.error, phone: phoneResult.error, email: emailResult.error };
                setCatalogueErrors(newErrors);
                if (!nameResult.valid || !phoneResult.valid || !emailResult.valid) return;
                setCatalogueForm({ name: "", phone: "", email: "" });
                setCatalogueErrors({});
                setOpenCatalogueForm(false);
                window.open("/catalogue.pdf", "_blank", "noopener,noreferrer");
              }}
              className="px-6 py-6 space-y-5"
            >
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">FULL NAME</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                  value={catalogueForm.name}
                  onChange={(e) => setCatalogueForm({ ...catalogueForm, name: e.target.value })}
                  onBlur={() => { const r = validateName(catalogueForm.name); setCatalogueErrors(prev => ({ ...prev, name: r.error })); }}
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:border-[#f47e82] focus:ring-2 focus:ring-[#f47e82]/20 outline-none transition ${catalogueErrors.name ? "border-red-500" : "border-gray-300"}`}
                />
                {catalogueErrors.name && <p className="text-red-500 text-xs mt-1">{catalogueErrors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">PHONE NUMBER</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  required
                  value={catalogueForm.phone}
                  onChange={(e) => setCatalogueForm({ ...catalogueForm, phone: e.target.value })}
                  onBlur={() => { const r = validatePhone(catalogueForm.phone); setCatalogueErrors(prev => ({ ...prev, phone: r.error })); }}
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:border-[#f47e82] focus:ring-2 focus:ring-[#f47e82]/20 outline-none transition ${catalogueErrors.phone ? "border-red-500" : "border-gray-300"}`}
                />
                {catalogueErrors.phone && <p className="text-red-500 text-xs mt-1">{catalogueErrors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">EMAIL (OPTIONAL)</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={catalogueForm.email}
                  onChange={(e) => setCatalogueForm({ ...catalogueForm, email: e.target.value })}
                  onBlur={() => { const r = validateEmailOptional(catalogueForm.email); setCatalogueErrors(prev => ({ ...prev, email: r.error })); }}
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:border-[#f47e82] focus:ring-2 focus:ring-[#f47e82]/20 outline-none transition ${catalogueErrors.email ? "border-red-500" : "border-gray-300"}`}
                />
                {catalogueErrors.email && <p className="text-red-500 text-xs mt-1">{catalogueErrors.email}</p>}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <button
                  type="button"
                  onClick={() => { setOpenCatalogueForm(false); setCatalogueForm({ name: "", phone: "", email: "" }); setCatalogueErrors({}); }}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#f47e82] to-[#fca5a5] hover:opacity-90 active:scale-95 transition"
                >
                  Get Catalogue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════ QUOTE FORM MODAL ═══════════════ */}
      {openQuoteForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal header */}
            <div className="bg-gradient-to-r from-[#f47e82] to-[#fca5a5] px-6 py-5 flex items-center justify-between flex-shrink-0">
              <h2 className="text-white text-lg font-bold">Get a Quote</h2>
              <button
                onClick={() => { setOpenQuoteForm(false); setQuoteForm({ name: "", email: "", phone: "", location: "", message: "" }); setQuoteErrors({}); }}
                className="text-white/80 hover:text-white transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const nameResult = validateName(quoteForm.name);
                  const emailResult = validateEmail(quoteForm.email);
                  const phoneResult = validatePhoneOptional(quoteForm.phone);
                  const locationResult = validateRequired(quoteForm.location, "Location");
                  
                  const newErrors = { 
                    name: nameResult.error, 
                    email: emailResult.error, 
                    phone: phoneResult.error,
                    location: locationResult.error
                  };
                  setQuoteErrors(newErrors);
                  
                  if (!nameResult.valid || !emailResult.valid || !phoneResult.valid || !locationResult.valid) return;
                  
                  // Form is valid - in a real app you'd send data to backend here
                  alert("Quote request submitted successfully!");
                  setQuoteForm({ name: "", email: "", phone: "", location: "", message: "" });
                  setQuoteErrors({});
                  setOpenQuoteForm(false);
                }}
                className="space-y-5"
              >
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">FULL NAME *</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    value={quoteForm.name}
                    onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                    onBlur={() => { const r = validateName(quoteForm.name); setQuoteErrors(prev => ({ ...prev, name: r.error })); }}
                    className={`w-full rounded-xl border px-4 py-3 text-sm focus:border-[#f47e82] focus:ring-2 focus:ring-[#f47e82]/20 outline-none transition ${quoteErrors.name ? "border-red-500" : "border-gray-300"}`}
                  />
                  {quoteErrors.name && <p className="text-red-500 text-xs mt-1">{quoteErrors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                    onBlur={() => { const r = validateEmail(quoteForm.email); setQuoteErrors(prev => ({ ...prev, email: r.error })); }}
                    className={`w-full rounded-xl border px-4 py-3 text-sm focus:border-[#f47e82] focus:ring-2 focus:ring-[#f47e82]/20 outline-none transition ${quoteErrors.email ? "border-red-500" : "border-gray-300"}`}
                  />
                  {quoteErrors.email && <p className="text-red-500 text-xs mt-1">{quoteErrors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">PHONE NUMBER (OPTIONAL)</label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                    onBlur={() => { const r = validatePhoneOptional(quoteForm.phone); setQuoteErrors(prev => ({ ...prev, phone: r.error })); }}
                    className={`w-full rounded-xl border px-4 py-3 text-sm focus:border-[#f47e82] focus:ring-2 focus:ring-[#f47e82]/20 outline-none transition ${quoteErrors.phone ? "border-red-500" : "border-gray-300"}`}
                  />
                  {quoteErrors.phone && <p className="text-red-500 text-xs mt-1">{quoteErrors.phone}</p>}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">LOCATION *</label>
                  <input
                    type="text"
                    placeholder="City, State, or Company Address"
                    required
                    value={quoteForm.location}
                    onChange={(e) => setQuoteForm({ ...quoteForm, location: e.target.value })}
                    onBlur={() => { const r = validateRequired(quoteForm.location, "Location"); setQuoteErrors(prev => ({ ...prev, location: r.error })); }}
                    className={`w-full rounded-xl border px-4 py-3 text-sm focus:border-[#f47e82] focus:ring-2 focus:ring-[#f47e82]/20 outline-none transition ${quoteErrors.location ? "border-red-500" : "border-gray-300"}`}
                  />
                  {quoteErrors.location && <p className="text-red-500 text-xs mt-1">{quoteErrors.location}</p>}
                </div>

                {/* Message Box */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">MESSAGE / REQUIREMENTS</label>
                  <textarea
                    placeholder="Tell us about your requirements, products you're interested in, quantity, etc."
                    rows="3"
                    value={quoteForm.message}
                    onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-[#f47e82] focus:ring-2 focus:ring-[#f47e82]/20 outline-none transition resize-none"
                  ></textarea>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => { setOpenQuoteForm(false); setQuoteForm({ name: "", email: "", phone: "", location: "", message: "" }); setQuoteErrors({}); }}
                    className="text-sm font-medium text-gray-500 hover:text-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#f47e82] to-[#fca5a5] hover:opacity-90 active:scale-95 transition"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkOrder;
