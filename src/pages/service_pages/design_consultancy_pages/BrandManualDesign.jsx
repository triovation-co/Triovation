import React from "react";

import f1 from "../../../assets/design_consultancy/brand_manual_design/1.png";
import f2 from "../../../assets/design_consultancy/brand_manual_design/2.png";
import f3 from "../../../assets/design_consultancy/brand_manual_design/3.jpg";
import f4 from "../../../assets/design_consultancy/brand_manual_design/4.jpg";
import f5 from "../../../assets/design_consultancy/brand_manual_design/5.jpg";
import f6 from "../../../assets/design_consultancy/brand_manual_design/6.jpg";
import f7 from "../../../assets/design_consultancy/brand_manual_design/7.jpg";
import f8 from "../../../assets/design_consultancy/brand_manual_design/8.jpg";
import f9 from "../../../assets/design_consultancy/brand_manual_design/9.jpg";
import f10 from "../../../assets/design_consultancy/brand_manual_design/10.jpg";
import f11 from "../../../assets/design_consultancy/brand_manual_design/11.jpg";
import f12 from "../../../assets/design_consultancy/brand_manual_design/12.jpg";
import f13 from "../../../assets/design_consultancy/brand_manual_design/13.jpg";
import f14 from "../../../assets/design_consultancy/brand_manual_design/14.jpg";
import f15 from "../../../assets/design_consultancy/brand_manual_design/15.jpg";
import f16 from "../../../assets/design_consultancy/brand_manual_design/16.jpg";
import f17 from "../../../assets/design_consultancy/brand_manual_design/17.jpg";
import f18 from "../../../assets/design_consultancy/brand_manual_design/18.jpg";
import f24 from "../../../assets/design_consultancy/brand_manual_design/Frame 24 (1).png";

const frames = [
  f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13,f14,f15,f16,f17,f18,f24
];

const BrandManualDesign = () => {
  return (
    <div style={{ width: "100%" }}>
      {frames.map((img, i) => (
        <div key={i}>
          <img src={img} alt={`brand-manual-${i}`} style={{ width: "100%" }} />
        </div>
      ))}
    </div>
  );
};

export default BrandManualDesign;
