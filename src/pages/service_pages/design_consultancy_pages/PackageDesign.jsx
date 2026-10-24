import React from "react";
import useDocumentMeta from "../../../hooks/useDocumentMeta.js";

import f1 from "../../../assets/design_consultancy/Package_design/Frame1.jpg";

const frames = [f1];

const PackageDesign = () => {
  useDocumentMeta({
    title: 'Package Design | Triovation Design Consultancy',
    description: 'Creative and custom packaging design services for brands, restaurants, and businesses.',
    keywords: 'package design, packaging design, custom packaging, brand packaging, Triovation',
    canonicalUrl: 'https://www.triovation.com/design-consultancy/package-design',
    ogImage: 'https://www.triovation.com/og-image.jpg',
  });

  return (
    <div style={{ width: "100%" }}>
      <h1 className="sr-only">Package Design | Triovation Design Consultancy</h1>
      {frames.map((img, i) => (
        <div key={i}>
          <img src={img} alt={`Package design portfolio piece ${i + 1}`} style={{ width: "100%" }} />
        </div>
      ))}
    </div>
  );
};

export default PackageDesign;
