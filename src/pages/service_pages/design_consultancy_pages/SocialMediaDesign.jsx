import React from "react";
import useDocumentMeta from "../../../hooks/useDocumentMeta.js";

import f1 from "../../../assets/design_consultancy/Social_Media/Frame 13.png";
import f2 from "../../../assets/design_consultancy/Social_Media/Frame 14.jpg";
import f3 from "../../../assets/design_consultancy/Social_Media/Frame 15.jpg";
import f4 from "../../../assets/design_consultancy/Social_Media/Frame 16.png";
import f5 from "../../../assets/design_consultancy/Social_Media/Frame 17 (1).png";
import f6 from "../../../assets/design_consultancy/Social_Media/Frame 24 (3).png";

const frames = [f1, f2, f3, f4, f5, f6];

const SocialMediaDesign = () => {
  useDocumentMeta({
    title: 'Social Media Design | Triovation Design Consultancy',
    description: 'Eye-catching social media post and content design for Instagram, Facebook, LinkedIn, and more.',
    keywords: 'social media design, Instagram posts, Facebook design, content creation, Triovation',
    canonicalUrl: 'https://www.triovation.com/design-consultancy/social-media-design',
    ogImage: 'https://www.triovation.com/og-image.jpg',
  });

  return (
    <div style={{ width: "100%" }}>
      <h1 className="sr-only">Social Media Design | Triovation Design Consultancy</h1>
      {frames.map((img, i) => (
        <div key={i}>
          <img src={img} alt={`Social media design portfolio piece ${i + 1}`} style={{ width: "100%" }} />
        </div>
      ))}
    </div>
  );
};

export default SocialMediaDesign;
