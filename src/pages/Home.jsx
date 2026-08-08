import React, { useEffect, useState, useRef } from "react";
import corporateGiftHero from "../assets/corporate-gift-hero.png";
import corporateGifting from "../assets/corporate-gifting.jpg";
import designConsultancy from "../assets/design-consultancy.jpg";
import customizedGifting from "../assets/customized-gifting.jpg";
import storyImg1 from "../assets/bulkorder-page/Story/15.jpg";
import storyImg2 from "../assets/bulkorder-page/Story/Frame 6.png";
import storyImg3 from "../assets/bulkorder-page/Story/Gemini_Generated_Image_cap0omcap0omcap0.png";
import storyImg4 from "../assets/bulkorder-page/Story/3d-prototype.jpg";
import serviceBgProductDesign from "../assets/service-bg-product-design.jpg";
import serviceBgBranding from "../assets/service-bg-branding.jpg";
import serviceBgCorporateGifting from "../assets/service-bg-corporate-gifting.png";
import WhatsAppButton from "../components/whatsapp";
import { useNavigate } from "react-router-dom";

/* ────────────── Success Stories Data ────────────── */
const successStories = [
  {
    img: storyImg3,
    title: "Drix × Marti Supreme Packaging",
    desc: "Bulk-manufactured boxes for a Stellarrati collaboration with PVR Pictures, translating brand identity into scalable, high-quality packaging",
    stat: "200+ Boxes Produced and delivered",
  },
  {
    img: storyImg2,
    title: "Tango Takeoffs, Brand Identity design and Bulk Brand Collateral Merchandising",
    desc: "Bulk-designed and produced a cohesive range of brand collaterals and merchandise, ensuring consistency and quality across apparels, stationery, and corporate touchpoints at scale",
    stat: "Large-Scale Brand Execution",
  },
  {
    img: storyImg1,
    title: "Tote Illustration Series Bulk Merch Production",
    desc: "Designed and produced a series of geometric, art-inspired tote bag illustrations, executed at scale for an art event",
    stat: "100+ Custom Illustrated Pieces",
  },
  {
    img: storyImg4,
    title: "3D Prototype Development",
    desc: "Designed and 3D printed a high-precision prototype for rapid product validation and functional testing.",
    stat: "50+ 3D Printed Prototypes",
  },
];

/* ────────────── Our Story Section Component ────────────── */
const OurStorySection = ({ vis, navigate }) => {
  const timelineScrollRef = useRef(null);

  const scrollTimeline = (dir) => {
    if (timelineScrollRef.current) {
      timelineScrollRef.current.scrollBy({ left: dir * 400, behavior: "smooth" });
    }
  };

  return (
    <section
      className={`relative z-10 py-16 sm:py-20 md:py-24 overflow-hidden transition-all duration-1000 ${vis("ourstory")}`}
      data-section="ourstory"
      aria-labelledby="our-story-heading"
    >
      <style>{`
        #home-story-scroll::-webkit-scrollbar { display: none; }
        #home-story-scroll { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>

      {/* Heading */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mb-10 sm:mb-14">
        <h2
          id="our-story-heading"
          className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 relative inline-block w-full"
        >
          <span className="bg-gradient-to-r from-[#f47e82] to-[#fca5a5] bg-clip-text text-transparent">
            Our Work
          </span>
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[#f47e82] to-[#fca5a5] rounded-full" />
        </h2>
        <p className="text-center text-gray-400 text-sm sm:text-base mt-5">
          Scroll to explore our journey →
        </p>
      </div>

      {/* ── Desktop: Horizontal storytelling timeline ── */}
      <div className="hidden md:block relative">
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        {/* Navigation arrows */}
        <button
          onClick={() => scrollTimeline(-1)}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center hover:bg-white border border-gray-100 transition-all duration-300 hover:scale-110"
          aria-label="Scroll timeline left"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => scrollTimeline(1)}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center hover:bg-white border border-gray-100 transition-all duration-300 hover:scale-110"
          aria-label="Scroll timeline right"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div
          id="home-story-scroll"
          ref={timelineScrollRef}
          className="overflow-x-auto pb-8 scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Timeline container */}
          <div
            className="relative"
            style={{ width: `${successStories.length * 450 + 350}px`, height: "1200px" }}
          >
            {/* Horizontal line */}
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[4px] bg-gradient-to-r from-transparent via-[#f47e82] to-transparent rounded-full shadow-[0_0_15px_rgba(244,126,130,0.5)]" />

            {/* Story nodes */}
            {successStories.map((story, idx) => {
              const isAbove = idx % 2 === 0;
              const leftPos = 250 + idx * 450;

              return (
                <div
                  key={idx}
                  className="absolute"
                  style={{ left: `${leftPos}px`, top: "50%", transform: "translateY(-50%)" }}
                >
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
                      opacity: 0.7,
                    }}
                  />

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
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-6 rounded-[2rem]">
                        <h3 className="text-white text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-300 drop-shadow-md">
                          {story.title}
                        </h3>
                        <p className="text-white text-sm sm:text-base leading-snug mb-3 font-medium drop-shadow-md">
                          {story.desc}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-[#fca5a5] text-xl font-extrabold">{story.stat}</span>
                          <span className="text-white/70 text-xs uppercase tracking-widest font-bold">
                            Delivered
                          </span>
                        </div>
                        <div className="w-12 h-1 bg-[#f47e82] rounded-full mt-3 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      </div>
                    </div>

                    {/* Arrow pointing to stem */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-[#f47e82] rotate-45 shadow-sm ${isAbove
                        ? "bottom-[-8px] border-r-[3px] border-b-[3px]"
                        : "top-[-8px] border-l-[3px] border-t-[3px]"
                        }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Mobile: vertical timeline ── */}
      <div className="md:hidden relative py-6 px-6 sm:px-10">
        <div className="absolute left-9 sm:left-14 top-4 bottom-4 w-[3px] bg-gradient-to-b from-transparent via-[#f47e82] to-transparent rounded-full" />

        <div className="space-y-6">
          {successStories.map((story, idx) => (
            <div key={idx} className="relative flex items-start gap-4">
              <div className="relative z-10 flex-shrink-0 mt-8">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${idx % 2 === 0
                    ? "bg-gradient-to-br from-[#f47e82] to-[#e05a5e] border-2 border-white"
                    : "bg-white border-[3px] border-[#f47e82]"
                    }`}
                >
                  <span
                    className={`text-[8px] font-bold ${idx % 2 === 0 ? "text-white" : "text-[#f47e82]"
                      }`}
                  >
                    0{idx + 1}
                  </span>
                </div>
              </div>

              <div className="flex-grow relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 bg-black">
                <div className="aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={story.img}
                    alt={story.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white text-base font-bold mb-0.5">{story.title}</h3>
                  <p className="text-white text-sm leading-snug mb-2 font-medium drop-shadow-md">{story.desc}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[#fca5a5] text-sm font-extrabold">{story.stat}</span>
                    <span className="text-white/70 text-[10px] uppercase tracking-wider font-bold">
                      Delivered
                    </span>
                  </div>
                  <div className="w-8 h-0.5 bg-[#f47e82] rounded-full mt-2 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ────────────── Animated Counter Hook (easeOut) ────────────── */
const useCountUp = (end, duration = 2000, trigger = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [trigger, end, duration]);

  return count;
};

/* ────────────── Stats Banner ────────────── */
const adStats = [
  { value: 500, suffix: "+", label: "Custom Packaging Delivered" },
  { value: 50, suffix: "+", label: "3D Prototypes Developed" },
  { value: 10, suffix: "+", label: "Brand Strategy & Identity Projects" },
  { value: 300, suffix: "+", label: "Merchandise Designs Created" },
];

const AdBannerSection = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const counts = [
    useCountUp(500, 2200, inView),
    useCountUp(50, 1800, inView),
    useCountUp(10, 1400, inView),
    useCountUp(300, 2200, inView),
  ];

  /* The marquee item rendered once */
  const StatItem = ({ idx }) => (
    <div className="flex items-center gap-6 sm:gap-10 shrink-0 px-4 sm:px-8">
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-[48px] sm:text-[64px] md:text-[80px] font-black text-gray-800 tabular-nums leading-none" style={{ WebkitTextStroke: "1px rgba(244,126,130,0.15)" }}>
          {counts[idx]}
        </span>
        <span className="text-[28px] sm:text-[36px] md:text-[44px] font-black text-[#f47e82]">
          {adStats[idx].suffix}
        </span>
      </div>
      <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-500 max-w-[160px] sm:max-w-[200px] leading-snug">
        {adStats[idx].label}
      </span>
    </div>
  );

  /* Diamond separator */
  const Sep = () => (
    <div className="shrink-0 flex items-center px-2 sm:px-4">
      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#f47e82] rotate-45 opacity-40" />
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-20 py-10 sm:py-14 overflow-hidden"
      aria-label="Triovation achievements"
    >
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" aria-hidden="true" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" aria-hidden="true" />

      {/* Marquee track — duplicate content for seamless loop */}
      <div
        className="flex items-center w-max hover:[animation-play-state:paused]"
        style={{
          animation: inView ? "marqueeScroll 25s linear infinite" : "none",
          opacity: inView ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        {/* First set */}
        {adStats.map((_, idx) => (
          <React.Fragment key={`a-${idx}`}>
            <StatItem idx={idx} />
            <Sep />
          </React.Fragment>
        ))}
        {/* Duplicate for seamless loop */}
        {adStats.map((_, idx) => (
          <React.Fragment key={`b-${idx}`}>
            <StatItem idx={idx} />
            <Sep />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section");
            if (id) setVisibleSections((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el));
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  /* ──────── Service data from the user's image ──────── */
  const serviceCategories = [
    {
      title: "Product Design",
      items: [
        "3D Prototyping & Printing",
        "Packaging Design",
        "Custom Product Development",
        "Manufacturing Support",
        "Product Visualization",
      ],
      learnMoreText: "Redirecting to Google Form",
      link: "#",
      external: true,
      accentColor: "#f47e82",
      gradient: "from-[#f47e82] to-[#fca5a5]",
      bgImage: serviceBgProductDesign,
    },
    {
      title: "Branding & Digital Design",
      items: [
        "Brand Identity Design",
        "Graphic Design",
        "Website Design",
        "UI/UX Design",
        "Marketing Collateral",
        "Social Media Creatives",
      ],
      learnMoreText: "Redirecting to Design Page",
      link: "/design-consultancy",
      external: false,
      accentColor: "#f47e82",
      gradient: "from-[#f47e82] to-[#fca5a5]",
      bgImage: serviceBgBranding,
    },
    {
      title: "Corporate Gifting",
      items: [
        "Innovative Product Range",
        "Promotional Merchandise",
        "Custom Branded Products",
        "Bulk Production & Fulfillment",
      ],
      learnMoreText: "Redirecting to Bulk Order Page",
      link: "/bulkorder",
      external: false,
      accentColor: "#f47e82",
      gradient: "from-[#f47e82] to-[#fca5a5]",
      bgImage: serviceBgCorporateGifting,
    },
  ];

  /* ──────── Explore categories data ──────── */
  const categories = [
    {
      name: "Product Range",
      desc: "Explore our wide range of customizable products from keychains to trophies.",
      image: corporateGifting,
      link: "/Products",
    },
    {
      name: "Design Consultancy",
      desc: "Professional brand identity, UI/UX, and creative design services.",
      image: designConsultancy,
      link: "/design-consultancy",
    },
    {
      name: "Bulk Orders",
      desc: "Scalable corporate gifting with competitive pricing and seamless delivery.",
      image: customizedGifting,
      link: "/bulkorder",
    },
  ];

  /* ──────── Structured data for SEO ──────── */
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Triovation",
    description: "Triovation - Corporate gifting solutions and design consultancy",
    url: window.location.origin,
    logo: `${window.location.origin}/logo.png`,
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "Triovation.co@gmail.com",
    },
  };

  const vis = (id) =>
    visibleSections[id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10";

  return (
    <div className="overflow-x-hidden relative">
      {/* SEO: Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* ═══════ Animated Background ═══════ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-pink-50/40 via-transparent to-transparent rounded-full blur-3xl"
          style={{
            transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.08}px) scale(1.5)`,
            transition: "transform 0.1s ease-out",
          }}
        />
        <div
          className="absolute -top-1/4 -right-1/2 w-full h-full bg-gradient-to-bl from-orange-50/30 via-transparent to-transparent rounded-full blur-3xl"
          style={{
            transform: `translate(${scrollY * -0.03}px, ${scrollY * 0.1}px) scale(1.5)`,
            transition: "transform 0.1s ease-out",
          }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-96 h-96 bg-gradient-to-tr from-pink-100/20 via-orange-50/20 to-transparent rounded-full blur-2xl"
          style={{
            transform: `translate(${scrollY * 0.04}px, ${scrollY * -0.06}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          style={{ transform: `translateY(${scrollY * -0.02}px)` }}
        >
          <line x1="10%" y1="20%" x2="90%" y2="25%" stroke="#f47e82" strokeWidth="1" strokeDasharray="5,5">
            <animate attributeName="y1" values="20%;22%;20%" dur="8s" repeatCount="indefinite" />
            <animate attributeName="y2" values="25%;23%;25%" dur="8s" repeatCount="indefinite" />
          </line>
          <line x1="15%" y1="60%" x2="85%" y2="65%" stroke="#fca5a5" strokeWidth="1" strokeDasharray="5,5">
            <animate attributeName="y1" values="60%;58%;60%" dur="10s" repeatCount="indefinite" />
            <animate attributeName="y2" values="65%;63%;65%" dur="10s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════ */}
      <section
        className={`container mx-auto py-8 sm:py-5 md:py-10 lg:py-10 xl:py-20 px-4 sm:px-6 md:px-8 lg:px-10 relative z-10 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        aria-labelledby="hero-heading"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 2xl:gap-32 items-center">
          {/* Left Column - Text */}
          <article className="text-center md:text-left mt-6 md:mt-20 space-y-6 order-2 md:order-1">
            <h1
              id="hero-heading"
              className="text-3xl lg:text-4xl xl:text-[34px] font-bold mb-4 lg:mb-6 text-gray-800 animate-fade-in-up"
            >
              <span className="text-black">
                Triovation:
              </span>{" "}
              Custom Corporate Merchandise & Product Design Solutions
            </h1>

            {/* Service Pillars */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-gray-700 text-lg lg:text-xl font-semibold animate-fade-in-up delay-200">
              <span>Corporate Gifting</span>
              <span className="text-[#f47e82]" aria-hidden="true">│</span>
              <span>Product Design</span>
              <span className="text-[#f47e82]" aria-hidden="true">│</span>
              <span>Brand Experiences</span>
            </div>

            <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
              <p className="animate-fade-in-up delay-400 font-medium">
                From concept to delivery, Triovation designs and manufactures custom corporate gifts, branded merchandise, packaging, and promotional products that help businesses create lasting brand experiences.
              </p>
            </div>

            <div className="pt-2 animate-fade-in-up delay-600 flex justify-center md:justify-start">
              <button
                onClick={() => navigate('/ContactUs')}
                className="bg-[#e43e39] text-white px-8 py-3.5 font-bold rounded shadow-lg hover:bg-[#d03531] transition-all hover:-translate-y-1 hover:shadow-xl tracking-wider text-sm"
              >
                CONSULT NOW
              </button>
            </div>
          </article>

          {/* Right Column - Image */}
          <figure className="relative flex justify-center md:justify-end group order-1 md:order-2">
            <div className="rounded-t-full overflow-hidden w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[800px] h-[250px] sm:h-[300px] md:h-[340px] lg:h-[420px] xl:h-[480px] mx-auto bg-black relative transition-all duration-700 hover:scale-105 shadow-lg">
              <img
                src={corporateGiftHero}
                alt="Triovation - Premium corporate gifting solutions with elegant gift packaging"
                className="w-full h-full object-cover scale-100 transition-transform duration-700 group-hover:scale-110"
                width="800"
                height="480"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </figure>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 1.5 — ADVERTISEMENT STATS BANNER
      ═══════════════════════════════════════════════════════ */}
      <AdBannerSection />

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — OUR SERVICES (Premium Card Grid)
      ═══════════════════════════════════════════════════════ */}
      <section
        className={`relative z-10 py-16 sm:py-20 md:py-24 lg:py-28 transition-all duration-1000 ${vis("services")}`}
        data-section="services"
        aria-labelledby="our-services"
      >
        {/* Section Background with decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white to-gray-50/80 pointer-events-none" aria-hidden="true" />



        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative">
          {/* Heading */}
          <header className="text-center mb-14 sm:mb-16 md:mb-20">
            <h2
              id="our-services"
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 relative inline-block"
            >
              Our Services
              <div
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-[#f47e82] to-[#fca5a5] rounded-full"
                aria-hidden="true"
              />
            </h2>
            <p className="text-gray-700 text-xl sm:text-2xl font-medium mt-7 max-w-3xl mx-auto leading-relaxed">
              We provide end-to-end product design, prototyping, sourcing, manufacturing, and branding solutions for startups, SMEs, and enterprises.
            </p>
          </header>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {serviceCategories.map((cat, idx) => {
              return (
                <div
                  key={cat.title}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div
                    onClick={() => {
                      if (cat.external) {
                        window.open(cat.link, "_blank", "noopener,noreferrer");
                      } else {
                        navigate(cat.link);
                      }
                    }}
                    className="bg-white rounded-[2rem] h-full flex flex-col overflow-hidden shadow-[0_4px_25px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_45px_-10px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-2 border border-gray-100/80 cursor-pointer"
                  >
                    {/* Compact full-bleed photo container with zero cropping */}
                    {cat.bgImage && (
                      <div className="relative w-full h-[220px] sm:h-[240px] overflow-hidden bg-gradient-to-b from-gray-50 to-white flex-shrink-0 border-b border-gray-100 flex items-center justify-center p-2">
                        <img
                          src={cat.bgImage}
                          alt={cat.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        <div className="absolute top-3 right-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-gray-800 text-[11px] font-black tracking-widest uppercase shadow-sm border border-gray-200/70">
                          0{idx + 1}
                        </div>
                      </div>
                    )}

                    {/* Compact Content Area */}
                    <div className="p-6 sm:p-7 flex flex-col flex-grow bg-white">
                      <div className="mb-4">
                        <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-2 group-hover:text-[#f47e82] transition-colors duration-300">
                          {cat.title}
                        </h3>
                        <div
                          className="w-10 h-1 rounded-full transition-all duration-500 group-hover:w-20 shadow-sm"
                          style={{ backgroundColor: cat.accentColor }}
                        />
                      </div>

                      <ul className="space-y-2 flex-grow">
                        {cat.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-gray-800 text-base sm:text-[17px] font-medium py-0.5">
                            <span
                              className="w-2 h-2 rounded-full flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-125"
                              style={{ backgroundColor: cat.accentColor }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — WHY CHOOSE US
      ═══════════════════════════════════════════════════════ */}
      <section
        className={`relative z-10 transition-all duration-1000 ${vis("whychoose")}`}
        data-section="whychoose"
        aria-labelledby="why-choose-us"
      >
        <div className="container mx-auto py-2 sm:py-4 md:py-7 lg:py-10 xl:py-10 px-4 sm:px-6 md:px-8 lg:px-10">
          <article className="grid grid-cols-1 md:grid-cols-1 gap-10 lg:gap-16 xl:gap-24 items-center">
            <div className="text-center md:text-left order-2 md:order-1 space-y-6">
              <h2
                id="why-choose-us"
                className="text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 lg:mb-8 xl:mb-8 text-gray-800 text-center relative"
              >
                Why Choose Us
                <div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[#f47e82] to-[#fca5a5] rounded-full"
                  aria-hidden="true"
                />
              </h2>
              <p className="text-gray-600 text-lg lg:text-xl xl:text-xl leading-relaxed hover:text-gray-700 transition-colors duration-300">
                <strong className="text-[#f47e82]">TRIOVATION</strong> is a creative collective
                bringing together design, manufacturing, and corporate gifting on a single
                platform. Our expertise lies in transforming abstract ideas into tangible products and
                experiences from custom corporate hampers to tailored product design consultancy.
                Partner with us to craft meaningful gifts, unlock innovative
                design solutions, and inspire excellence through creativity and technology. We combine
                creativity, precision, and customization to bring ideas to life whether it's a unique
                corporate hamper or comprehensive product design support.
              </p>
            </div>
          </article>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6 lg:px-12 mb-16">
          {[
            {
              id: 1,
              title: "Diverse Expert Team",
              desc: "Our team brings together specialists in Graphic design, Packaging design, UI/UX design, Brand positioning, 3D design and fabrication, electronics, sourcing, and creative strategy. This diverse skill set allows us to deliver innovative, end-to-end solutions under one roof.",
            },
            {
              id: 2,
              title: "Tailored Custom Solutions",
              desc: "From corporate gifting to product innovation, everything we create is completely customizable. Materials, designs, and experiences are tailored specifically around your needs.",
            },
            {
              id: 3,
              title: "Strategic Brand Innovation",
              desc: "We design and create adhering to current market trends. Through expert design consultancy to develop strong brand positioning and state-of-the-art fabrication, TRIOVATION blends creativity with functional strategy to empower your organization.",
            },
          ].map((card, index) => (
            <article
              key={card.id}
              className="relative group bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-700 max-w-sm mx-auto w-full hover:-translate-y-6 hover:shadow-2xl hover:shadow-[#f47e82]/20 border border-transparent hover:border-[#f47e82]/30 animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Animated Background Glow */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#f47e82]/5 to-[#fca5a5]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />
              {/* Circle Badge */}
              <div
                className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-[#f47e82] to-[#fca5a5] flex items-center justify-center mb-4 sm:mb-5 shadow-lg shadow-[#f47e82]/30 transform"
                aria-label={`Feature ${card.id}`}
              >
                <span className="text-white text-xl sm:text-2xl font-extrabold">{card.id}</span>
              </div>
              {/* Title */}
              <h3 className="relative text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800 group-hover:text-[#f47e82] transition-colors duration-500 z-10">
                {card.title}
              </h3>
              {/* Description */}
              <p className="relative text-gray-600 text-sm sm:text-base text-justify leading-relaxed group-hover:text-gray-700 transition-colors duration-300 z-10">
                {card.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — EXPLORE OUR CATEGORIES
      ═══════════════════════════════════════════════════════ */}
      <section
        className={`relative z-10 py-16 sm:py-20 md:py-24 transition-all duration-1000 ${vis("categories")}`}
        data-section="categories"
        aria-labelledby="explore-categories"
      >
        {/* Subtle background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/30 to-white pointer-events-none" aria-hidden="true" />

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative">
          {/* Heading */}
          <header className="text-center mb-14 sm:mb-16">
            <h2
              id="explore-categories"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 relative inline-block"
            >
              Explore Our Categories
              <div
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#f47e82] to-[#fca5a5] rounded-full"
                aria-hidden="true"
              />
            </h2>
            <p className="text-gray-500 text-lg sm:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
              Browse our core offerings — each designed to elevate your brand.
            </p>
          </header>

          {/* Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
            {categories.map((cat, idx) => (
              <article
                key={cat.name}
                onClick={() => navigate(cat.link)}
                className="group relative cursor-pointer rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 animate-fade-in-up"
                style={{ animationDelay: `${idx * 150}ms` }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate(cat.link);
                }}
                aria-label={`Explore ${cat.name}`}
              >
                {/* Image */}
                <div className="relative w-full h-72 sm:h-80 md:h-96 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  {/* Hover tint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f47e82]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                  <h3 className="text-white text-xl sm:text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    {cat.name}
                  </h3>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-3 line-clamp-2">
                    {cat.desc}
                  </p>
                  <div className="flex items-center gap-2 text-[#fca5a5] font-semibold text-sm">
                    <span>Explore</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  {/* Animated underline */}
                  <div className="w-12 h-1 bg-[#f47e82] rounded-full mt-3 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5 — OUR STORY (Success Stories Timeline)
      ═══════════════════════════════════════════════════════ */}
      <OurStorySection vis={vis} navigate={navigate} />

      {/* ═══════ Custom CSS Animations ═══════ */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-400 {
          animation-delay: 400ms;
        }

        .delay-600 {
          animation-delay: 600ms;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom gradient text animation */
        .bg-clip-text {
          background-clip: text;
          -webkit-background-clip: text;
        }
      `}</style>

      <WhatsAppButton />
    </div>
  );
};

export default Home;