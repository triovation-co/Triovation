import React from "react";
import useDocumentMeta from "../../../hooks/useDocumentMeta.js";

import f1 from "../../../assets/design_consultancy/Digital_painting/1 (1).png";
import f2 from "../../../assets/design_consultancy/Digital_painting/2.jpg";
import f3 from "../../../assets/design_consultancy/Digital_painting/3 (1).jpg";
import f4 from "../../../assets/design_consultancy/Digital_painting/4 (1).jpg";
import f5 from "../../../assets/design_consultancy/Digital_painting/5 (1).jpg";
import f6 from "../../../assets/design_consultancy/Digital_painting/6 (1).jpg";
import f7 from "../../../assets/design_consultancy/Digital_painting/7 (1).jpg";
import f8 from "../../../assets/design_consultancy/Digital_painting/Frame 24 (4).png";

const frames = [f1, f2, f3, f4, f5, f6, f7, f8];

const DigitalPaintingDesign = () => {
  useDocumentMeta({
    title: 'Digital Painting Design | Triovation Design Consultancy',
    description: 'Custom digital painting and artwork services for personal and commercial use by Triovation.',
    keywords: 'digital painting, digital art, custom artwork, portraits, Triovation',
    canonicalUrl: 'https://www.triovation.com/design-consultancy/digital-painting-design',
    ogImage: 'https://www.triovation.com/og-image.jpg',
  });

  return (
    <div style={{ width: "100%" }}>
      <h1 className="sr-only">Digital Painting Design | Triovation Design Consultancy</h1>
      {frames.map((img, i) => (
        <div key={i}>
          <img src={img} alt={`Digital painting design portfolio piece ${i + 1}`} style={{ width: "100%" }} />
        </div>
      ))}
    </div>
  );
};

export default DigitalPaintingDesign;
