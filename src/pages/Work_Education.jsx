import React from 'react'
import image1 from '../assets/image1.jpg'

const Work_Education = () => {
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
      {/* Card Section */}
      <div className="mx-auto flex justify-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 mt-20 px-6 sm:px-12 lg:px-20">
    
    {/* Card 1 - Workshop */}
    <div 
      className="relative w-60 md:w-[250px] lg:w-[400px] xl:w-[500px] 2xl:w-[550px] aspect-square rounded-[3rem] overflow-hidden shadow-md group cursor-pointer"
      onClick={() => scrollToSection('workshop')}
    >
      <img
        src={image1}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        alt="Service 1"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white text-center text-lg sm:text-xl md:text-2xl font-semibold px-2">
          Workshop
        </p>
      </div>
    </div>

    {/* Card 2 - Education */}
    <div 
      className="relative w-60 md:w-[250px] lg:w-[400px] xl:w-[500px] 2xl:w-[550px] aspect-square rounded-[3rem] overflow-hidden shadow-md group cursor-pointer"
      onClick={() => scrollToSection('education')}
    >
      <img
        src={image1}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        alt="Service 2"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white text-center text-lg sm:text-xl md:text-2xl font-semibold px-2">
          Education
        </p>
      </div>
    </div>

  </div>
</div>


      {/* Workshop Section */}
      <main id="workshop" className="mx-auto max-w-[1440px] px-6 md:px-8 xl:px-12 flex items-center justify-center mt-40 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          
          {/* Left Column: Image */}
          <div className="relative w-full max-w-sm mx-auto lg:max-w-md xl:max-w-lg"> 
            <div className="rounded-[3rem] overflow-hidden w-full aspect-square mb-8 lg:mb-0">
              <img 
                src={image1}
                alt="Vivek and Shubhra" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* Right Column: Text */}
          <div className="mt-8 lg:mt-0 lg:mr-12 xl:mr-20 text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 text-gray-800">Workshop</h1>
            <p className="text-gray-600 text-lg lg:text-xl xl:text-xl mb-4 leading-relaxed">
              It all began (like all good things do) over a (good) bottle of wine. 
              Vivek and Shubhra were tired of all the random souvenirs that India had to offer. 
              They set out to start a company that would go on to sell souvenirs that depicted India, 
              the way you and I saw it. Mad, Crazy, Colourful.
            </p>
            <button className="border rounded-lg p-2 px-8 text-amber-50 bg-blue-400">
              CONTACT US
            </button>
          </div>
        </div>
      </main>

      {/* Education Section */}
      <main id="education" className="container mx-auto px-6 md:px-8 xl:px-12 mt-20 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          
          {/* Right Column: Text */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 text-gray-800">Education</h1>
            <p className="text-gray-600 text-lg lg:text-xl xl:text-xl mb-4 leading-relaxed">
              We blend creativity with technology to deliver exceptional solutions.
              With a team of skilled professionals, we've been transforming ideas
              into reality since 2024. Our commitment to quality, innovation, and 
              client satisfaction sets us apart as.
            </p>
            <button className="border rounded-lg p-2 px-8 text-amber-50 bg-blue-400">
              CONTACT US
            </button>
          </div>

          {/* Left Column: Image */}
          <div className="relative w-full max-w-sm mx-auto lg:max-w-md xl:max-w-lg order-1 lg:order-2"> 
            <div className="rounded-[3rem] overflow-hidden w-full aspect-square mb-8 lg:mb-0">
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

export default Work_Education;