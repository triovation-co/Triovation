import React, { useEffect, useRef } from 'react'
import image1 from '../assets/image1.jpg'
import Manufacturing_support from '../assets/Manufacturing_support.jpg'
import Design_Consultancy from '../assets/Design_Consultancy.jpg'
import Startup_Venture_Support from '../assets/Startup_Venture_Support.jpg'
import WhatsAppButton from "../components/whatsapp";

const Service = () => {
  const sectionRefs = useRef([]);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="mx-auto flex justify-center from-red-50 via-pink-50 to-white py-5 -mb-15 -mt-10">
        <div className="grid grid-cols-3 md:grid-cols-3 gap-10 xl:gap-20 mt-20 mx-5 sm:mx-10 lg:mx-20">

        {/* Card 1 - Design Consultancy */}
<div className="flex flex-col items-center w-full">
  <div 
    className="relative w-full aspect-square rounded-[1rem] lg:rounded-[3rem] overflow-hidden shadow-md group cursor-pointer"
    onClick={() => scrollToSection('design-consultancy')}
  >
    <img
      src={Design_Consultancy}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      alt="Service 1"
    />
    <div className="absolute inset-0 hidden lg:flex items-center justify-center">
      <p className="text-white text-center text-2xl font-semibold px-2">
        Design Consultancy
      </p>
    </div>
  </div>
  <p className="block lg:hidden text-center text-sm font-semibold mt-2">
    Design Consultancy
  </p>
</div>

{/* Card 2 - Manufacturing Support */}
<div className="flex flex-col items-center w-full">
  <div
    className="relative w-full aspect-square rounded-[1rem] lg:rounded-[3rem] overflow-hidden shadow-md group cursor-pointer"
    onClick={() => scrollToSection('learning-zone')}
  >
    <img
      src={Manufacturing_support}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      alt="Service 2"
    />
    <div className="absolute inset-0 hidden lg:flex items-center justify-center">
      <p className="text-white text-center text-2xl font-semibold px-2">
        Manufacturing Support
      </p>
    </div>
  </div>
  <p className="block lg:hidden text-center text-sm font-semibold mt-2">
    Manufacturing Support
  </p>
</div>

{/* Card 3 - Startup Venture Support */}
<div className="flex flex-col items-center w-full">
  <div 
    className="relative w-full aspect-square rounded-[1rem] lg:rounded-[3rem] overflow-hidden shadow-md group cursor-pointer"
    onClick={() => scrollToSection('learn-and-make')}
  >
    <img
      src={Startup_Venture_Support}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      alt="Service 3"
    />
    <div className="absolute inset-0 hidden lg:flex items-center justify-center">
      <p className="text-white text-center text-2xl font-semibold px-2">
        Startup Venture Support
      </p>
    </div>
  </div>
  <p className="block lg:hidden text-center text-sm font-semibold mt-2">
    Startup Venture Support
  </p>
</div>



        </div>
      </div>
      
              
      {/* Design Consultancy Section */}
      <main id="design-consultancy" className="container mx-auto px-6 md:px-8 xl:px-12 mt-20 scroll-mt-1 relative -mb-20">
        <div className="absolute -top-10 -left-10 w-40 h-4 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
                
          {/* Right Column: Text */}
          <div 
            ref={(el) => (sectionRefs.current[0] = el)}
            className="text-center lg:text-left order-2 lg:order-1 fade-in-section"
          >
            <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 bg-gradient-to-r from-red-500 via-pink-500 to-red-400 bg-clip-text text-transparent animate-gradient bg-300%">
              Design Consultancy
            </h1>
              <p className="text-gray-600 text-lg lg:text-xl xl:text-xl mb-4 leading-relaxed">
                Transform your vision into a remarkable reality with our design consultancy. We go beyond
aesthetics to offer a full spectrum of services tailored to your needs, from custom product
development and crafting a compelling brand identity to expert logo design and a complete
aesthetic redesign of your existing products. Our goal is to create distinctive, market ready
solutions that captivate your audience and establish a powerful, cohesive brand presence.
              </p>
            <button className="relative border-2 border-red-400 rounded-lg p-2 px-8 text-white bg-red-400 hover:bg-red-500 hover:border-red-500 overflow-hidden group transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <span className="relative z-10">STAY TUNE</span>
            </button>
          </div>
      
                {/* Left Column: Image */}
                <div className="relative w-full max-w-sm mx-auto lg:max-w-md xl:max-w-lg order-1 lg:order-2"> 
                  <div className="rounded-[3rem] overflow-hidden w-full aspect-square mb-2 lg:mb-0">
                    <img 
                      src={Design_Consultancy}
                      alt="Vivek and Shubhra" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              </div>
            </main>


      {/* Learning Zone Section */}
      <main id="learning-zone" className="mx-auto max-w-[1440px] px-6 md:px-8 xl:px-12 flex items-center justify-center mt-40 scroll-mt-20 relative">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-100 rounded-full filter blur-3xl opacity-30 animate-pulse animation-delay-1000"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
                
          {/* Left Column: Image */}
          <div className="relative w-full max-w-sm mx-auto lg:max-w-md xl:max-w-lg"> 
            <div className="rounded-[3rem] overflow-hidden w-full aspect-square mb-8 lg:mb-0">
              <img 
                src={Manufacturing_support}
                alt="Vivek and Shubhra" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
      
          {/* Right Column: Text */}
          <div 
            ref={(el) => (sectionRefs.current[1] = el)}
            className="mt-8 lg:mt-0 text-center lg:text-left fade-in-section"
          >
            <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-red-400 to-pink-500 bg-clip-text text-transparent animate-gradient bg-300%">
              Expert Manufacturing and Fabrication
            </h1>
            <p className="text-gray-600 text-lg lg:text-xl xl:text-xl mb-4 leading-relaxed">
             Bring your cutting-edge designs to life with our comprehensive manufacturing and
fabrication services. We are the dedicated prototyping partner for startups, offering rapid
solutions to test and refine your product vision. Beyond initial prototypes, we provide expert
consultancy to determine the most cost effective and scalable mass production technique
for your specific needs. Our in house capabilities include precision services like 3D printing,
laser cutting, PCB milling, and professional engraving for branding. Coupled with our
specialized electronics fabrication consultancy, we ensure a seamless, end to end journey
from concept to market-ready hardware.
            </p>
            <button className="relative border-2 border-red-400 rounded-lg p-2 px-8 text-white bg-red-400 hover:bg-red-500 hover:border-red-500 overflow-hidden group transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <span className="relative z-10">STAY TUNE</span>
            </button>
          </div>
        </div>
      </main>


      {/* Learn And Make Section */}
      <main id="learn-and-make" className="container mx-auto px-6 md:px-8 xl:px-12 mt-20 scroll-mt-20 mb-20 relative">
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-100 rounded-full filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
                
          {/* Right Column: Text */}
          <div 
            ref={(el) => (sectionRefs.current[2] = el)}
            className="text-center lg:text-left order-2 lg:order-1 fade-in-section"
          >
            <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 bg-gradient-to-r from-red-500 via-pink-400 to-red-500 bg-clip-text text-transparent animate-gradient bg-300%">
              Holistic Startup Venture Support
            </h1>
            <p className="text-gray-600 text-lg lg:text-xl xl:text-xl mb-4 leading-relaxed">
Launch your startup with confidence through our holistic venture support, a powerful blend
of design and manufacturing expertise. We act as your end to end partner, beginning with
custom product design and rapid prototyping services to validate your concept. Our team
guides you in selecting the most scalable mass production techniques and assists with
electronics fabrication to ensure a high quality product. Crucially, we work with you to
establish your brand from crafting a cohesive brand identity and professional logo design
to ensuring your final manufactured product reflects your core aesthetic. We provide the full
framework to move seamlessly from an innovative idea to a market-ready, powerful brand.
            </p>
            <button className="relative border-2 border-red-400 rounded-lg p-2 px-8 text-white bg-red-400 hover:bg-red-500 hover:border-red-500 overflow-hidden group transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <span className="relative z-10">STAY TUNE</span>
            </button>
          </div>
      
          {/* Left Column: Image */}
          <div className="relative w-full max-w-sm mx-auto lg:max-w-md xl:max-w-lg order-1 lg:order-2"> 
            <div className="rounded-[3rem] overflow-hidden w-full aspect-square mb-8 lg:mb-0">
              <img 
                src={Startup_Venture_Support}
                alt="Vivek and Shubhra" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </main>
 <WhatsAppButton />

      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .bg-300\% {
          background-size: 300%;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .fade-in-section {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 1s ease-out, transform 1s ease-out;
        }

        .fade-in-section.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

    </>
  )
}

export default Service