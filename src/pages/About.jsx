import React, { useEffect, useState } from "react";
import img from "../assets/image1.jpg";
import Our_approach from "../assets/Our approach.jpg";
import Our_story from "../assets/our_story.jpg";
import Our_crasftsmenship from "../assets/Our_crasftsmenship.jpg";
import flower from "../assets/flower.png";
import design from "../assets/design.jpg";
import WhatsAppButton from "../components/whatsapp";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState({
    story: false,
    approach: false,
    craftsmanship: false
  });

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for section animations
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          setVisibleSections(prev => ({
            ...prev,
            [sectionId]: true
          }));
        }
      });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="overflow-x-hidden relative">
        {/* Animated Background Elements - Gradient Waves */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Soft gradient orbs */}
          <div 
            className="absolute -top-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-100/30 via-purple-50/20 to-transparent rounded-full blur-3xl"
            style={{ 
              transform: `translate(${scrollY * -0.04}px, ${scrollY * 0.06}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          <div 
            className="absolute top-1/3 -right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-blue-50/25 via-teal-50/15 to-transparent rounded-full blur-3xl"
            style={{ 
              transform: `translate(${scrollY * 0.03}px, ${scrollY * -0.05}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          <div 
            className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-gradient-to-tr from-purple-50/20 via-pink-50/15 to-transparent rounded-full blur-3xl"
            style={{ 
              transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.04}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          
          {/* Subtle grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" style={{ transform: `translateY(${scrollY * -0.03}px)` }}>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6366f1" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Floating accent lines */}
          <div 
            className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-200/30 to-transparent"
            style={{ transform: `translateY(${scrollY * 0.08}px)` }}
          ></div>
          <div 
            className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-200/30 to-transparent"
            style={{ transform: `translateY(${scrollY * -0.06}px)` }}
          ></div>
        </div>

        {/* First Section - Our Story */}
        <main 
          className={`container mx-auto py-8 sm:py-5 md:py-10 lg:py-10 xl:py-20 px-4 sm:px-6 md:px-8 lg:px-10 relative z-10 transition-all duration-1000 ${visibleSections.story ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          data-section="story"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 2xl:gap-32 items-center">
            {/* Left Column - Image */}
            <div className="relative flex justify-center md:justify-start group">
              <div className="rounded-t-full overflow-hidden 
                            w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[800px] 
                            h-[250px] sm:h-[300px] md:h-[340px] lg:h-[420px] xl:h-[480px] 
                            mx-auto relative transition-all duration-700 hover:scale-105 shadow-lg">
                <img
                  src={Our_story}
                  alt="Vivek and Shubhra"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Right Column - Text */}
            <div className="text-center md:text-left space-y-6">
              <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 lg:mb-8 xl:mb-8 text-gray-800 relative animate-slide-in-right">
                <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Our Story</span>
                <div className="absolute -bottom-3 left-0 md:left-0 w-20 h-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transform origin-left scale-x-0 animate-expand-width"></div>
              </h1>
              <p className="text-gray-600 text-lg lg:text-xl xl:text-xl leading-relaxed animate-fade-in-up delay-300 hover:text-gray-700 transition-colors duration-300">
              It all began in 2025 with a simple conversation and a shared thought, why does turning an idea into something real feel so disconnected? Design, branding, startup guidance and gifting rarely came together the way they should.

<br></br><br></br>That spark grew into a vision to build a space where ideas could truly come alive. A place where creativity meets strategy, and imagination finds direction. That’s how TRIOVATION came to life bringing together Design, Gifting, Startup Ventures, and Education under one roof.
             
              </p>
            </div>

          </div>
        </main>

        {/* Second Section - Our Approach */}
        <main 
          className={`container mx-auto py-8 sm:py-5 md:py-10 lg:py-10 xl:py-10 px-4 sm:px-6 md:px-8 lg:px-10 relative z-10 transition-all duration-1000 ${visibleSections.approach ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          data-section="approach"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center">
            {/* Left Column - Text */}
            <div className="order-2 md:order-1 space-y-6">
              <h1 className="text-4xl font-bold text-gray-900 text-center md:text-left">
                <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Our Approach
                </span>
              </h1>
              <ol className="space-y-6">
                {[
                  {
                    title: "Ideation",
                    description:
                      "We start by listening to your ideas, needs, and vision whether it's for a product, a gift, or a learning experience."
                  },
                  {
                    title: "Design & Planning",
                    description:
                      "Our team sketches, prototypes, and strategizes to craft tailored solutions balancing creativity and feasibility."
                  },
                  {
                    title: "Creation. Customization. Perfection.",
                    description:
                      "From concept to creation, we bring ideas to life through design, manufacturing, and gifting. Every product is customized, refined to your needs, and delivered with precision and care."
                  },
                  {
                    title: "Learning & Growth",
                    description:
                      "Through workshops and kits, we inspire the next generation of creators."
                  }
                ].map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#f47e82] text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Right Column - Image */}
            <div className="relative flex justify-center md:justify-end order-1 md:order-2 group">
              <div className="rounded-t-full overflow-hidden 
                            w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[800px] 
                            h-[250px] sm:h-[300px] md:h-[340px] lg:h-[420px] xl:h-[480px] 
                            mx-auto relative transition-all duration-700 hover:scale-105 shadow-lg">
                <img
                  src={Our_approach}
                  alt="Vivek and Shubhra"
                  className="w-full h-full object-cover scale-100 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </main>

        {/* Third Section - Our Craftsmanship */}
        <section 
          className={`container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 text-center md:text-left relative z-10 transition-all duration-1000 ${visibleSections.craftsmanship ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          data-section="craftsmanship"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center">
            {/* Left Column - Image */}
            <div className="relative flex justify-center md:justify-start group">
              <div className="rounded-t-full overflow-hidden 
                            w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[800px] 
                            h-[250px] sm:h-[300px] md:h-[340px] lg:h-[420px] xl:h-[480px] 
                            mx-auto relative transition-all duration-700 hover:scale-105 shadow-lg">
                <img
                  src={Our_crasftsmenship}
                  alt="Vivek and Shubhra"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Right Column - Text */}
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 lg:mb-8 xl:mb-8 text-gray-800 relative animate-fade-in-left">
                Our Craftsmanship
                <div className="absolute -bottom-3 left-0 md:left-0 w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transform origin-left scale-x-0 animate-scale-x delay-300"></div>
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600 text-lg lg:text-xl xl:text-xl leading-relaxed animate-fade-in-left delay-200 hover:text-gray-700 transition-colors duration-300">
                  At <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-bold">TRIOVATION</span>, we are the makers. Every product, design, and workshop is crafted by our own team combining creativity, precision, and technical know-how. From 2D and 3D design to fabrication and finishing, we handle each step with care to ensure the outcome is truly unique.
                </p>
                <p className="text-gray-600 text-lg lg:text-xl xl:text-xl leading-relaxed animate-fade-in-left delay-400 italic">
                  Our craftsmanship lies in the details <span className="text-amber-600 font-semibold">tailored to need</span>, <span className="text-orange-600 font-semibold">shaped with passion</span>, and <span className="text-red-600 font-semibold">built to inspire</span>.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <WhatsAppButton />
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

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

        @keyframes scale-x {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes expand-width {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-scale-x {
          animation: scale-x 0.6s ease-out forwards;
          animation-delay: 0.3s;
        }

        .animate-expand-width {
          animation: expand-width 0.6s ease-out forwards;
          animation-delay: 0.3s;
        }

        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-800 { animation-delay: 800ms; }
        .delay-1000 { animation-delay: 1000ms; }
        .delay-1200 { animation-delay: 1200ms; }
        .delay-1400 { animation-delay: 1400ms; }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom gradient text animation */
        .bg-clip-text {
          background-clip: text;
          -webkit-background-clip: text;
        }

        /* Custom list styling */
        ol li::marker {
          font-weight: bold;
          color: #4f46e5;
        }
      `}</style>
    </>
  );
};

export default About;