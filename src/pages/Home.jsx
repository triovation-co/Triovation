import React, { useEffect, useState } from "react";
import img from "../assets/image1.jpg";
import flower from "../assets/flower.png";
// Import different service images
import corporateGifting from "../assets/corporate-gifting.jpg";
import customizedGifting from "../assets/customized-gifting.jpg";
import designConsultancy from "../assets/design-consultancy.jpg";
import learningZone from "../assets/learning-zone.png";
import Learn_fab from "../assets/Learn_fab.png";
import education from "../assets/education.png";
import WhatsAppButton from "../components/whatsapp";
import Triovationmain from "../assets/Triovation_main.jpg";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    { name: "Corporate Gifting", image: corporateGifting },
    { name: "Customized Gifting", image: customizedGifting },
    { name: "Design Consultancy", image: designConsultancy },
    { name: "Learn and Fabricate", image: Learn_fab },
    { name: "Learning Zone", image: learningZone },
    { name: "Education", image: education },
  ];

  return (
    <div className="overflow-x-hidden relative">
      {/* Animated Background Elements - Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Animated gradient mesh */}
        <div 
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-pink-50/40 via-transparent to-transparent rounded-full blur-3xl"
          style={{ 
            transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.08}px) scale(1.5)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute -top-1/4 -right-1/2 w-full h-full bg-gradient-to-bl from-orange-50/30 via-transparent to-transparent rounded-full blur-3xl"
          style={{ 
            transform: `translate(${scrollY * -0.03}px, ${scrollY * 0.1}px) scale(1.5)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/3 w-96 h-96 bg-gradient-to-tr from-pink-100/20 via-orange-50/20 to-transparent rounded-full blur-2xl"
          style={{ 
            transform: `translate(${scrollY * 0.04}px, ${scrollY * -0.06}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        
        {/* Subtle floating lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" style={{ transform: `translateY(${scrollY * -0.02}px)` }}>
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

      {/* Main Content Section */}
      <main
        className={`container mx-auto py-8 sm:py-5 md:py-10 lg:py-10 xl:py-20 px-4 sm:px-6 md:px-8 lg:px-10 relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 2xl:gap-32 items-center">
          {/* Left Column - Image */}
          <div className="relative flex justify-center md:justify-start group">
            <div className="rounded-t-full overflow-hidden w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[800px] h-[250px] sm:h-[300px] md:h-[340px] lg:h-[420px] xl:h-[480px] mx-auto bg-black relative transition-all duration-700 hover:scale-105 shadow-lg">
              <img
                src={Triovationmain}
                alt="Vivek and Shubhra"
                className="w-full h-full object-cover scale-100 transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Right Column - Text */}
          <div className="text-center md:text-left mt-20 space-y-6">
            <h1 className="text-3xl lg:text-4xl xl:text-[34px] font-bold mb-6 lg:mb-8 xl:mb-8 text-gray-800 animate-fade-in-up">
              <span className="bg-gradient-to-r from-[#f47e82] to-[#fca5a5] bg-clip-text text-transparent">
                TRIOVATION
              </span>{" "}
              — Where Ideas Take Forms
            </h1>
            <div className="space-y-4 text-gray-600 text-lg lg:text-xl xl:text-[19px] leading-relaxed">
              <p className="animate-fade-in-up delay-200">
                TRIOVATION is a one stop platform where imagination takes shape
                as reality. We are a creative group that transforms concepts
                into crafted realities through our four core domains: Design,
                Corporate Gifting, Startup Venture, and Education.
              </p>
              <p className="animate-fade-in-up delay-400">
                We merge creativity with precision, offering a full suite of
                services from custom product design and manufacturing to
                personalized corporate hampers. Beyond a focus on physical
                products, we also foster creativity through hands on learning
                experiences, including engaging workshops.
              </p>
              <p className="animate-fade-in-up delay-600">
                Our mission is to empower brands and individuals to turn their
                ideas into impactful, purposeful creations. We ensure every
                concept is brought to life with meticulous attention to detail
                and a commitment to innovation.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Second Section - Why Choose Us */}
      <main className="container mx-auto py-2 sm:py-4 md:py-7 lg:py-10 xl:py-10 px-4 sm:px-6 md:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-10 lg:gap-16 xl:gap-24 items-center">
          <div className="text-center md:text-left order-2 md:order-1 space-y-6">
            <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 lg:mb-8 xl:mb-8 text-gray-800 text-center relative">
              Why Choose Us
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[#f47e82] to-[#fca5a5] rounded-full"></div>
            </h1>
            <p className="text-gray-600 text-lg lg:text-xl xl:text-xl leading-relaxed hover:text-gray-700 transition-colors duration-300">
              <strong className="text-[#f47e82]">TRIOVATION</strong> is a
              creative collective bringing together design, manufacturing,
              gifting, and hands-on education on a single platform. Our
              expertise lies in transforming abstract ideas into tangible
              products and experiences — from custom corporate hampers to
              product design consultancy and machine-learning workshops. Partner
              with us to craft meaningful gifts, unlock innovative design
              solutions, and inspire learning through creativity and technology.
              We combine creativity, precision, and customization to bring ideas
              to life — whether it's a unique corporate hamper, product design
              support, or an engaging workshop.
            </p>
          </div>
        </div>
      </main>

      {/* Enhanced Cards Section */}
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
            desc: "From corporate gifting to product innovation and workshops, everything we create is customizable. Materials, designs, and experiences are shaped around your needs.",
          },
          {
            id: 3,
            title: "Innovation Meets Education",
            desc: "We teach and inspire adhering to the current trends. Through design consultancy to develop brand positioning, current technology machine workshops, and interactive learning kits, TRIOVATION blends creativity with education, empowering both professionals and kids.",
          },
        ].map((card, index) => (
          <div
            key={card.id}
            className="relative group bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-700 max-w-sm mx-auto w-full hover:-translate-y-6 hover:shadow-2xl hover:shadow-[#f47e82]/20 border border-transparent hover:border-[#f47e82]/30 animate-fade-in-up"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f47e82]/5 to-[#fca5a5]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Circle Badge */}
            <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-[#f47e82] to-[#fca5a5] flex items-center justify-center mb-4 sm:mb-5 shadow-lg shadow-[#f47e82]/30 transform">
              <span className="text-white text-xl sm:text-2xl font-extrabold">
                {card.id}
              </span>
            </div>

            {/* Title */}
            <span className="relative text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800 group-hover:text-[#f47e82] transition-colors duration-500 z-10">
              {card.title}
            </span>

            {/* Description */}
            <p className="relative text-gray-600 text-sm sm:text-base text-justify leading-relaxed group-hover:text-gray-700 transition-colors duration-300 z-10">
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Services Section */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 text-center relative z-10">
        <div className="space-y-8 mb-16">
          <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold text-gray-800 relative">
            Our Services
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#f47e82] to-[#fca5a5] rounded-full"></div>
          </h1>
          <p className="text-gray-600 text-lg lg:text-xl xl:text-xl leading-relaxed max-w-4xl mx-auto hover:text-gray-700 transition-colors duration-300">
            We blend creativity with technology to deliver exceptional
            solutions. With a team of skilled professionals, we've been
            transforming ideas into reality since 2024. Our commitment to
            quality, innovation, and client satisfaction sets us apart.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:mt-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Service Thumbnails */}
              <div className="rounded-t-full overflow-hidden w-40 h-40 sm:w-50 sm:h-60 md:w-50 md:h-55 lg:w-60 lg:h-60 xl:w-74 xl:h-80 mb-4 relative transition-all duration-700 hover:scale-110">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f47e82]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-800 group-hover:text-[#f47e82] transition-all duration-300 hover:scale-105">
                {service.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Custom CSS Animations */}
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