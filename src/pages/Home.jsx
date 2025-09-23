import React from "react";
import img from "../assets/image1.jpg"; // Main image
import flower from "../assets/flower.png"; // Decorative graphic
import WhatsAppButton from "../components/whatsapp";

const Home = () => {
  const services = [
    "Corporate Gifting",
    "Customized Gifting",
    "Design Consultancy",
    "Learn and Fabricate",
    "Learning Zone",
    "Education",
  ];

  return (
    <>
      <div className="overflow-x-hidden">
        {/* Main Content Section */}
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
                Brand Description
              </h1>
              <p className="text-gray-600 text-lg lg:text-xl xl:text-[19px] mb-4 leading-relaxed">
                It all began (like all good things do) over a (good) bottle of
                wine. Vivek and Shubhra were tired of all the random souvenirs
                that India had to offer. They set out to start a company that
                would go on to sell souvenirs that depicted India, the way you
                and I saw it. Mad, Crazy, Colourful.
              </p>
              <p className="text-gray-600 text-lg lg:text-xl xl:text-[19px] leading-relaxed">
                Over the years, we grew from a company selling just souvenirs to
                some of the nicest homeware and accessories you'll find
                anywhere.
              </p>
            </div>
          </div>
        </main>

        {/* Second Section - Why Choose Us */}
        <main className="container mx-auto py-2 sm:py-4 md:py-7 lg:py-10 xl:py-10 px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center">
            {/* Left Column - Text */}
            <div className="text-center md:text-left order-2 md:order-1">
              <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 lg:mb-8 xl:mb-8 text-gray-800">
                Why Choose Us
              </h1>
              <p className="text-gray-600 text-lg lg:text-xl xl:text-xl leading-relaxed">
                We blend creativity with technology to deliver exceptional
                solutions. With a team of skilled professionals, we've been
                transforming ideas into reality since 2024. Our commitment to
                quality, innovation, and client satisfaction sets us apart.
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

        {/* Services Section */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 text-center">
          <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold font-bold mb-4 sm:mb-6 text-gray-800">
            Our Services
          </h1>
          <p className="text-gray-600 text-lg lg:text-xl xl:text-xl leading-relaxed mb-10 sm:mb-12 md:mb-16 lg:mb-20">
            We blend creativity with technology to deliver exceptional
            solutions. With a team of skilled professionals, we've been
            transforming ideas into reality since 2024. Our commitment to
            quality, innovation, and client satisfaction sets us apart.
          </p>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:mt-20">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Service Thumbnails */}
                <div
                  className="rounded-t-full overflow-hidden 
                            w-40 h-40 
                            sm:w-50 sm:h-60 
                            md:w-50 md:h-55 
                            lg:w-60 lg:h-60 
                            xl:w-74 xl:h-80 
                            mb-6"
                >
                  <img
                    src={img}
                    alt={service}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-lg sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-800">
                  {service}
                </p>
              </div>
            ))}
          </div>
        </section>
        <WhatsAppButton />
      </div>
    </>
  );
};
export default Home;
