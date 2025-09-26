import React from "react";
import img from "../assets/image1.jpg";
import flower from "../assets/flower.png";
import design from "../assets/design.jpg";
import WhatsAppButton from "../components/whatsapp";

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
                In 2025, what began as a simple hangout between two friends quickly turned into something bigger.

Himanshi, tired of the usual 9-to-6 job, dreamed of building something of her own. Samrudhi, full of energy and driven by passion, believed in starting young and creating something meaningful.

As they talked, they realized something important: the journey of turning an idea into a real, successful business was all over the place. Product design was often disconnected, branding came as an afterthought, and startups lacked proper guidance and support.

That’s when Akhilesh Sir came into the picture a mentor, advisor, and tech enthusiast. He saw their potential and helped them shape their raw ideas into a clear vision. With his experience and guidance, what was once just a spark turned into a focused mission.

And that's how TRIOVATION was born a space where ideas take form. A place where creativity meets strategy, and vision turns into reality.

At TRIOVATION, we bring together four key domains under one roof:
Design | Corporate Gifting | Startup Ventures | Education

Together, these pillars support everything a growing idea needs from its first sketch to a thriving business.
</p>
            </div>
          </div>
        </main>

        {/* Second Section - Our Approach */}
        <main className="container mx-auto py-8 sm:py-5 md:py-10 lg:py-10 xl:py-10 px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center">
            {/* Left Column - Text */}
            <div className="text-center md:text-left order-2 md:order-1 mt-10">
              <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 lg:mb-8 xl:mb-8 text-gray-800">
                Our Approach
              </h1>
              <p className="text-gray-600 text-lg lg:text-xl xl:text-xl mb-4 leading-relaxed">
                1. Ideation
 We start by listening to your ideas, needs, and vision — whether it’s for a product, a gift, or a learning experience.<br/>
2. Design & Planning
 Our team sketches, prototypes, and strategizes to craft tailored solutions that balance creativity, functionality, and feasibility.<br/>
3. Creation & Fabrication
 From design consultancy to manufacturing and gifting, we bring concepts to life using the right materials, tools, and processes.<br/>
4. Customization & Delivery
 Every outcome is personalized — refined to match your requirements and delivered with precision and care.<br/>
5. Learning & Growth
 Through workshops, kits, and hands-on sessions, we extend our approach to teaching and inspiring the next generation of creators.
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
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold mb-4 sm:mb-6 text-gray-800 leading-snug">
                Our Craftmanship
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl leading-relaxed max-w-xl mx-auto md:mx-0">
                At TRIOVATION, we are the makers. Every product, design, and workshop is crafted by our own team combining creativity, precision, and technical know-how. From 2D and 3D design to fabrication and finishing, we handle each step with care to ensure the outcome is truly unique.
Our craftsmanship lies in the details tailored to need, shaped with passion, and built to inspire.
              </p>
            </div>
          </div>
        </section>
        <WhatsAppButton />
      </div>
    </>
  );
};

export default About;
