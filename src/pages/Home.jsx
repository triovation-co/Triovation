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
            <div className="text-center md:text-left mt-20">
              <h1 className="text-3xl lg:text-4xl xl:text-[34px] font-bold mb-6 lg:mb-8 xl:mb-8 text-gray-800">
               TRIOVATION — Where Ideas Take Forms

              </h1>
              <p className="text-gray-600 text-lg lg:text-xl xl:text-[19px] mb-4 leading-relaxed">
TRIOVATION is a one stop platform where imagination takes shape as reality. We are a creative group that transforms concepts into crafted realities through our four core domains: Design, Corporate Gifting, Startup Venture, and Education.<br/>

We merge creativity with precision, offering a full suite of services from custom product design and manufacturing to personalized corporate hampers. Beyond a focus on physical products, we also foster creativity through hands on learning experiences, including engaging workshops.<br/>

Our mission is to empower brands and individuals to turn their ideas into impactful, purposeful creations. We ensure every concept is brought to life with meticulous attention to detail and a commitment to innovation.
              </p>
            </div>
          </div>
        </main>

        {/* Second Section - Why Choose Us */}
        <main className="container mx-auto py-2 sm:py-4 md:py-7 lg:py-10 xl:py-10 px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-10 lg:gap-16 xl:gap-24 items-center">
            {/* Left Column - Text */}
            <div className="text-center md:text-left order-2 md:order-1">
              <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 lg:mb-8 xl:mb-8 text-gray-800 text-center">
                Why Choose Us
              </h1>
              <p className="text-gray-600 text-lg lg:text-xl xl:text-xl leading-relaxed">
                TRIOVATION is a creative collective bringing together design, manufacturing, gifting, and hands-on education on a single platform. Our expertise lies in transforming abstract ideas into tangible products and experiences from custom corporate hampers to product design consultancy and machine-learning workshops.
Partner with us to craft meaningful gifts, unlock innovative design solutions, and inspire learning through creativity and technology. We combine creativity, precision, and customization to bring ideas to life — whether it’s a unique corporate hamper, product design support, or an engaging workshop.
              </p>
            </div>



          </div>
        </main>
                    <div className="grid grid-cols-1 md:grid-cols-3">
              <p>
                01 — Diverse Expert Team
Our team brings together specialists in Graphic design, Packaging design, UI/UX design, Brand positioning, 3D design and fabrication, electronics, sourcing, and creative strategy. This diverse skill set allows us to deliver innovative, end-to-end solutions under one roof.

              </p>
                            <p>
               02 — Tailored & Custom Solutions
From corporate gifting to product innovation and workshops, everything we create is customizable. Materials, designs, and experiences are shaped around your needs.


              </p>
                            <p>
              03 — Innovation Meets Education
We teach and inspire adhering to the current trends. Through design consultancy to develop brand positioning, current technology machine workshops, and interactive learning kits, TRIOVATION blends creativity with education, empowering both professionals and kids.
              </p>

            </div>

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
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:mt-20">
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
                            mb-2"
                >
                  <img
                    src={img}
                    alt={service}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-800">
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
