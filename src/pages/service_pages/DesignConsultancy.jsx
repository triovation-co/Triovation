import React from "react";
import { useNavigate } from "react-router-dom";

import brandIdentity from "../../assets/design_consultancy/brand_identity_design/Thumbnail.jpg";
import brandManual from "../../assets/design_consultancy/brand_manual_design/Thumbnail.png";
import digitalIllustration from "../../assets/design_consultancy/digital_illustration/Thumbnail.jpg";
import businessCollateral from "../../assets/design_consultancy/Business_collateral_design/Thumbnail.png";
import brandCampaigns from "../../assets/design_consultancy/Brand_Campaigns/Thumbnail.png";
import socialMedia from "../../assets/design_consultancy/Social_Media/Thumbnail.png";
import digitalPainting from "../../assets/design_consultancy/Digital_painting/Thumbnail.jpg";
import websiteUiux from "../../assets/design_consultancy/Website_UiUx_design/Thambnail.png";
import bookMagazine from "../../assets/design_consultancy/Book_magazine_zinedesign/Thumbnail.png";

const DesignConsultancy = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "Brand Identity Design", img: brandIdentity, link: "/design-consultancy/brand-identity-design" },
    { title: "Brand Manual Design", img: brandManual, link: "/design-consultancy/brand-manual-design" },
    { title: "Digital Illustration Design", img: digitalIllustration, link: "/design-consultancy/digital-illustration-design" },
    { title: "Business Collateral Design", img: businessCollateral, link: "/design-consultancy/business-collateral-design" },
    { title: "Brand Campaigns Design", img: brandCampaigns, link: "/design-consultancy/brand-campaigns-design" },
    { title: "Social Media Design", img: socialMedia, link: "/design-consultancy/social-media-design" },
    { title: "Digital Painting", img: digitalPainting, link: "/design-consultancy/digital-painting-design" },
    { title: "Website / UI-UX Design", img: websiteUiux, link: "/design-consultancy/website-uiux-design" },
    { title: "Book / Magazine / Zine Design", img: bookMagazine, link: "/design-consultancy/book-magazine-zine-design" },
  ];

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 lg:px-10 mt-32 mb-28">

      {/* Heading */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Design Consultancy
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-red-500 via-pink-500 to-red-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Big 3-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {cards.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(item.link)}
            className="relative aspect-[1/1] rounded-[2.5rem] overflow-hidden shadow-xl cursor-pointer group"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/35 flex items-end p-6">
              <p className="text-white text-2xl font-semibold leading-snug">
                {item.title}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default DesignConsultancy;
