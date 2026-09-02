import React from "react";
import useDocumentMeta from "../../../hooks/useDocumentMeta.js";

import f1 from "../../../assets/design_consultancy/Business_collateral_design/Frame 11.png";
import f2 from "../../../assets/design_consultancy/Business_collateral_design/Frame 17.png";
import f3 from "../../../assets/design_consultancy/Business_collateral_design/Frame 18.png";
import f4 from "../../../assets/design_consultancy/Business_collateral_design/Frame 25.png";
import f5 from "../../../assets/design_consultancy/Business_collateral_design/xFrame 24 (1).png";

const frames = [f1, f2, f3, f4, f5];

const BusinessCollateralDesign = () => {
  useDocumentMeta({
    title: 'Business Collateral Design | Triovation Design Consultancy',
    description: 'Professional business collateral design — visiting cards, letterheads, envelopes, and corporate stationery.',
    keywords: 'business cards, letterhead, stationery, corporate collateral, Triovation',
    canonicalUrl: 'https://www.triovation.com/design-consultancy/business-collateral-design',
    ogImage: 'https://www.triovation.com/og-image.jpg',
  });

  return (
    <div style={{ width: "100%" }}>
      <h1 className="sr-only">Business Collateral Design | Triovation Design Consultancy</h1>
      {frames.map((img, i) => (
        <div key={i}>
          <img src={img} alt={`Business collateral design portfolio piece ${i + 1}`} style={{ width: "100%" }} />
        </div>
      ))}
    </div>
  );
};

export default BusinessCollateralDesign;
