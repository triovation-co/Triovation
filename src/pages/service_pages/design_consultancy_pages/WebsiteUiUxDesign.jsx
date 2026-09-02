import React from "react";
import useDocumentMeta from "../../../hooks/useDocumentMeta.js";

import f1 from "../../../assets/design_consultancy/Website_UiUx_design/Frame15.png";
import f2 from "../../../assets/design_consultancy/Website_UiUx_design/research 3.png";

const frames = [f1, f2];

const WebsiteUiUxDesign = () => {
  useDocumentMeta({
    title: 'Website UI/UX Design | Triovation Design Consultancy',
    description: 'Modern website UI/UX design services — wireframes, prototypes, and responsive web design by Triovation.',
    keywords: 'UI/UX design, website design, wireframes, prototyping, web design, Triovation',
    canonicalUrl: 'https://www.triovation.com/design-consultancy/website-uiux-design',
    ogImage: 'https://www.triovation.com/og-image.jpg',
  });

  return (
    <div style={{ width: "100%" }}>
      <h1 className="sr-only">Website UI/UX Design | Triovation Design Consultancy</h1>
      {frames.map((img, i) => (
        <div key={i}>
          <img src={img} alt={`Website UI/UX design portfolio piece ${i + 1}`} style={{ width: "100%" }} />
        </div>
      ))}
    </div>
  );
};

export default WebsiteUiUxDesign;
