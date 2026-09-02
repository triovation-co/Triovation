import React from "react";
import useDocumentMeta from "../../../hooks/useDocumentMeta.js";

import f1 from "../../../assets/design_consultancy/Brand_Campaigns/Frame 12.png";
import f2 from "../../../assets/design_consultancy/Brand_Campaigns/Frame 19.jpg";
import f3 from "../../../assets/design_consultancy/Brand_Campaigns/Frame 20.jpg";
import f5 from "../../../assets/design_consultancy/Brand_Campaigns/Frame 22.jpg";
import f6 from "../../../assets/design_consultancy/Brand_Campaigns/Frame 23.jpg";
import f7 from "../../../assets/design_consultancy/Brand_Campaigns/Frame24.png";

const frames = [f1, f2, f3, f5, f6, f7];

const BrandCampaignsDesign = () => {
  useDocumentMeta({
    title: 'Brand Campaigns Design | Triovation Design Consultancy',
    description: 'Strategic brand campaign design services for digital and print marketing by Triovation.',
    keywords: 'brand campaigns, marketing design, advertising, campaign design, Triovation',
    canonicalUrl: 'https://www.triovation.com/design-consultancy/brand-campaigns-design',
    ogImage: 'https://www.triovation.com/og-image.jpg',
  });

  return (
    <div style={{ width: "100%" }}>
      <h1 className="sr-only">Brand Campaigns Design | Triovation Design Consultancy</h1>
      {frames.map((img, i) => (
        <div key={i}>
          <img src={img} alt={`Brand campaign design portfolio piece ${i + 1}`} style={{ width: "100%" }} />
        </div>
      ))}
    </div>
  );
};

export default BrandCampaignsDesign;
