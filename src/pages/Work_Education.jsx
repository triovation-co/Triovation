import React, { useEffect, useRef } from 'react'
import image1 from '../assets/image1.jpg'
import workshop from '../assets/workshop.jpg'
import Education from '../assets/Education.jpg'
import Education1 from "../assets/Education1.png"
import workshop1 from "../assets/workshop1.png"

const Work_Education = () => {
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
      {/* Card Section */}
      <div className="mx-auto flex justify-center from-red-50 via-pink-50 to-white py-10 -mb-30">
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 px-6 sm:px-12 lg:px-20">
          
{/* Card 1 - Workshop */}
<div className="flex flex-col items-center w-full lg:w-auto">
  <div 
    className="relative w-full lg:w-[400px] xl:w-[500px] 2xl:w-[550px] aspect-square rounded-[1rem] lg:rounded-[3rem] overflow-hidden shadow-md group cursor-pointer"
    onClick={() => scrollToSection('workshop')}
  >
    <img
      src={workshop}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      alt="Service 1"
    />
    <div className="absolute inset-0 hidden lg:flex items-center justify-center">
      <p className="text-white text-center text-2xl font-semibold px-2">
        Workshop
      </p>
    </div>
  </div>
  <p className="block lg:hidden text-center text-sm font-semibold mt-2">
    Workshop
  </p>
</div>

{/* Card 2 - Education */}
<div className="flex flex-col items-center w-full lg:w-auto">
  <div 
    className="relative w-full lg:w-[400px] xl:w-[500px] 2xl:w-[550px] aspect-square rounded-[1rem] lg:rounded-[3rem] overflow-hidden shadow-md group cursor-pointer"
    onClick={() => scrollToSection('education')}
  >
    <img
      src={Education}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      alt="Service 2"
    />
    <div className="absolute inset-0 hidden lg:flex items-center justify-center">
      <p className="text-white text-center text-2xl font-semibold px-2">
        Education
      </p>
    </div>
  </div>
  <p className="block lg:hidden text-center text-sm font-semibold mt-2">
    Education
  </p>
</div>


        </div>
      </div>



      {/* Workshop Section */}
      <main id="workshop" className="container mx-auto px-6 md:px-8 xl:px-12 flex items-center justify-center mt-40 scroll-mt-20 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-100 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-40 items-center">
          
          {/* Left Column: Image */}
          <div className="relative w-full max-w-sm mx-auto lg:max-w-md xl:max-w-lg"> 
            <div className="rounded-[3rem] overflow-hidden w-full aspect-square mb-8 lg:mb-0">
              <img 
                src={workshop1}
                alt="Vivek and Shubhra" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>


          {/* Right Column: Text */}
          <div 
            ref={(el) => (sectionRefs.current[0] = el)}
            className="mt-8 lg:mt-0 lg:mr-12 xl:mr-20 text-center lg:text-left fade-in-section"
          >
            <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-red-400 to-pink-500 bg-clip-text text-transparent animate-gradient bg-300%">
              Immersive Hands-On Workshops
            </h1>
            <p className="text-gray-600 text-lg lg:text-xl xl:text-xl mb-4 leading-relaxed">
Elevate your skills with our intensive, project based workshops, running from one day to a
full week. Our sessions offer practical, hands on training in critical creative and fabrication
technologies, including product design fundamentals, 3D modeling, and operation of
advanced tools like 3D printers and laser cutters. Participants will also gain proficiency in
essential digital skills such as Digital Illustration and professional video editing softwares.
For those interested in hardware, we offer a dedicated Introduction to Robotics session
where attendees can build and program foundational kits, including line-following and
obstacle-avoiding robots, providing a tangible understanding of electronics and coding
            </p>
            <button className="relative border-2 border-red-400 rounded-lg p-2 px-8 text-white bg-red-400 hover:bg-red-500 hover:border-red-500 overflow-hidden group transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <span className="relative z-10">STAY TUNE</span>
            </button>
          </div>
        </div>
      </main>


      {/* Education Section */}
      <main id="education" className="container mx-auto px-6 md:px-8 xl:px-12 mt-20 scroll-mt-20 mb-20 relative">
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-100 rounded-full filter blur-3xl opacity-30 animate-pulse animation-delay-1000"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          
          {/* Right Column: Text */}
          <div 
            ref={(el) => (sectionRefs.current[1] = el)}
            className="text-center lg:text-left order-2 lg:order-1 fade-in-section"
          >
            <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 bg-gradient-to-r from-red-500 via-pink-400 to-red-500 bg-clip-text text-transparent animate-gradient bg-300%">
              Specialized STEM Education and Skill
Training
            </h1>
            <p className="text-gray-600 text-lg lg:text-xl xl:text-xl mb-4 leading-relaxed">
              Ignite the passion of the next generation of innovators with our specialized STEM
Education courses, meticulously designed for students aged 8-18. We offer detailed classes
that progress from basic to advanced concepts in electronics, providing a strong theoretical
foundation coupled with intensive digital fabrication training. Our curriculum includes
hands on instruction in prototyping, enabling students to bring their ideas to life using
professional tools. Furthermore, we integrate essential creative skills such as branding and
product presentation, ensuring students not only build functional projects but also understand
how to communicate their value effectively. These courses deliver practical, hands-on
training tailored to foster expertise in future-ready skills.
            </p>
            <button className="relative border-2 border-red-400 rounded-lg p-2 px-8 text-white bg-red-400 hover:bg-red-500 hover:border-red-500 overflow-hidden group transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <span className="relative z-10">STAY TUNE</span>
            </button>
          </div>


          {/* Left Column: Image */}
          <div className="relative w-full max-w-sm mx-auto lg:max-w-md xl:max-w-lg order-1 lg:order-2"> 
            <div className="rounded-[3rem] overflow-hidden w-full aspect-square mb-8 lg:mb-0">
              <img 
                src={Education1}
                alt="Vivek and Shubhra" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </main>

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


export default Work_Education;