import React from "react";
import img from "../assets/image1.jpg";
import flower from "../assets/flower.png";
import design from "../assets/design.jpg";

const About = () => {
  return (
    <>
      <div className="overflow-x-hidden">
        {/* First Section - Our Story */}
        <main className="container mx-auto py-8 sm:py-5 md:py-10 lg:py-10 xl:py-20 px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 2xl:gap-32 items-center">
            {/* Left Column - Image */}
            <div className="relative flex justify-center md:justify-start">
              <div className="rounded-t-full overflow-hidden 
                            w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[800px] 
                            h-[250px] sm:h-[300px] md:h-[340px] lg:h-[420px] xl:h-[480px] 
                            mx-auto">
              <img
                src={img}
                alt="Vivek and Shubhra"
                className="w-full h-full object-cover"
                />
              </div>
              <img
              src={flower}
              alt="Decorative graphic"
              className="absolute -top-3 -left-3 w-25 h-30
                         sm:-top-5 sm:-left-5 sm:w-28 sm:h-34
                         md:-top-6 md:-left-2 md:w-38 md:h-42
                         lg:-top-8 lg:-left-4 lg:w-42 lg:h-46
                         xl:-top-10 xl:-left-8 xl:w-56 xl:h-60"
                />
            </div>

            {/* Right Column - Text */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 lg:mb-8 xl:mb-8 text-gray-800">
                Our Story
              </h1>
              <p className="text-gray-600 text-lg lg:text-xl xl:text-xl mb-4 leading-relaxed">
                It all began (like all good things do) over a (good) bottle of wine. 
                Vivek and Shubhra were tired of all the random souvenirs that India had to offer. 
                They set out to start a company that would go on to sell souvenirs that depicted India, 
                the way you and I saw it. Mad, Crazy, Colourful.
              </p>
              <p className="text-gray-600 text-lg lg:text-xl xl:text-xl mb-4 leading-relaxed">
                Over the years, we grew from a company selling just souvenirs to some of the nicest 
                homeware and accessories you'll find anywhere.
              </p>
            </div>
          </div>
        </main>

        {/* Second Section - Our Approach */}
        <main className="container mx-auto py-8 sm:py-5 md:py-10 lg:py-10 xl:py-10 px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center">
            {/* Left Column - Text */}
            <div className="text-center md:text-left order-2 md:order-1">
              <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 lg:mb-8 xl:mb-8 text-gray-800">
                Our Approach
              </h1>
              <p className="text-gray-600 text-lg lg:text-xl xl:text-xl mb-4 leading-relaxed">
                We blend creativity with technology to deliver exceptional solutions.
                With a team of skilled professionals, we've been transforming ideas
                into reality since 2024. Our commitment to quality, innovation, and 
                client satisfaction sets us apart.
              </p>
            </div>

            {/* Right Column - Image */}
            <div className="relative flex justify-center md:justify-end order-1 md:order-2">
              <div className="rounded-t-full overflow-hidden 
                            w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[800px] 
                            h-[250px] sm:h-[300px] md:h-[340px] lg:h-[420px] xl:h-[480px] 
                            mx-auto">
              <img
                src={img}
                alt="Vivek and Shubhra"
                className="w-full h-full object-cover"
                />
              </div>
              <img
              src={flower}
              alt="Decorative graphic"
              className="absolute -top-3 -left-3 w-25 h-30
                         sm:-top-5 sm:-left-5 sm:w-28 sm:h-34
                         md:-top-6 md:-left-2 md:w-38 md:h-42
                         lg:-top-8 lg:-left-4 lg:w-42 lg:h-46
                         xl:-top-10 xl:-left-8 xl:w-56 xl:h-60"
                />
            </div>
          </div>
        </main>

        {/* Third Section - Our Vision */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center">
            {/* Left Column - Image Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-sm sm:max-w-md mx-auto md:max-w-none">
              <img src={design} alt="Vision 1" className="rounded-t-full shadow-md w-full aspect-square object-cover" />
              <img src={design} alt="Vision 2" className="rounded-t-full shadow-md w-full aspect-square object-cover" />
              <img src={design} alt="Vision 3" className="rounded-t-full shadow-md w-full aspect-square object-cover" />
              <img src={design} alt="Vision 4" className="rounded-t-full shadow-md w-full aspect-square object-cover" />
            </div>

            {/* Right Column - Text */}
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold mb-4 sm:mb-6 text-gray-800 leading-snug">
                Our Vision
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl leading-relaxed max-w-xl mx-auto md:mx-0">
                We're known for our unique and fun aesthetic that celebrates 
                Indian design, created for a modern global lifestyle. Everything we create is a 
                tribute in some way to our brand pillars of Wit, Warmth, Honesty, Creativity, 
                Spontaneity & Community.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
