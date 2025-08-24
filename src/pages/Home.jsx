import React from 'react';
// Make sure to import your images correctly
import img from "../assets/image1.jpg"; // The image of the people
import flower from "../assets/flower.png"; // The flower graphic

const Home = () => {
  return (
    <>
      {/* Main Content Section */}
      <main className="container mx-auto mt-5 px-4 md:px-8 bg-white min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-60">
          
          {/* Left Column: Image and Graphic */}
          <div className="relative w-full max-w-sm mx-auto lg:w-[450px] lg:mx-0"> 
            
            {/* The clipping container with the semi-circle shape */}
            <div className="rounded-t-full overflow-hidden w-full aspect-[4/5] lg:w-160 lg:h-130">
              <img 
                src={img}
                alt="Vivek and Shubhra" 
                className="w-full h-full object-cover" 
              />
            </div>
            <img 
              src={flower}
              alt="Decorative graphic" 
              className="absolute top-0 -left-8 w-20 h-24 lg:-left-16 lg:w-58 lg:h-80" 
            />
          </div>

          {/* Right Column: Text Description */}
          <div className='mt-8 lg:mt-30 lg:mr-30 text-center lg:text-left'>
            <h1 className="text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 text-gray-800">Brand Description</h1>
            <p className="text-gray-600 text-lg lg:text-xl mb-4 leading-relaxed">It all began (like all good things do) over a (good) bottle of wine. Vivek and Shubhra were tired of all the random souvenirs that India had to offer. They set out to start a company that would go on to sell souvenirs that depicted India, the way you and I saw it. Mad, Crazy, Colourful. In 2010, they founded Chumbak.</p>
            <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">Over the years, we grew from a company selling just souvenirs to some of the nicest homeware and accessories you'll find anywhere.</p>
          </div>
          
        </div>
      </main>

      {/* Why Choose Us Section */}
      <main className="container mx-auto px-4 md:px-8 mt-16 lg:-mt-30 min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-100 items-center">
          
          {/* Right Column: Text Description */}
          <div className='text-center lg:text-left order-2 lg:order-1'>
            <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">Why Choose Us</h1>
            <p className="text-gray-600 text-lg lg:text-xl mb-4 leading-relaxed">We blend creativity with technology to deliver exceptional solutions.
               With a team of skilled professionals, we've been transforming ideas
                into reality since 2024. Our commitment to quality, innovation, and 
                client satisfaction sets us apart as.</p>
          </div>

          {/* Left Column: Image and Graphic */}
          <div className="relative w-full max-w-sm mx-auto lg:w-[450px] lg:mx-0 order-1 lg:order-2"> 
            
            {/* The clipping container with the semi-circle shape */}
            <div className="rounded-t-full overflow-hidden w-full aspect-[4/5] mb-8 lg:w-170 lg:h-180 lg:mb-65">
              <img 
                src={img}
                alt="Vivek and Shubhra" 
                className="w-full h-full object-cover" 
              />
            </div>
            <img 
              src={flower}
              alt="Decorative graphic" 
              className="absolute top-0 -left-8 w-20 h-24 lg:-left-16 lg:w-65 lg:h-100 lg:-mt-10" 
            />
          </div>

        </div>
      </main>

      {/* Our Services Section */}
      <div className='flex flex-col items-center justify-center text-center px-4 md:px-8 py-12 mt-16 lg:-mt-20'>
        <h1 className='text-2xl font-bold leading-relaxed mb-4'>Our Services</h1>
        <p className="max-w-3xl mx-auto">
          We blend creativity with technology to deliver exceptional solutions. With a team of skilled professionals,
          we've been transforming ideas into reality since 2024. Our commitment to quality, innovation, and client satisfaction sets us apart as.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-20 mt-10 mb-20 lg:mb-30 px-4 lg:ml-15">

        <div className="flex flex-col items-center">
          <div className="rounded-t-full overflow-hidden w-24 h-24 lg:w-90 lg:h-90 mb-3">
            <img 
              src={img}
              alt="Vivek and Shubhra" 
              className="w-full h-full object-cover" 
            />
          </div>
          <p className="text-lg font-semibold text-gray-800">Corporate Gifting</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="rounded-t-full overflow-hidden w-24 h-24 lg:w-90 lg:h-90 mb-3">
            <img 
              src={img}
              alt="Vivek and Shubhra" 
              className="w-full h-full object-cover" 
            />
          </div>
          <p className="text-lg font-semibold text-gray-800">Customized Gifting</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="rounded-t-full overflow-hidden w-24 h-24 lg:w-90 lg:h-90 mb-3">
            <img 
              src={img}
              alt="Vivek and Shubhra" 
              className="w-full h-full object-cover" 
            />
          </div>
          <p className="text-lg font-semibold text-gray-800">Design Consultancy</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="rounded-t-full overflow-hidden w-24 h-24 lg:w-90 lg:h-90 mb-3">
            <img 
              src={img}
              alt="Vivek and Shubhra" 
              className="w-full h-full object-cover" 
            />
          </div>
          <p className="text-lg font-semibold text-gray-800">Learn and Fabricate</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="rounded-t-full overflow-hidden w-24 h-24 lg:w-90 lg:h-90 mb-3">
            <img 
              src={img}
              alt="Vivek and Shubhra" 
              className="w-full h-full object-cover" 
            />
          </div>
          <p className="text-lg font-semibold text-gray-800">Learning zone</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="rounded-t-full overflow-hidden w-24 h-24 lg:w-90 lg:h-90 mb-3">
            <img 
              src={img}
              alt="Vivek and Shubhra" 
              className="w-full h-full object-cover" 
            />
          </div>
          <p className="text-lg font-semibold text-gray-800">Education</p>
        </div>

      </div>
    </>
  );
};

export default Home;