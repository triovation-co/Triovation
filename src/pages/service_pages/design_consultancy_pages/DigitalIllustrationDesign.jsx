import React from "react";
import useDocumentMeta from "../../../hooks/useDocumentMeta.js";

import f1 from "../../../assets/design_consultancy/digital_illustration/Frame 10.png";
import f2 from "../../../assets/design_consultancy/digital_illustration/ILLUSTRATION-03.jpg";
import f3 from "../../../assets/design_consultancy/digital_illustration/ILLUSTRATION-04.jpg";
import f4 from "../../../assets/design_consultancy/digital_illustration/ILLUSTRATION-06.jpg";
import f5 from "../../../assets/design_consultancy/digital_illustration/ILLUSTRATION-08.jpg";
import f6 from "../../../assets/design_consultancy/digital_illustration/ILLUSTRATION-09.jpg";
import f7 from "../../../assets/design_consultancy/digital_illustration/ILLUSTRATION-12.jpg";

const frames = [f1, f2, f3, f4, f5, f6, f7];

const DigitalIllustrationDesign = () => {
  useDocumentMeta({
    title: 'Digital Illustration Design | Triovation Design Consultancy',
    description: 'Custom digital illustration services for brands, publications, and marketing materials by Triovation.',
    keywords: 'digital illustration, custom illustration, art, design, Triovation',
    canonicalUrl: 'https://www.triovation.com/design-consultancy/digital-illustration-design',
    ogImage: 'https://www.triovation.com/og-image.jpg',
  });

  return (
    <div style={{ width: "100%" }}>
      <h1 className="sr-only">Digital Illustration Design | Triovation Design Consultancy</h1>
      {frames.map((img, i) => (
        <div key={i}>
          <img src={img} alt={`Digital illustration design portfolio piece ${i + 1}`} style={{ width: "100%" }} />
        </div>
      ))}
    </div>
  );
};

export default DigitalIllustrationDesign;
