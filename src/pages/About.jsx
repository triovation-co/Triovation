import React from 'react'
import img from "../assets/image1.jpg"; // The image of the people
import flower from "../assets/flower.png"; // The flower graphic
import design from "../assets/design.jpg"

const About = () => {
  return (
    <>
      {/* First Section - Brand Description */}
      <main className="container mx-auto mt-5 px-4 md:px-8 bg-white min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-32 2xl:gap-60">
          
          {/* Left Column */}
          <div className="relative w-full max-w-sm mx-auto lg:w-80 xl:w-96 2xl:w-[450px] lg:mx-0">
            <div className="rounded-t-full overflow-hidden w-full aspect-[4/5] lg:w-80 lg:h-80 xl:w-130 xl:h-130 xl:mb-20 2xl:w-160 2xl:h-130">
              <img 
                src={img}
                alt="Vivek and Shubhra" 
                className="w-full h-full object-cover" 
              />
            </div>
            <img 
              src={flower}
              alt="Decorative graphic" 
              className="absolute top-0 -left-6 w-24 h-32 lg:-left-12 lg:w-28 lg:h-36 xl:-left-15 xl:w-55 xl:h-90 xl:-mt-10 2xl:w-58 2xl:h-80" 
            />
          </div>

          {/* Right Column */}
          <div className='mt-8 lg:mt-24 xl:mt-28 2xl:mt-30 lg:mr-16 xl:mr-24 2xl:mr-30 text-center lg:text-left'>
            <h1 className="text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 text-gray-800">Our Story</h1>
            <p className="text-gray-600 text-lg lg:text-xl mb-4 leading-relaxed">
              It all began (like all good things do) over a (good) bottle of wine. 
              Vivek and Shubhra were tired of all the random souvenirs that India had to offer. 
              They set out to start a company that would go on to sell souvenirs that depicted India, 
              the way you and I saw it. Mad, Crazy, Colourful. In 2010, they founded Chumbak.
            </p>
            <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">
              Over the years, we grew from a company selling just souvenirs to some of the nicest homeware 
              and accessories you'll find anywhere.
            </p>
          </div>
        </div>
      </main>

      {/* Second Section - Why Choose Us */}
      <main className="container mx-auto px-4 md:px-8 mt-16 lg:-mt-24 xl:-mt-28 2xl:-mt-30 min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-60 2xl:gap-100 items-center">
          
          {/* Right Column */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">Our Approach</h1>
            <p className="text-gray-600 text-lg lg:text-xl mb-4 leading-relaxed">
              We blend creativity with technology to deliver exceptional solutions.
              With a team of skilled professionals, we've been transforming ideas
              into reality since 2024. Our commitment to quality, innovation, and 
              client satisfaction sets us apart as.
            </p>
          </div>

          {/* Left Column */}
          <div className="relative w-full max-w-sm mx-auto lg:w-80 xl:w-96 2xl:w-[450px] lg:mx-0 order-1 lg:order-2">
            <div className="rounded-t-full overflow-hidden w-full aspect-[4/5] mb-8 lg:w-80 lg:h-80 lg:mb-12 xl:w-130 xl:mr-4 xl:h-120 xl:mb-30 2xl:w-160 2xl:h-130 2xl:mb-65">
              <img 
                src={img}
                alt="Vivek and Shubhra" 
                className="w-full h-full object-cover" 
              />
            </div>
            <img 
              src={flower}
              alt="Decorative graphic" 
              className="absolute top-0 -left-6 w-24 h-32 lg:-left-12 lg:w-32 lg:h-40 lg:-mt-2 xl:-left-15 xl:w-55 xl:h-90 xl:-mt-10 2xl:-left-16 2xl:w-65 2xl:h-100 2xl:-mt-10" 
            />
          </div>
        </div>
      </main>

      {/* Third Section - Our Vision */}
      <section className="py-8 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 mt-16 lg:-mt-24 xl:-mt-28 2xl:-mt-30 grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-32 2xl:gap-60 items-center">
          
          {/* Left Side - Image Grid */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6 xl:gap-8 2xl:gap-30 max-w-md mx-auto lg:max-w-none">
            <img src={design} alt="Vision 1" className="rounded-t-full shadow-md w-full aspect-square object-cover lg:w-32 lg:h-32 xl:w-40 xl:h-40 2xl:w-80 2xl:h-80" />
            <img src={design} alt="Vision 2" className="rounded-t-full shadow-md w-full aspect-square object-cover lg:w-32 lg:h-32 xl:w-40 xl:h-40 2xl:w-80 2xl:h-80" />
            <img src={design} alt="Vision 3" className="rounded-t-full shadow-md w-full aspect-square object-cover lg:w-32 lg:h-32 xl:w-40 xl:h-40 2xl:w-80 2xl:h-80" />
            <img src={design} alt="Vision 4" className="rounded-t-full shadow-md w-full aspect-square object-cover lg:w-32 lg:h-32 xl:w-40 xl:h-40 2xl:w-80 2xl:h-80" />
          </div>

          {/* Right Side - Text */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">Our Vision</h2>
            <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">
              Based in Bangalore, we're known for our unique and fun aesthetic that celebrates 
              Indian design, created for a modern global lifestyle. Everything we create is a 
              tribute in some way to our brand pillars of Wit, Warmth, Honesty, Creativity, 
              Spontaneity & Community.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default About