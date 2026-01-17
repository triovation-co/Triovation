import React from "react";

import f1 from "../../../assets/design_consultancy/brand_identity_design/Frame 1.png";
import f2 from "../../../assets/design_consultancy/brand_identity_design/Frame 2.png";
import f3 from "../../../assets/design_consultancy/brand_identity_design/Frame 3.png";
import f4 from "../../../assets/design_consultancy/brand_identity_design/Frame 4.png";
import f5 from "../../../assets/design_consultancy/brand_identity_design/Frame 5.png";
import f6 from "../../../assets/design_consultancy/brand_identity_design/Frame 6.png";
import f24 from "../../../assets/design_consultancy/brand_identity_design/Frame 24.png";

const frames = [f1, f2, f3, f4, f5, f6, f24];

const BrandIdentityDesign = () => {
  return (
    <div style={{ width: "100%" }}>

      {frames.map((img, i) => (
        <div key={i}>
          <img src={img} alt={`frame-${i}`} style={{ width: "100%" }} />
        </div>
      ))}

    </div>
  );
};

export default BrandIdentityDesign;
