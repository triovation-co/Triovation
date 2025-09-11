import React from 'react'
import image1 from '../assets/image1.jpg'

const Service = () => {
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

  return (
    <>
      <div className="mx-auto flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-15 mt-20 mx-20">
          
          {/* Card 1 - Design Consultancy */}
          <div 
            className="relative rounded-[3rem] overflow-hidden shadow-md group cursor-pointer"
            onClick={() => scrollToSection('design-consultancy')}
          >
            <img
              src={image1}
              className="w-full h-120 object-cover group-hover:scale-105 transition-transform duration-300"
              alt="Service 1"
            />
            <div className="absolute inset-0  flex items-center justify-center ">
              <p className="text-white text-center text-2xl font-semibold px-2">
                Design Consultancy
              </p>
            </div>
          </div>

          {/* Card 2 - Learning Zone */}
          <div 
            className="relative rounded-[3rem] overflow-hidden shadow-md group cursor-pointer"
            onClick={() => scrollToSection('learning-zone')}
          >
            <img
              src={image1}
              className="w-full h-120 object-cover group-hover:scale-105 transition-transform duration-300"
              alt="Service 2"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-center text-2xl font-semibold px-2">
                Learning Zone
              </p>
            </div>
          </div>

          {/* Card 3 - Learn and Make */}
          <div 
            className="relative rounded-[3rem] overflow-hidden shadow-md group cursor-pointer"
            onClick={() => scrollToSection('learn-and-make')}
          >
            <img
              src={image1}
              className="w-full h-120 object-cover group-hover:scale-105 transition-transform duration-300"
              alt="Service 3"
            />
            <div className="absolute inset-0 flex items-center justify-center ">
              <p className="text-white text-center text-2xl font-semibold px-2">
                Learn and Make
              </p>
            </div>
          </div>

        </div>
      </div>
      
      {/* Design Consultancy Section */}
      <main id="design-consultancy" className="container mx-auto px-4 md:px-8 xl:px-8 mt-20 lg:mt-25 xl:mt-25 min-h-auto flex items-center justify-center scroll-mt-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 xl:gap-20 mb-30 items-center ">
                
                {/* Right Column: Text Description */}
                <div className='text-center lg:text-left xl:text-left order-2 lg:order-1 xl:order-1'>
                  <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 text-gray-800">Design Consultancy</h1>
                  <p className="text-gray-600 text-lg lg:text-xl xl:text-xl mb-4 leading-relaxed">We blend creativity with technology to deliver exceptional solutions.
                     With a team of skilled professionals, we've been transforming ideas
                      into reality since 2024. Our commitment to quality, innovation, and 
                      client satisfaction sets us apart as.</p>
                      <button className='border rounded-lg p-2 px-8 text-amber-50 bg-blue-400'>LEARN MORE</button>
                </div>
      
                {/* Left Column: Image and Graphic */}
                <div className="relative w-full max-w-sm mx-auto lg:w-[450px] lg:mx-0 xl:w-[450px] xl:mx-0 order-1 lg:order-2 xl:order-2"> 
                  
                  {/* The clipping container with the semi-circle shape */}
                  <div className="rounded-[3rem] overflow-hidden w-full aspect-[4/5] mb-8 lg:w-160 lg:h-130 lg:mb-10 xl:w-160 xl:h-130 xl:mb-10">
                    <img 
                      src={image1}
                      alt="Vivek and Shubhra" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
      
              </div>
            </main>

       {/* Learning Zone Section */}
       <main id="learning-zone" className="mx-auto max-w-[1440px] min-h-auto md:px-8 xl:px-8 flex items-center justify-center mt-10 scroll-mt-20">
      
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 xl:gap-20 mb-30">
                
                {/* Left Column: Image and Graphic */}
                <div className="relative w-full max-w-sm mx-auto lg:w-[450px] lg:mx-0 xl:w-[450px] xl:mx-0"> 
                  
                  {/* The clipping container with the semi-circle shape */}
                  <div className="rounded-[3rem] overflow-hidden w-full aspect-[4/5] lg:w-80 lg:h-80 xl:w-130 xl:h-130 xl:mb-10 xl:ml-20 2xl:w-160 2xl:h-130 2xl:-ml-15">
                    <img 
                      src={image1}
                      alt="Vivek and Shubhra" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
      
                {/* Right Column: Text Description */}
                <div className='mt-8 lg:mt-20 lg:mr-20 xl:mt-20 xl:mr-20 text-center lg:text-left xl:text-left'>
                  <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 lg:mb-8 xl:mb-8 text-gray-800">Learning Zone</h1>
                  <p className="text-gray-600 text-lg lg:text-xl xl:text-xl mb-4 leading-relaxed">We blend creativity with technology to deliver exceptional solutions. With a team of
                     skilled professionals, we've been transforming ideas into reality since 2024. Our commitment to quality, innovation, and client satisfaction sets us apart as.</p>
                  <button className='border rounded-lg p-2 px-8 text-amber-50 bg-blue-400'>LEARN MORE</button>
                </div>
                
              </div>
            </main>
      
            {/* Learn And Make Section */}
            <main id="learn-and-make" className="container mx-auto px-4 md:px-8 xl:px-8 mt-10 min-h-auto flex items-center justify-center scroll-mt-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 xl:gap-20 items-center">
                
                {/* Right Column: Text Description */}
                <div className='text-center lg:text-left xl:text-left order-2 lg:order-1 xl:order-1'>
                  <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 text-gray-800">Learn And Make</h1>
                  <p className="text-gray-600 text-lg lg:text-xl xl:text-xl mb-4 leading-relaxed">We blend creativity with technology to deliver exceptional solutions.
                     With a team of skilled professionals, we've been transforming ideas
                      into reality since 2024. Our commitment to quality, innovation, and 
                      client satisfaction sets us apart as.</p>
                      <button className='border rounded-lg p-2 px-8 text-amber-50 bg-blue-400'>LEARN MORE</button>
                </div>
      
                {/* Left Column: Image and Graphic */}
                <div className="relative w-full max-w-sm mx-auto lg:w-[450px] lg:mx-0 xl:w-[450px] xl:mx-0 order-1 lg:order-2 xl:order-2"> 
                  
                  {/* The clipping container with the semi-circle shape */}
                  <div className="rounded-[3rem] overflow-hidden w-full aspect-[4/5] mb-8 lg:w-160 lg:h-130 lg:mb-10 xl:w-160 xl:h-130 xl:mb-10">
                    <img 
                      src={image1}
                      alt="Vivek and Shubhra" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
      
              </div>
            </main>
    </>
  )
}

export default Service